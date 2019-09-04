<template>
  <div class="app-container">
    <search-time @searchList="getList">
    </search-time>
    <super-table class="tableSpace" :table="secList" :tableface="secface" :config="config" @lookInfo="popDetails" @getSelect="getSelect" />
    <!--分页-->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.pageIndex"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />
    <!--e_char弹窗-->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="1163px"
    >
      <!--添加的弹窗-->
      <h3 class="title_line">基本信息</h3>
      <form-com :formface="secformface" :form="secform" :config="secformConfig"></form-com>
      <h3 class="title_line">参考图</h3>
      <el-upload
        class="upload-demo"
        action="http://192.168.1.105:18098/upload/spdservice"
        name="files"
        :on-preview="handlePreview"
        :on-success="uploadSuccess"
        :on-remove="handleRemove"
        :file-list="fileList"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <div style="text-align: center">
        <el-button type="primary" @click="savefun">确定</el-button>
        <el-button type="danger">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  // import examineInApi from '@/api/store/examine-in'

  export default {
    // 不要删除这个路由钩子事件,它们是路由跳转自动执行的
    beforeRouteEnter(to, from, next) {
      console.log('beforeRouteEnter')
      next()
    },
    beforeRouteUpdate(to, from, next) {
      console.log('beforeRouteUpdate')
      next()
    },
    beforeRouteLeave(to, from, next) {
      console.log('beforeRouteLeave')
      next()
    },
    data() {
      return {
        selects:[],  // 选择的table列
        selectArr: [  // 左上角按钮
          {name:'检验入库',type:'primary'}
        ],
        secList: [],
        secface: [ // 表格显示数据 后端传
          { chinese: '科室代号', english: 'departmentcode', disabled: true },
          { chinese: '科室名称', english: 'departmentname', disabled: true },
          { chinese: '所属部门', english: 'affiliatedfunction', disabled: true },
          { chinese: '专科类别', english: 'zkcategory', disabled: true },
          { chinese: '负责人', english: 'principal', disabled: true },
          { chinese: '负责人联系电话', english: 'principatelephone', disabled: true },
          { chinese: '仓库地址', english: 'warehouseaddress', disabled: true }
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
          ]
        },
        secform:{},
        secformface:[
          { chinese: '科室代号', english: 'departmentcode', disabled: false, lableType: 'input', verify: { required: 'ture', msg: '科室代号必填' } },
          { chinese: '助记码', english: 'mnemoniccode', disabled: false, lableType: 'input' },
          { chinese: '科室名称', english: 'departmentname', disabled: false,className: 'info', lableType: 'input', verify: { required: 'ture', msg: '科室名称必填' } },
          { chinese: '英文名称', english: 'englishname', disabled: false,className: 'info', lableType: 'input' },
          { chinese: '所属部门', english: 'affiliatedfunction', disabled: false ,className: 'info', lableType: 'input', verify: { required: 'ture', msg: '专科类别必填' }},
          { chinese: '专科类别', english: 'zkcategory', disabled: false,className: 'info', lableType: 'input', verify: { required: 'ture', msg: '订单总价必填' }},
          { chinese: '负责人', english: 'principal', disabled: false,className: 'info', lableType: 'input', verify: { required: 'ture', msg: '负责人必填' }},
          { chinese: '专科子类别', english: 'zksubcategory', disabled: false,className: 'info', lableType: 'input', verify: { required: 'ture', msg: '专科子类别必填' }},
          { chinese: '负责人联系电话', english: 'principatelephone', disabled: false,className: 'info', lableType: 'input', verify: { required: 'ture', msg: '负责人联系电话必填' }},
          { chinese: '仓库地址', english: 'warehouseaddress', disabled: false,className: 'info', lableType: 'input', verify: { required: 'ture', msg: '仓库地址必填' }}
        ],
        secformConfig:{
          labelWidth: '120px',
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
            { index: '9', className: 'info' }
          ]
        },
        fileList: [],  // 上传的图片列表
        total: 12, // 总分页数
        switchDialogCon: '',
        listLoading: true, // 控制列表加载动画化
        listQuery: { // 查询条件
          searchTxt: "",
          pageIndex: 0,
          pageSize: 10,
          sidx: ""  // 排序字段
        },
        dialogTitle: '弹窗标题', // 控制弹窗
        downloadLoading: false, // 控制下拉加载状态
        dialogVisible: false // 控制弹窗
      }
    },
    created() {
      this.getList('')
    },
    methods: {
      // 获取选中的数据
      getSelect(e){
        this.selects = e
        console.log(e)
      },
      // 删除科室
      delfun(id){
        examineInApi.delById(id).then(response => {
          console.log('response', response)
          let { code, msg } = response
          if(Object.is(code,1)){
            this.$message.success('添加成功')
            this.dialogVisible = false
            this.getList('')
          }else{
            this.$message.error(msg)
          }
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      },
      // 保存科室
      savefun(){
        this.secform.uploadpictures = this.fileList
        console.log('this.secform',this.secform)
        examineInApi.addSec(this.secform).then(response => {
          console.log('response', response)
          let { code, msg } = response
          if(Object.is(code,1)){
            this.$message.success('添加成功')
            this.dialogVisible = false
            this.getList('')
          }else{
            this.$message.error(msg)
          }
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      },
      //  上传图片
      uploadSuccess(res){
        console.log('res', res)
        // this.fileList = this.custom_config.FILES_URL + res[0]
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePreview(file) {
        console.log(file)
      },
      // 上传图片之前先判断图片大小尺寸
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      //  弹出详情
      popDetails(row){
        this.dialogTitle = '科室信息详情'
        this.dialogVisible = true
        console.log('row',row)
        this.secform = row
        this.secformface.map(s => s.disabled = true)
      },
      // 列表操作方法
      controlFun(e) {
        if (Object.is(e,0)) {
          this.secform = {}
          console.log('e',e)
          console.log('this.secform',this.secform)
          this.dialogTitle = '新增科室信息'
          this.secformface.map(s => s.disabled = false)
          this.dialogVisible = true
          // 通过id获取详情
        } else if (e === 1) {
          if (this.selects.length === 1){
            this.dialogTitle = '修改科室信息'
            this.dialogVisible = true
            this.secformface.map(s => s.disabled = false)
            console.log('this.selects',this.selects)
            this.secform = this.selects[0]
            console.log('this.secform',this.secform)
          }else{
            this.$message.error("只能选择一个修改")
          }
        } else if (e === 2) {
          if (this.selects.length === 1){
            this.dialogTitle = '删除科室信息'
            const id = this.selects[0].id
            this.delfun(id)
          }else{
            this.$message.error("只能选择一个删除")
          }
        }
      },
      // 获取产品列表
      getList( data ) {
        this.listLoading = true
        if(data){
          this.listQuery.searchTxt = data.text
        }
        console.log('listQuery',this.listQuery)
        examineInApi.getList(this.listQuery).then(response => {
          console.log('response', response)
          let { code, result, count, msg } = response
          if(Object.is(code,1)){
            this.secList = result
            this.total = count
          }else{
            this.$message.error(msg)
          }
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
  .CRUD-btn{
    position: absolute;
    bottom: 20px;
    left: 20px;
  }
  .upload-demo{
    margin-bottom: 20px;
  }
  .upload-demo >>> .el-upload-list{
    overflow: hidden;
  }
  .upload-demo >>> .el-upload-list__item{
    width: 300px !important;
    float: left;
    margin-right: 20px;
  }
</style>

