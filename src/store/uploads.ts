import { create } from "zustand";
import { enableMapSet } from 'immer'
import { immer } from 'zustand/middleware/immer'
import { uploadFileToStorage } from "../http/upload-file-to-storage";
import { CanceledError } from "axios";
import { useShallow } from "zustand/shallow";

export type Upload = {
  name: string
  file: File
  abortController: AbortController
  status: 'progress' | 'success' | 'error' | 'canceled'
  originalInBytes: number
  uploadInBytes: number
}

type UploadState = {
  uploads: Map<string, Upload>
  addUploads: (files: File[]) => void
  cancelUpload: (uploadId: string) => void
}

enableMapSet()

export const useUploads = create<UploadState, [['zustand/immer', never]]>(
  immer((set, get) => {
    const updateUpload = (uploadId: string, data: Partial<Upload>) => {
      const upload = get().uploads.get(uploadId)

      if(!upload){
        return
      }

      set(state => {
        state.uploads.set(uploadId, {
          ...upload,
          ...data,
        })
      })
    }

    const processUpload = async (uploadId: string) => {
      const upload = get().uploads.get(uploadId)

      if(!upload){
        return
      }

      try {
        await uploadFileToStorage(
          { 
            file: upload.file,
            onProgress(sizeInBytes) {
              updateUpload(uploadId, { uploadInBytes: sizeInBytes })
            }, 
          }, 
          { signal: upload.abortController.signal }
        )
        
        updateUpload(uploadId, { status: 'success' })
      } catch (error) {
        console.error(error)

        const isCanceledError = error instanceof CanceledError
        const status = isCanceledError ? 'canceled' : 'error'

        updateUpload(uploadId, { status })
      }

    }

    const cancelUpload = (uploadId: string) => {
      const upload = get().uploads.get(uploadId)

      if(!upload){
        return
      }

      upload.abortController.abort()

      updateUpload(uploadId, { status: 'canceled' })
    }

    const addUploads = (files: File[]) => {
      for (const file of files) {
        const uploadId = crypto.randomUUID()
        const abortController = new AbortController()

        const upload: Upload = {
          name: file.name,
          file: file,
          abortController,
          status: 'progress',
          originalInBytes: file.size,
          uploadInBytes: 0,
        }

        set(state => {
          state.uploads.set(uploadId, upload)
        })

        processUpload(uploadId)
      }
    }

    return {
      uploads: new Map(),
      addUploads,
      cancelUpload,
    }
  })
)

export const usePendingUploads = () => {
  return useUploads(useShallow(store => {
    const isThereAnyPendingUpload = Array.from(store.uploads.values()).some((upload) => upload.status === 'progress')

    if(!isThereAnyPendingUpload) {
      return {
        isThereAnyPendingUpload,
        globalPercentage: 100
      }
    }

    const { total, uploaded } = Array.from(store.uploads.values()).reduce(
      (acc, upload) => {
        acc.total += upload.originalInBytes
        acc.uploaded += upload.uploadInBytes
        
        return acc
      },
      { total: 0, uploaded: 0 }
    )

    const globalPercentage = Math.min(
      Math.round((uploaded * 100) / total),
      100
    )

    return {
      isThereAnyPendingUpload,
      globalPercentage,
    }
    
  }))
}