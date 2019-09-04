import request from '@/utils/request'
import SPDAPIURL from '@/utils/SPDGlobal/SPDAPIURL';
const SPDApi = {
  //  获取列表标题信息（根据配置表中的字段数据，获取页面的配置标题信息）
  getTableHeaders(data) {
    return request({
      url: SPDAPIURL.OSAPIUrl+'api/Tsystem/GetPageConfigList?pagename='+data,
      method: 'post',
      data
    })
  },
  //  获取列表数据信息（根据APIURL相对地址，获取接口数据）
  getData(data,apiurl) {
    return request({
      url: SPDAPIURL.CURRENTAPIUrl+apiurl,
      method: 'post' ,
      data:data
    })
  },
  // 输出日志
  consolelog(data) {
    console.log(data)
  },
// 输出配置信息（通过配置中的configcode数组获取配置信息中的配置信息）
  GetConditionsConfigs(data) {
    return request({
      url: SPDAPIURL.OSAPIUrl+'api/SysConfig/GetConfigByCodes',
      method: 'post',
      data
    })
  } ,
  //  获取列表数据信息（通过APIURL的绝对地址获取数据）
  getPageData(data,apiurl) {
    return request({
      url:apiurl,
      method: 'post',
      data
    })
  }
}
export default SPDApi
