import request from '@/utils/request'

const pandingOrderApi = {
//  获取页面配置信息
  getPageConfig(query) {
    return request({
      url: '/department/spd_supplier/query',
      method: 'get',
      params: query
    })
  },
  // 获取产品信息
  getList(query) {
    return request({
      url: '/department/spd_supplier/query',
      method: 'get',
      params: query
    })
  },

  fetchArticle(id) {
    return request({
      url: '/article/detail',
      method: 'get',
      params: { id }
    })
  },

  fetchPv(pv) {
    return request({
      url: '/article/pv',
      method: 'get',
      params: { pv }
    })
  },

  createArticle(data) {
    return request({
      url: '/article/create',
      method: 'post',
      data
    })
  },

  updateArticle(data) {
    return request({
      url: '/article/update',
      method: 'post',
      data
    })
  }
}

export default pandingOrderApi
