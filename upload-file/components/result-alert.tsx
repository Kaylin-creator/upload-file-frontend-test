import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle } from "lucide-react";

interface ResultAlertProps {
  status: "approved" | "rejected";
}

export default function ResultAlert({ status }: ResultAlertProps) {
  return (
<>
{status === "approved" && (
          <Alert className="bg-[#E7F3EF] border-[#0A3D62] border-l-4">
            <CheckCircle className="h-5 w-5 text-[#0A3D62]" />
            <AlertTitle className="text-[#0A3D62] font-semibold">Verification Successful</AlertTitle>
            <AlertDescription className="text-gray-700">
              Your ID has been successfully verified and added to the system.
            </AlertDescription>
          </Alert>
        )}

        {status === "rejected" && (
          <Alert className="bg-[#FBEAE9] border-[#C0392B] border-l-4">
            <XCircle className="h-5 w-5 text-[#C0392B]" />
            <AlertTitle className="text-[#C0392B] font-semibold">Verification Failed</AlertTitle>
            <AlertDescription className="text-gray-700">
              We could not verify your ID. Please try again or contact support.
            </AlertDescription>
          </Alert>
        )}
</>
  );
}
