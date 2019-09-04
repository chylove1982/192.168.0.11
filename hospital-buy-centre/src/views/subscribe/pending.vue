<template>
  <div class="app-container">
    <search-time>
      <div v-for="(item,index) in type_select" slot="fl" class="type_select">
        <div class="type_row">
          <div class="heard">{{ item.heard }}</div>
          <div class="detail">
            <el-button v-for="(btn,index2) in selectArr" :class="{current : btn.selected}" type="primary" size="mini" plain @click="selectCurrent(index,index2)">{{ btn.configname }}</el-button>
          </div>
        </div>
      </div>
    </search-time>

    <super-table class="tableSpace" :table="datalist" :tableface="headers" :config="config" @controlFun="controlFun" />
    <!--分页-->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.pageIndex"
      :limit.sync="listQuery.pageSize"
      @pagination="datalist"
    />
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="1163px"
    >
      <!--分步器-->
      <steps :steps="steps" :cur-step="curStep" :w="803" />
      <!--订单概况-->
      <h3 class="title_line">订单概况</h3>
      <form-com :formface="basicInfoface.details" :config="basicInfoConfig" :form="basicInfo.heard" />

      <!--产品明细-->
      <h3 class="title_line">产品明细</h3>
      <super-table style="margin-bottom: 10px" class="tableSpace" :table="basicInfo.details" :tableface="basicInfoMxface.details" :config="basicInfoMxConfig" @controlFun="controlFun" />
      <form-com :formface="basicInfoBzface.details" :config="basicInfoBzConfig" :form="basicInfo.heard" />

      <!--&lt;!&ndash;审核意见&ndash;&gt;-->
      <!--<h3 class="title_line">审核意见</h3>-->
      <!--<form-com :formface="basicInfoShface" :config="basicInfoShConfig" :form="basicInfo.heard" />-->

      <!--采购回复-->
      <h3 class="title_line">采购回复</h3>
      <form-com :formface="basicInfoHfface.details" :config="basicInfoHfConfig" :form="basicInfo.heard" />

      <div style="text-align: center">
        <el-button type="primary" size="mini" @click="submitFun">确认回复</el-button>
        <el-button type="warning" size="mini" v-on="recheck">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      current: 0,
      selectArr: [{ name: '批量采购', type: 'primary' }],
      datalist: [],
      headers: [], // 控制弹窗
      type_select: [],
      tableface: [],
      config: { // 前端定义
        height: 'calc(100vh - 350px)',
        table: [
          { index: '0', width: '200', align: 'left' },
          { index: '1', width: '120', align: 'left' },
          { index: '2', width: '120', align: 'left' },
          { index: '3', width: '120', align: 'left' },
          { index: '4', width: '120', align: 'left' },
          { index: '5', width: '120', align: 'left' },
          { index: '6', width: '120', align: 'left' },
          { index: '7', width: '120', align: 'center' }
        ],
        tableBtns: [{ name: '采购回复', type: 'add', apiurl: 'api/Spdrequisitionorder/GetRequisitionOrderMasterSaveByID' }, { name: '回复详情', type: 'add', apiurl: 'api/Spdrequisitionorder/GetRequisitionOrderMasterSaveByID' }]
      }, // 控制列表加载动画化
      listQuery: { // 查询条件
        pageSize: 10,
        pageIndex: 1,
        searchTxt: '',
        sidx: ''
      },
      total: 12, // 总分页数
      switchDialogCon: '',
      footbtns: '', // 控制弹窗内按钮（接单/拒接/关闭交易）

      listLoading: true,
      dialogTitle: '弹窗标题', // 控制弹窗
      downloadLoading: false, // 控制下拉加载状态
      dialogVisible: false,
      basicInfo: {},
      basicInfoConfig: {
        labelWidth: '150px',
        labelPosition: 'right',
        form: [
          { index: '0', className: 'info' },
          { index: '1', className: 'info' },
          { index: '2', className: 'info' },
          { index: '3', className: 'info' },
          { index: '4', className: 'infoRow' },
          { index: '5', className: 'infoRow' }
        ]
      },

      basicInfoShface: [],
      basicInfoSh: [],
      basicInfoShConfig: {
        labelWidth: '150px',
        labelPosition: 'right',
        form: [
          { index: '0', className: 'info' },
          { index: '1', className: 'info' },
          { index: '2', className: 'info' },
          { index: '3', className: 'info' },
          { index: '4', className: 'infoRow' },
          { index: '5', className: 'infoRow' }
        ]
      },
      basicInfoQs: [],
      basicInfoHfConfig: {
        labelWidth: '150px',
        labelPosition: 'right',
        form: [
          { index: '0', className: 'info' },
          { index: '1', className: 'info' },
          { index: '2', className: 'info' },
          { index: '3', className: 'info' },
          { index: '4', className: 'infoRow' },
          { index: '5', className: 'infoRow' }
        ]
      },
      basicInfoMx: [],
      basicInfoMxConfig: {
        labelWidth: '150px',
        labelPosition: 'right',
        form: [
          { index: '0', className: 'info' },
          { index: '1', className: 'info' },
          { index: '2', className: 'info' },
          { index: '3', className: 'info' },
          { index: '4', className: 'infoRow' },
          { index: '5', className: 'infoRow' }
        ]
      },
      basicInfoBz: [],
      basicInfoBzConfig: {
        labelWidth: '150px',
        labelPosition: 'right',
        form: [
          { index: '0', className: 'info' },
          { index: '1', className: 'info' },
          { index: '2', className: 'info' },
          { index: '3', className: 'info' },
          { index: '4', className: 'infoRow' },
          { index: '5', className: 'infoRow' }
        ]
      },
      //   联调数据
      curStep: 1, // 后端字段，当前所在
      steps: [ // 前端定义
        { curUrl: require('@/icons/image/process/shopping_cart_red.png'), noCurUrl: require('@/icons/image/process/shopping_cart.png'), stepDot: 0, stepName: '客户下单' },
        { curUrl: require('@/icons/image/process/order_red.png'), noCurUrl: require('@/icons/image/process/order.png'), stepDot: 1, stepName: '接单' },
        { curUrl: require('@/icons/image/process/deliver_goods_red.png'), noCurUrl: require('@/icons/image/process/deliver_goods.png'), stepDot: 2, stepName: '发货' },
        { curUrl: require('@/icons/image/process/transportation_red.png'), noCurUrl: require('@/icons/image/process/transportation.png'), stepDot: 3, stepName: '运输' },
        { curUrl: require('@/icons/image/process/signIn_red.png'), noCurUrl: require('@/icons/image/process/signIn.png'), stepDot: 4, stepName: '签收' },
        { curUrl: require('@/icons/image/process/balance_red.png'), noCurUrl: require('@/icons/image/process/balance.png'), stepDot: 5, stepName: '结算' },
        { curUrl: require('@/icons/image/process/close_red.png'), noCurUrl: require('@/icons/image/process/close.png'), stepDot: 6, stepName: '关闭' }
      ],
      basicInfoface: {}, // 订单概况
      basicInfoHfface: {}, // 采购回复
      basicInfoBzface: {}, // 备注说明
      basicInfoMxface: {} // 产品明细
    }
  },

  created() {
    // 获取配置信息
    this.getConfigInfo()
    this.getList()
  },
  methods: {
    // 确认回复
    async submitFun() {
      const id = this.basicInfo.heard.id
      const data = {
        expectedreturntime: this.basicInfo.heard.expectedreturntime,
        replytothat: this.basicInfo.heard.replytothat,
        replier: this.basicInfo.heard.replier,
        replytime: this.basicInfo.heard.replytime
      }
      await this.$Api.post('api/Spdrequisitionorder/RequisitionOrderReply', data)
      this.$message.success('回复成功')
    },
    // 获取配置信息
    async getConfigInfo() {
      this.basicInfoface = await this.$Api.gettableheaders('GetRequisitionOrderMasterSaveByID') // 订单概况
      // this.basicInfoShface = await this.$Api.gettableheaders('GetRequisitionOrderMasterSaveByIDSh')
      this.basicInfoHfface = await this.$Api.gettableheaders('GetRequisitionOrderMasterSaveByIDHf') // 采购回复
      this.basicInfoMxface = await this.$Api.gettableheaders('GetRequisitionOrderMasterSaveByIDMx') // 产品明细
      this.basicInfoBzface = await this.$Api.gettableheaders('GetRequisitionOrderMasterSaveByIDBz') // 备注说明
    },
    //  获取当前选中
    selectCurrent(index, index2) {
      var arr = this.type_select[index].type_btns
      var i
      for (i in arr) {
        arr[i].selected = false
      }
      this.type_select[index].type_btns[index2].selected = true
    },
    getList() {
      var dt = this.gettable('RequisitionOrderGetList', this.listQuery)
      this.datalist = dt.datalist
      this.headers = dt.headers
    },
    //  选择筛选条件
    selectTerm(e) {
      this.current = e
      this.pageParam.type = e
    },
    // 列表操作方法
    async controlFun(e, r) {
      console.log('r.id', r.id)
      this.basicInfo = await this.$Api.getformdata(this.config.tableBtns[e], r)
      console.log('this.basicInfo', this.basicInfo)
      this.dialogTitle = this.config.tableBtns[e].name
      this.dialogVisible = true
      this.footbtns = e
      // this.changeRedactState(false)
    }, handleCurrentChange(val) {
      this.listQuery.pageIndex = val
      this.getList()
    }, handleFilter() {
      this.listQuery.pageIndex = 1
      console.log('this.listQuery', this.listQuery)
      this.getList()
    }, handleClick() {
      console.info(123)
    }
  }
}
</script>

<style scoped lang="stylus">
  .type_select{
    .type_row{
      display: flex;
      padding: 4px 0px;
      .type_name{
        width: 130px;
        line-height: 30px;
        margin-right: 20px;
        text-align: right;
      }
      .type_btns{
        flex: 1;
      }
    }
  }
  .app-container{
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

