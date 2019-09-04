import request from '@/utils/request'
import tySPDAPIURL from '@/utils/SPDGlobal/SPDAPIURL'

const createError = (code, resp) => {
  const err = new Error(resp.message)
  err.code = code
  return err
}

const handleRequest = ({ code, result, ...rest }) => {
  if (code === 1) {
    return result
  } else {
    throw createError(status, rest)
  }
}

module.exports = () => {
  return {
    // 获取from和table数据
    async getdata(data, ApiUrl) {
      return handleRequest(await request({
        url: tySPDAPIURL.CURRENTAPIUrl + ApiUrl,
        method: 'post',
        data
      }))
    },
    // 通过页面配置对象名获取页面的标题列表
    async gettableheaders(data) {
      return handleRequest(
        await request({
          url: tySPDAPIURL.OSAPIUrl + 'api/Tsystem/GetPageConfigResultByObjectName?pagename=' + data,
          method: 'post',
          data
        }))
    },
    // 通过接口和行id获取数据
    async getformdata(btn, btndata) {
      return handleRequest(await request({
        url: tySPDAPIURL.CURRENTAPIUrl + btn.apiurl + '?id=' + btndata.id,
        method: 'post',
        data: btndata
      }))
    },
    async post(api, data) {
      return handleRequest(await request({
        url: tySPDAPIURL.CURRENTAPIUrl + api,
        method: 'post',
        data: data
      }))
    }
  }
}

