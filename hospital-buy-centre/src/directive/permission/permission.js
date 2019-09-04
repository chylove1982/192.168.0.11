import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding

    const permissions = store.getters && store.getters.permissions

    if (value) {
      const hasPermission = permissions.includes(value)

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}
