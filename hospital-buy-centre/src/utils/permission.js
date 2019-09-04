import store from '@/store'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  console.log('====== checkPermission ======')
  if (value) {
    const permissions = store.getters && store.getters.permissions

    const hasPermission = permissions.includes(value)

    console.log(hasPermission)
    return hasPermission
  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`)
    return false
  }
}
