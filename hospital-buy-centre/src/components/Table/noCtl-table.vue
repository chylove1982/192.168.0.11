<!--suppress ALL -->
<template>
  <el-table
    :data="table"
    highlight-current-row
    height="calc(100vh - 500px)"
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
      :width="config.table[index].width"
      :property="item.english"
      :align="config.table[index].align"
      @click="add(row)"
    >
      <template slot-scope="{row}">
        <!-- 如果是多个字段 -->
        <div v-if="item.multi_fields" class="multifields">
          <div><strong>[{{ row[item.fieldsArr[0]] }}]</strong></div>
          <div class="nameList">{{ row[item.fieldsArr[1]] }}</div>
        </div>
        <!-- 如果是type -->
<<<<<<< HEAD:supplier-system/src/components/Table/noCtl-table.vue
        <div v-else-if="item.property === 'type'">
          <el-tag type="success">{{ row[item.property] }}</el-tag>
=======
        <div v-else-if="item.english === 'type'" class="multifields">
          <el-tag type="success">{{ row[item.english] }}</el-tag>
        </div>
        <!--如果有操作按钮-->
        <div v-else-if="item.chinese === '操作'">
          <div v-for="(btn,index) in row.btns">
            <el-button class="btn" type="primary" size="mini" plain @click="controlBtn(index,row)">{{ btn }}</el-button>
          </div>
>>>>>>> 494ffc0561176674fda7b5b8bec95374c6cfc8ed:supplier-system/src/components/Table/control-table.vue
        </div>
        <!-- 如果是可修改的 -->
        <div v-else-if="!item.disabled">
          <el-input v-model="row[item.property]">{{ row[item.property] }}</el-input>
        </div>
        <!-- 如果是普通的 -->
        <div v-else>{{ row[item.english] }}</div>
      </template>
    </el-table-column>
<<<<<<< HEAD:supplier-system/src/components/Table/noCtl-table.vue
=======
    <!--<el-table-column-->
    <!--label="操作"-->
    <!--width="200"-->
    <!--align="center"-->
    <!--&gt;-->
    <!--<template slot-scope="{row}">-->
    <!--<div v-for="(btn,index) in row.btns">-->
    <!--<el-button class="btn" type="primary" size="mini" plain @click="controlBtn(index,row)">{{ btn }}</el-button>-->
    <!--</div>-->
    <!--</template>-->
    <!--</el-table-column>-->
>>>>>>> 494ffc0561176674fda7b5b8bec95374c6cfc8ed:supplier-system/src/components/Table/control-table.vue
  </el-table>
</template>

<script>
export default {
  props: {
    table: Array,
<<<<<<< HEAD:supplier-system/src/components/Table/noCtl-table.vue
    tableface: Array
=======
    tableface: Array,
    config: Object
>>>>>>> 494ffc0561176674fda7b5b8bec95374c6cfc8ed:supplier-system/src/components/Table/control-table.vue
  },
  data() {
    return {
      multipleSelection: []
    }
  },
  methods: {
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
  .el-table th.is-leaf, .el-table td{
    border-bottom: 37px solid #dfe6ec;
  }
  .nameList{
    @include ellipses-2;
  }
  .btn{
    margin:5px 0px;
  }
  .multifields div{
    margin-bottom: 10px;
  }

</style>
