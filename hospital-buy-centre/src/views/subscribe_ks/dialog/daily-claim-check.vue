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
        <div class="infoTow">
          <span class="infoTitle">领用用途：</span>
          <el-input v-model="session.purposes" placeholder="请您填写" :disabled="true" />
        </div>
      </div>
      <div class="comTitle">审核意见</div>
      <div class="comCon">
        <div class="info">
          <span class="infoTitle">审核结果：</span>
          <el-input v-model="session.findingsofaudit" placeholder="请您填写" :disabled="true" />
        </div>
        <div class="info">
          <span class="infoTitle">审核人：</span>
          <el-input v-model="session.auditor" placeholder="请您填写" :disabled="true" />
        </div>
        <div class="info">
          <span class="infoTitle">审核时间：</span>
          <el-input v-model="session.auditor" placeholder="请您填写" :disabled="true" />
        </div>
        <div class="infoTow">
          <span class="infoTitle">审核意见：</span>
          <el-input v-model="session.auditOpinions" placeholder="请您填写" :disabled="true" />
        </div>
      </div>
      <div class="comTitle">签收信息</div>
      <div class="comCon">
        <div class="info">
          <span class="infoTitle">签收单位：</span>
          <el-input v-model="session.signforCompany" placeholder="请您填写" :disabled="true" />
        </div>
        <div class="info">
          <span class="infoTitle">签收人：</span>
          <el-input v-model="session.signatory" placeholder="请您填写" :disabled="true" />
        </div>
        <div class="info">
          <span class="infoTitle">签收说明：</span>
          <el-input v-model="session.signaturenote" placeholder="请您填写" :disabled="true" />
        </div>
        <div class="info">
          <span class="infoTitle">签收时间：</span>
          <el-input v-model="session.dateTime" placeholder="请您填写" :disabled="true" />
        </div>
      </div>
      <!--<div class="info">-->
      <!--<span class="infoTitle">请领单号：</span>-->
      <!--<el-input v-model="session.receiptNo" placeholder="请您填写" :disabled="true" />-->
      <!--</div>-->
      <!--<div class="info">-->
      <!--<span class="infoTitle">所在仓库：</span>-->
      <!--<el-input v-model="session.warehouseCode" placeholder="请您填写" :disabled="true" />-->
      <!--</div>-->
      <!--<div class="info">-->
      <!--<span class="infoTitle">请领数量：</span>-->
      <!--<el-input v-model="session.quantity" placeholder="请您填写" :disabled="true" />-->
      <!--</div>-->

      <!--<div class="info">-->
      <!--<span class="infoTitle">请领人：</span>-->
      <!--<el-input v-model="session.pleasegetit" placeholder="请您填写" :disabled="true" />-->
      <!--</div>-->
      <!--<div class="info">-->
      <!--<span class="infoTitle">合计（数量之和）：</span>-->
      <!--<el-input v-model="session.total" placeholder="请您填写" :disabled="true" />-->
      <!--</div>-->
      <!--<div class="info">-->
      <!--<span class="infoTitle">状态：</span>-->
      <!--<el-input v-model="session.flow" placeholder="请您填写" :disabled="true" />-->
      <!--</div>-->

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
    methods: {
      // 确定
      submitBtn() {
        console.log(12)
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
