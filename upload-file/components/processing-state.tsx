import { Loader2 } from "lucide-react";

interface ProcessingStateProps {
  fileName: string | null;
}

export default function ProcessingState({ fileName }: ProcessingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Loader2 className="h-12 w-12 text-[#0A3D62] animate-spin mb-4" />
      <p className="text-lg font-medium text-[#0A3D62]">Processing your document...</p>
      <p className="text-sm text-gray-600 mt-2">{fileName && `Verifying ${fileName}`}</p>
    </div>
  );
}
