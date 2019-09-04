import request from '@/utils/request'

const proInfoInquireApi = {
  //  获取公司信息
  getInfo(data) {
    return request({
      // url: '/Spdenterpriseevent/SpdenterpriseeventSelect',
      url: 'http://192.168.1.14:5000/api/Dic/GetConfigByCode',
      method: 'post',
      data
    })
  },
  // 修改公司信息
  updateInfo(data) {
    return request({
      url: '/Spdcertificationdata/SpdcertificationdataSelectshtg',
      method: 'post',
      data
    })
  },
  // 保存公司信息
  saveInfo(data) {
    return request({
      url: '/Spdcertificationdata/SpdcertificationdataSelectshtg',
      method: 'post',
      data
    })
  },
  // 保存大事件
  saveBreakingNews(data) {
    return request({
      url: '/Spdenterpriseevent/SpdenterpriseeventAdd',
      method: 'post',
      data
    })
  }
}

export default proInfoInquireApi
