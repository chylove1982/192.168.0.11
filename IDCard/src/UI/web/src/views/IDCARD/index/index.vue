<template>
  <nm-container>
    <nm-list ref="list" v-bind="list">
      <!--查询条件-->
      <template v-slot:querybar>
        <el-form-item label="项目ID：" prop="projectId">
          <el-input v-model="list.model.projectId" clearable/>
        </el-form-item>

        <el-form-item label="身份证号码：" prop="cardNum">
          <el-input v-model="list.model.cardNum" clearable/>
        </el-form-item>


      </template>

      <!--按钮-->
      <template v-slot:querybar-buttons>
        <nm-button-has :options="buttons.add" @click="add" />
      </template>

      <!--自定义列-->
      <template v-slot:col-photo="{row}">
        <img  :src="'data:image/png;base64,'+row.photo"/>
      </template>

      <!--操作列-->
      <template v-slot:col-operation="{row}">
        <nm-button-has :options="buttons.edit" @click="edit(row)" />
        <nm-button-delete :options="buttons.del" :id="row.id" :action="removeAction" @success="refresh"/>
      </template>
    </nm-list>

    <!--添加-->
    <add-page :visible.sync="dialog.add" @success="refresh"/>
    <!--编辑-->
    <edit-page :id="curr.id" :visible.sync="dialog.edit" @success="refresh"/>
  </nm-container>
</template>
<script>
import api from '../../../api/IDCARD'
import page from './page'
import cols from './cols'
import AddPage from '../components/add'
import EditPage from '../components/edit'

export default {
  name: page.name,
  components: { AddPage, EditPage },
  data () {
    return {
      curr: { id: '' },
      list: {
        title: page.title,
        cols,
        action: api.query,
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
          photo: '',
          /** 创建人 */
          createdBy: '',
          /** 创建时间 */
          createdTime: ''
        }
      },
      removeAction: api.remove,
      dialog: {
        add: false,
        edit: false
      },
      buttons: page.buttons
    }
  },
  methods: {
    refresh () {
      this.$refs.list.refresh()
    },
    add () {
      this.dialog.add = true
    },
    edit (row) {
      this.curr = row
      this.dialog.edit = true
    }
  }
}
</script>
