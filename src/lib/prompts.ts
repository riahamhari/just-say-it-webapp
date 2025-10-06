export const categories: { [key: string]: { label: string; prompt: string } } =
  {
    travel: {
      label: "Travel / Holidays",
      prompt:
        "Summarize this Travel / holidays terms and conditions in plain language for a traveler without losing key numbers or rules. Include highlights for dates, fees, and critical info.",
    },
    ecommerce: {
      label: "E-commerce / Shopping",
      prompt:
        "Summarize this E-commerce / Shopping terms and conditions in plain language. Highlight key numbers like prices, fees, deadlines, and return policies.",
    },
    subscription: {
      label: "Subscription services",
      prompt:
        "Summarize these subscription service terms in plain language. Emphasize billing cycles, cancellation rules, and penalties.",
    },
    software: {
      label: "Software / Apps",
      prompt:
        "Summarize these software / app terms clearly. Focus on license limits, updates, and data usage policies.",
    },
    finance: {
      label: "Finance / Banking",
      prompt:
        "Summarize these banking / finance terms in plain language. Highlight fees, deadlines, interest rates, and penalties.",
    },
  };
