<template>
  <div class="app-container">
    <search-time>
      <span v-if="selectArr.length>0" slot="left-btn">
        <el-button v-for="(item,index) in selectArr" :key="index" :class="{'current':current == index}" class="selectbtn" size="small" round @click="selectTerm(index)">{{ item }}</el-button>
      </span>
    </search-time>
    <super-table class="tableSpace" :table="pendingOrderList" :tableface="tableface" :config="config" @controlFun="controlFun" />
    <!--分页-->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery['Page.Index']"
      :limit.sync="listQuery['Page.Size']"
      @pagination="getList"
    />
    <!--e_char弹窗-->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="1163px"
    >
      <!--分步器-->
      <steps :steps="steps" :cur-step="curStep" :w="803" />
      <!--查看-->
      <daily-dialog :config="config2" :formface="orderface" :form="order" :tableface="subscribe" :table="orderDetailList" :footbtns="footbtns" @addRow="addRow" @edit="edit" @del="del" />
      <!--<order-add :config="config" :session="orderData" :tableface="subscribe" :table="orderDetailList" @addRow="addRow" @edit="edit" @del="del" />-->
    </el-dialog>
  </div>
</template>

<script>
// import pandingOrderApi from '@/api/base-maintain/panding-order'

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
      pendingOrderList: [ // 待处理订单列表 后端传
        { id: '1', orderID: '201905020023152666', name: '抗酸染色体、白蛋白、乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂', totalPrice: '120000000', requiredTime: '2019-9-7', consignee: '中心院材料库', state: 'sy', orderTime: '2019-9-7 19:30', linkman: '10', btns: [{ name: '接单/拒接', path: '/add' }, { name: '修改价格', path: '/alter' }, { name: '关闭交易', path: '/del' }] },
        { id: '2', orderID: '201905020023152667', name: '抗酸染色体、白蛋白、乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂', totalPrice: '120000000', requiredTime: '2019-9-7', consignee: '中心院材料库', state: 'sy', orderTime: '2019-9-7 19:30', linkman: '10', btns: [{ name: '接单/拒接', path: '/add' }, { name: '修改价格', path: '/alter' }, { name: '关闭交易', path: '/del' }] },
        { id: '3', orderID: '201905020023152668', name: '抗酸染色体、白蛋白、乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂', totalPrice: '120000000', requiredTime: '2019-9-7', consignee: '中心院材料库', state: 'sy', orderTime: '2019-9-7 19:30', linkman: '10', btns: [{ name: '接单/拒接', path: '/add' }, { name: '修改价格', path: '/alter' }, { name: '关闭交易', path: '/del' }] },
        { id: '4', orderID: '201905020023152669', name: '抗酸染色体、白蛋白、乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂', totalPrice: '120000000', requiredTime: '2019-9-7', consignee: '中心院材料库', state: 'sy', orderTime: '2019-9-7 19:30', linkman: '10', btns: [{ name: '接单/拒接', path: '/add' }, { name: '修改价格', path: '/alter' }, { name: '关闭交易', path: '/del' }] },
        { id: '5', orderID: '2019050200231526610', name: '抗酸染色体、白蛋白、乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂', totalPrice: '120000000', requiredTime: '2019-9-7', consignee: '中心院材料库', state: 'sy', orderTime: '2019-9-7 19:30', linkman: '10', btns: [{ name: '接单/拒接', path: '/add' }, { name: '修改价格', path: '/alter' }, { name: '关闭交易', path: '/del' }] },
        { id: '6', orderID: '201905020023152611', name: '抗酸染色体、白蛋白、乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂', totalPrice: '120000000', requiredTime: '2019-9-7', consignee: '中心院材料库', state: 'sy', orderTime: '2019-9-7 19:30', linkman: '10', btns: [{ name: '接单/拒接', path: '/add' }, { name: '修改价格', path: '/alter' }, { name: '关闭交易', path: '/del' }] },
        { id: '7', orderID: '201905020023152612', name: '抗酸染色体、白蛋白、乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂', totalPrice: '120000000', requiredTime: '2019-9-7', consignee: '中心院材料库', state: 'sy', orderTime: '2019-9-7 19:30', linkman: '10', btns: [{ name: '接单/拒接', path: '/add' }, { name: '修改价格', path: '/alter' }, { name: '关闭交易', path: '/del' }] },
        { id: '8', orderID: '201905020023152613', name: '抗酸染色体、白蛋白、乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂', totalPrice: '120000000', requiredTime: '2019-9-7', consignee: '中心院材料库', state: 'sy', orderTime: '2019-9-7 19:30', linkman: '10', btns: [{ name: '接单/拒接', path: '/add' }, { name: '修改价格', path: '/alter' }, { name: '关闭交易', path: '/del' }] },
        { id: '9', orderID: '201905020023152614', name: '抗酸染色体、白蛋白、乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂', totalPrice: '120000000', requiredTime: '2019-9-7', consignee: '中心院材料库', state: 'sy', orderTime: '2019-9-7 19:30', linkman: '10', btns: [{ name: '接单/拒接', path: '/add' }, { name: '修改价格', path: '/alter' }, { name: '关闭交易', path: '/del' }] },
        { id: '10', orderID: '201905020023152615', name: '抗酸染色体、白蛋白、乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂', totalPrice: '120000000', requiredTime: '2019-9-7', consignee: '中心院材料库', state: 'sy', orderTime: '2019-9-7 19:30', linkman: '10', btns: [{ name: '接单/拒接', path: '/add' }, { name: '修改价格', path: '/alter' }, { name: '关闭交易', path: '/del' }] }
      ],
      tableface: [ // 表格显示数据 后端传
        { chinese: '订单号', english: 'orderID', multi_fields: true, fieldsArr: ['orderID', 'name'], disabled: true },
        { chinese: '总价（元）', english: 'totalPrice', disabled: true },
        { chinese: '收货单位', english: 'consignee', disabled: true },
        { chinese: '要求送货时间', english: 'requiredTime', disabled: true },
        { chinese: '下单时间', english: 'orderTime', disabled: true },
        { chinese: '联系人', english: 'linkman', disabled: true },
        { chinese: '状态', english: 'state', disabled: true },
        { chinese: '操作', disabled: true }
      ],
      config: { // 前端定义
        height: 'calc(100vh - 350px)',
        table: [
          { index: '0', width: '200', align: 'left' },
          { index: '1', width: '120', align: 'left' },
          { index: '2', width: '120', align: 'left' },
          { index: '3', align: 'left' },
          { index: '4', align: 'left' },
          { index: '5', align: 'left' },
          { index: '6', align: 'left' },
          { index: '7', width: '120', align: 'center' }
        ]
      },
      total: 12, // 总分页数
      switchDialogCon: '',
      footbtns: '', // 控制弹窗内按钮（接单/拒接/关闭交易）
      // 通过id获取订单form对象,后端生成
      order: { id: '1', orderID: '201905020023152666', name: '抗酸染色体、白蛋白、乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂', totalPrice: '120000000', consignee: '中心院材料库', requiredTime: '2019-9-7', state: 'sy', orderTime: '2019-9-7 19:30', num: '10', btns: ['接单/拒接', '修改价格', '关闭交易'] },
      // orderData: [ // 订单form对象  后端传
      //   { english: 'affiliatedUnit', chinese: '所属单位', className: 'info', lableType: 'input', verify: { required: 'ture', msg: '所属单位必填', min: '3', max: '12' }},
      //   { english: 'orderTotal', chinese: '订单总价', className: 'info', lableType: 'input', verify: { required: 'ture', msg: '订单总价必填', min: '3', max: '12' }},
      //   { english: 'consigneeUnit', chinese: '收货单位', className: 'infoRow', lableType: 'input' },
      //   { english: 'timeName', chinese: '收货时间', className: 'info', lableType: 'date', verify: { required: 'ture', msg: '收货日期必填' }},
      //   { english: 'selectName', chinese: '下拉选择名字', className: 'info', lableType: 'select', arr: [{ label: '区域一', value: 'shanghai' }, { label: '区域二', value: 'beijing' }], verify: { required: 'ture', msg: '这个下拉必填' }},
      //   { english: 'switchName', chinese: '切换器名字', className: 'info', lableType: 'switch' },
      //   { english: 'checkboxName', chinese: '多选框名字', className: 'infoRow', lableType: 'checkbox', arr: [{ label: '美食/餐厅线上活动', name: 'type' }, { label: '地推活动', name: 'type' }, { label: '线下主题活动', name: 'type' }, { label: '单纯品牌曝光', name: 'type' }] },
      //   { english: 'radioName', chinese: '单选框名字', className: 'infoRow', lableType: 'radio', arr: [{ label: '线下场地免费' }, { label: '地推活动' }, { label: '线下主题活动' }, { label: '单纯品牌曝光' }] },
      //   { english: 'textareaName', chinese: '文本域名字', className: 'info', lableType: 'textarea' },
      //   { english: 'imageUploadName', chinese: '上传图片', lableType: 'imageUpload', disabled: false, verify: { required: 'ture', msg: '上传图片必填' }, fileList: [] },
      //   { english: 'papersAccessory', chinese: '证件附件', lableType: 'papersUpload', disabled: false, verify: { required: 'ture', msg: '证件附件必填' }, papers: { front: [], reverse: [] }}
      // ],
      // { id: '10', orderID: '201905020023152615', name: '抗酸染色体、白蛋白、乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂', totalPrice: '120000000', consignee: '中心院材料库', requiredTime: '2019-9-7', type: 'sy', unit: '2019-9-7 19:30', num: '10' }
      orderface: [ // 订单form对象用于对应字段和中文名,前端定义这个和table可能不一样所以需要单独出来定义
        { english: 'orderID', chinese: '订单号', lableType: 'input', disabled: true },
        { english: 'name', chinese: '产品名称', lableType: 'input', disabled: true },
        { english: 'totalPrice', chinese: '总价（元）', lableType: 'input', disabled: true },
        { english: 'consignee', chinese: '收货单位', lableType: 'input', disabled: true },
        { english: 'requiredTime', chinese: '要求送货时间', lableType: 'date', disabled: true },
        { english: 'state', chinese: '状态', lableType: 'input', disabled: true },
        { english: 'orderTime', chinese: '联系人', lableType: 'data', disabled: true },
        { english: 'num', chinese: '状态', lableType: 'input', disabled: true }
      ],
      subscribe: [
        { chinese: '产品编号', english: 'proID', disabled: true },
        { chinese: '产品名称', english: 'proName', disabled: true },
        { chinese: '规格型号', english: 'specificationsModels', disabled: true },
        { chinese: '单位', english: 'unit', disabled: true },
        { chinese: '单价', english: 'unitPrice', disabled: false },
        { chinese: '数量', english: 'num', disabled: true },
        { chinese: '金额', english: 'money', disabled: true }
      ],
      config2: { // 前端定义
        height: 'calc(100vh - 530px)',
        table: [
          { index: '0', width: '120', align: 'left' },
          { index: '1', width: '120', align: 'left' },
          { index: '2', width: '120', align: 'left' },
          { index: '3', align: 'left' },
          { index: '4', align: 'left' },
          { index: '5', align: 'left' },
          { index: '6', align: 'left' }
        ],
        form: [
          { index: '0', className: 'info' },
          { index: '1', className: 'info' },
          { index: '2', className: 'info' },
          { index: '3', className: 'info' },
          { index: '4', className: 'info' },
          { index: '5', className: 'info' },
          { index: '6', className: 'info' },
          { index: '7', className: 'info' }
        ],
        labelWidth: '100px',
        labelPosition: 'right',
        titleOne: '订单概况',
        titleTwo: '产品明细',
        titleThree: '订单处理说明'
      },
      orderDetailList: [ // 后端传入明细表
        { id: '12', proID: '201905020023152666', proName: '抗酸染色体', specificationsModels: '20cmX20cm', unit: '个', unitPrice: 30, num: 300, money: 9000 },
        { id: '123', proID: '201905020023152667', proName: '白蛋白', specificationsModels: '20cmX20cm', unit: '个', unitPrice: 30, num: 10, money: 300 },
        { id: '124', proID: '201905020023152668', proName: '乙肝pcr试剂', specificationsModels: '20cmX20cm', unit: '个', unitPrice: 20, num: 30, money: 600 },
        { id: '12', proID: '201905020023152666', proName: '抗酸染色体', specificationsModels: '20cmX20cm', unit: '个', unitPrice: 30, num: 300, money: 9000 },
        { id: '123', proID: '201905020023152667', proName: '白蛋白', specificationsModels: '20cmX20cm', unit: '个', unitPrice: 30, num: 10, money: 300 },
        { id: '124', proID: '201905020023152668', proName: '乙肝pcr试剂', specificationsModels: '20cmX20cm', unit: '个', unitPrice: 20, num: 30, money: 600 },
        { id: '12', proID: '201905020023152666', proName: '抗酸染色体', specificationsModels: '20cmX20cm', unit: '个', unitPrice: 30, num: 300, money: 9000 },
        { id: '123', proID: '201905020023152667', proName: '白蛋白', specificationsModels: '20cmX20cm', unit: '个', unitPrice: 30, num: 10, money: 300 },
        { id: '124', proID: '201905020023152668', proName: '乙肝pcr试剂', specificationsModels: '20cmX20cm', unit: '个', unitPrice: 20, num: 30, money: 600 },
        { id: '12', proID: '201905020023152666', proName: '抗酸染色体', specificationsModels: '20cmX20cm', unit: '个', unitPrice: 30, num: 300, money: 9000 },
        { id: '123', proID: '201905020023152667', proName: '白蛋白', specificationsModels: '20cmX20cm', unit: '个', unitPrice: 30, num: 10, money: 300 },
        { id: '124', proID: '201905020023152668', proName: '乙肝pcr试剂', specificationsModels: '20cmX20cm', unit: '个', unitPrice: 20, num: 30, money: 600 }
      ],
      listLoading: true, // 控制列表加载动画化
      listQuery: { // 查询条件
        'Page.Size': 5,
        'Page.Index': 1,
        'Page.Sort': '',
        productName: ''
      },
      dialogTitle: '弹窗标题', // 控制弹窗
      downloadLoading: false, // 控制下拉加载状态
      dialogVisible: false // 控制弹窗
    }
  },
  beforeCreate() {
    this.getPageConfig()
  },
  created() {
    this.getList()
  },
  methods: {
    //  选择筛选条件
    selectTerm(e) {
      this.current = e
      this.pageParam.type = e
    },
    //  获取页面配置
    getPageConfig() {
      pandingOrderApi.getPageConfig(this.listQuery).then(response => {
        console.log('response', response)
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    // 列表操作方法
    controlFun(e, r) {
      if (e === 0) {
        this.dialogTitle = '接单/拒接'
        this.dialogVisible = true
        this.footbtns = e
        // 通过id获取详情
      } else if (e === 1) {
        this.dialogTitle = '修改价格'
        this.dialogVisible = true
        this.footbtns = e
      } else if (e === 2) {
        this.dialogTitle = '关闭交易'
        this.dialogVisible = true
        this.footbtns = e
      }
    },
    // 获取产品列表
    getList() {
      this.listLoading = true
      pandingOrderApi.proList(this.listQuery).then(response => {
        console.log('response', response)
        this.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    // 改变页数时
    handleCurrentChange(val) {
      // this.params.pageNum = val
      this.listQuery['Page.Index'] = val
      this.getList()
    },
    // 条件查询
    handleFilter() {
      this.listQuery['Page.Index'] = 1
      console.log('this.listQuery', this.listQuery)
      this.getList()
    }
  }
}
</script>

<style scoped>
</style>

