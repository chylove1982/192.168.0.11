import { http } from 'nm-lib-utils'
const root = 'IDCard/IDCARD/'
const crud = http.crud(root)

export default {
  ...crud
}
