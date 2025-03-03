import type React from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { borderStyles, buttonStyles } from "@/lib/style";

interface FileUploadProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FileUpload({ onFileChange }: FileUploadProps) {
  return (
    <div className={borderStyles}>
      <Upload className="h-10 w-10 text-[#0A3D62] mb-4" />
      <p className="text-sm text-gray-600 mb-4">Click to add to document</p>
      <Button className={buttonStyles}>
        <label className="cursor-pointer">
          Select Document
          <input type="file" className="hidden" accept="image/*,.pdf" onChange={onFileChange} />
        </label>
      </Button>
    </div>
  );
}
