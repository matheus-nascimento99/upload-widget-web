import { Download, ImageUp, Link2, RefreshCcw, X } from "lucide-react"
import { Button } from "./ui/button"
import * as Progress from '@radix-ui/react-progress'
import { useUploads, type Upload } from "../store/uploads"
import { formatBytes } from "../utils/format-bytes"
import { downloadUrl } from "../utils/download-url"

type UploadWidgetUploadItemProps = {
  uploadId: string
  upload: Upload
}

export const UploadWidgetUploadItem = (
  { uploadId, upload }: UploadWidgetUploadItemProps
) => {
  const cancelUpload = useUploads(store => store.cancelUpload)
  const retryUpload = useUploads(store => store.retryUpload)

  const progress = Math.min(
    upload.compressedSizeInBytes 
      ? Math.round((upload.uploadInBytes * 100) / upload.originalSizeInBytes)
      : 0,
    100
  )

  return (
    <div className="relative rounded-lg p-3 bg-white/2 flex flex-col gap-3 shadow-shape-content overflow-hidden">
      <div className="flex flex-col gap-1">
        <span className="text-xs flex items-center gap-1 max-w-4/6">
          <ImageUp className="size-3 text-zinc-300" strokeWidth={1.5} />
          <span className="font-medium truncate">{upload.name}</span>
        </span>

        <span className="text-xxs text-zinc-400 flex items-center gap-1.5">
          <span className="line-through">{formatBytes(upload.originalSizeInBytes)}</span>
          <div className="size-1 rounded-full bg-zinc-700" />
          <span>
            {formatBytes(upload.compressedSizeInBytes ?? 0)}
            {upload.compressedSizeInBytes && (
              <span className="text-green-400 ml-1">
                -
                {Math.round(
                  ((upload.originalSizeInBytes - upload.compressedSizeInBytes) *
                    100) /
                    upload.originalSizeInBytes
                )}
                %
              </span>
            )}
          </span>
          <div className="size-1 rounded-full bg-zinc-700" />

          {upload.status === 'success' && <span>100%</span>}
          {upload.status === 'progress' && <span>{progress}%</span>}
          {upload.status === 'canceled' && <span className="text-yellow-400">Canceled</span>}
          {upload.status === 'error' && <span className="text-red-400">Error</span> }
        </span>
      </div>

      <Progress.Root 
        data-status={upload.status}
        className="group bg-zinc-800 rounded-full h-1 overflow-hidden"
      >
        <Progress.Indicator 
          className="h-1 bg-indigo-500 group-data-[status=success]:bg-green-400 group-data-[status=canceled]:bg-yellow-400 group-data-[status=error]:bg-red-400 transition-all" 
          style={{ width: upload.status === 'progress' ? `${progress}%` : '100%' }} 
        />
      </Progress.Root>
      
      <div className="absolute right-2 top-2 flex items-center gap-2">
        <Button 
          size="icon-sm" 
          disabled={!upload.remoteUrl}
          onClick={() => {
            if (upload.remoteUrl) {
              downloadUrl(upload.remoteUrl);
            }
          }}
        >
          <Download className="size-3.5" strokeWidth={1.5} />
          <span className="sr-only">Download image</span>
        </Button>

        <Button 
          size="icon-sm" 
          disabled={!upload.remoteUrl}
          onClick={() => upload.remoteUrl 
            && navigator.clipboard.writeText(upload.remoteUrl)}
        >
          <Link2 className="size-3.5" strokeWidth={1.5} />
          <span className="sr-only">Copy remote URL</span>
        </Button>

        <Button 
          size="icon-sm"
          disabled={!['error', 'canceled'].includes(upload.status)}
          onClick={() => retryUpload(uploadId)}
        >
          <RefreshCcw className="size-3.5" strokeWidth={1.5} />
          <span className="sr-only">Retry upload</span>
        </Button>

        <Button 
          size="icon-sm" 
          onClick={() => cancelUpload(uploadId)}
          disabled={upload.status !== 'progress'}
        >
          <X className="size-3.5" strokeWidth={1.5} />
          <span className="sr-only">Cancel upload</span>
        </Button>
      </div>
    </div>
  )
}