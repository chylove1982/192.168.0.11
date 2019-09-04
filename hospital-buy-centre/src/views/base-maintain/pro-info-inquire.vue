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
      <!--价格曲线-->
      <!--<h3 class="title_line">价格曲线</h3>-->
      <super-table class="tableSpace" :table="basicInfo" :tableface="basicInfoMxface" :config="basicInfoMxConfig" @controlFun="controlFun" />

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
        tableBtns: [{ name: '加入采购', type: 'add', apiurl: 'api/Spdgysproductinfo/GetGysProductInfoMasterSaveByID' }, { name: '价格曲线', type: 'add', apiurl: 'api/Spdgysproductinfo/GetGysProductInfoMasterSaveByID' }]
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



        basicInfoface:[],
        basicInfo:[] ,
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
        basicInfoTpface:[],
        basicInfoTp:[] ,
        basicInfoTpConfig: {
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
        }

      }
    },


    created() {
      // const tparam = 'DepartmentInfoGetList'// 修改此处参数；在配置表中的对象名
      // 获取配置信息

      this.getList()
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
      getList() {
        var dt=this.gettable('GysProductInfoGetList',this.listQuery)
        this.datalist=dt.datalist
        this.headers= dt.headers
      },
      //  选择筛选条件
      selectTerm(e) {
        this.current = e
        this.pageParam.type = e
      },
      // 列表操作方法
      controlFun(e, r) {
        this.basicInfo = this.getformdata(this.config.tableBtns[e], r)
        this.basicInfoface = this.gettableheaders('GetDepartmentInfoByID')

        this.basicInfoTp = this.getformdata(this.config.tableBtns[e], r)
        this.basicInfoTpface = this.gettableheaders('GetDepartmentInfoByIDTp')
        this.dialogTitle = this.config.tableBtns[e].name
        this.dialogVisible = true
        this.footbtns = e
        this.changeRedactState(false)
      },handleCurrentChange(val) {
        this.listQuery['PageIndex'] = val
        this.getList()
      },handleFilter() {
        this.listQuery['PageIndex'] = 1
        console.log('this.listQuery', this.listQuery)
        this.getList()
      },handleClick() {
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

