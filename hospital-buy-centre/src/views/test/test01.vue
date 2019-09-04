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
    <super-table class="tableSpace" :table="DataList" :tableface="Headers" :config="config" @controlFun="controlFun" />
    <!--分页-->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery['Page.Index']"
      :limit.sync="listQuery['Page.Size']"
      @pagination="getList"
    />
  </div>
</template>

<script>
// import { SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG } from 'constants'
export default {
  data() {
    return {
      current: 0,
      DataList: [],
      Headers: [],
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
      },
      total: 0, // 总分页数
      switchDialogCon: '',
      footbtns: '',
      listLoading: true, // 控制列表加载动画化
      listQuery: { // 查询条件
        PageSize: 5,
        PageIndex: 1,
        PageSort: '',
        searchText: ''
      },
      dialogTitle: '弹窗标题', // 控制弹窗
      downloadLoading: false, // 控制下拉加载状态
      dialogVisible: false, // 控制弹窗
      type_select: [ // 筛选数组
        {
          type_name: '供应商类型',
          type_btns: [{ name: '生产企业', value: 'scqy', selected: false }, { name: '批发商', value: 'pfs', selected: false }, { name: '配送商', value: 'pss', selected: false }]
        },
        {
          type_name: '审核状态',
          type_btns: [{ name: '即将到期', value: 'jjdq', selected: false }, { name: '过期', value: 'gq', selected: false }, { name: '正常', value: 'zc', selected: false }, { name: '资质重申', value: 'zzcs', selected: false }]
        }
      ]

    }
  },

  created() {
    pageData.getPageConfig()
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

