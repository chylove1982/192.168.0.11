import SuperTitle from '@/components/Title/super-title'
import SuperTable from '@/components/Table/super-table'
import SuperSearch from '@/components/HeaderSearch/super-search'
import SearchTime from '@/components/HeaderSearch/search-time'
import FormCom from '@/components/Form/formCom'
import VerticalDialog from '@/components/Dialog/verticalDialog'
import Pagination from '@/components/Pagination'
import Steps from '@/components/Steps/Steps'
import DailyDialog from '@/components/Dialog/dailyDialog'
import OrderBoard from '@/components/OrderBoard/OrderBoard'

// 组件安装
function vComponent(Vue) {
  // 组件是否已安装
  if (vComponent.installed) {
    return
  }
  Vue.component(SuperTitle.name, SuperTitle)
  Vue.component(SuperTable.name, SuperTable)
  Vue.component(SearchTime.name, SearchTime)
  Vue.component(FormCom.name, FormCom)
  Vue.component(VerticalDialog.name, VerticalDialog)
  Vue.component(Pagination.name, Pagination)
  Vue.component(Steps.name, Steps)
  Vue.component(DailyDialog.name, DailyDialog)
  Vue.component(OrderBoard.name, OrderBoard)
  Vue.component(SuperSearch.name, SuperSearch)
}
// 导出组件
export default vComponent
