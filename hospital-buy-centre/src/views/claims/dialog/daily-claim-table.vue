<template>
  <!--日常申领详情-->
  <div class="container">
    <div v-if="switcherTab" style="height: 100%; overflow: hidden">
      <div class="comTitle">请领概况</div>
      <div class="comCon">
        <div class="info">
          <span class="infoTitle"><span class="redColor">*</span>期望到货日期：</span>
          <el-date-picker
            v-model="claim.dateofArrival"
            type="date"
            placeholder="选择日期"
          />
        </div>
        <div class="info">
          <span class="infoTitle"><span class="redColor">*</span>使用时间：</span>
          <el-date-picker
            v-model="claim.usetime"
            type="date"
            placeholder="选择日期"
          />
        </div>
        <div class="info">
          <span class="infoTitle">申领部门：</span>
          <el-input v-model="claim.claimdepartment" placeholder="请您填写" />
        </div>
        <div class="info">
          <span class="infoTitle"><span class="redColor">*</span>收货人：</span>
          <el-input v-model="claim.consignee" placeholder="请您填写" />
        </div>
        <div class="info">
          <span class="infoTitle">领用仓库：</span>
          <el-input v-model="claim.acquisition" placeholder="请您填写" />
        </div>
        <div class="infoRow">
          <span class="infoTitle">领用用途：</span>
          <el-input v-model="claim.purposes" placeholder="请您填写" />
        </div>
      </div>
      <!--产品明细-->
      <div>
        <div class="comTitle">
          领用产品明细
          <el-button-group class="fr">
            <el-button type="primary" size="mini">一键补货</el-button>
            <el-button type="primary" size="mini" @click="addRow">新增一行</el-button>
          </el-button-group>
        </div>
        <!--@current-change="handleCurrentChange"-->
        <el-table
          :data="claim.detal"
          highlight-current-row
          style="width: 100%;"
          height="180"
        >
          <el-table-column
            label="序号"
            type="index"
            width="50"
          />
          <el-table-column
            label="申购单号"
            width="120"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.orderID" placeholder="请输入内容" @focus="selectOrder(scope.$index)" />
            </template>
          </el-table-column>
          <el-table-column
            property="productCode"
            label="产品编号"
            width="120"
          />
          <el-table-column
            property="productName"
            label="产品名称"
          />
          <el-table-column
            property="specificationModels"
            label="规格型号"
          />
          <el-table-column
            property="unit"
            label="单位"
          />
          <el-table-column
            label="领用数量"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.collaruseNumber" :placeholder="scope.row.num" />
            </template>
          </el-table-column>
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
    </div>
    <!--申购列表-->
    <div v-if="!switcherTab" style="height: 100%; overflow: hidden">
      <div class="comTitle">
        申购单列表
        <el-button type="primary" class="fr" icon="el-icon-back" round @click="switcherTab = true">返回</el-button>
      </div>
      <!--@current-change="handleCurrentChange"-->
      <el-table
        :data="subscribeOrderList"
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          label="序号"
          type="index"
          width="50"
        />
        <el-table-column
          property="orderID"
          label="申购单号"
          width="120"
        />
        <el-table-column
          property="productCode"
          label="产品编号"
          width="120"
        />
        <el-table-column
          property="productName"
          label="产品名称"
        />
        <el-table-column
          property="specificationModels"
          label="规格型号"
        />
        <el-table-column
          property="unit"
          label="单位"
        />
        <el-table-column
          property="negotiable"
          label="单价"
        />
        <el-table-column
          property="num"
          label="领用数量"
        />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button type="primary" icon="el-icon-plus" circle align="center" size="small" @click="addToClaim(row)" />
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
import dailyClaimApi from '@/api/claims/daily-claim'
export default {
  comments: {},
  data() {
    return {
      selectIndex: '',
      subscribeOrderList: [ // 申购单列表
        { orderID: '', // 申购单号
          productCode: '', // 产品编号
          productName: '', // 产品名称
          specificationModels: '', // 规格型号
          unit: '', // 单位
          negotiable: '', // 单价
          num: '' // 领用数量
        }
      ],
      listQuery: { // 查询条件
        'Page.Size': 5,
        'Page.Index': 1,
        'Page.Sort': '',
        OrderID: ''
      },
      switcherTab: true, // 切换表单true--显示领用产品明细；false--显示申领单列表
      dialogTitle: '', // 弹窗标题
      dialogVisible: '', // 显示弹窗
      claim: { // 请领单初始数据
        acquisition: '', // 领用仓库
        purposes: '', // 领用用途
        claimdepartment: '', // 申领部门
        usetime: '', // 使用时间
        consignee: '', // 收货人
        dateofArrival: '', // 期望到货日期
        detal: [] // 订单详情数组
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
        productName: '', // 产品名称
        collaruseNumber: '', // 领用数量
        unit: '', // 单位
        orderID: '', // 申购单号
        productCode: '', // 产品编号
        no: '', // 序号
        specificationModels: '' // 规格型号
      }
      this.claim.detal.push(row)
    },
    // 获取申购单列表
    getRequisitionList() {
      dailyClaimApi.getRequisitionList(this.listQuery).then(response => {
        var that = this
        console.log('response232', response)
        if (response.code === 1) {
          this.subscribeOrderList = response.data.rows
        } else {
          that.$message({
            message: '订单' + this.order.id + '取消失败！',
            type: 'warning'
          })
        }
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    // 选择订单
    selectOrder(index) {
      this.selectIndex = index
      this.switcherTab = false
      this.getRequisitionList()
    },
    // 添加到采购
    addToClaim(row) {
      var that = this
      for (var i = 0; i < this.claim.detal.length; i++) {
        if (that.claim.detal[i].id === row.id) {
          that.$message({
            message: '该商品已在领用列表！',
            type: 'warning'
          })
          return
        }
      }
      var arr = {
        batchNumber: '',
        productName: row.productName,
        collaruseNumber: '',
        realcollarNumber: '',
        flow: 0,
        unit: row.unit,
        orderID: row.orderID,
        productCode: row.productCode,
        no: row.no,
        specificationModels: row.specificationModels
      }
      this.claim.detal[that.selectIndex] = arr
      console.log('this.claim', this.claim)
      this.switcherTab = true
    },
    // 限制数量
    limitSum(index) {
      var that = this
      const c = this.claimList[index].collaruseNumber
      const n = this.claimList[index].num
      if (c > n) {
        that.$message({
          message: '超过最大范围！',
          type: 'warning'
        })
        that.claimList[index].collaruseNumber = n
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
