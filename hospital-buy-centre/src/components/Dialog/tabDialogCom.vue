<template>
  <div class="tabCom">
    <el-table
      :data="table"
      highlight-current-row
      height="400px"
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-for="item in tableface"
        :label="item.label"
        :type="item.type"
        :width="item.width"
        :property="item.property"
        @click="add(row)"
      />
      <!--<el-table-column label="操作" align="center" width="150">-->
      <!--<template slot-scope="{row}">-->
      <!--<el-button v-for="(btn,index) in session.btns" :key="index" :type="btn.type" :icon="btn.icon" circle align="center" :size="btn.icon" @click="btn.func=='add'?add(row):del(row.id)" />-->
      <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
    <!--分页-->
    <pagination
      v-show="total>0"
      class="pagination"
      :total="total"
      :page.sync="listQuery['Page.Index']"
      :limit.sync="listQuery['Page.Size']"
      @pagination="getPage"
    />
    <span slot="footer" class="dialog-footer fr">
      <el-button @click="dialogVisible2 = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  props: {
    table: Array,
    tableface: Array
  },
  data() {
    return {
      listQuery: { // 查询条件
        'Page.Size': 5,
        'Page.Index': 1,
        OrderID: ''
      },
      multipleSelection: []
    }
  },
  computed: {
    total() {
      return this.table.length
    }
  },
  methods: {
    // 确定
    submit() {
      this.$emit('submit', this.multipleSelection)
    },
    add(row) {
      this.$emit('add', row)
    },
    // 获取页面列表
    getPage(listQuery) {
      this.$emit('getPage', listQuery)
    },
    // 分页方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    // 获取选中的行
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="stylus" scoped>
  .tabCom
    overflow hidden
  .pagination-container
    margin-top 0px
    padding-bottom 0px
</style>
