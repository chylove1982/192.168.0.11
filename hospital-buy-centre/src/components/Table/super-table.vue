<!--suppress ALL -->
<template>
  <div>
    <el-table
      :data="newTable"
      :show-summary= "config.showSum"
      :v-loading="dataListLoading"
      element-loading-text="拼命加载中"
      :summary-method = "getSum"
      highlight-current-row
      :height="config.height"
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        label="序号"
        type="index"
        width="55"
      />
      <el-table-column
        v-for="(item,index) in tableface"
        :label="item.chinese"
        :width="config.table!==undefined&&config.table.find(s=>s.index==index)&&config.table.find(s=>s.index==index).width!==undefined?config.table.find(s=>s.index==index).width:''"
        :property="item.english"
         :align="config.table!==undefined&&config.table.find(s=>s.index==index)&&config.table.find(s=>s.index==index).align!==undefined?config.table.find(s=>s.index==index).align:'left'"

        @click="getInfo(row)"
      >
        <template slot-scope="{row}">
          <!-- 如果是多个字段 -->
          <div v-if="item.IsGroup==='0'" class="multifields">
            <div><strong>{{ row[item.GroupField[0]]}}</strong></div>
            <div class="nameList">{{ row[item.GroupField[1]] }}</div>
          </div>
          <!-- 如果是state -->
          <div v-else-if="item.english === 'state'" class="multifields">
            <el-tag type="success">{{ row[item.english] }}</el-tag>
          </div>
          <!-- 如果是可修改的 -->
          <div v-else-if="item.enabled===true">
            <el-input @blur="onBlur(row)" v-model="row[item.english]">{{ row[item.english] }}</el-input>
          </div>
          <!--如果有操作按钮-->
          <div v-else-if="item.chinese=== '操作'">
            <div v-for="(btn,index) in config.tableBtns">
              <el-button class="btn" v-if="row.state!== undefined&&btn.state!==undefined?btn.state===row.state:true"  type="primary" size="mini" plain @click="controlBtn(index,row)">{{ btn.name }}</el-button>
            </div>
          </div>
          <!-- 如果是普通的 -->
          <div v-else>{{ row[item.english] }}</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'SuperTable',
  props: {
    table: Array,
    tableface: Array,
    config: Object,
    getSummaries: Function
  },
  data() {
    return {
      multipleSelection: [],
      newTable: this.table,
      dataListLoading: true   //  控制显示加载动画
    }
  },
  watch:{
    table(){
      this.newTable = this.table
    }
  },
  methods: {
    // 获取选中数组
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log('val',this.multipleSelection)
      this.$emit('getSelect', this.multipleSelection)
    },
    // table的统计显示
    getSum(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 1) {
          sums[index] = '总价'
          return
        }
        if(!this.config.sumArr.includes(index)){
          sums[index] = ''
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
        }
      })
      return sums
    },
    onBlur(row){
      this.$emit('onBlur',row)
    },
    getInfo(row){
      this.$emit('getInfo',row)
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter('date')
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter()
    },
    formatter(row, column) {
      return row.address
    },
    filterTag(value, row) {
      return row.tag === value
    },
    filterHandler(value, row, column) {
      const english = column['english']
      return row[english] === value
    },
    controlBtn(i, r) {
      this.$emit('controlFun', i, r)

    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/styles/mixin.scss';
  .nameList{
    @include ellipses-2;
  }
  .btn{
    margin:5px 0px;
  }
  .multifields div{
    margin-bottom: 10px;
  }

  .tableSpace{

  }
</style>
