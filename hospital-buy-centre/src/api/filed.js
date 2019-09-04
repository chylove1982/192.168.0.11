// 导出需要的字段数据--对象
function exportData() {
  var data = {
    // 设置登录信息
    registerData: [
      { chinese: '公司名称：', english: 'companyName', type: 'input', placeholder: '公司名称（全称）', require: true, msg: '请输入公司名称', explain: '' },
      { chinese: '联系人姓名：', english: 'userName', type: 'input', placeholder: '请输入真实姓名', require: true, msg: '请输入联系人姓名', explain: '' },
      { chinese: '联系人电话：', english: 'userMobile', type: 'input', placeholder: '请输入真实联系电话', require: true, msg: '请输入联系人电话', explain: '' },
      { chinese: 'Email：', english: 'userEmail', type: 'input', placeholder: '请输入真实邮箱地址', require: true, msg: '请输入Email', explain: '' },
      { chinese: '登录名：', english: 'loginName', type: 'input', placeholder: '登录名', require: true, msg: '请输入登录名', explain: '说明：请使用6-12位的英文字符、数字、下划线设置。' },
      { chinese: '设置密码：', english: 'userPassword', type: 'input', placeholder: '请输入密码', require: true, msg: '请输入密码', explain: '' },
      { chinese: '确认密码：', english: 'confirmPassword', type: 'input', placeholder: '请再次输入密码', require: true, msg: '请输入确认密码', explain: '' }
    ],
    // 提交认证资料----基本信息
    baseData: [
      { chinese: '公司名称：', english: 'companyName', type: 'input', placeholder: '', require: true, msg: '', disabled: true },
      { chinese: '供应商类型：', english: 'supplierType', type: 'select', placeholder: '请选择供应商类型', require: true, msg: '请选择供应商类型', disabled: false, data: [{ label: '生产企业', value: '生产企业' }, { label: '流通企业', value: '流通企业' }, { label: '配送企业', value: '配送企业' }] },
      { chinese: '联系人姓名：', english: 'userName', type: 'input', placeholder: '', require: true, msg: '', disabled: true },
      { chinese: '所在地区：', english: 'userAddress', type: 'select', placeholder: '请选择所在地区', require: true, msg: '请选择所在地区', disabled: false, data: [{ label: '湖北', value: '湖北' }, { label: '广东', value: '广东' }, { label: '河南', value: '河南' }] },
      { chinese: '联系人电话：', english: 'userMobile', type: 'input', placeholder: '', require: true, msg: '', disabled: true },
      { chinese: '注册地址：', english: 'registerAddr', type: 'input', placeholder: '确保和营业执照地址一致', require: true, msg: '请输入注册地址', disabled: false },
      { chinese: '企业Email：', english: 'companyEmail', type: 'input', placeholder: '请输入真实邮箱地址', require: true, msg: '请输入真实邮箱地址', disabled: false },
      { chinese: '法定代表人：', english: 'legalRepresentative', type: 'input', placeholder: '请输入真实姓名', require: true, msg: '请输入真实姓名', disabled: false },
      { chinese: '企业电话：', english: 'companyMobile', type: 'input', placeholder: '请输入电话号码', require: false, msg: '', disabled: false },
      { chinese: '法定代表人电话：', english: 'representativeMobile', type: 'input', placeholder: '请输入真实联系电话', require: true, msg: '请输入真实联系电话', disabled: false },
      { chinese: '企业网址：', english: 'companyUrl', type: 'input', placeholder: '请输入企业网址', require: false, msg: '', disabled: false },
      { chinese: '发票代码：', english: 'invoiceCode', type: 'input', placeholder: '请输入发票代码', require: false, msg: '', disabled: false }
    ],
    // 提交认证资料----三证合一
    threeData: [
      { chinese: '统一社会信用代码：', english: 'socialCode', type: 'input', placeholder: '请输入统一社会信用代码', require: true, msg: '请输入统一社会信用代码', disabled: false },
      { chinese: '成立日期：', english: 'establishDate', type: 'date', placeholder: '请选择成立日期', require: true, msg: '请选择成立日期', disabled: false },
      { chinese: '营业期限：', english: 'businessTerm', type: 'choose', placeholder: '', require: false, msg: '', disabled: false },
      { chinese: '登记机关：', english: 'registerAuthority', type: 'input', placeholder: '请输入登记机关名称', require: true, msg: '请输入登记机关名称', disabled: false },
      { chinese: '经营范围：', english: 'businessArea', type: 'input', placeholder: '请输入经营范围信息', require: true, msg: '请输入经营范围信息', disabled: false }
    ],
    // 提交认证资料----非三证合一
    noThreeData: {
      industrial: [
        { chinese: '营业执照注册号：', english: 'industrialNumberNo', type: 'input', placeholder: '请输入营业执照注册号', require: true, msg: '请输入营业执照注册号', disabled: false },
        { chinese: '成立日期：', english: 'industrialDateNo', type: 'date', placeholder: '请选择成立日期', require: true, msg: '请选择成立日期', disabled: false },
        { chinese: '营业期限：', english: 'industrialTermNo', type: 'choose', placeholder: '', require: false, msg: '', disabled: false },
        { chinese: '登记机关：', english: 'industrialAuthorityNo', type: 'input', placeholder: '请输入登记机关名称', require: true, msg: '请输入登记机关名称', disabled: false },
        { chinese: '经营范围：', english: 'industrialAreaNo', type: 'input', placeholder: '请输入经营范围信息', require: true, msg: '请输入经营范围信息', disabled: false }
      ],
      organizing: [
        { chinese: '组织机构代码：', english: 'organizingCodeNo', type: 'input', placeholder: '请输入组织机构代码', require: true, msg: '请输入组织机构代码', disabled: false },
        { chinese: '组织机构有效期：', english: 'organizingDateNo', type: 'date', placeholder: '请选择组织机构有效期', require: true, msg: '请选择组织机构有效期', disabled: false }
      ],
      registration: [
        { chinese: '税务登记号：', english: 'registrationCodeNo', type: 'input', placeholder: '请输入税务登记号', require: true, msg: '请输入税务登记号', disabled: false },
        { chinese: '税务登记有效期：', english: 'registrationDateNo', type: 'date', placeholder: '请输入税务登记有效期', require: true, msg: '请输入税务登记有效期', disabled: false }
      ]
    },
    // 提交认证资料----生产经营许可
    licenseData: [
      { chinese: '许可证号：', english: 'licenseKey', type: 'input', placeholder: '请输入许可证号', require: true, msg: '请输入许可证号', disabled: false },
      { chinese: '分类码：', english: 'classificationCode', type: 'input', placeholder: '按证书填写', require: true, msg: '请输入分类码', disabled: false },
      { chinese: '质量负责人：', english: 'qualityPerson', type: 'input', placeholder: '按证书填写', require: true, msg: '请输入质量负责人', disabled: false },
      { chinese: '有效期至：', english: 'validityDate', type: 'date', placeholder: '请选择有效期', require: true, msg: '请选择有效期', disabled: false },
      { chinese: '发证机关：', english: 'licenseAuthority', type: 'input', placeholder: '按证书填写', require: true, msg: '请选择发证机关', disabled: false },
      { chinese: '发证日期：', english: 'licenseDate', type: 'date', placeholder: '请选择发证日期', require: true, msg: '请选择发证日期', disabled: false },
      { chinese: '仓库地址：', english: 'warehouseAddr', type: 'input', placeholder: '按照副本（包含变更记录）填写', require: false, msg: '', disabled: false },
      { chinese: '经营范围：', english: 'businessScope', type: 'input', placeholder: '请输入经营范围', require: true, msg: '请输入经营范围', disabled: false }
    ],
    // 产品信息上传列表
    uploadingData: {
      tableData: [
        {
          id: 'd2b87f4c-b200-d8f7-d1f6-39eec95d12d0',
          productCode: '02156586263',
          productName: '乙肝pcr试剂（HBV DNA PCR-FLULTEC KIT）',
          approvalNum: '国药准字S20040036',
          specificationModels: '96人份/盒',
          manufacturer: '中山大学达安基因股份有限公司',
          proType: '生物制品一类耗材',
          packType: '组套包装',
          deliveryTime: '2天',
          proPrice: '2.23元/盒',
          auditStatus: 0,
          proHandle: ['详情', '审核'],
          hasConnection: false
        },
        {
          id: 'd2b87f4c-b200-d8f7-d1f6-39eec95d12c1',
          productCode: '02156586263',
          productName: '乙肝pcr试剂（HBV DNA PCR-FLULTEC KIT）',
          approvalNum: '国药准字S20040036',
          specificationModels: '96人份/盒',
          manufacturer: '中山大学达安基因股份有限公司',
          proType: '生物制品一类耗材',
          packType: '组套包装',
          deliveryTime: '2天',
          proPrice: '2.23元/盒',
          auditStatus: 1,
          proHandle: ['详情', '变更日志'],
          hasConnection: true
        },
        {
          id: 'd2b87f4c-b200-d8f7-d1f6-39eec95d12b3',
          productCode: '02156586263',
          productName: '乙肝pcr试剂（HBV DNA PCR-FLULTEC KIT）',
          approvalNum: '国药准字S20040036',
          specificationModels: '96人份/盒',
          manufacturer: '中山大学达安基因股份有限公司',
          proType: '生物制品一类耗材',
          packType: '单品包装',
          deliveryTime: '2天',
          proPrice: '2.23元/盒',
          auditStatus: 2,
          proHandle: ['详情'],
          hasConnection: false
        },
        {
          id: 'd2b87f4c-b200-d8f7-d1f6-39eec95d12a4',
          productCode: '02156586263',
          productName: '乙肝pcr试剂（HBV DNA PCR-FLULTEC KIT）',
          approvalNum: '国药准字S20040036',
          specificationModels: '96人份/盒',
          manufacturer: '中山大学达安基因股份有限公司',
          proType: '生物制品一类耗材',
          packType: '单品包装',
          deliveryTime: '2天',
          proPrice: '2.23元/盒',
          auditStatus: 3,
          proHandle: ['详情', '审核'],
          hasConnection: true
        },
        {
          id: 'd2b87f4c-b200-d8f7-d1f6-39eec95d12e8',
          productCode: '02156586263',
          productName: '乙肝pcr试剂（HBV DNA PCR-FLULTEC KIT）',
          approvalNum: '国药准字S20040036',
          specificationModels: '96人份/盒',
          manufacturer: '中山大学达安基因股份有限公司',
          proType: '生物制品一类耗材',
          packType: '单品包装',
          deliveryTime: '2天',
          proPrice: '2.23元/盒',
          auditStatus: 4,
          proHandle: ['详情', '变更日志'],
          hasConnection: false
        },
        {
          id: 'd2b87f4c-b200-d8f7-d1f6-39eec95d12f5',
          productCode: '02156586263',
          productName: '乙肝pcr试剂（HBV DNA PCR-FLULTEC KIT）',
          approvalNum: '国药准字S20040036',
          specificationModels: '96人份/盒',
          manufacturer: '中山大学达安基因股份有限公司',
          proType: '生物制品一类耗材',
          packType: '单品包装',
          deliveryTime: '2天',
          proPrice: '2.23元/盒',
          auditStatus: 5,
          proHandle: ['详情', '变更日志'],
          hasConnection: false
        },
        {
          id: 'd2b87f4c-b200-d8f7-d1f6-39eec95d121q',
          productCode: '02156586263',
          productName: '乙肝pcr试剂（HBV DNA PCR-FLULTEC KIT）',
          approvalNum: '国药准字S20040036',
          specificationModels: '96人份/盒',
          manufacturer: '中山大学达安基因股份有限公司',
          proType: '生物制品一类耗材',
          packType: '单品包装',
          deliveryTime: '2天',
          proPrice: '2.23元/盒',
          auditStatus: 6,
          proHandle: ['详情', '变更日志'],
          hasConnection: false
        }
      ],
      titleData: [
        { dataItem: 'proMessage', dataName: '产品信息' },
        { dataItem: 'proType', dataName: '产品类别' },
        { dataItem: 'packType', dataName: '包装类别' },
        { dataItem: 'deliveryTime', dataName: '供货周期（天）' },
        { dataItem: 'proPrice', dataName: '单价（元）' },
        { dataItem: 'auditStatus', dataName: '审核状态' }
      ],
      total: 50
    },
    // 产品信息审核列表
    auditData: {
      tableData: [
        {
          id: 'd2b87f4c-b200-d8f7-d1f6-39eec95d12d0',
          productCode: '02156586263',
          productName: '乙肝pcr试剂（HBV DNA PCR-FLULTEC KIT）',
          approvalNum: '国药准字S20040036',
          specificationModels: '96人份/盒',
          manufacturer: '中山大学达安基因股份有限公司',
          proType: '生物制品一类耗材',
          packType: '组套包装',
          deliveryTime: '2天',
          proPrice: '2.23元/盒',
          auditStatus: 0,
          proHandle: ['详情', '审核'],
          hasConnection: false
        },
        {
          id: 'd2b87f4c-b200-d8f7-d1f6-39eec95d12c1',
          productCode: '02156586263',
          productName: '乙肝pcr试剂（HBV DNA PCR-FLULTEC KIT）',
          approvalNum: '国药准字S20040036',
          specificationModels: '96人份/盒',
          manufacturer: '中山大学达安基因股份有限公司',
          proType: '生物制品一类耗材',
          packType: '组套包装',
          deliveryTime: '2天',
          proPrice: '2.23元/盒',
          auditStatus: 1,
          proHandle: ['详情', '审核'],
          hasConnection: true
        },
        {
          id: 'd2b87f4c-b200-d8f7-d1f6-39eec95d12b3',
          productCode: '02156586263',
          productName: '乙肝pcr试剂（HBV DNA PCR-FLULTEC KIT）',
          approvalNum: '国药准字S20040036',
          specificationModels: '96人份/盒',
          manufacturer: '中山大学达安基因股份有限公司',
          proType: '生物制品一类耗材',
          packType: '单品包装',
          deliveryTime: '2天',
          proPrice: '2.23元/盒',
          auditStatus: 2,
          proHandle: ['详情'],
          hasConnection: false
        },
        {
          id: 'd2b87f4c-b200-d8f7-d1f6-39eec95d12a4',
          productCode: '02156586263',
          productName: '乙肝pcr试剂（HBV DNA PCR-FLULTEC KIT）',
          approvalNum: '国药准字S20040036',
          specificationModels: '96人份/盒',
          manufacturer: '中山大学达安基因股份有限公司',
          proType: '生物制品一类耗材',
          packType: '单品包装',
          deliveryTime: '2天',
          proPrice: '2.23元/盒',
          auditStatus: 3,
          proHandle: ['详情'],
          hasConnection: true
        },
        {
          id: 'd2b87f4c-b200-d8f7-d1f6-39eec95d12e5',
          productCode: '02156586263',
          productName: '乙肝pcr试剂（HBV DNA PCR-FLULTEC KIT）',
          approvalNum: '国药准字S20040036',
          specificationModels: '96人份/盒',
          manufacturer: '中山大学达安基因股份有限公司',
          proType: '生物制品一类耗材',
          packType: '单品包装',
          deliveryTime: '2天',
          proPrice: '2.23元/盒',
          auditStatus: 4,
          proHandle: ['详情'],
          hasConnection: false
        }
      ],
      titleData: [
        { dataItem: 'proMessage', dataName: '产品信息' },
        { dataItem: 'proType', dataName: '产品类别' },
        { dataItem: 'packType', dataName: '包装类别' },
        { dataItem: 'deliveryTime', dataName: '供货周期（天）' },
        { dataItem: 'proPrice', dataName: '单价（元）' },
        { dataItem: 'auditStatus', dataName: '审核状态' }
      ],
      total: 50
    },
    // 单个产品详情或审核
    oneAuditData: {
      baseData: [
        { chinese: '产品编码：', english: 'productCode', type: 'input', require: true, msg: '请输入产品编码', disabled: false },
        { chinese: 'HIS对照码：', english: 'hisCode', type: 'input', require: false, msg: '', disabled: false },
        { chinese: '品牌：', english: 'brand', type: 'input', require: false, msg: '', disabled: false },
        { chinese: '产品条码：', english: 'productBarCode', type: 'input', require: false, msg: '', disabled: false },
        { chinese: '产品名称：', english: 'productName', type: 'input', require: true, msg: '请输入产品名称', disabled: false },
        { chinese: '产品类型：', english: 'productType', type: 'input', require: true, msg: '请输入产品类型', disabled: false },
        { chinese: '通用名：', english: 'commonName', type: 'input', require: false, msg: '', disabled: false },
        { chinese: '子类型：', english: 'subtype', type: 'input', require: true, msg: '请输入子类型', disabled: false },
        { chinese: '单位：', english: 'unit', type: 'input', require: true, msg: '请输入单位', disabled: false },
        { chinese: '规格型号：', english: 'specificationModels', type: 'input', require: true, msg: '请输入规格型号', disabled: false },
        { chinese: '参考单价：', english: 'negotiable', type: 'input', require: true, msg: '请输入参考单价', disabled: false },
        { chinese: '供货周期（天）：', english: 'deliveryCycle', type: 'input', require: false, msg: '', disabled: false },
        { chinese: '质量层次：', english: 'qualityLevel', type: 'input', require: false, msg: '', disabled: false },
        { chinese: '批准文号：', english: 'approvalNumber', type: 'input', require: true, msg: '请输入批准文号', disabled: false },
        { chinese: '生产厂家：', english: 'productCompany', type: 'input', require: false, msg: '', disabled: false }
      ],
      proExplain: [
        { chinese: '产品成分：', english: 'productIngredient', type: 'input', require: false, msg: '', disabled: false },
        { chinese: '产品功效：', english: 'productEfficacy', type: 'input', require: false, msg: '', disabled: false }
      ],
      auditAdvice: [
        { chinese: '审核意见：', english: 'auditOpinion', type: 'input', require: false, msg: '', disabled: false },
        { chinese: '审核人：', english: 'auditor', type: 'input', require: false, msg: '', disabled: false },
        { chinese: '审核时间：', english: 'auditTime', type: 'input', require: false, msg: '', disabled: false }
      ]
    },
    // 组件产品详情或审核
    moreAuditData: {
      baseData: [
        { chinese: '组件编码：', english: 'stackProductCode', type: 'input', require: true, msg: '请输入产品编码', disabled: false },
        { chinese: 'HIS对照码：', english: 'stackHisCode', type: 'input', require: false, msg: '', disabled: false },
        { chinese: '品牌：', english: 'stackBrand', type: 'input', require: false, msg: '', disabled: false },
        { chinese: '产品条码：', english: 'stackProductBarCode', type: 'input', require: false, msg: '', disabled: false },
        { chinese: '产品名称：', english: 'stackProductName', type: 'input', require: true, msg: '请输入产品名称', disabled: false },
        { chinese: '产品类型：', english: 'stackProductType', type: 'input', require: true, msg: '请输入产品类型', disabled: false },
        { chinese: '通用名：', english: 'stackCommonName', type: 'input', require: false, msg: '', disabled: false },
        { chinese: '子类型：', english: 'stackSubtype', type: 'input', require: true, msg: '请输入子类型', disabled: false },
        { chinese: '单位：', english: 'stackUnit', type: 'input', require: true, msg: '请输入单位', disabled: false },
        { chinese: '规格型号：', english: 'stackSpecificationModels', type: 'input', require: true, msg: '请输入规格型号', disabled: false },
        { chinese: '质量层次：', english: 'stackQualityLevel', type: 'input', require: false, msg: '', disabled: false },
        { chinese: '生产厂家：', english: 'stackProductCompany', type: 'input', require: false, msg: '', disabled: false },
        { chinese: '组套数量：', english: 'stackNumber', type: 'input', require: false, msg: '', disabled: false },
        { chinese: '组套总价值：', english: 'stackTotal', type: 'input', require: false, msg: '', disabled: false },
        { chinese: '组套价格折扣：', english: 'stackDiscount', type: 'input', require: false, msg: '', disabled: false },
        { chinese: '组套单价：', english: 'stackPrice', type: 'input', require: false, msg: '', disabled: false }

      ],
      auditAdvice: [
        { chinese: '审核意见：', english: 'stackAuditOpinion', type: 'input', require: false, msg: '', disabled: false },
        { chinese: '审核人：', english: 'stackAuditor', type: 'input', require: false, msg: '', disabled: false },
        { chinese: '审核时间：', english: 'stackAuditTime', type: 'input', require: false, msg: '', disabled: false }
      ]
    },
    // 产品退市管理列表
    delistData: {
      tableData: [
        {
          id: 'd2b87f4c-b200-d8f7-d1f6-39eec95d12d0',
          productCode: '02156586263',
          productName: '乙肝pcr试剂（HBV DNA PCR-FLULTEC KIT）',
          specificationModels: '96人份/盒',
          registrationCode: 'GD20170501123',
          approvalNum: '国药准字S20040036',
          productType: '生物志平一类耗材',
          packageType: '组套包装',
          registrationValidity: '2017-05--1至2018-12-30',
          productUnit: '2.23元/盒',
          productStatus: 1,
          handleBtn: ['变更日志', '发起变更']

        },
        {
          id: 'd2b87f4c-b200-d8f7-d1f6-39eec95d12c1',
          productCode: '02156586263',
          productName: '乙肝pcr试剂（HBV DNA PCR-FLULTEC KIT）',
          specificationModels: '96人份/盒',
          registrationCode: 'GD20170501123',
          approvalNum: '国药准字S20040036',
          productType: '生物志平一类耗材',
          packageType: '组套包装',
          registrationValidity: '2017-05--1至2018-12-30',
          productUnit: '2.23元/盒',
          productStatus: 0,
          handleBtn: ['变更日志', '发起变更']
        },
        {
          id: 'd2b87f4c-b200-d8f7-d1f6-39eec95d12b3',
          productCode: '02156586263',
          productName: '乙肝pcr试剂（HBV DNA PCR-FLULTEC KIT）',
          specificationModels: '96人份/盒',
          registrationCode: 'GD20170501123',
          approvalNum: '国药准字S20040036',
          productType: '生物志平一类耗材',
          packageType: '组套包装',
          registrationValidity: '2017-05--1至2018-12-30',
          productUnit: '2.23元/盒',
          productStatus: 0,
          handleBtn: ['变更日志', '发起变更']
        },
        {
          id: 'd2b87f4c-b200-d8f7-d1f6-39eec95d12a4',
          productCode: '02156586263',
          productName: '乙肝pcr试剂（HBV DNA PCR-FLULTEC KIT）',
          specificationModels: '96人份/盒',
          registrationCode: 'GD20170501123',
          approvalNum: '国药准字S20040036',
          productType: '生物志平一类耗材',
          packageType: '组套包装',
          registrationValidity: '2017-05--1至2018-12-30',
          productUnit: '2.23元/盒',
          productStatus: 1,
          handleBtn: ['变更日志', '发起变更']
        },
        {
          id: 'd2b87f4c-b200-d8f7-d1f6-39eec95d12e5',
          productCode: '02156586263',
          productName: '乙肝pcr试剂（HBV DNA PCR-FLULTEC KIT）',
          specificationModels: '96人份/盒',
          registrationCode: 'GD20170501123',
          approvalNum: '国药准字S20040036',
          productType: '生物志平一类耗材',
          packageType: '组套包装',
          registrationValidity: '2017-05--1至2018-12-30',
          productUnit: '2.23元/盒',
          productStatus: 0,
          handleBtn: ['变更日志', '发起变更']
        }
      ],
      titleData: [
        { dataItem: 'productMessage', dataName: '产品信息' },
        { dataItem: 'productType', dataName: '产品类别' },
        { dataItem: 'packageType', dataName: '包装类别' },
        { dataItem: 'registrationValidity', dataName: '注册证有效期' },
        { dataItem: 'productUnit', dataName: '单价（元）' },
        { dataItem: 'productStatus', dataName: '状态' }
      ],
      total: 50
    },
    // 产品变更日志详情
    updateLogDetailData: {
      uBaseData: [
        { chinese: '变更流水号：', english: 'uNum', type: 'input', require: false, msg: '', disabled: true },
        { chinese: '发起时间：', english: 'uTime', type: 'input', require: false, msg: '', disabled: true },
        { chinese: '变更类型：', english: 'uType', type: 'input', require: false, msg: '', disabled: true },
        { chinese: '发起人：', english: 'uOperator', type: 'input', require: false, msg: '', disabled: true },
        { chinese: '变更原因：', english: 'uReason', type: 'input', require: false, msg: '', disabled: true },
        { chinese: '审核人：', english: 'uAuditor', type: 'input', require: false, msg: '', disabled: true },
        { chinese: '审核意见：', english: 'uOpinion', type: 'input', require: false, msg: '', disabled: true },
        { chinese: '审核状态：', english: 'uStatus', type: 'input', require: false, msg: '', disabled: true }
      ],
      updateBeforeData: {
        baseData: [
          { chinese: '产品编码：', english: 'bProductCode', type: 'input', require: true, msg: '请输入产品编码', disabled: true },
          { chinese: 'HIS对照码：', english: 'bHISCode', type: 'input', require: false, msg: '', disabled: true },
          { chinese: '产品条码：', english: 'bProductBarCode', type: 'input', require: false, msg: '', disabled: true },
          { chinese: '产品类型：', english: 'bProductType', type: 'input', require: true, msg: '请输入产品类型', disabled: true },
          { chinese: '子类型：', english: 'bSubtype', type: 'input', require: true, msg: '请输入子类型', disabled: true },
          { chinese: '品牌：', english: 'bBrand', type: 'input', require: false, msg: '', disabled: true },
          { chinese: '产品名称：', english: 'bProductName', type: 'input', require: true, msg: '请输入产品名称', disabled: true },
          { chinese: '通用名：', english: 'bCommonName', type: 'input', require: false, msg: '', disabled: true },
          { chinese: '单位：', english: 'bUnit', type: 'input', require: true, msg: '请输入单位', disabled: true },
          { chinese: '规格型号：', english: 'bSpecifications', type: 'input', require: true, msg: '请输入规格型号', disabled: true },
          { chinese: '参考单价：', english: 'bProductPrice', type: 'input', require: true, msg: '请输入参考单价', disabled: true },
          { chinese: '质量层次：', english: 'bQuantityLevel', type: 'input', require: false, msg: '', disabled: true },
          { chinese: '供货周期（天）：', english: 'bDeliveryTime', type: 'input', require: false, msg: '', disabled: true },
          { chinese: '批准文号：', english: 'bApprovalNum', type: 'input', require: true, msg: '请输入批准文号', disabled: true },
          { chinese: '注册证号：', english: 'bRegistrationNum', type: 'input', require: true, msg: '请输入注册证号', disabled: true },
          { chinese: '有效期：', english: 'bPeriodTime', type: 'input', require: true, msg: '请输入有效期', disabled: true },
          { chinese: '生产厂家：', english: 'bProductCompany', type: 'input', require: false, msg: '', disabled: true }
        ],
        productExplainData: [
          { chinese: '产品成分：', english: 'bProductIngredient', type: 'input', require: false, msg: '', disabled: true },
          { chinese: '产品功效：', english: 'bProductEfficacy', type: 'input', require: false, msg: '', disabled: true }
        ]
      },
      updateAfterData: {
        baseData: [
          { chinese: '产品编码：', english: 'aProductCode', type: 'input', require: true, msg: '请输入产品编码', disabled: true },
          { chinese: 'HIS对照码：', english: 'aHISCode', type: 'input', require: false, msg: '', disabled: true },
          { chinese: '产品条码：', english: 'aProductBarCode', type: 'input', require: false, msg: '', disabled: true },
          { chinese: '产品类型：', english: 'aProductType', type: 'input', require: true, msg: '请输入产品类型', disabled: true },
          { chinese: '子类型：', english: 'aSubtype', type: 'input', require: true, msg: '请输入子类型', disabled: true },
          { chinese: '品牌：', english: 'aBrand', type: 'input', require: false, msg: '', disabled: true },
          { chinese: '产品名称：', english: 'aProductName', type: 'input', require: true, msg: '请输入产品名称', disabled: true },
          { chinese: '通用名：', english: 'aCommonName', type: 'input', require: false, msg: '', disabled: true },
          { chinese: '单位：', english: 'aUnit', type: 'input', require: true, msg: '请输入单位', disabled: true },
          { chinese: '规格型号：', english: 'aSpecifications', type: 'input', require: true, msg: '请输入规格型号', disabled: true },
          { chinese: '参考单价：', english: 'aProductPrice', type: 'input', require: true, msg: '请输入参考单价', disabled: true },
          { chinese: '质量层次：', english: 'aQuantityLevel', type: 'input', require: false, msg: '', disabled: true },
          { chinese: '供货周期（天）：', english: 'aDeliveryTime', type: 'input', require: false, msg: '', disabled: true },
          { chinese: '批准文号：', english: 'aApprovalNum', type: 'input', require: true, msg: '请输入批准文号', disabled: true },
          { chinese: '注册证号：', english: 'aRegistrationNum', type: 'input', require: true, msg: '请输入注册证号', disabled: true },
          { chinese: '有效期：', english: 'aPeriodTime', type: 'input', require: true, msg: '请输入有效期', disabled: true },
          { chinese: '生产厂家：', english: 'aProductCompany', type: 'input', require: false, msg: '', disabled: true }
        ],
        productExplainData: [
          { chinese: '产品成分：', english: 'aProductIngredient', type: 'input', require: false, msg: '', disabled: true },
          { chinese: '产品功效：', english: 'aProductEfficacy', type: 'input', require: false, msg: '', disabled: true }
        ]
      }
    },
    // 发起变更
    startUpdateData: {
      startReasonData: [
        { chinese: '变更类型：', english: 'sUpdateType', type: 'input', require: false, msg: '', disabled: false },
        { chinese: '变更原因：', english: 'sUpdateReason', type: 'input', require: false, msg: '', disabled: false }
      ],
      startBaseData: [
        { chinese: '产品编码：', english: 'sProductCode', type: 'input', require: true, msg: '请输入产品编码', disabled: false },
        { chinese: 'HIS对照码：', english: 'sHISCode', type: 'input', require: false, msg: '', disabled: false },
        { chinese: '品牌：', english: 'sBrand', type: 'input', require: false, msg: '', disabled: false },
        { chinese: '产品条码：', english: 'sProductBarCode', type: 'input', require: false, msg: '', disabled: false },
        { chinese: '产品名称：', english: 'sProductName', type: 'input', require: true, msg: '请输入产品名称', disabled: false },
        { chinese: '产品类型：', english: 'sProductType', type: 'input', require: true, msg: '请输入产品类型', disabled: false },
        { chinese: '通用名：', english: 'sCommonName', type: 'input', require: false, msg: '', disabled: false },
        { chinese: '子类型：', english: 'sSubtype', type: 'input', require: true, msg: '请输入子类型', disabled: false },
        { chinese: '单位：', english: 'sUnit', type: 'input', require: true, msg: '请输入单位', disabled: false },
        { chinese: '规格型号：', english: 'sSpecifications', type: 'input', require: true, msg: '请输入规格型号', disabled: false },
        { chinese: '参考单价：', english: 'sProductPrice', type: 'input', require: true, msg: '请输入参考单价', disabled: false },
        { chinese: '供货周期（天）：', english: 'sDeliveryTime', type: 'input', require: false, msg: '', disabled: false },
        { chinese: '质量层次：', english: 'sQuantityLevel', type: 'input', require: false, msg: '', disabled: false },
        { chinese: '批准文号：', english: 'sApprovalNum', type: 'input', require: true, msg: '请输入批准文号', disabled: false },
        { chinese: '注册证号：', english: 'sRegistrationNum', type: 'input', require: true, msg: '请输入注册证号', disabled: false },
        { chinese: '有效期：', english: 'sPeriodTime', type: 'date', require: true, msg: '请输入有效期', disabled: false },
        { chinese: '生产厂家：', english: 'sProductCompany', type: 'input', require: false, msg: '', disabled: false }
      ],
      startExplainData: [
        { chinese: '产品成分：', english: 'sProductIngredient', type: 'input', require: false, msg: '', disabled: false },
        { chinese: '产品功效：', english: 'sProductEfficacy', type: 'input', require: false, msg: '', disabled: false }
      ]
    },
    // 产品价格维护列表
    maintenanceData: {
      tableData: [
        {
          id: 'd2b87f4c-b200-d8f7-d1f6-39eec95d12d0',
          productCode: '02156586263',
          productName: '乙肝pcr试剂（HBV DNA PCR-FLULTEC KIT）',
          approvalNum: '国药准字S20040036',
          specificationModels: '96人份/盒',
          manufacturer: '中山大学达安基因股份有限公司',
          proType: '生物制品一类耗材',
          deliveryTime: '1天',
          proPrice: '2.23元/盒',
          updateTime: '2019-05-02 15:45:23',
          proHandle: ['更改价格', '价格曲线']
        },
        {
          id: 'd2b87f4c-b200-d8f7-d1f6-39eec95d12c1',
          productCode: '02156586263',
          productName: '乙肝pcr试剂（HBV DNA PCR-FLULTEC KIT）',
          approvalNum: '国药准字S20040036',
          specificationModels: '96人份/盒',
          manufacturer: '中山大学达安基因股份有限公司',
          proType: '生物制品一类耗材',
          deliveryTime: '4天',
          proPrice: '2.23元/盒',
          updateTime: '2019-05-02 15:45:23',
          proHandle: ['更改价格', '价格曲线']
        },
        {
          id: 'd2b87f4c-b200-d8f7-d1f6-39eec95d12b3',
          productCode: '02156586263',
          productName: '乙肝pcr试剂（HBV DNA PCR-FLULTEC KIT）',
          approvalNum: '国药准字S20040036',
          specificationModels: '96人份/盒',
          manufacturer: '中山大学达安基因股份有限公司',
          proType: '生物制品一类耗材',
          deliveryTime: '2天',
          proPrice: '2.23元/盒',
          updateTime: '2019-05-02 15:45:23',
          proHandle: ['更改价格', '价格曲线']
        },
        {
          id: 'd2b87f4c-b200-d8f7-d1f6-39eec95d12a4',
          productCode: '02156586263',
          productName: '乙肝pcr试剂（HBV DNA PCR-FLULTEC KIT）',
          approvalNum: '国药准字S20040036',
          specificationModels: '96人份/盒',
          manufacturer: '中山大学达安基因股份有限公司',
          proType: '生物制品一类耗材',
          deliveryTime: '3天',
          proPrice: '2.23元/盒',
          updateTime: '2019-05-02 15:45:23',
          proHandle: ['更改价格', '价格曲线']
        },
        {
          id: 'd2b87f4c-b200-d8f7-d1f6-39eec95d12e5',
          productCode: '02156586263',
          productName: '乙肝pcr试剂（HBV DNA PCR-FLULTEC KIT）',
          approvalNum: '国药准字S20040036',
          specificationModels: '96人份/盒',
          manufacturer: '中山大学达安基因股份有限公司',
          proType: '生物制品一类耗材',
          deliveryTime: '2天',
          proPrice: '2.23元/盒',
          updateTime: '2019-05-02 15:45:23',
          proHandle: ['更改价格', '价格曲线']
        }
      ],
      titleData: [
        { dataItem: 'proMessage', dataName: '产品信息' },
        { dataItem: 'proType', dataName: '产品类别' },
        { dataItem: 'deliveryTime', dataName: '供货周期（天）' },
        { dataItem: 'proPrice', dataName: '单价（元）' },
        { dataItem: 'updateTime', dataName: '更新时间' }
      ],
      total: 50
    },
    // 产品价格更改
    updateProPrice: {
      baseData: [
        { chinese: '产品编码：', english: 'productCode', type: 'input', require: true, msg: '请输入产品编码', disabled: true },
        { chinese: 'HIS对照码：', english: 'productHis', type: 'input', require: false, msg: '', disabled: true },
        { chinese: '品牌：', english: 'productBrand', type: 'input', require: false, msg: '', disabled: true },
        { chinese: '产品条码：', english: 'productBarCode', type: 'input', require: false, msg: '', disabled: true },
        { chinese: '产品名称：', english: 'productName', type: 'input', require: true, msg: '请输入产品名称', disabled: true },
        { chinese: '产品类型：', english: 'productType', type: 'input', require: true, msg: '请输入产品类型', disabled: true },
        { chinese: '通用名：', english: 'commonName', type: 'input', require: false, msg: '', disabled: true },
        { chinese: '子类型：', english: 'productSubtype', type: 'input', require: true, msg: '请输入子类型', disabled: true },
        { chinese: '单位：', english: 'productUnit', type: 'input', require: true, msg: '请输入单位', disabled: true },
        { chinese: '规格型号：', english: 'productModels', type: 'input', require: true, msg: '请输入规格型号', disabled: true },
        { chinese: '参考单价：', english: 'productPrice', type: 'input', require: true, msg: '请输入参考单价', disabled: true },
        { chinese: '供货周期（天）：', english: 'productDelivery', type: 'input', require: false, msg: '', disabled: true },
        { chinese: '生产厂家：', english: 'productCompany', type: 'input', require: false, msg: '', disabled: true },
        { chinese: '批准文号：', english: 'productApproval', type: 'input', require: true, msg: '请输入批准文号', disabled: true }
      ],
      priceData: [
        { chinese: '当前价格：', english: 'presentPrice', type: 'input', require: false, msg: '', disabled: true },
        { chinese: '更新价格：', english: 'updatePrice', type: 'input', require: true, msg: '请输入更新价格', disabled: false },
        { chinese: '更新原因：', english: 'updateReason', type: 'input', require: true, msg: '请输入更新原因', disabled: false }
      ]
    },
    // 产品对照码查询列表
    referenceData: {
      tableData: [
        {
          id: 'd2b87f4c-b200-d8f7-d1f6-39eec95d12d0',
          productName: '乙肝pcr试剂（HBV DNA PCR-FLULTEC KIT）',
          approvalNum: '国药准字S20040036',
          specificationModels: '96人份/盒',
          manufacturer: '中山大学达安基因股份有限公司',
          productBarCode: '2102350022',
          productCode: '02156586263'
        },
        {
          id: 'd2b87f4c-b200-d8f7-d1f6-39eec95d12c1',
          productName: '乙肝pcr试剂（HBV DNA PCR-FLULTEC KIT）',
          approvalNum: '国药准字S20040036',
          specificationModels: '96人份/盒',
          manufacturer: '中山大学达安基因股份有限公司',
          productBarCode: '2102350022',
          productCode: '02156586263'
        },
        {
          id: 'd2b87f4c-b200-d8f7-d1f6-39eec95d12b3',
          productName: '乙肝pcr试剂（HBV DNA PCR-FLULTEC KIT）',
          approvalNum: '国药准字S20040036',
          specificationModels: '96人份/盒',
          manufacturer: '中山大学达安基因股份有限公司',
          productBarCode: '2102350022',
          productCode: '02156586263'
        },
        {
          id: 'd2b87f4c-b200-d8f7-d1f6-39eec95d12a4',
          productName: '乙肝pcr试剂（HBV DNA PCR-FLULTEC KIT）',
          approvalNum: '国药准字S20040036',
          specificationModels: '96人份/盒',
          manufacturer: '中山大学达安基因股份有限公司',
          productBarCode: '2102350022',
          productCode: '02156586263'
        },
        {
          id: 'd2b87f4c-b200-d8f7-d1f6-39eec95d12e5',
          productName: '乙肝pcr试剂（HBV DNA PCR-FLULTEC KIT）',
          approvalNum: '国药准字S20040036',
          specificationModels: '96人份/盒',
          manufacturer: '中山大学达安基因股份有限公司',
          productBarCode: '2102350022',
          productCode: '02156586263'
        }
      ],
      titleData: [
        { dataItem: 'productMessage', dataName: '产品信息' },
        { dataItem: 'productBarCode', dataName: '产品条码' },
        { dataItem: 'productCode', dataName: '产品编码' }
      ],
      total: 50
    }
  }
  return data
}
// 导出需要的字段数据--方法
function exportData1(url) {
  return url
}
// 表单必填项判断
function requireData(obj, msg) {
  var rulesArr = []
  var rulesObj = {}
  rulesObj['required'] = 'ture'
  rulesObj['message'] = msg
  rulesObj['trigger'] = 'change'
  rulesArr[0] = rulesObj
  return rulesArr
}
export default {
  exportData,
  exportData1,
  requireData
}
