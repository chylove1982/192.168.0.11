<template>
  <div class="app-container">
    <search-time>
      <div v-for="(item,index) in type_select" slot="fl" class="type_select">
        <div class="type_row">
          <div class="type_name">{{ item.type_name }}</div>
          <div class="type_btns">
            <el-button v-for="(btn,index2) in item.type_btns" :class="{current : btn.selected}" type="primary" size="mini" plain @click="selectCurrent(index,index2)">{{ btn.name }}</el-button>
          </div>
        </div>
      </div>
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
      <div class="app-container">
        <super-title :title="title" :subtitle="subtitle">
          <span v-if="footbtns!=0" slot="append" class="fr">
            <el-tag type="danger">审核不通过</el-tag>
          </span>
        </super-title>
        <!--基本信息-->
        <h3 class="title_line">基本信息</h3>
        <form-com :formface="basicInfoface" :config="basicInfoConfig" :form="basicInfo" />
        <!--基本信息-->
        <h3 class="title_line">
          营业执照
        </h3>
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane name="first" label="三证合一">
            <form-com :formface="threeCombineOneface" :config="threeCombineOneConfig" :form="threeCombineOne" />
          </el-tab-pane>
          <el-tab-pane name="second" label="非三证合一">
            <div class="small_title">
              <span><i class="circle">1</i>公司营业执照</span>
            </div>
            <form-com :formface="businessLicenseface" :config="businessLicenseConfig" :form="businessLicense" @changeFrontUrl="changeFrontUrl" @changeReverseUrl="changeReverseUrl" />
            <!--结构组织代码-->
            <div class="small_title">
              <span><i class="circle">2</i>结构组织代码</span>
            </div>
            <form-com :formface="organizationCodeface" :config="organizationCodeConfig" :form="organizationCode" />
            <!--税务登记号-->
            <div class="small_title">
              <span><i class="circle">3</i>税务登记号</span>
            </div>
            <form-com :formface="taxIdface" :config="taxIdConfig" :form="taxId" />
          </el-tab-pane>
        </el-tabs>
        <!--公司营业执照-->
        <!--生成经营许可-->
        <h3 class="title_line">生成经营许可</h3>
        <form-com :formface="proAbusLicenseface" :config="proAbusLicenseConfig" :form="proAbusLicense" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import supplierInquireApi from '@/api/base-info-inquire/supplier-inquire'

