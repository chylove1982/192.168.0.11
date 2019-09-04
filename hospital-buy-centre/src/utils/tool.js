const toolApi = {
//  获取当前时间
  getTime() {
    var myDate = new Date()
    myDate.getTime()
  },
  // 得到form对象
  getForm(arr) {
    console.log(arr)
    var form = {}
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].lableType === 'checkbox') {
        form[arr[i].english] = []
      } else if (arr[i].lableType === 'switch') {
        form[arr[i].english] = false
      } else {
        form[arr[i].english] = ''
      }
    }
    console.log('form2', form)
    return form
  }
}

export default toolApi

