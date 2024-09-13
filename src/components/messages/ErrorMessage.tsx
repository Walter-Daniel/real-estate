import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

interface MessageProps {
    message: string;
}

export const ErrorMessage = ({message}:MessageProps) => {
  if(!message) return null;
  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
        <ExclamationTriangleIcon className="w-4 h-4 mr-2"/>
        <p>{message}</p>
    </div>
  )
}
