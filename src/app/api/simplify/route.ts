import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { categories } from "@/lib/prompts";
import { Section } from "@/types/section";

export async function POST(request: Request) {
  try {
    const { category, input } = await request.json();
    if (!category || !input) {
      return NextResponse.json(
        { error: "Category and input required" },
        { status: 400 }
      );
    }

    const categoryPrompt = categories[category]?.prompt;
    if (!categoryPrompt) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    const finalPrompt = `
    You are a JSON generator. Read the following Terms and Conditions text and output ONLY a valid JSON array (no markdown, no code fences, no commentary). 
    
    Input:
    Category: ${categoryPrompt}
    Terms and Conditions: ${input}
    
    Output Rules:
    - Output strictly a JSON array of objects.
    - Each object must have these keys:
      - "title": string (short, clear label for the item)
      - "group": string (normally use the category, BUT if the item contains risks, hidden costs, or something the user should be cautious about, override and set group to "Red Flags")
      - "content": string (full explanation, HTML allowed for formatting, keep it safe and semantic)
      - "highlight": string, one of exactly ["red", "yellow", "green", "blue", "gray"]
    
    Additional Notes:
    - Do not include any extra text before or after the JSON.
    - Multiple items may share the same group.
    - Be concise but clear in titles. 
    - Ensure the JSON is valid and parsable.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI that simplifies terms and conditions into sections.",
        },
        { role: "user", content: finalPrompt },
      ],
      temperature: 0.2,
      max_tokens: 1200,
    });

    const rawText = response.choices[0].message?.content ?? "";

    const cleaned = rawText
      .trim()
      .replace(/^```json\s*/i, "") // remove opening ```json
      .replace(/```$/, ""); // remove closing ```
    let sections: Section[] = [];

    try {
      sections = JSON.parse(cleaned);
    } catch (err) {
      console.error("Failed to parse AI JSON:", err, "Raw response:", rawText);
      return NextResponse.json(
        { error: "AI response could not be parsed as JSON" },
        { status: 500 }
      );
    }

    return NextResponse.json({ sections }, { status: 200 });
  } catch (reason) {
    const message =
      reason instanceof Error ? reason.message : "Unexpected error";
    console.log("Error:", message);

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
