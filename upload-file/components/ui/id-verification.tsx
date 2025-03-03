"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import FileUpload from "@/components/file-upload";
import ProcessingState from "@/components/processing-state";
import ResultAlert from "@/components/result-alert";
import { Button } from "@/components/ui/button";
import { cardStyles, cardHeaderStyles, cardContentStyles, buttonStyles } from "@/lib/style";

export default function IDVerification() {
  const [state, setState] = useState<"idle" | "processing" | "approved" | "rejected">("idle");
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setState("processing");

      // Simulate processing delay
      setTimeout(() => {
        setState(Math.random() > 0.5 ? "approved" : "rejected");
      }, 2000);
    }
  };

  const resetVerification = () => {
    setState("idle");
    setFileName(null);
  };

  return (
    <Card className="w-full max-w-md mx-auto border-0 shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="bg-[#0A3D62] text-white">
        <CardTitle className="text-xl font-semibold">ID Verification</CardTitle>
        <CardDescription className="text-gray-200">
          Upload a government-issued ID document for verification
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4 p-6 bg-white">
        {state === "idle" && <FileUpload onFileChange={handleFileChange} />}
        {state === "processing" && <ProcessingState fileName={fileName} />}
        {(state === "approved" || state === "rejected") && <ResultAlert status={state} />}
      </CardContent>

      {state === "approved" && (
  <CardFooter className="bg-gray-50 p-4 border-t border-gray-100 flex justify-center">
    <Button onClick={resetVerification} className={buttonStyles}>
      Continue
    </Button>
  </CardFooter>
)}

{state === "rejected" && (
  <CardFooter className="bg-gray-50 p-4 border-t border-gray-100 flex justify-center">
    <Button onClick={resetVerification} className={buttonStyles}>
      Try Again
    </Button>
  </CardFooter>
)}

    </Card>
  );
}
