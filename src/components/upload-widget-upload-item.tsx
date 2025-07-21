import { Download, ImageUp, Link2, RefreshCcw, X } from "lucide-react"
import { Button } from "./ui/button"
import * as Progress from '@radix-ui/react-progress'
import type { Upload } from "../store/uploads"
import { formatBytes } from "../utils/format-bytes"

type UploadWidgetUploadItemProps = {
  upload: Upload
}

export const UploadWidgetUploadItem = ({ upload }: UploadWidgetUploadItemProps) => {
  return (
    <div className="relative rounded-lg p-3 bg-white/2 flex flex-col gap-3 shadow-shape-content overflow-hidden">
      <div className="flex flex-col gap-1">
        <span className="text-xs flex items-center gap-1">
          <ImageUp className="size-3 text-zinc-300" strokeWidth={1.5} />
          <span className="font-medium">{upload.name}</span>
        </span>

        <span className="text-xxs text-zinc-400 flex items-center gap-1.5">
          <span className="line-through">{formatBytes(upload.file.size)}</span>
          <div className="size-1 rounded-full bg-zinc-700" />
          <span>
            300KB
            <span className="text-green-400 ml-1">
              -94%
            </span>
          </span>
          <div className="size-1 rounded-full bg-zinc-700" />
          <span>45%</span>
        </span>
      </div>

      <Progress.Root className="bg-zinc-800 rounded-full h-1 overflow-hidden">
        <Progress.Indicator className="h-1 bg-indigo-500" style={{ width: '45%' }} />
      </Progress.Root>
      
      <div className="absolute right-2.5 top-2.5 flex items-center gap-2">
        <Button size="icon-sm">
          <Download className="size-3.5" strokeWidth={1.5} />
          <span className="sr-only">Download image</span>
        </Button>

        <Button size="icon-sm">
          <Link2 className="size-3.5" strokeWidth={1.5} />
          <span className="sr-only">Copy remote URL</span>
        </Button>

        <Button size="icon-sm">
          <RefreshCcw className="size-3.5" strokeWidth={1.5} />
          <span className="sr-only">Retry upload</span>
        </Button>

        <Button size="icon-sm">
          <X className="size-3.5" strokeWidth={1.5} />
          <span className="sr-only">Cancel upload</span>
        </Button>
      </div>
    </div>
  )
}