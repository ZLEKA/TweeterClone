import { TweetWithUser } from 'src/myInterface'

export const sendDataToServer = async (formData:FormData, url:string, method = 'POST') => {
  try {
    const response = await fetch(url, {
      method,
      body: formData,
      credentials: 'include',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    const data = await response.json()
    if (!response.ok) {
      console.log(response)
      return undefined
    }
    console.log(response)
    return data
  } catch (error) {
    console.log('Errore:', error)
    return null
  }
}
export const askToServerGet = async (url:string) => {
  try {
    const response = await fetch(url, {
      credentials: 'include',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    const data = await response.json()
    if (!response.ok) {
      //  throw new Error(response);
      return null
    }
    return data
  } catch (error) {
    console.log('Errore:', error)
  }
}
export const API_REQUEST = 'http://127.0.0.1/api/tweet/'
export const isLog = async () => {
  return await askToServerGet(API_REQUEST + 'user')
}

export const logUser = setInterval(isLog, 3600000) // evry hour

export const validateForm = async (email:string, pass:string) => {
  const formData = new FormData()
  formData.append('email', email)
  formData.append('password', pass)
  console.log(formData)
  const response = await sendDataToServer(formData, 'http://127.0.0.1/api/auth/login')
  return response
}
export const validateFormRegister = async (username:string, email:string, pass:string, confirmPass:string) => {
  const formData = new FormData()
  formData.append('username', username)
  formData.append('email', email)
  formData.append('password', pass)
  formData.append('confirm_password', confirmPass)
  console.log(formData)
  const response = await sendDataToServer(formData, 'http://127.0.0.1/api/auth/register')
  return response
}
