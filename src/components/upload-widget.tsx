import { UploadWidgetDropzone } from "./upload-widget-dropzone"
import { UploadWidgetHeader } from "./upload-widget-header"
import { UploadWidgetUploadsList } from "./upload-widget-uploads-list"

export const UploadWidget = () => {
  return (
    <div className="bg-zinc-900 overflow-hidden w-full max-w-[400px] rounded-lg shadow-shape">
      <UploadWidgetHeader />

      <div className="flex flex-col gap-4">
        <UploadWidgetDropzone />

        <div className="h-px bg-zinc-800 border-t border-black/25 box-content" />

        <UploadWidgetUploadsList />
      </div>
    </div>
  )
}