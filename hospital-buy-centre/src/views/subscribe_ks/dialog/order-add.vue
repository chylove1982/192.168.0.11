<template>
  <!--订单概况-->
  <div class="container">
    <div v-if="switcherTab" style="height: 100%; overflow: auto">
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
          产品明细
          <el-button-group class="fr">
            <el-button type="primary" size="mini">一键补货</el-button>
            <el-button type="primary" size="mini" @click="addRow">新增一行</el-button>
          </el-button-group>
        </div>
        <!--@current-change="handleCurrentChange"-->
        <el-table
          :data="claimList"
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column
            label="序号"
            type="index"
            width="50"
          />
          <el-table-column
            label="产品编码"
            width="120"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.date" placeholder="请输入内容" @focus="selectOrder" />
            </template>
          </el-table-column>
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
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.date" placeholder="请输入内容" />
            </template>
          </el-table-column>
          <el-table-column
            property="address"
            label="金额"
          />
          <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
            <template slot-scope="{row}">
              <el-button type="primary" icon="el-icon-edit" circle align="center" size="small" @click="del(row.id)" />
              <el-button type="danger" icon="el-icon-delete" circle align="center" size="small" @click="del(row.id)" />
            </template>
          </el-table-column>
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
    <!--申购列表-->
    <div v-if="!switcherTab" style="height: 100%; overflow: hidden">
      <div class="comTitle">
        申购单列表
        <el-button type="primary" class="fr" icon="el-icon-back" round @click="switcherTab = true">返回</el-button>
      </div>
      <!--@current-change="handleCurrentChange"-->
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
          label="申购单号"
          width="120"
        />
        <el-table-column
          property="name"
          label="产品编号"
          width="120"
        />
        <el-table-column
          property="address"
          label="产品名称"
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
          label="领用数量"
        />
        <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button type="primary" icon="el-icon-plus" circle align="center" size="small" @click="addToClaim(row.id)" />
          </template>
        </el-table-column>
      </el-table>
    </div>

    <span class="fr">
      <el-button>取 消</el-button>
      <el-button type="primary" @click="submitBtn">确 定</el-button>
    </span>
  </div>

</template>

<script>
export default {
  data() {
    return {
      textarea: '',
      switcherTab: true, // 切换表单true--显示领用产品明细；false--显示申领单列表
      claimList: [ // 领用产品列表
        {
          orderID: '', // 申购单号
          productCode: '', // 产品编号
          productName: '', // 产品名称
          specificationModels: '', // 规格型号
          unit: '', // 单位
          collaruseNumber: '' // 领用数量
        }
      ],
      dialogTitle: '', // 弹窗标题
      dialogVisible: '', // 显示弹窗
      tableData: [{ date: '123300200', name: '王小虎', address: '1221' }],
      session: { // 请领单初始数据
        affiliatedUnit: '', // 所属单位
        orderTotal: '', // 订单总价
        consigneeUnit: '', // 收货单位
        consigneePerson: '', // 收货人
        consigneeWarehouse: '', // 收货仓库
        contactNumber: '', // 联系电话
        consigneeAddress: '' // 收货地址
      }
    }
  },
  methods: {
    submitBtn() {
      this.$emit('add', this.claim)
    },
    // 添加一行
    addRow() {
      var row = {
        orderID: '', // 申购单号
        productCode: '', // 产品编号
        productName: '', // 产品名称
        specificationModels: '', // 规格型号
        unit: '', // 单位
        collaruseNumber: '' // 领用数量
      }
      this.claimList.push(row)
    },
    // 获取申购单列表

    // 选择订单
    selectOrder() {
      this.switcherTab = false
    },
    // 添加到采购
    addToClaim() {
      this.switcherTab = true
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
