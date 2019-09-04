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

    <super-table class="tableSpace" :table="DataList" :tableface="Headers" :config="config" @controlFun="controlFun" />
    <!--分页-->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery['PageIndex']"
      :limit.sync="listQuery['PageSize']"
      @pagination="DataList"
    />
  </div>
</template>

<script>

  export default {
    data() {
      return {
        current: 0,
        selectArr: ['今日', '本周', '本月', '本季'],
        curStep: 0, // 后端字段，当前所在
        DataList: [],
        Headers: [], // 控制弹窗
        type_select: [] ,
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
        dialogVisible: false

      }
    },


    created() {
      let tparam='RequisitionOrderGetListDfprw'//修改此处参数；在配置表中的对象名
//获取配置信息
      let configparams = ['aptitudesaudit','SUPPLYTYPE']
      this.spdapi.GetConfigs(configparams).then(res=> {
        if (res.code === 1) {
          var dlist = res.result
          for(var i=0;i<dlist.length;i++){
            this.type_select.push(dlist[i])
          } }}) .catch( err => {})
//获取数据标题
      this.spdapi.getPageTableHeader(tparam) .then( res => {
//成功回调
        if (res.code === 1) {
          this.spdapi.consolelog(res.result)
          var tonyapiurl=res.result.interfaceaddress
          var datalist = res.result.details
          for(var i=0;i<datalist.length;i++){
            this.Headers.push(datalist[i])
          }
//获取数据
          let data={}
          data.searchTxt='0'
          this.spdapi.getData(data,tonyapiurl).then(res=> {
            if (res.code === 1) {
              var dlists = res.result
              for(var i=0;i<dlists.length;i++){
                this.DataList.push(dlists[i])
              }
            }else{
              this.spdapi.consolelog( res.message)
            }}) .catch( err => {})
        }else
        {
          this.spdapi.consolelog( res.message)
        }
      }).catch( res => {})

//处理菜单按键
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
          this.dialogTitle = '审核'
          this.dialogVisible = true
          this.footbtns = e
          this.changeRedactState(false)
          // 通过id获取详情
        } else if (e === 1) {
          this.dialogTitle = '资质信息'
          this.dialogVisible = true
          this.footbtns = e
          this.changeRedactState(true)
        } else if (e === 2) {
          this.dialogTitle = '审核详情'
          this.dialogVisible = true
          this.footbtns = e
          this.changeRedactState(true)
        }
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

