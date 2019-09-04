import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'http://192.168.1.107:19000/ssoapi/spdlogin',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: 'http://192.168.1.107:19000/ssoapi/SPDGetUserdetails',
    method: 'post',
    data
  })
}

export function logout(data) {
  return request({
    url: 'http://192.168.1.107:19000/ssoapi/spdLoginOut',
    method: 'post',
    data
  })
}

// 获取配置
export function getConfig() {
  return request({
    url: 'admin/system/config',
    method: 'get'
  })
}

// 获取验证码
export function getVerImg() {
  return request({
    url: 'admin/account/verifycode',
    method: 'get'
  })
}
