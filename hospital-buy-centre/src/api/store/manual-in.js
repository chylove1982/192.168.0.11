import request from '@/utils/request'

const manualInApi = {
  //  获取信息
  getList(data) {
    return request({
      // url: '/Spdenterpriseevent/SpdenterpriseeventSelect',
      url: 'http://192.168.1.107:16000/api/Spddepartmentinfo/DepartmentInfoGetList',
      method: 'post',
      data
    })
  },
  //  获取信息
  getInfo(data){
    return request({
      // url: '/Spdenterpriseevent/SpdenterpriseeventSelect',
      url: 'http://192.168.1.107:16000/api/Spddepartmentinfo/DepartmentInfoGetList',
      method: 'post',
      data
    })
  },
  // 添加科室
  addSec(data){
    return request({
      url: 'http://192.168.1.22:3263/api/Spddepartmentinfo/DepartmentInfoAdd',
      method: 'post',
      data
    })
  },
  // 删除
  delById(data){
    return request({
      url: 'http://192.168.1.22:3263/api/Spddepartmentinfo/DepartmentInfo',
      method: 'post',
      data
    })
  },
  // 保存
  saveInfo(data) {
    return request({
      url: 'http://192.168.1.22:3263/api/Spddepartmentinfo/DepartmentInfo',
      method: 'post',
      data
    })
  }
}

export default manualInApi

