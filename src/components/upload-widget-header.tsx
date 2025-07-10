import { Minimize2 } from "lucide-react"

export const UploadWidgetHeader = () => {
  return (
    <div className="w-full bg-white/2 flex items-center justify-between border-b border-zinc-800 px-5 py-4">
      <span className="text-sm font-semibold">Upload files (66%)</span>

      <button>
        <Minimize2 strokeWidth={1.5} className="size-4" />
      </button>
    </div>
  )
}