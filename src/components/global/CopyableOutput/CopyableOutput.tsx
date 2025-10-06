import { CheckIcon, CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

type Props = {
  output: string;
};

const CopyableOutput = ({ output }: Props) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  return (
    <div className="max-w-2xl my-8 p-4 bg-gray-50 rounded-md border border-gray-200 whitespace-pre-wrap max-h-84 overflow-y-auto">
      <div>{output}</div>
      <Button onClick={handleCopy} size="sm" className="mt-2 cursor-pointer">
        {copied ? (
          <>
            Copied
            <CheckIcon className="w-4 h-4" />
          </>
        ) : (
          <>
            Copy
            <CopyIcon className="w-4 h-4" />
          </>
        )}
      </Button>
    </div>
  );
};
export default CopyableOutput;
