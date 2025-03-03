import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle } from "lucide-react";
import { alertStyles, alertIconStyles, alertTitleStyles } from "@/lib/style";

interface ResultAlertProps {
  status: "approved" | "rejected";
}

export default function ResultAlert({ status }: ResultAlertProps) {
  return (
<Alert className={alertStyles[status]}>
{status === "approved" && (
          <>
            <CheckCircle className="h-5 w-5 text-[#0A3D62]" />
            <AlertTitle className="text-[#0A3D62] font-semibold">Verification Successful</AlertTitle>
            <AlertDescription className="text-gray-700">
              Your ID has been successfully verified and added to the blockchain.
            </AlertDescription>
          </>
        )}

        {status === "rejected" && (
          <>
            <XCircle className="h-5 w-5 text-[#C0392B]" />
            <AlertTitle className="text-[#C0392B] font-semibold">Verification Failed</AlertTitle>
            <AlertDescription className="text-gray-700">
              We couldn't verify your ID. Please try again with a clearer image.
            </AlertDescription>
          </>
        )}
</Alert>
  );
}
