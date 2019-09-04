
const rules = {
  // 设置验证
  setRules(verify) {
    var rulesArr = []
    var rulesObj = {}
    if (verify.required) {
      rulesObj['required'] = verify.required
      rulesObj['message'] = verify.msg
      rulesObj['trigger'] = 'change'
      rulesArr.push(rulesObj)
    }
    if (verify.min && verify.max) {
      rulesObj = {}
      rulesObj['min'] = parseInt(verify.min)
      rulesObj['max'] = parseInt(verify.max)
      rulesObj['message'] = '最小为' + verify.min + '最大为' + verify.max
      rulesObj['trigger'] = 'change'
      rulesArr.push(rulesObj)
    }
    return rulesArr
  },
  // 创建验证对象
  createRules(arr) {
    var that = this
    var rules = {}
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].verify) {
        rules[arr[i].english] = that.setRules(arr[i].verify)
      }
    }
    return rules
  }
}

export default rules
