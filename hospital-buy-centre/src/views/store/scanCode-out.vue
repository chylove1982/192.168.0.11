<template>
  <div class="app-container container">
    <div class="comCon">
      <div class="info header">
        <span class="label">请扫码</span>
        <el-input></el-input>
      </div>
    </div>
    <!--扫描信息-->
    <template v-if="form.sata !== 1">
      <h3 class="title_line">扫描信息</h3>
      <form-com :formface="scanInfoface" :config="scanInfofaceConfig" :form="form" />
    </template>
    <!--运单信息-->
    <h3 class="title_line">运单信息</h3>
    <form-com :formface="waybillInfoface" :config="waybillInfoConfig" :form="form" />
    <!--产品配送信息-->
    <h3 class="title_line">
      产品配送信息
    </h3>
    <super-table :table="proDistributionInfo" :tableface="proDistributionInfoFace" :config="proDistributionInfoConfig" @lookInfo="popDetails" @getSelect="getSelect" />
    <!--确认按钮-->
    <div style="text-align: center; margin-top: 20px;">
      <el-button type="primary" size="mini">提交</el-button>
      <el-button type="danger" size="mini">取消</el-button>
    </div>
  </div>
</template>

<script>
  import scanCodeOutApi from '@/api/store/scanCode-out'
  export default {
    data() {
      return {
        form: {}, // 获取的返回数据
        switchSubmit: '',
        activeName: 'first',
        // corporatename
        companyInfo: {
          companyName: '南京深普瑞生物科技有限公司',
          subtitle: '(申请单号：201950105100)'
        },
        //  扫描信息
        scanInfoface: [
          { english: 'auditTime', chinese: '审核时间', lableType: 'input', disabled: false },
          { english: 'auditOpinion', chinese: '审核意见', lableType: 'textarea', disabled: false }
        ],
        scanInfofaceConfig: {
          labelWidth: '150px',
          labelPosition: 'right',
          form: [
            { index: '0', className: 'info' },
            { index: '1', className: 'info' },
            { index: '2', className: 'info' },
            { index: '3', className: 'info' },
            { index: '4', className: 'info' },
            { index: '5', className: 'info' },
            { index: '6', className: 'info' },
            { index: '7', className: 'info' }
          ]
        },
        // 运单信息
        waybillInfoface: [
          { english: 'companyName', chinese: '公司名称', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '公司名称必填' }},
          { english: 'suppliertype', chinese: '供应商类型', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '供应商类型必填' }},
          { english: 'contacts', chinese: '联系人姓名', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '公司名称必填' }},
          { english: 'location', chinese: '所在地区', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '供应商类型必填' }},
          { english: 'mobile', chinese: '联系电话', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '公司名称必填' }},
          { english: 'registrationaddress', chinese: '注册地址', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '供应商类型必填' }},
          { english: 'enterpriseemail', chinese: '企业Email', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '公司名称必填' }},
          { english: 'legalperson', chinese: '法定代表人', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '供应商类型必填' }},
          { english: 'enterprisemobile', chinese: '企业电话', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '公司名称必填' }},
          { english: 'legalpersonmobile', chinese: '法人电话', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '供应商类型必填' }},
          { english: 'enterprisewebsite', chinese: '企业网址', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '公司名称必填' }},
          { english: 'invoicecode', chinese: '发票代码', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '供应商类型必填' }}
        ],
        waybillInfoConfig: {
          labelWidth: '150px',
          labelPosition: 'right',
          form: [
            { index: '0', className: 'info' },
            { index: '1', className: 'info' },
            { index: '2', className: 'info' },
            { index: '3', className: 'info' },
            { index: '4', className: 'info' },
            { index: '5', className: 'info' },
            { index: '6', className: 'info' },
            { index: '7', className: 'info' },
            { index: '8', className: 'info' },
            { index: '9', className: 'info' },
            { index: '10', className: 'info' },
            { index: '11', className: 'info' }
          ]
        },
        // 产品配送信息
        proDistributionInfo: [],
        proDistributionInfoFace: [ // 表格显示数据 后端传
          { chinese: '科室代号', english: 'departmentcode', disabled: true },
          { chinese: '科室名称', english: 'departmentname', disabled: true },
          { chinese: '所属部门', english: 'affiliatedfunction', disabled: true },
          { chinese: '专科类别', english: 'zkcategory', disabled: true },
          { chinese: '负责人', english: 'principal', disabled: true },
          { chinese: '负责人联系电话', english: 'principatelephone', disabled: true },
          { chinese: '仓库地址', english: 'warehouseaddress', disabled: true }
        ],
        proDistributionInfoConfig: { // 前端定义
          height: 'calc(100vh - 350px)',
          table: [
            { index: '0', width: '200', align: 'left' },
            { index: '1', width: '120', align: 'left' },
            { index: '2', width: '120', align: 'left' },
            { index: '3', align: 'left' },
            { index: '4', align: 'left' },
            { index: '5', align: 'left' },
            { index: '6', align: 'left' },
          ]
        }
      }
    },
    created() {
      this.getInfo()
    },
    methods: {
      //  弹出详情
      popDetails(row){

      },
      // 获取选中的数据
      getSelect(e){
        this.selects = e
        console.log(e)
      },
      //  获取用于显示的form
      getInfo() {
        const spduserinfoid = '24e9d4da-5546-4a0b-b484-9b2791f4da7b'
        this.switchSubmit = 0 // 0 是保存 1是修改
        scanCodeOutApi.getInfo({ 'spduserinfoid': spduserinfoid }).then(response => {
          const { code, msg, result } = response
          if (code === 1) {
            this.$message.success('成功')
          } else {
            this.$message.error(msg)
          }
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      },
      // 修改信息
      updateInfo() {
        scanCodeOutApi.updateInfo(this.form).then(response => {
          const { code, msg } = response
          if (code === 1) {
            this.$message.success('提交成功')
          } else {
            this.$message.error(msg)
          }
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      },
      // 切换
      handleClick() {
        console.log('切换')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .app-container{
    background-color : #ffffff;
    .header{
      display : flex
      .label{
        display inline-block
        width 150px
        text-align right
        padding-right 12px
        line-height 36px
        vertical-align: middle;
        float: left;
        font-size: 14px;
        color: #606266;
        font-weight: 700;
      }
      .el-input{
        flex 1
      }
    }
    .small_title{
      font-weight : 700;
      font-size : 15px;
      padding : 0px 20px;
      .circle{
        display: inline-block;
        border: 1px solid #cccccc;
        width: 20px;
        height : 20px;
        border-radius : 100%;
        margin-right: 10px;
        line-height : 20px;
        text-align : center;
        margin-bottom : 10px;
      }
    }
  }
</style>
