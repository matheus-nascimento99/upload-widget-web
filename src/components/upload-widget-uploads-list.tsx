import { UploadWidgetUploadsItem } from "./upload-widget-upload-item"

export const UploadWidgetUploadsList = () => {
  return (
    <div className="px-3 flex flex-col gap-3">
      <span className="text-xs font-medium">
        Uploaded files{' '}
        <span className="text-zinc-400">
          (2)
        </span>
      </span>

      <div className="flex flex-col gap-2">
        <UploadWidgetUploadsItem />
        <UploadWidgetUploadsItem />
        <UploadWidgetUploadsItem />
      </div>
    </div>
  )
}