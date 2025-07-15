import { useDropzone } from 'react-dropzone'
import { CircularProgressBar } from './ui/circular-progress-bar'

export const UploadWidgetDropzone = () => {
  const isThereAnyPendingUpload = true
  const uploadGlobalPercentage = 66

  const { getRootProps, getInputProps, isDragActive } 
    = useDropzone({
      accept: {
        'image/jpeg': [],
        'image/png': []
      },
      onDrop(acceptedFiles) {
        console.log(acceptedFiles)
      },
    })
  
  return (
    <div className="px-3 flex flex-col gap-3">
      <div 
      data-active={isDragActive}
      className='cursor-pointer h-32 rounded-lg flex flex-col justify-center items-center p-5 text-zinc-400 bg-zinc-950 border border-dashed border-zinc-700 hover:border-zinc-600 transition-colors data-[active=true]:bg-indigo-500/10 data:[active=true]:border-indigo-500 data-[active=true]:text-indigo-400'
      {...getRootProps()}
      >
        <input type="file" {...getInputProps()} />
        
        {isThereAnyPendingUpload ? (
          <div className='flex flex-col gap-2.5 items-center'>
            <CircularProgressBar progress={uploadGlobalPercentage} size={56} strokeWidth={4} />
            <span className='text-xs'>Uploading 2 files...</span>
          </div>
        ) : (
          <>
            <span className='text-xs'>Drag & drop your files here or</span>
            <span className='text-xs underline'>Choose files</span>
          </>
        )}
      </div>

      <span className='text-xxs text-zinc-400'>Only PNG and JPG <em>(4mb max)</em></span>
    </div>
  )
}