<template>
  <div class="row">
    <div class="fr" style="width: 814px;">
      <el-input
        v-model="pageParam.text"
        placeholder="请输入搜索内容"
        style="width: 300px; border-radius: 4px; margin-right: 10px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <span v-for="(item,index) in selectArr" :key="index">
        <el-button v-if="item.btnType === 'btn'" class="btn" :type="item.type" size="small" :icon="item.icon" round @click="func(index,pageParam)">
          {{ item.name }}
        </el-button>
        <el-popover
          v-if="item.btnType === 'pop'"
          placement="bottom"
          :title="item.name"
          width="300"
          trigger="click"
        >
          <div>
            <p v-for="(optionItem,index) in optionArr" :key="index">
              <span style="width: 74px; display: inline-block; text-align: right; padding-right: 10px">{{ optionItem.name }}:</span>
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in optionItem.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </p>
          </div>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false">重置</el-button>
            <el-button type="primary" size="mini" @click="visible = false">查询</el-button>
          </div>
          <el-button slot="reference" class="btn" :type="item.type" size="small" :icon="item.icon" round>{{ item.name }}</el-button>
        </el-popover>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SuperSearch',
  props: {
    selectArr: Array,
    optionArr: Array
  },
  data() {
    return {
      pageParam: {
        text: '', // 输入搜索的订单Id或者XX
        current: 1, // 当前页
        size: 10 // 每页数据条数
      }
    }
  },
  methods: {
    //  执行对应方法
    func(e) {
      this.$emit('func', e)
    },
    //  搜索
    searchBtn() {
      console.log('pageParam', this.pageParam)
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

  .btn{
    margin-left: 5px;
  }

  .el-date-picker >>> .el-date-editor .el-range-input{
    border: 1px solid red !important;
  }
  .el-date-editor .el-range-input{
    border: 1px solid red;
    width: 20%;
  }
</style>
