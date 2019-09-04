<template>
  <div class="app-container">
    <search-time>
      <span v-if="selectArr.length>0" slot="CRUD-btn" class="CRUD-btn">
        <el-button v-for="(item,index) in selectArr" :key="index" class="selectbtn" size="small" :type="item.type" @click="addDelFun(index)">{{ item.name }}</el-button>
      </span>
    </search-time>

    <super-table class="tableSpace" :table="datalist" :tableface="headers" :config="config" @controlFun="controlFun" @getSelect="getSelect" />
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
      <div>
        <!--分步器-->
        <steps :steps="steps" :cur-step="curStep" :w="546" />
        <!--订单概况-->
        <h3 class="title_line">订单概况</h3>
        <form-com :formface="orderGeneral_fc.details" :form="subscribe.heard" />
        <!--产品明细-->
        <h3 class="title_line">
          产品明细
          <div class="fr">
            <el-button type="primary" size="mini">一键补货</el-button>
            <el-button type="primary" size="mini" @click="addRow">新增一行</el-button>
          </div>
        </h3>
        <super-table class="tableSpace" :table="subscribe.details" :tableface="proList_fc.details" :config="basicInfoMxConfig" @controlFun="controlFun" @onBlur="onBlur" />
        <br><br>
        <form-com :formface="remarkFace.details" :form="subscribe.heard" />
        <template v-if="switchDialogCon==='tab2'|| switchDialogCon==='tab1'">
          <!--审核意见-->
          <h3 class="title_line">审核意见</h3>
          <form-com :formface="audit_opinion_fc.details" :form="subscribe.heard" />
          <!--采购回复-->
          <h3 class="title_line">采购回复</h3>
          <form-com :formface="purchasing_reply_fc.details" :form="subscribe.heard" />
        </template>
      </div>
      <el-dialog
        :title="innerTitle"
        :visible.sync="innerVisible"
        width="80%"
        append-to-body
      >
        <!--产品对象-->
        <form-com :formface="proList_fc.details" :form="purchase_pro" />
        <div slot="footer">
          <el-button size="mini" type="primary" @click="submit">确定</el-button>
          <el-button size="mini" type="danger">取消</el-button>
        </div>
      </el-dialog>
      <div style="text-align: center">
        <el-button type="primary" size="mini" @click="submit">确定</el-button>
        <el-button type="warning" size="mini" @click="dialogVisible = false">取消</el-button>
      </div>
      <!--<div slot="foot-btn"><el-button size="mini" type="primary">确定</el-button><el-button size="mini" type="danger">取消</el-button></div>-->
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      current: 0,
      // selectArr: ['今日', '本周', '本月', '本季'],
      datalist: [],
      headers: [], // 控制弹窗
      type_select: [],
      selectTab: [], // 选中的数组
      selectArr: [ // 左上角按钮
        { name: '新增', type: 'primary' },
        { name: '修改', type: 'warning', apiurl: 'api/Spdrequisitionorder/GetRequisitionOrderMasterSaveByID' },
        { name: '删除', type: 'danger', apiurl: 'api/Spdrequisitionorder/DeleteRequisitionOrderMasterSaveByID' }
      ],
      order: {},
      tableface: [],
      config: { // 前端定义
        height: 'calc(100vh - 350px)',
        labelWidth: '150px',
        labelPosition: 'right',
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
          { name: '修改订单', type: 'add', apiurl: 'api/Spdrequisitionorder/GetRequisitionOrderMasterSaveByID' },
          { name: '订单详情', type: 'add', apiurl: 'api/Spdrequisitionorder/GetRequisitionOrderMasterSaveByID' },
          { name: '采购进度', type: 'add', apiurl: 'api/Spdrequisitionorder/GetRequisitionOrderMasterSaveByID' },
          { name: '取消申购', type: 'add', apiurl: 'api/Spdrequisitionorder/GetRequisitionOrderMasterSaveByID' }
        ],
        sumArr: ['2']
      }, // 控制列表加载动画化
      listQuery: { // 查询条件
        searchTxt: '',
        pageIndex: 0,
        pageSize: 5,
        sidx: ''
      },
      total: 12, // 总分页数
      switchDialogCon: '',
      // footbtns: '', // 控制弹窗内按钮（接单/拒接/关闭交易）
      listLoading: true,
      dialogTitle: '弹窗标题', // 控制弹窗
      downloadLoading: false, // 控制下拉加载状态
      dialogVisible: false,
      basicInfoface: [],
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
      basicInfoHfface: [],
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
      basicInfoMxface: [],
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
      remarkConfig: {
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
      orderGeneralFrom: {}, // 订单概况from
      basicInfoxz: [],
      orderGeneralConfig: { // 订单概况配置
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
      proListFace: [], // 产品列表Face
      proListTable: [], // 产品列表Table
      basicInfoMxxz: [],
      proListConfig: { // 产品列表Config
        labelWidth: '150px',
        labelPosition: 'right',
        form: [
          { index: '0', className: 'info' },
          { index: '1', className: 'info' },
          { index: '2', className: 'info' },
          { index: '3', className: 'info' },
          { index: '4', className: 'infoRow' },
          { index: '5', className: 'infoRow' }
        ],
        sumArr: [2]
      },
      //   联调数据
      innerTitle: '', // 内弹窗标题
      innerVisible: false, // 控制内弹窗显示
      curStep: 1, // 后端字段，当前所在
      steps: [ // 前端定义
        { curUrl: require('@/icons/image/process/deliver_goods_red.png'), noCurUrl: require('@/icons/image/process/deliver_goods.png'), stepDot: 0, stepName: '发货' },
        { curUrl: require('@/icons/image/process/transportation_red.png'), noCurUrl: require('@/icons/image/process/transportation.png'), stepDot: 1, stepName: '运输' },
        { curUrl: require('@/icons/image/process/signIn_red.png'), noCurUrl: require('@/icons/image/process/signIn.png'), stepDot: 2, stepName: '签收' },
        { curUrl: require('@/icons/image/process/balance_red.png'), noCurUrl: require('@/icons/image/process/balance.png'), stepDot: 3, stepName: '结算' },
        { curUrl: require('@/icons/image/process/close_red.png'), noCurUrl: require('@/icons/image/process/close.png'), stepDot: 4, stepName: '关闭' }
      ],
      subscribe: {// 申购单对象
        heard: {},
        details: []
      },
      orderGeneral_fc: {}, // 订单概况face
      proList_fc: {}, // 产品明细fc
      audit_opinion_fc: {}, // 审核意见fc
      purchasing_reply_fc: {}, // 采购回复
      purchase_pro: {}, // 申购产品对象
      remarkFace: {} // 处理说明
    }
  },
  created() {
    // const tparam = 'DepartmentInfoGetList'// 修改此处参数；在配置表中的对象名
    // 获取配置信息
    this.getConfigInfo()
    this.getList()
  },
  methods: {
    onBlur(row) {
      this.$Api.post('api/Spdrequisitionlist/SpdRequisitionListEdit', row)
    },
    // 改变是否可编辑状态
    changeRedactState(t) {
      this.orderGeneral_fc.details.map(s => s.enabled = t)
      this.proList_fc.details.map(s => s.enabled = t)
      this.audit_opinion_fc.details.map(s => s.enabled = t)
      this.purchasing_reply_fc.details.map(s => s.enabled = t)
      this.remarkFace.details.map(s => s.enabled = t)
    },
    // 新增一行
    async addRow() {
      this.innerVisible = true
      this.innerTitle = '新增一行'
      this.switchDialogCon = 'addRow'
    },
    // 获取所有配置信息
    async getConfigInfo() {
      this.orderGeneral_fc = await this.$Api.gettableheaders('GetDeliverOrderMasterSaveByIDPsxqDdgk') // 订单概况face
      this.proList_fc = await this.$Api.gettableheaders('GetRequisitionOrderMasterSaveByIDMx') // 产品明细fc
      this.audit_opinion_fc = await this.$Api.gettableheaders('GetRequisitionOrderMasterSaveByIDSh') // 审核意见fc
      this.purchasing_reply_fc = await this.$Api.gettableheaders('GetRequisitionOrderMasterSaveByIDHf') // 采购回复fc
      this.remarkFace = await this.$Api.gettableheaders('GetRequisitionOrderMasterSaveByIDBz') // 处理说明
    },
    // 获取选中的table项
    getSelect(e) {
      console.log('e', e)
      this.selectTab = e
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
    // 增删改
    async addDelFun(e, r) {
      this.dialogTitle = this.selectArr[e].name
      this.switchDialogCon = 'addDelAlt' + e
      if (e === 0) {
        this.dialogVisible = true
        this.subscribe = {// 初始化申购单对象
          heard: {},
          details: []
        }
        this.changeRedactState(true)
      } else if (e === 1) {
        this.switchDialogCon = e
        if (this.selectTab.length === 1) {
          this.dialogTitle = '修改申购单'
          this.dialogVisible = true
          this.subscribe = await this.$Api.getformdata(this.selectArr[e], this.selectTab[0])
          this.changeRedactState(true)
          console.log('this.subscribe', this.subscribe)
        } else {
          this.$message.error('只能选择一个修改')
        }
      } else if (e === 2) {
        if (this.selectTab.length < 1) {
          this.$message.error('至少选择一个删除')
        } else {
          const arr = []
          this.selectTab.map(s => arr.push(s.id))
          for (var i in arr) {
            await this.$Api.post(this.selectArr[e].apiurl, { id: arr[i] })
          }
          this.$message.success('删除成功')
          this.getList()
        }
      }
    },
    // 列表操作方法
    async controlFun(e, r) {
      this.subscribe = await this.$Api.getformdata(this.config.tableBtns[e], r)
      console.log('this.subscribe', this.subscribe)
      // this.basicInfoface = this.gettableheaders('GetRequisitionOrderMasterSaveByID')
      // this.basicInfoShface = this.gettableheaders('GetRequisitionOrderMasterSaveByIDSh')
      // this.basicInfoHfface = this.gettableheaders('GetRequisitionOrderMasterSaveByIDHf')
      // this.proList_fc = this.gettableheaders('GetRequisitionOrderMasterSaveByIDMx')
      // this.orderGeneral_fc = this.gettableheaders('GetRequisitionOrderMasterSaveByID')
      // this.proListFace = this.gettableheaders('GetRequisitionOrderMasterSaveByIDMx')
      this.dialogTitle = this.config.tableBtns[e].name
      this.dialogVisible = true
      this.switchDialogCon = 'tab' + e
      this.changeRedactState(false)
      if (e === 0) {
        this.changeRedactState(true)
      } else if (e === 3) {
        console.log(3)
        console.log('this.remarkFace.details', this.remarkFace.details)
        this.remarkFace.details.map(s => s.enabled = true)
      }
      // this.footbtns = e
      // this.changeRedactState(false)
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
    },
    // 提交
    async submit() {
      if (this.switchDialogCon === 'addRow') {
        console.log('this.purchase_pro', this.purchase_pro)
        this.subscribe.details.push(this.purchase_pro)
        this.innerVisible = false
        console.log('this.subscribe.details', this.subscribe.details)
        this.switchDialogCon = 'addDelAlt0'
      } else if (this.switchDialogCon === 'addDelAlt0') {
        console.log('this.subscribe', this.subscribe)
        const data = this.subscribe.heard
        data.details = this.subscribe.details
        console.log('data', data)
        await this.$Api.post('api/Spdrequisitionorder/AddRequisitionOrderMasterSave', data)
        this.$message.success('添加成功')
        this.dialogVisible = false
        this.getList()
      } else if (this.switchDialogCon === 'addDelAlt1') {
        console.log('this.subscribe', this.subscribe)
        const data = this.subscribe.heard
        data.details = this.subscribe.details
        console.log('data', data)
        await this.$Api.post('api/Spdrequisitionorder/AddRequisitionOrderMasterSave', data)
        this.$message.success('修改成功')
        this.dialogVisible = false
        this.getList()
      }
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

