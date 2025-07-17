import * as Collapsible from '@radix-ui/react-collapsible'
import { Maximize2 } from 'lucide-react'
import { UploadWidgetTitle } from './upload-widget-title'

export const UploadWidgetMinimizedButton = () => {
  return (
    <Collapsible.Trigger className='group flex bg-white/2 cursor-pointer items-center justify-between py-2 px-4 w-full rounded-lg gap-2'>
      <UploadWidgetTitle />

      <Maximize2 strokeWidth={1.5} className="size-4 text-zinc-400 group-hover:text-zinc-100" />
    </Collapsible.Trigger>
  )
}