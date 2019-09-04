<template>
  <div class="app-container">
    <search-time>
      <div v-for="(item,index) in type_select" slot="fl" class="type_select">
        <div class="type_row">
          <div class="heard">{{ item.heard }}</div>
          <div class="detail">
            <el-button v-for="(btn,index2) in item.detail" :class="{current : btn.selected}" type="primary" size="mini" plain @click="selectCurrent(index,index2)">{{ btn.configname }}</el-button>
          </div>
        </div>
      </div>
    </search-time>

    <super-table class="tableSpace" :table="datalist" :tableface="headers" :config="config" @controlFun="controlFun" />
    <!--分页-->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery['PageIndex']"
      :limit.sync="listQuery['PageSize']"
      @pagination="datalist"
    />
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="1163px"
    >
      <!--审核的弹窗-->
      <div>
        <!--分步器-->
        <steps :steps="steps" :cur-step="curStep" :w="803" />
        <!--订单概况-->
        <h3 class="title_line">订单概况</h3>
        <form-com :formface="orderGeneral_fc.details" :form="basicInfo.heard" />

        <!--产品明细-->
        <h3 class="title_line">产品明细</h3>
        <super-table class="tableSpace" :table="basicInfo.details" :tableface="basicInfoMxface.details" :config="basicInfoMxConfig" @controlFun="controlFun" />

        <br><br>
        <!--处理说明-->
        <form-com :formface="basicInfoBzface.details" :config="basicInfoBzConfig" :form="basicInfo.heard" />

        <!--审核意见-->
        <h3 class="title_line">审核意见</h3>
        <form-com :formface="basicInfoShyjface.details" :config="basicInfoShyjConfig" :form="basicInfo.heard" />

        <div v-if="switchDialogCon === 'tab1'" style="text-align: center">
          <!--<el-button type="primary" size="mini" @click="submit">审核通过</el-button>-->
          <!--<el-button type="warning" size="mini" @click="submit">驳回</el-button>-->
          <!--<el-button type="danger" size="mini" @click="submit">审核不通过</el-button>-->
          <el-button v-for="(btn,index) in footBtn" :key="index" size="mini" :type="btn.type" @click="submit(index)">{{ btn.name }}</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      current: 0,
      selectArr: ['今日', '本周', '本月', '本季'],
      curStep: 0, // 后端字段，当前所在
      steps: [ // 前端定义
        { curUrl: require('@/icons/image/process/shopping_cart_red.png'), noCurUrl: require('@/icons/image/process/shopping_cart.png'), stepDot: 0, stepName: '客户下单' },
        { curUrl: require('@/icons/image/process/order_red.png'), noCurUrl: require('@/icons/image/process/order.png'), stepDot: 1, stepName: '接单' },
        { curUrl: require('@/icons/image/process/deliver_goods_red.png'), noCurUrl: require('@/icons/image/process/deliver_goods.png'), stepDot: 2, stepName: '发货' },
        { curUrl: require('@/icons/image/process/transportation_red.png'), noCurUrl: require('@/icons/image/process/transportation.png'), stepDot: 3, stepName: '运输' },
        { curUrl: require('@/icons/image/process/signIn_red.png'), noCurUrl: require('@/icons/image/process/signIn.png'), stepDot: 4, stepName: '签收' },
        { curUrl: require('@/icons/image/process/balance_red.png'), noCurUrl: require('@/icons/image/process/balance.png'), stepDot: 5, stepName: '结算' },
        { curUrl: require('@/icons/image/process/close_red.png'), noCurUrl: require('@/icons/image/process/close.png'), stepDot: 6, stepName: '关闭' }
      ],
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
        tableBtns: [
          { name: '订单详情', type: 'add', apiurl: 'api/Spdrequisitionorder/GetRequisitionOrderMasterSaveByID' },
          { name: '审核', type: 'add', apiurl: 'api/Spdrequisitionorder/GetRequisitionOrderMasterSaveByID' },
          { name: '采购进度', type: 'add', apiurl: 'api/Spdrequisitionorder/GetRequisitionOrderMasterSaveByID' }
        ]
      }, // 控制列表加载动画化
      listQuery: { // 查询条件
        PageSize: 5,
        PageIndex: 1,
        SearchTxt: ''
      },
      total: 12, // 总分页数
      switchDialogCon: '',
      footbtns: '', // 控制弹窗内按钮（接单/拒接/关闭交易）
      listLoading: true,
      dialogTitle: '弹窗标题', // 控制弹窗
      downloadLoading: false, // 控制下拉加载状态
      dialogVisible: false,
      basicInfo: [],
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

      // basicInfoShface: {},
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

      // basicInfoHfface: {},
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
      basicInfoShyj: [],
      basicInfoShyjConfig: {
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
      //  联调数据
      orderGeneral_fc: {}, // 订单概况
      basicInfoMxface: {}, // 产品明细
      basicInfoBzface: {}, // 处理说明
      basicInfoShyjface: {}, // 审核意见
      footBtn: [
        { name: '审核通过', type: 'primary', apiurl: 'api/Spdrequisitionorder/AuditPassRequisitionOrder' },
        { name: '驳回', type: 'warning', apiurl: 'api/Spdrequisitionorder/TurnDownRequisitionOrder' },
        { name: '审核不通过', type: 'danger', apiurl: 'api/Spdrequisitionorder/AuditNoPassRequisitionOrder' }
      ]
    }
  },

  created() {
    // const tparam = 'DepartmentInfoGetList'// 修改此处参数；在配置表中的对象名
    // 获取配置信息
    this.getConfigInfo()
    this.getList()
  },
  methods: {
    async submit(e) {
      var data = {
        id: this.basicInfo.heard.id,
        descr: this.basicInfo.heard.auditopinion
      }
      await this.$Api.post(this.footBtn[e].apiurl, data)
      this.dialogVisible = false
      this.$message.success('提交审核成功')
    },
    // 改变是否可编辑状态
    changeRedactState(t) {
      this.orderGeneral_fc.details.map(s => s.enabled = t) // 订单概况
      this.basicInfoMxface.details.map(s => s.enabled = t) // 产品明细
      this.basicInfoBzface.details.map(s => s.enabled = t) // 处理说明
      this.basicInfoShyjface.details.map(s => s.enabled = t) // 审核意见
    },
    // 获取所有配置信息
    async getConfigInfo() {
      this.orderGeneral_fc = await this.$Api.gettableheaders('GetRequisitionOrderMasterSaveByID') // 订单概况
      // this.basicInfoShface = await this.$Api.gettableheaders('GetRequisitionOrderMasterSaveByIDSh')
      // this.basicInfoHfface = await this.$Api.gettableheaders('GetRequisitionOrderMasterSaveByIDHf')
      this.basicInfoMxface = await this.$Api.gettableheaders('GetRequisitionOrderMasterSaveByIDMx') // 产品明细
      this.basicInfoBzface = await this.$Api.gettableheaders('GetRequisitionOrderMasterSaveByIDBz') // 处理说明
      this.basicInfoShyjface = await this.$Api.gettableheaders('GetRequisitionOrderMasterSaveByIDShyj') // 审核意见
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
      this.basicInfo = await this.$Api.getformdata(this.config.tableBtns[e], r)
      this.dialogTitle = this.config.tableBtns[e].name
      this.dialogVisible = true
      this.switchDialogCon = 'tab' + e
      this.changeRedactState(false)
      if (e === 1) {
        this.basicInfoShyjface.details.map(s => s.enabled = true) // 审核意见
      }
    },
    handleCurrentChange(val) {
      this.listQuery['PageIndex'] = val
      this.getList()
    },
    handleFilter() {
      this.listQuery['PageIndex'] = 1
      console.log('this.listQuery', this.listQuery)
      this.getList()
    },
    handleClick() {
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

