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
      <CheckCircle className={alertIconStyles.approved} />
      <AlertTitle className={alertTitleStyles.approved}>
        Verification Successful
      </AlertTitle>
      <AlertDescription className="text-gray-700">
        Your ID has been successfully verified and added to the system.
      </AlertDescription>
    </>
  )}

  {status === "rejected" && (
    <>
      <XCircle className={alertIconStyles.rejected} />
      <AlertTitle className={alertTitleStyles.rejected}>
        Verification Failed
      </AlertTitle>
      <AlertDescription className="text-gray-700">
        We couldn't verify your ID. Please try again with a clearer image.
      </AlertDescription>
    </>
  )}
</Alert>
  );
}
