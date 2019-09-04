<template>
  <div class="app-container">
    <search-time>
    </search-time>
    <super-table class="tableSpace" :table="pendingOrderList" :tableface="tableface" :config="config" @lookInfo="popDetails" @controlFun="controlFun" />
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
      <h3 class="title_line">详细信息</h3>
      <form-com :formface="secfromface" :form="secform" :config="config" />
    </el-dialog>
  </div>
</template>

<script>
import supplierInquireApi from '@/api/base-info-inquire/supplier-inquire'

export default {
  data() {
    return {
      current: 0,
      pendingOrderList: [ // 待处理订单列表 后端传
        { id: '1', orderID: '201905020023152666', name: '抗酸染色体、白蛋白、乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂', totalPrice: '120000000', requiredTime: '2019-9-7', consignee: '中心院材料库', state: 'sy', orderTime: '2019-9-7 19:30', linkman: '10' },
        { id: '2', orderID: '201905020023152667', name: '抗酸染色体、白蛋白、乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂', totalPrice: '120000000', requiredTime: '2019-9-7', consignee: '中心院材料库', state: 'sy', orderTime: '2019-9-7 19:30', linkman: '10' },
        { id: '3', orderID: '201905020023152668', name: '抗酸染色体、白蛋白、乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂', totalPrice: '120000000', requiredTime: '2019-9-7', consignee: '中心院材料库', state: 'sy', orderTime: '2019-9-7 19:30', linkman: '10' },
        { id: '4', orderID: '201905020023152669', name: '抗酸染色体、白蛋白、乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂', totalPrice: '120000000', requiredTime: '2019-9-7', consignee: '中心院材料库', state: 'sy', orderTime: '2019-9-7 19:30', linkman: '10' },
        { id: '5', orderID: '2019050200231526610', name: '抗酸染色体、白蛋白、乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂', totalPrice: '120000000', requiredTime: '2019-9-7', consignee: '中心院材料库', state: 'sy', orderTime: '2019-9-7 19:30', linkman: '10' },
        { id: '6', orderID: '201905020023152611', name: '抗酸染色体、白蛋白、乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂', totalPrice: '120000000', requiredTime: '2019-9-7', consignee: '中心院材料库', state: 'sy', orderTime: '2019-9-7 19:30', linkman: '10' },
        { id: '7', orderID: '201905020023152612', name: '抗酸染色体、白蛋白、乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂', totalPrice: '120000000', requiredTime: '2019-9-7', consignee: '中心院材料库', state: 'sy', orderTime: '2019-9-7 19:30', linkman: '10' },
        { id: '8', orderID: '201905020023152613', name: '抗酸染色体、白蛋白、乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂', totalPrice: '120000000', requiredTime: '2019-9-7', consignee: '中心院材料库', state: 'sy', orderTime: '2019-9-7 19:30', linkman: '10' },
        { id: '9', orderID: '201905020023152614', name: '抗酸染色体、白蛋白、乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂', totalPrice: '120000000', requiredTime: '2019-9-7', consignee: '中心院材料库', state: 'sy', orderTime: '2019-9-7 19:30', linkman: '10' },
        { id: '10', orderID: '201905020023152615', name: '抗酸染色体、白蛋白、乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂乙肝pcr试剂', totalPrice: '120000000', requiredTime: '2019-9-7', consignee: '中心院材料库', state: 'sy', orderTime: '2019-9-7 19:30', linkman: '10' }
      ],
      secform: {},
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
      secfromface: [ // 表格显示数据 后端传
        { chinese: '订单号', english: 'orderID', disabled: true },
        { chinese: '名称', english: 'name', disabled: true, lableType: 'input' },
        { chinese: '总价（元）', english: 'totalPrice', disabled: true, lableType: 'input' },
        { chinese: '收货单位', english: 'consignee', disabled: true },
        { chinese: '要求送货时间', english: 'requiredTime', disabled: true, lableType: 'input' },
        { chinese: '下单时间', english: 'orderTime', disabled: true, lableType: 'input' },
        { chinese: '联系人', english: 'linkman', disabled: true, lableType: 'input' },
        { chinese: '状态', english: 'state', disabled: true, lableType: 'input' }
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
        ],
        tableBtns: [
          { name: '加入采购', path: '/add', state: 'sy' }
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
        ]
      },
      total: 12, // 总分页
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
  created() {
    // this.getList()
  },
  methods: {
    //  弹出详情
    popDetails(row) {
      this.dialogTitle = '科室信息详情'
      this.dialogVisible = true
      this.secform = row
      console.log('this.secfromface', this.secfromface)
      console.log('this.secform', this.secform)
      this.secfromface.map(s => s.disabled = true)
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
    //  选择筛选条件
    selectTerm(e) {
      this.current = e
      this.pageParam.type = e
    },
    // 列表操作方法
    controlFun(e, r) {
      if (e === 0) {
        this.dialogTitle = '资质信息'
        this.dialogVisible = true
        this.changeRedactState(true)
      }
    },
    // 改变是否可编辑状态
    changeRedactState(t) {
      // this.basicInfoface.map(s => s.disabled = t)
      // this.threeCombineOneface.map(s => s.disabled = t)
      // this.businessLicenseface.map(s => s.disabled = t)
      // this.organizationCodeface.map(s => s.disabled = t)
      // this.taxIdface.map(s => s.disabled = t)
      // this.proAbusLicenseface.map(s => s.disabled = t)
    },
    // 获取产品列表
    getList() {
      this.listLoading = true
      supplierInquireApi.proList(this.listQuery).then(response => {
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
    },
    // 改变营业执照正面图
    changeFrontUrl(url) {
      console.log('url122', url)
    },
    // 改变营业执照反面图
    changeReverseUrl(url) {
      console.log('url123333', url)
    },
    //  tab切换
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

