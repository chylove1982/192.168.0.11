<template>
  <div class="container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="config.titleOne" name="first">
        <!--form表单-->
        <form-com :formface="formface" :config="config" :form="form" />
      </el-tab-pane>
      <el-tab-pane :label="config.titleTwo" name="second">
        <slot name="top_btn" />
        <super-table :table="table" :tableface="tableface" :config="config" />
        <!--分页-->
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="listQuery['Page.Index']"
          :limit.sync="listQuery['Page.Size']"
          @pagination="getPage"
        />
      </el-tab-pane>
      <el-tab-pane :label="config.titleThree" name="three">
        <!--处理说明-->
        <el-input
          v-model="textarea"
          type="textarea"
          :rows="3"
          style="margin: 30px 0px;"
          placeholder="请输入内容"
        />
        <div style="text-align: center; margin-bottom: 30px;">
          <div v-if="footbtns === 0">
            <el-button type="primary" size="mini">接单</el-button>
            <el-button type="danger" size="mini" @click="submitBtn">拒单</el-button>
          </div>
          <div v-if="footbtns === 1">
            <el-button type="primary" size="mini">确定</el-button>
            <el-button type="danger" size="mini" @click="submitBtn">取消</el-button>
          </div>
          <div v-if="footbtns === 2">
            <el-button type="primary" size="mini">关闭交易</el-button>
            <el-button type="danger" size="mini" @click="submitBtn">取消</el-button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <span class="fr foot-btn">
      <el-button>取 消</el-button>
      <el-button type="primary" @click="submitBtn">确 定</el-button>
    </span>
  </div>

</template>

<script>
export default {
  name: 'DailyDialog',
  props: {
    config: Object,
    formface: Array,
    form: Object,
    tableface: Array,
    table: Array,
    footbtns: String
  },
  data() {
    return {
      activeName: 'first',
      total: 12,
      listQuery: { // 查询条件
        'Page.Size': 5,
        'Page.Index': 1,
        'Page.Sort': '',
        OrderID: ''
      },
      list: []
    }
  },
  beforeCreate() {},
  created() {
    console.log('form', form)
  },
  methods: {
    // 添加一行
    addRow() {
      this.$emit('addRow')
    },
    // 确定
    submitBtn() {
      var order = {
        'form': this.form
      }
      console.log('order', order)
    },
    // 编辑
    edit(row) {
      this.$emit('edit', row)
    },
    // 点按钮
    func(btn, row) {
      if (btn === '编辑') {
        this.edit(row)
      } else if (btn === '删除') {
        this.del(row)
      }
    },
    // 添加
    // add(row) {
    //   this.$emit('add', row)
    // },
    // 删除
    del(row) {
      this.$emit('del', row)
    },
    // 打印
    prin() {
      console.log('111', this.formface)
    },
    // 切换tab
    handleClick(tab, event) {
      // if (this.activeName === 'first') {
      //   this.activeName = 'second'
      // }
      // if (this.activeName === 'second') {
      //   this.activeName = 'first'
      // }
      if (tab.paneName === 'first') {
        console.log(11)
      } else if (tab.paneName === 'second') {
        console.log(12)
      }
    },
    // 获取页面列表
    getPage() {
      console.log('getlist')
    },
    // 分页方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .container
    position relative
    .remark
      display flex
      width 100%
      .lable
        width 100px
        .el-input
          flex 1
    .foot-btn
      position absolute
      bottom 0px
      right 10px
    .title-btns-r
      position absolute
      top 4px
      right 0px
      z-index 999
  .comCon
    height 430px
    overflow auto
</style>
