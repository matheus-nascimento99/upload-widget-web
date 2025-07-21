import axios from 'axios'

type UploadFileToStorageParams = {
  file: File
}

type UploadFileToStorageOpts = {
  signal?: AbortSignal
}

export const uploadFileToStorage = async ({ file }: UploadFileToStorageParams,
  opts?: UploadFileToStorageOpts
) => {
  const data = new FormData()

  data.append('file', file)

  const result = await axios.post<{ url: string }>('http://localhost:3333/uploads', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    signal: opts?.signal
  })

  return {
    url: result.data.url
  }
}