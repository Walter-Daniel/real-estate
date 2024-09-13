import { CheckCircleIcon } from "lucide-react";

interface MessageProps {
  message: string;
}

export const SuccessMessage = ({message}:MessageProps) => {
  if(!message) return null;
  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
        <CheckCircleIcon className="w-4 h-4 mr-2"/>
        <p>{message}</p>
    </div>
  )
}
