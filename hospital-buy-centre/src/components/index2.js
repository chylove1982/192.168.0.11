import SpdTable from '@/components/Table/spd-table'
import sformCom from '@/components/Form/sformCom'
// 组件安装
function vComponent(Vue) {
// 组件是否已安装
if (vComponent.installed) {
return
} 
Vue.component(sformCom.name, sformCom)
Vue.component(SpdTable.name, SpdTable)