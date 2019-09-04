<template>
  <!--日常申领详情-->
  <div class="container">
    <div style="height: 97%; overflow: auto">
      <div class="comTitle">订单概况</div>
      <div class="comCon">
        <div class="info">
          <span class="infoTitle">所属单位：</span>
          <el-input v-model="session.affiliatedUnit" placeholder="请您填写" />
        </div>
        <div class="info">
          <span class="infoTitle">订单总价：</span>
          <el-input v-model="session.orderTotal" placeholder="请您填写" />
        </div>
        <div class="info">
          <span class="infoTitle">收货单位：</span>
          <el-input v-model="session.consigneeUnit" placeholder="请您填写" />
        </div>
        <div class="info">
          <span class="infoTitle"><span class="redColor">*</span>收货人：</span>
          <el-input v-model="session.consigneePerson" placeholder="请您填写" />
        </div>
        <div class="info">
          <span class="infoTitle">收货仓库：</span>
          <el-input v-model="session.consigneeWarehouse" placeholder="请您填写" />
        </div>
        <div class="info">
          <span class="infoTitle"><span class="redColor">*</span>联系电话：</span>
          <el-input v-model="session.contactNumber" placeholder="请您填写" />
        </div>
        <div class="infoTow">
          <span class="infoTitle">收货地址：</span>
          <el-input v-model="session.consigneeAddress" placeholder="请您填写" />
        </div>
      </div>
      <!--产品明细-->
      <div>
        <div class="comTitle">
          领用产品明细
        <!--<el-button-group class="fr">-->
          <!--<el-button type="primary" size="mini">一键补货</el-button>-->
          <!--<el-button type="primary" size="mini">新增一行</el-button>-->
        <!--</el-button-group>-->
        </div>
        <el-table
          :data="tableData"
          highlight-current-row
          style="width: 100%"
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
      <!--备注说明-->
      <div class="remark">
        <span class="lable">备注说明：</span><el-input
          v-model="textarea"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
        />
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
      textarea: ''
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
  .container
    .remark
      display flex
      width 100%
      .lable
        width 100px
        .el-input
          flex 1
</style>
