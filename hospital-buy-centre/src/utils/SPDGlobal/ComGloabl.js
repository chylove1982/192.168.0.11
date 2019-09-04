/**
 * 枚举类
 */
export class Enum {
  /**
     * 添加枚举字段
     * field: 枚举字段
     * label: 界面显示
     * value: 枚举值
     */
  add(field, label, value) {
    this[field] = { label, value }
    return this
  }

  /**
     * 根据枚举value获取其label
     */
  getLabelByValue(value) {
    // 字段不存在返回‘’
    if (value === undefined || value === null) {
      return ''
    }
    for (const i in this) {
      const e = this[i]
      if (e && e.value === value) {
        return e.label
      }
    }

    return ''
  }
}

const EnumHISOrder = new Enum().add('all', '全部', null).add('settle', '待落户', 0).add('settled', '已落户', 1).add('cancel', '已取消', 2)
export default {
  EnumHISOrder
}
