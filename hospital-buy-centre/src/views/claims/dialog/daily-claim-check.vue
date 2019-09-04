<template>
  <!--日常申领详情-->
  <div class="container">
    <div style="height: 97%; overflow: auto">
      <div class="comTitle">订单概况</div>
      <div class="comCon">
        <div class="info">
          <span class="infoTitle"><span class="redColor">*</span>期望到货日期：</span>
          <el-date-picker
            v-model="session.dateofArrival"
            type="date"
            placeholder="选择日期"
            :disabled="true"
          />
        </div>
        <div class="info">
          <span class="infoTitle"><span class="redColor">*</span>使用时间：</span>
          <el-date-picker
            v-model="session.usetime"
            type="date"
            placeholder="选择日期"
            :disabled="true"
          />
        </div>
        <div class="info">
          <span class="infoTitle">申领部门：</span>
          <el-input v-model="session.claimdepartment" placeholder="请您填写" :disabled="true" />
        </div>
        <div class="info">
          <span class="infoTitle"><span class="redColor">*</span>收货人：</span>
          <el-input v-model="session.consignee" placeholder="请您填写" :disabled="true" />
        </div>
        <div class="info">
          <span class="infoTitle">领用仓库：</span>
          <el-input v-model="session.acquisition" placeholder="请您填写" :disabled="true" />
        </div>
        <div class="infoRow">
          <span class="infoTitle">领用用途：</span>
          <el-input v-model="session.purposes" placeholder="请您填写" :disabled="true" />
        </div>
      </div>
      <!--产品明细-->
      <div style="overflow: hidden">
        <div class="comTitle">
          领用产品明细
        </div>
        <el-table
          :data="tableData"
          highlight-current-row
          style="width: 100%"
          @current-change="handleCurrentChange"
        >
          <el-table-column
            label="序号"
            type="index"
            width="50"
          />
          <el-table-column
            property="date"
            label="产品编号"
            width="120"
          />
          <el-table-column
            property="name"
            label="产品名称"
            width="120"
          />
          <el-table-column
            property="address"
            label="规格型号"
          />
          <el-table-column
            property="address"
            label="单位"
          />
          <el-table-column
            property="address"
            label="单价"
          />
          <el-table-column
            property="address"
            label="数量"
          />
          <el-table-column
            property="address"
            label="金额"
          />
        </el-table>
        <div class="fr sum" style="height: 40px; line-height: 40px; margin-bottom: 20px">
          合计：<span>数量之和：</span>
        </div>
      </div>
      <div class="comTitle">审核意见</div>
      <div class="comCon">
        <div class="info">
          <span class="infoTitle">审核结果：</span>
          <template>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </div>
        <div class="info">
          <span class="infoTitle">审核意见：</span>
          <el-input
            v-model="session.auditOpinions"
            type="textarea"
            :rows="2"
            placeholder="请您填写"
          />
        </div>
      </div>
    </div>
    <span class="footerBtn">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitBtn">确 定</el-button>
    </span>
  </div>

</template>

<script>
export default {
  name: 'DailyClaimDetails',
  props: {
    session: Object,
    tableData: Object
  },
  data() {
    return {
      options: [{
        value: '1',
        label: '通过'
      }, {
        value: '2',
        label: '不通过'
      }, {
        value: '3',
        label: '驳回'
      }],
      value: ''
    }
  },
  methods: {
    // 确定
    submitBtn() {
      console.log(12)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .el-input.is-disabled .el-input__inner{
    color:red;
    font-size : 30px
  }
</style>
