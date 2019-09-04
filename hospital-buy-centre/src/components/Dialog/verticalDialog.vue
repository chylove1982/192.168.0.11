<!--纵向显示的弹窗-->
<template>
  <div>
    <slot name="prepend" />
    <h3 class="title_line">订单信息</h3>
    <!--form表单-->
    <form-com :formface="formface" :config="config" :form="form" />
    <slot name="middle" />
    <!--table表格-->
    <h3 class="title_line">产品明细</h3>
    <super-table :table="table" :tableface="tableface" :config="config" />
    <slot name="append" />
  </div>
</template>

<script>
export default {
  name: 'VerticalDialog',
  props: {
    config: Object,
    formface: Array,
    form: Object,
    tableface: Array,
    table: Array,
    footbtns: String
  }
}
</script>

<style lang="stylus" scoped>

</style>
