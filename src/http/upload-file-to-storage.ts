import axios from 'axios'

type UploadFileToStorageParams = {
  file: File
}

export const uploadFileToStorage = async ({ file }: UploadFileToStorageParams) => {
  const data = new FormData()

  data.append('file', file)

  const result = await axios.post<{ url: string }>('http://localhost:3333/uploads', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return {
    url: result.data.url
  }
}