import { useDropzone } from 'react-dropzone'

export const UploadWidgetDropzone = () => {
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
    <div className="px-5 flex flex-col gap-3">
      <div 
      data-active={isDragActive}
      className='cursor-pointer h-32 rounded-lg flex flex-col justify-center items-center p-5 text-zinc-400 bg-zinc-950 border border-dashed border-zinc-700 hover:border-zinc-600 transition-colors data-[active=true]:bg-indigo-500/10 data:[active=true]:border-indigo-500 data-[active=true]:text-indigo-400'
      {...getRootProps()}
      >
        <input type="file" {...getInputProps()} />
        
        <span className='text-xs'>Drag & drop your files here or</span>
        <span className='text-xs underline'>Choose files</span>
      </div>

      <span className='text-xs text-zinc-400'>Only PNG and JPG <em>(4mb max)</em></span>
    </div>
  )
}