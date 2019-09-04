<template>
  <div class="row">
    <slot name="CRUD-btn"></slot>
    <div class="fr">
      <div style="margin-bottom: 10px; overflow: hidden">
        <slot name="left-btn"></slot>
      </div>
      <div class="fr">
        <el-input
          v-model="pageParam.text"
          placeholder="请输入搜索内容"
          size="small"
          style="width: 300px; border-radius: 4px; margin-right: 10px"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
        <el-button type="primary" icon="el-icon-search" round size="small" @click="searchBtn">搜索</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchTime',
  data() {
    return {
      pageParam: {
        searchTxt: '', // 输入搜索的订单Id或者XX
        pageIndex: 1, // 当前页
        pageSize: 10, // 每页数据条数
        sidx: ''
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value2: ''
    }
  },
  methods: {
  //  选择筛选条件
  //   selectTerm(e) {
  //     this.current = e
  //     this.pageParam.type = e
  //   },
    //  搜索
    searchBtn() {
      console.log('pageParam', this.pageParam)
      this.$emit('searchList',this.pageParam)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.el-button--small.is-round {
  padding: 9px 32px;
}
.current {
  background: $currentColor;
  color:#ffffff;
}

.date-picker{
  margin-left: 20px;
  width: 240px;
}

.el-date-picker >>> .el-date-editor .el-range-input{
  border: 1px solid red !important;
}
.el-date-editor .el-range-input{
  border: 1px solid red;
  width: 20%;
}
.row{
  position: relative;
}

</style>
