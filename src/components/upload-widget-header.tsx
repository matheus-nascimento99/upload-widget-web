import { Minimize2 } from "lucide-react"
import { Button } from "./ui/button"
import * as Collapsible from '@radix-ui/react-collapsible'

export const UploadWidgetHeader = () => {
  return (
    <div className="w-full bg-white/2 flex items-center justify-between border-b border-zinc-800 px-4 py-2">
      <span className="text-sm font-semibold">Upload files (66%)</span>

      <Collapsible.Trigger asChild>
        <Button size="icon" className="-mr-2">
          <Minimize2 strokeWidth={1.5} className="size-4" />
        </Button>
      </Collapsible.Trigger>
    </div>
  )
}