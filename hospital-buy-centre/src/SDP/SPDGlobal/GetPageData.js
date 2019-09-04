import spdapi from '@/SDP/CommonRequest'

const pageData = {
  //  获取页面配置
  getPageConfig() {
    var h = window.location.href
    var st = '/'
    var i = h.lastIndexOf(st)
    if (i !== -1) {
      var L = st.length
      var s = h.substr(i + L)
      spdapi.getTableHeader(s).then(response => {
        spdapi.consolelog('response', response)
        const { code, result } = response
        if (Object.is(code, 1)) {
          return result
        }
      })
    }
  },
  // 获取数据列表
  getData(data) {
    spdapi.getData(data).then(response => {
      spdapi.consolelog('response', response)
      const { code, result } = response
      if (Object.is(code, 1)) {
        return result
      }
    })
  }
}

export default pageData
