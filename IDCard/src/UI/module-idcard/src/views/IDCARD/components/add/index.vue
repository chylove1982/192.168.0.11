<template>
  <nm-form-dialog ref="form" v-bind="form" v-on="on" :visible.sync="visible_">
    <el-row>
      <el-col :span="20" :offset="1">
        <el-form-item label="项目ID：" prop="projectId">
          <el-input v-model="form.model.projectId" clearable/>
        </el-form-item>
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="form.model.name" clearable/>
        </el-form-item>
        <el-form-item label="性别：" prop="sex">
          <el-input v-model="form.model.sex" clearable/>
        </el-form-item>
        <el-form-item label="民族：" prop="minzu">
          <el-input v-model="form.model.minzu" clearable/>
        </el-form-item>
        <el-form-item label="生日：" prop="barthDay">
          <el-input v-model="form.model.barthDay" clearable/>
        </el-form-item>
        <el-form-item label="地址：" prop="address">
          <el-input v-model="form.model.address" clearable/>
        </el-form-item>
        <el-form-item label="身份证号码：" prop="cardNum">
          <el-input v-model="form.model.cardNum" clearable/>
        </el-form-item>
        <el-form-item label="签发机关：" prop="govement">
          <el-input v-model="form.model.govement" clearable/>
        </el-form-item>
        <el-form-item label="签发日期：" prop="explaintS">
          <el-input v-model="form.model.explaintS" clearable/>
        </el-form-item>
        <el-form-item label="截止日期：" prop="explaintE">
          <el-input v-model="form.model.explaintE" clearable/>
        </el-form-item>
        <el-form-item label="照片：" prop="photo">
          <el-input v-model="form.model.photo" clearable/>
        </el-form-item>
      </el-col>
    </el-row>
  </nm-form-dialog>
</template>
<script>
import api from '../../../../api/IDCARD'
import { mixins } from 'nm-lib-skins'
export default {
  mixins: [mixins.dialog],
  data () {
    return {
      form: {
        title: '添加IDCARD',
        icon: 'add',
        action: api.add,
        model: {
          /** 项目ID */
          projectId: '',
          /** 姓名 */
          name: '',
          /** 性别 */
          sex: '',
          /** 民族 */
          minzu: '',
          /** 生日 */
          barthDay: '',
          /** 地址 */
          address: '',
          /** 身份证号码 */
          cardNum: '',
          /** 签发机关 */
          govement: '',
          /** 签发日期 */
          explaintS: '',
          /** 截止日期 */
          explaintE: '',
          /** 照片 */
          photo: ''
        },
        rules: {
        }
      },
      on: {
        success: this.onSuccess,
        open: this.onOpen
      }
    }
  },
  methods: {
    onSuccess () {
      this.$emit('success')
    },
    onOpen () {
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
    }
  }
}
</script>