export default {
  data() {
    return {
      activeName: 'first',
      title: '南京深普瑞生物科技有限公司',
      subtitle: '(申请单号：201950105100)',
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
        ],
        tableBtns: [
          { name: '资质信息', path: '/add', state: 'sy' }
        ]
      },
      total: 12, // 总分页数
      switchDialogCon: '',
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
      dialogVisible: false, // 控制弹窗
      type_select: [ // 筛选数组
        {
          type_name: '供应商类型',
          type_btns: [{ name: '三甲公立', value: 'scqy', selected: false }, { name: '杜康', value: 'pfs', selected: false }, { name: '三甲综合', value: 'pss', selected: false }]
        },
        {
          type_name: '审核状态',
          type_btns: [{ name: '新提报', value: 'jjdq', selected: false }, { name: '过期', value: 'gq', selected: false }, { name: '正常', value: 'zc', selected: false }, { name: '资质重申', value: 'zzcs', selected: false }]
        }
      ],
      // 发货信息
      auditOpinion: {},
      auditOpinionface: [
        { english: 'auditOpinion', chinese: '审核意见', lableType: 'textarea', disabled: false }
      ],
      auditOpinionConfig: {
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
      // 基本信息
      basicInfo: {},
      basicInfoface: [
        { english: 'companyName', chinese: '公司名称', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '公司名称必填' }},
        { english: 'supplierType', chinese: '供应商类型', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '供应商类型必填' }},
        { english: 'contactName', chinese: '联系人姓名', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '公司名称必填' }},
        { english: 'area', chinese: '所在地区', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '供应商类型必填' }},
        { english: 'phone', chinese: '联系电话', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '公司名称必填' }},
        { english: 'registeredAddress', chinese: '注册地址', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '供应商类型必填' }},
        { english: 'companyEmail', chinese: '企业Email', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '公司名称必填' }},
        { english: 'legalRepresentative', chinese: '法定代表人', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '供应商类型必填' }},
        { english: 'enterprisePhone', chinese: '企业电话', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '公司名称必填' }},
        { english: 'legalRepresentativePhone', chinese: '法定代表人电话', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '供应商类型必填' }},
        { english: 'corporateSite', chinese: '企业网址', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '公司名称必填' }},
        { english: 'invoiceCode', chinese: '发票代码', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '供应商类型必填' }}
      ],
      basicInfoConfig: {
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
      // 营业执照--三证合一
      threeCombineOne: {},
      threeCombineOneface: [
        { english: 'unifyCode', chinese: '统一社会信用代码', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '营业执照注册号必填' }},
        { english: 'registerDate', chinese: '成立日期', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '成立日期必填' }},
        { english: 'businessTerm', chinese: '营业期限', lableType: 'daterange', disabled: false, verify: { required: 'ture', msg: '营业期限必填' }},
        { english: 'registrationOrgan', chinese: '登记机关', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '登记机关必填' }},
        { english: 'businessScope', chinese: '经营范围', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '经营范围必填' }},
        { english: 'papersAccessory', chinese: '证件附件', lableType: 'papersUpload', disabled: false, verify: { required: 'ture', msg: '证件附件必填' }, papers: { front: [], reverse: [] }}
      ],
      threeCombineOneConfig: {
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
      // 营业执照
      businessLicense: {},
      businessLicenseface: [
        { english: 'companyName', chinese: '营业执照注册号', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '营业执照注册号必填' }},
        { english: 'supplierType', chinese: '成立日期', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '成立日期必填' }},
        { english: 'contactName', chinese: '营业期限', lableType: 'daterange', disabled: false, verify: { required: 'ture', msg: '营业期限必填' }},
        { english: 'area', chinese: '登记机关', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '登记机关必填' }},
        { english: 'phone', chinese: '经营范围', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '经营范围必填' }},
        { english: 'papersAccessory', chinese: '证件附件', lableType: 'papersUpload', disabled: false, verify: { required: 'ture', msg: '证件附件必填' }, papers: { front: [], reverse: [] }}
      ],
      businessLicenseConfig: {
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
      // 组织代码
      organizationCode: {},
      organizationCodeface: [
        { english: 'companyName', chinese: '营业执照注册号', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '营业执照注册号必填' }},
        { english: 'supplierType', chinese: '成立日期', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '成立日期必填' }},
        { english: 'contactName', chinese: '营业期限', lableType: 'daterange', disabled: false, verify: { required: 'ture', msg: '营业期限必填' }},
        { english: 'area', chinese: '登记机关', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '登记机关必填' }},
        { english: 'phone', chinese: '经营范围', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '经营范围必填' }},
        { english: 'papersAccessory', chinese: '证件附件', lableType: 'papersUpload', disabled: false, verify: { required: 'ture', msg: '证件附件必填' }, papers: { front: [], reverse: [] }}
      ],
      organizationCodeConfig: {
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
      // 税务登记号
      taxId: {},
      taxIdface: [
        { english: 'companyName', chinese: '营业执照注册号', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '营业执照注册号必填' }},
        { english: 'supplierType', chinese: '成立日期', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '成立日期必填' }},
        { english: 'contactName', chinese: '营业期限', lableType: 'daterange', disabled: false, verify: { required: 'ture', msg: '营业期限必填' }},
        { english: 'area', chinese: '登记机关', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '登记机关必填' }},
        { english: 'phone', chinese: '经营范围', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '经营范围必填' }},
        { english: 'papersAccessory', chinese: '证件附件', lableType: 'papersUpload', disabled: false, verify: { required: 'ture', msg: '证件附件必填' }, papers: { front: [], reverse: [] }}
      ],
      taxIdConfig: {
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
      // 生产经营许可
      proAbusLicense: {},
      proAbusLicenseface: [
        { english: 'companyName', chinese: '许可证证号', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '许可证证号必填' }},
        { english: 'supplierType', chinese: '分类码', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '分类码必填' }},
        { english: 'contactName', chinese: '质量负责人', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '质量负责人必填' }},
        { english: 'area', chinese: '有效期至', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '有效期至必填' }},
        { english: 'phone', chinese: '发证机关', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '发证机关必填' }},
        { english: 'phone', chinese: '发证日期', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '发证日期必填' }},
        { english: 'contactName', chinese: '仓库地址', lableType: 'input', disabled: false },
        { english: 'area', chinese: '经营范围', lableType: 'input', disabled: false, verify: { required: 'ture', msg: '经营范围必填' }},
        { english: 'papersAccessory', chinese: '证件附件', lableType: 'papersUpload', disabled: false, verify: { required: 'ture', msg: '证件附件必填' }, papers: { front: [], reverse: [] }}
      ],
      proAbusLicenseConfig: {
        labelWidth: '150px',
        labelPosition: 'right',
        form: [
          { index: '0', className: 'info' },
          { index: '1', className: 'info' },
          { index: '2', className: 'info' },
          { index: '3', className: 'info' },
          { index: '4', className: 'info' },
          { index: '5', className: 'info' },
          { index: '6', className: 'infoRow' },
          { index: '7', className: 'infoRow' },
          { index: '8', className: 'infoRow' }
        ]
      }
    }
  },
  created() {
    // this.getList()
  },
  methods: {
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
      this.basicInfoface.map(s => s.disabled = t)
      this.threeCombineOneface.map(s => s.disabled = t)
      this.businessLicenseface.map(s => s.disabled = t)
      this.organizationCodeface.map(s => s.disabled = t)
      this.taxIdface.map(s => s.disabled = t)
      this.proAbusLicenseface.map(s => s.disabled = t)
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

