import request from '@/utils/request'
import SPDAPIURL from '@/utils/SPDGlobal/SPDAPIURL'
export default {
  install(Vue, options) {
    Vue.prototype.gettablewithattachcols = function(data, listQuery, attachcols) {
      const rsTable = {
        datalist: [],
        headers: [] }
      request({
        url: SPDAPIURL.OSAPIUrl + 'api/Tsystem/GetPageConfigResultByObjectName?pagename=' + data,
        method: 'post',
        params: data
      }).then(res => {
        // 成功回调
        if (res.code === 1) {
          var tonyapiurl = res.result.interfaceaddress
          console.log(tonyapiurl)
          var datalist = res.result.details
          for (var i = 0; i < datalist.length; i++) {
            console.log(datalist[i])
            rsTable.headers.push(datalist[i])
          }
          for (var i = 0; i < attachcols.length; i++) {
            console.log(attachcols[i])
            rsTable.headers.push(attachcols[i])
          }
          console.log('====================request DataList start=================================')
          console.log(SPDAPIURL.CURRENTAPIUrl + tonyapiurl)
          request({
            url: SPDAPIURL.CURRENTAPIUrl + tonyapiurl,
            method: 'post',
            data: listQuery
          }).then(ress => {
            if (ress.code === 1) {
              console.log(ress.result)
              var dlist = ress.result
              for (var i = 0; i < dlist.length; i++) {
                console.log(dlist[i])
                rsTable.datalist.push(dlist[i])
              }
            }
          })
        }
      })
      console.log('====================GetTable end=================================')

      return rsTable
    }
    // 获取FORM信息
    Vue.prototype.formdata = function(data, btn, btndata) {
      const rsTable = {
        datalist: {},
        headers: [] }
      rsTable.datalist = this.getdata(btndata, btn.apiurl + '?id=' + btndata.id)
      rsTable.headers = this.gettableheaders(data)

      return rsTable
    }
    Vue.prototype.getformdata = function(btn, btndata) {
      console.log(btn.apiurl + '?id=' + btndata.id)
      return this.getdata(btndata, btn.apiurl + '?id=' + btndata.id)
    }
    // 获取标题与标题列对应的数据
    Vue.prototype.gettable = function(data, listQuery) {
      const rsTable = {
        datalist: [],
        headers: [] }
      request({

        url: SPDAPIURL.OSAPIUrl + 'api/Tsystem/GetPageConfigResultByObjectName?pagename=' + data,
        method: 'post',
        params: data
      }).then(res => {
        console.log('res', res)
        // 成功回调
        if (res.code === 1) {
          var tonyapiurl = res.result.interfaceaddress
          this.consolelog(tonyapiurl)
          var datalist = res.result.details
          for (var i = 0; i < datalist.length; i++) {
            this.consolelog(datalist[i])
            rsTable.headers.push(datalist[i])
          }

          const titleh = { chinese: '操作', disabled: true }
          rsTable.headers.push(titleh)
          this.consolelog('====================request DataList start=================================')
          this.consolelog(SPDAPIURL.CURRENTAPIUrl + tonyapiurl)
          request({
            url: SPDAPIURL.CURRENTAPIUrl + tonyapiurl,
            method: 'post',
            data: listQuery
          }).then(ress => {
            if (ress.code === 1) {
              this.consolelog(ress.result)
              var dlist = ress.result

              for (var i = 0; i < dlist.length; i++) {
                rsTable.datalist.push(dlist[i])
              }
            }
          })
        }
      })
      this.consolelog('====================GetTable end=================================')

      return rsTable
    }
    // 获取接口的返回值（可以是单个对象值，也可以是其他单值）
    Vue.prototype.getsysdata = function(data, ApiUrl) {
      const result = {}
      request({
        url: SPDAPIURL.OSAPIUrl + ApiUrl,
        method: 'post',
        data
      }).then(res => {
        for (var key in res.result) {
          result[key] = res.result[key]
        }
      })
      return result
    }

    // 获取接口的返回值（可以是单个对象值，也可以是其他单值）
    Vue.prototype.getdata = function(data, ApiUrl) {
      const result = {}
      request({
        url: SPDAPIURL.CURRENTAPIUrl + ApiUrl,
        method: 'post',
        data
      }).then(res => {
        for (var key in res.result) {
          result[key] = res.result[key]
        }
      })
      return result
    }
    Vue.prototype.alert = function(data) {
      alert(data)
    }
    // 获取任意接口的返回值（可以是单个对象值，也可以是其他单值）
    Vue.prototype.getdatabyrawapirul = function(data, ApiUrl) {
      const result = {}
      request({
        url: ApiUrl,
        method: 'post',
        data
      }).then(res => {
        if (res.code === 1) {
          for (var key in res.result) {
            if (Array.isArray(res.result[key])) {
              var obj = res.result[key]
              for (var i = 0; i < obj.length; i++) {
                result[key].push(obj[i])
              }
            } else {
              result[key] = res.result[key]
            }
          }
        } else {
          alert(res.message)
        }
      })
      return result
    }
    // 通过配置CODE获取页面的配置信息（单个列表或配置信息的获取）通过配置Code获取配置列表（返回值仅有配置列表信息）
    Vue.prototype.getconfig = function(data) {
      const rsTable = {
        datalist: [],
        headers: [] }
      request({
        url: SPDAPIURL.OSAPIUrl + 'api/SysConfig/GetConfigByCode?configcode=' + data,
        method: 'post',
        data
      }).then(res => {
        if (res.code === 1) {
          var datalist = res.result
          for (var i = 0; i < datalist.length; i++) {
            rsTable.datalist.push(datalist[i])
          }
        } else {
          alert(res.message)
        }
      })
      return rsTable.datalist
    }
    // 通过配置Code列表 获取多个配置信息列表（包括配置的基本信息和配置的结果列表信息）
    Vue.prototype.getconfigs = function(data) {
      const rsTable = {
        datalist: [],
        headers: [] }
      request({
        url: SPDAPIURL.OSAPIUrl + 'api/SysConfig/GetConfigByCodes',
        method: 'post',
        data
      }).then(res => {
        if (res.code === 1) {
          var datalist = res.result
          for (var i = 0; i < datalist.length; i++) {
            rsTable.headers.push(datalist[i])
          }
        } else {
          alert(res.message)
        }
      })
      return rsTable.headers
    }
    // 通过页面配置对象名获取页面的标题列表
    Vue.prototype.gettableheaders = function(data) {
      var brsTable = {
        datalist: [],
        headers: [] }

      request({
        url: SPDAPIURL.OSAPIUrl + 'api/Tsystem/GetPageConfigResultByObjectName?pagename=' + data,
        method: 'post',
        data
      }).then(res => {
        if (res.code === 1) {
          var datalist = res.result.details
          for (var i = 0; i < datalist.length; i++) {
            brsTable.headers.push(datalist[i])
          }
        } else {
          alert(res.message)
        }
      })

      return brsTable.headers
    }
    Vue.prototype.consolelog = function(data) {
      console.log(data)
    }
    // 通过配置对象名获取配置页面的信息及配置页面列表标题的信息（返回数据包括配置页面信息和配置页面标题列表信息）
    Vue.prototype.getpagetableheader = function(data) {
      const result = {}
      this.consolelog('====================getpagetableheader start=================================')
      request({
        url: SPDAPIURL.OSAPIUrl + 'api/Tsystem/GetPageConfigResultByObjectName?pagename=' + data,
        method: 'post',
        data
      }).then(res => {
        if (res.code === 1) {
          for (var key in res.result) {
            if (Array.isArray(res.result[key])) {
              var obj = res.result[key]
              for (var i = 0; i < obj.length; i++) {
                result[key].push(obj[i])
              }
            } else {
              result[key] = res.result[key]
            }
          }
        } else {
          alert(res.message)
        }
      })
      return result
    }
    // 获取页面多个对象的配置信息（多个列表和多个对象的配置信息的获取）通过配置Code获取配置列表
    Vue.prototype.getpagemutipletableheaders = function(data) {
      const rsTable = {
        datalist: [],
        headers: [] }
      request({
        url: SPDAPIURL.OSAPIUrl + 'api/Tsystem/GetPageConfigList?pagename=' + data,
        method: 'post',
        data
      }).then(res => {
        if (res.code === 1) {
          var datalist = res.result
          for (var i = 0; i < datalist.length; i++) {
            this.consolelog(datalist[i])
            rsTable.datalist.push(datalist[i])
          }
        } else {
          alert(res.message)
        }
      })
      return rsTable.datalist
    }
  }

}
