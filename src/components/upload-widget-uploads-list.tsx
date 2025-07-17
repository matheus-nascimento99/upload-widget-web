import { UploadWidgetUploadItem } from "./upload-widget-upload-item";
import { motion } from 'motion/react'
export function UploadWidgetUploadsList() {
  const isUploadListEmpty = false;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }} 
      className="px-3 flex flex-col gap-3"
    >
      <span className="text-xs font-medium">
        Uploaded files <span className="text-zinc-400">(2)</span>
      </span>

      {isUploadListEmpty ? (
        <span className="text-xs text-zinc-400">No uploads added</span>
      ) : (
        <div className="flex flex-col gap-2">
          <UploadWidgetUploadItem />
          <UploadWidgetUploadItem />
        </div>
      )}
    </motion.div>
  );
}