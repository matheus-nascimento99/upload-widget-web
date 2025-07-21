import { useState } from "react"
import { UploadWidgetDropzone } from "./upload-widget-dropzone"
import { UploadWidgetHeader } from "./upload-widget-header"
import * as Collapsible from '@radix-ui/react-collapsible'
import { UploadWidgetMinimizedButton } from "./upload-widget-minimized-button"
import { UploadWidgetUploadsList } from "./upload-widget-uploads-list"
import { motion, useCycle } from 'motion/react'

export const UploadWidget = () => {
  const [isWidgetOpen, toggleWidget] = useCycle(false, true)

  return (
    <Collapsible.Root onOpenChange={() => toggleWidget()}>
      <motion.div 
        animate={isWidgetOpen ? 'open' : 'closed'}
        variants={{
          open: {
            width: 400,
            height: 'auto',
            transition: {
              duration: 0.1
            }
          },
          closed: {
            width: 'max-content',
            height: 44,
          } 
        }}
        className="bg-zinc-900 overflow-hidden max-w-[400px] rounded-lg shadow-shape"
      >

        {!isWidgetOpen && <UploadWidgetMinimizedButton />}

        <Collapsible.Content>
          <UploadWidgetHeader />

          <div className="flex flex-col gap-4 py-3">
            <UploadWidgetDropzone />

            <div className="h-px bg-zinc-800 border-t border-black/25 box-content" />

            <UploadWidgetUploadsList />
          </div>
        </Collapsible.Content>
      </motion.div>
    </Collapsible.Root>
    
  )
}