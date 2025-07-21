import { useDropzone } from 'react-dropzone'
import { CircularProgressBar } from './ui/circular-progress-bar'
import { motion } from 'motion/react'
import { usePendingUploads, useUploads } from '../store/uploads'

export const UploadWidgetDropzone = () => {
  const uploads = useUploads(store => store.uploads)
  const addUploads = useUploads(store => store.addUploads)

  const { globalPercentage, isThereAnyPendingUpload } = usePendingUploads()
  

  const { getRootProps, getInputProps, isDragActive } 
    = useDropzone({
      accept: {
        'image/jpeg': [],
        'image/png': []
      },
      onDrop(acceptedFiles) {
        addUploads(acceptedFiles)
      },
    })
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="px-3 flex flex-col gap-3"
    >
      <div 
        data-active={isDragActive}
        data-progress={isThereAnyPendingUpload}
        className='data-[progress=false]:cursor-pointer data-[progress=true]:cursor-wait h-32 rounded-lg flex flex-col justify-center items-center p-5 text-zinc-400 bg-zinc-950 border border-dashed border-zinc-700 hover:border-zinc-600 transition-colors data-[active=true]:bg-indigo-500/10 data:[active=true]:border-indigo-500 data-[active=true]:text-indigo-400'
        {...getRootProps()}
      >
        <input type="file" {...getInputProps()} disabled={isThereAnyPendingUpload} />
        
        {isThereAnyPendingUpload ? (
          <div className='flex flex-col gap-2.5 items-center select-none'>
            <CircularProgressBar progress={globalPercentage} size={56} strokeWidth={4} />
            <span className='text-xs'>Uploading {uploads.size} files...</span>
          </div>
        ) : (
          <>
            <span className='text-xs'>Drag & drop your files here or</span>
            <span className='text-xs underline'>Choose files</span>
          </>
        )}
      </div>

      <span className='text-xxs text-zinc-400 select-none'>Only PNG and JPG <em>(4mb max)</em></span>
    </motion.div>
  )
}