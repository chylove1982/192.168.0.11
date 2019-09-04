import axios from 'axios'

var instance = axios.create({
  baseURL: xxx,
  timeout: 1000
})

instance.interceptors.request.use(function(config) {
  return config
},
function(error) {
  return Promise.reject(error)
})

instance.interceptors.response.use(function(response) {
  return response.data
},
function(error) {
  return Promise.reject(error)
})

// 重点
export default function(method, url, data = null) {
  method = method.toLowerCase()
  if (method === 'post') {
    return instance.post(url, data)
  } else if (method === 'get') {
    return instance.get(url, { params: data })
  } else if (method === 'delete') {
    return instance.delete(url, { params: data })
  } else if (method === 'put') {
    return instance.put(url, data)
  } else {
    console.log('未知的method' + method)
    return false
  }
}
