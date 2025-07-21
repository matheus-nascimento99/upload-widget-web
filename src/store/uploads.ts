import { create } from "zustand";
import { enableMapSet } from 'immer'
import { immer } from 'zustand/middleware/immer'
import { uploadFileToStorage } from "../http/upload-file-to-storage";
import { CanceledError } from "axios";

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
              set(state => {
                state.uploads.set(uploadId, {
                  ...upload,
                  uploadInBytes: sizeInBytes
                })
              })
            }, 
          }, 
          { signal: upload.abortController.signal }
        )
        
        set(state => {
          state.uploads.set(uploadId, {
            ...upload,
            status: 'success'
          })
        })
      } catch (error) {
        console.error(error)

        const isCanceledError = error instanceof CanceledError
        const status = isCanceledError ? 'canceled' : 'error'

        set(state => {
          state.uploads.set(uploadId, {
            ...upload,
            status,
          })
        })
      }

    }

    const cancelUpload = (uploadId: string) => {
      const upload = get().uploads.get(uploadId)

      if(!upload){
        return
      }

      upload.abortController.abort()

      set(state => {
        state.uploads.set(uploadId, {
          ...upload,
          status: 'canceled'
        })
      })
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