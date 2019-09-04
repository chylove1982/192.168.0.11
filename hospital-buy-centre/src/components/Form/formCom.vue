<template>
  <el-form :ref="form" :label-position="config!==undefined&&config.labelPosition!==undefined?config.labelPosition:'right'" class="comCon" :model="form" :label-width="config!==undefined&&config.labelWidth!==undefined?config.labelWidth:'130px'" :rules="rules">
    <template v-for="(item,index) in formface">
      <!--输入-->
      <el-form-item v-if="Object.is(item.controltype,undefined)||item.controltype === 'input'" :label="item.chinese" :class="[Object.is(config&&config.form&&config.form[index],undefined)?'info':config.form[index].className]" :prop="item.english">
        <el-input v-model="newForm[item.english]" placeholder="请您填写" :disabled="!item.enabled" />
      </el-form-item>
      <!--时间-->
      <el-form-item v-if="item.controltype === 'date'" :label="item.chinese" :class="[Object.is(config&&config.form&&config.form[index],undefined)?'info':config.form[index].className]" :prop="item.english">
        <el-date-picker v-model="newForm[item.english]" type="date" placeholder="选择日期" :disabled="!item.enabled" style="width: 100%;" />
      </el-form-item>
      <!--时间区间-->
      <el-form-item v-if="item.controltype === 'daterange'" :label="item.chinese" :class="[Object.is(config&&config.form&&config.form[index],undefined)?'info':config.form[index].className]" :prop="item.english">
        <!--<el-date-picker v-model="newForm[item.english]" type="date" placeholder="选择日期" :disabled="!item.enabled" style="width: 100%;" />-->
        <el-date-picker
          v-model="newForm[item.english]"
          type="daterange"
          width="280"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <!--下拉-->
      <el-form-item v-if="item.controltype === 'select'" :label="item.chinese" :class="[Object.is(config&&config.form&&config.form[index],undefined)?'info':config.form[index].className]" :prop="item.english">
        <el-select v-model="newForm[item.english]" placeholder="请选择" :disabled="!item.enabled">
          <el-option v-for="(options,index) in item.arr" :key="index" :label="options.label" :value="options.value" />
        </el-select>
      </el-form-item>
      <!--switch切换-->
      <el-form-item v-if="item.controltype === 'switch'" :label="item.chinese" :class="[Object.is(config&&config.form&&config.form[index],undefined)?'info':config.form[index].className]" :prop="item.english">
        <el-switch v-model="newForm[item.english]" :disabled="!item.enabled" />
      </el-form-item>
      <!--多选组件-->
      <el-form-item v-if="item.controltype === 'checkbox'" :label="item.chinese" :class="[Object.is(config&&config.form&&config.form[index],undefined)?'info':config.form[index].className]" :prop="item.english">
        <el-checkbox-group v-model="newForm[item.english]">
          <el-checkbox v-for="(check,index) in item.arr" :key="index" :label="check.label" :name="check.name" :disabled="!item.enabled" />
        </el-checkbox-group>
      </el-form-item>
      <!--单选-->
      <el-form-item v-if="item.controltype === 'radio'" :label="item.chinese" :class="[Object.is(config&&config.form&&config.form[index],undefined)?'info':config.form[index].className]" :prop="item.english">
        <el-radio-group v-model="newForm[item.english]">
          <el-radio v-for="(radio,index) in item.arr" :key="index" :label="radio.label" :disabled="!item.enabled" />
        </el-radio-group>
      </el-form-item>
      <!--文本域-->
      <el-form-item v-if="item.controltype === 'textarea'" :label="item.chinese" :class="[Object.is(config&&config.form&&config.form[index],undefined)?'info':config.form[index].className]" :prop="item.english">
        <el-input v-model="newForm[item.english]" type="textarea" :disabled="!item.enabled" />
      </el-form-item>
      <!--图片上传-->
      <el-form-item v-if="item.controltype === 'imageUpload'" :label="item.chinese" :class="[Object.is(config&&config.form&&config.form[index],undefined)?'info':config.form[index].className]" :prop="item.english">
        <el-upload
          class="upload-demo"
          action="http://192.168.1.105:18098/upload/spdservice"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-upload="beforeAvatarUpload"
          :file-list="newForm[item.fileList]"
          list-type="picture"
        >
          <el-button size="small" type="primary">上传文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <!--证件上传-->
      <el-form-item v-if="item.controltype === 'papersUpload'" :label="item.chinese" :class="[Object.is(config&&config.form&&config.form[index],undefined)?'infoRow':config.form[index].className]" :prop="item.english">
        <el-upload
          class="avatar-uploader fl"
          enctype="multipart/form-data"
          multiple
          name="files"
          :action="custom_config.UPLOAD_FILES"
          :show-file-list="false"
          :on-success="frontSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="frontUrl" :src="frontUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon">
            上传正面
          </i>
          <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
        </el-upload>
        <el-upload
          class="avatar-uploader fl"
          enctype="multipart/form-data"
          multiple
          name="files"
          action="http://192.168.1.105:18098/upload/spdservice"
          :show-file-list="false"
          :on-success="reverseSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="reverseUrl" :src="reverseUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon">
            上传反面
          </i>
        </el-upload>
        <!--<el-upload-->
        <!--class="upload-demo"-->
        <!--action=""-->
        <!--:http-request="uploadImage"-->
        <!--:on-preview="handlePreview"-->
        <!--:on-remove="handleRemove"-->
        <!--:before-upload="beforeAvatarUpload"-->
        <!--:file-list="newForm[item.papers.front]"-->
        <!--list-type="picture"-->
        <!--&gt;-->
        <!--<el-button size="small" type="primary">上传正面</el-button>-->
        <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
        <!--</el-upload>-->
        <!--<el-upload-->
        <!--class="upload-demo"-->
        <!--action=""-->
        <!--:http-request="uploadImage"-->
        <!--:on-preview="handlePreview"-->
        <!--:on-remove="handleRemove"-->
        <!--:before-upload="beforeAvatarUpload"-->
        <!--:file-list="newForm[item.papers.reverse]"-->
        <!--list-type="picture"-->
        <!--&gt;-->
        <!--<el-button size="small" type="primary">上传反面</el-button>-->
        <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
        <!--</el-upload>-->
      </el-form-item>
      <!--popover弹窗-->
      <el-form-item v-if="item.controltype === 'popover'" :label="item.chinese" :class="[Object.is(config&&config.form&&config.form[index],undefined)?'info':config.form[index].className]" :prop="item.english">
        <el-popover
          placement="bottom"
          title="标题"
          trigger="click"
        >
          <slot name="icons" />
          <el-input slot="reference" v-model="newForm[item.english]" placeholder="请输入内容">
            <!--<el-button slot="prepend" icon="el-icon-delete" />-->
            <el-button slot="prepend" style="width: 55px; height: 35px;">
              <svg-icon v-if="tag === 'svg'" :icon-class="newForm[item.english]" />
              <i v-if="tag === 'el'" :class="newForm[item.english]" />
            </el-button>
            <!--<el-button slot="append">选择图标</el-button>-->
            <el-button slot="append">选择图标</el-button>
          </el-input>
          <!--<el-button >选择图标</el-button>-->
        </el-popover>
      </el-form-item>
    </template>
  </el-form>
</template>
<script>
import rules from '@/utils/rules.js' // 引入验证规则
import custom_config from '@/custom_config' // 自定义config配置

export default {
  name: 'FormCom',
  props: {
    config: Object,
    formface: Array,
    form: Object
  },
  data() {
    return {
      rules: {},
      newForm: this.form,
      tag: '',
      frontUrl: '',
      reverseUrl: '',
      custom_config: custom_config
    }
  },
  watch: {
    frontUrl: function() {
      this.$emit('changeFrontUrl', this.frontUrl)
    },
    reverseUrl: function() {
      this.$emit('changeReverseUrl', this.reverseUrl)
    },
    form() {
      this.newForm = this.form
    }
  },
  created() {
    console.log(1233333)
  },
  beforeDestroy() {
    this.bus.$off('selectIcon', this.handle)
  },
  mounted: function() {
    this.bus.$on('selectIcon', this.handle)
  },
  created() {
    this.setRules()
  },
  methods: {
    // 图片正面上传成功后
    frontSuccess(res, file) {
      console.log('res', res)
      // this.frontUrl = URL.createObjectURL(file.raw)
      this.frontUrl = this.custom_config.FILES_URL + res[0]
    },
    // 图片正面上传成功后
    reverseSuccess(res, file) {
      // this.reverseUrl = URL.createObjectURL(file.raw)
      this.reverseUrl = this.custom_config.FILES_URL + res[0]
    },
    // 上传图片之前先判断图片大小尺寸
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handle({ text, tag }) {
      this.newForm.icon = text
      this.tag = tag
    },
    initForm() {
      console.log(2)
      this.newForm.icon = ''
    },
    // 添加规则
    setRules() {
      this.rules = rules.createRules(this.formface)
    },
    // 生成form对象
    // getForm() {
    //   var arr = this.session
    //   var form = {}
    //   for (var i = 0; i < arr.length; i++) {
    //     if (arr[i].controltype === 'checkbox') {
    //       form[arr[i].field] = []
    //     } else if (arr[i].controltype === 'switch') {
    //       form[arr[i].field] = false
    //     } else {
    //       form[arr[i].field] = ''
    //     }
    //   }
    //   console.log('form2', form)
    //   return form
    // },
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-date-editor--daterange.el-input__inner{
    width: 100%;
  }
  .avatar-uploader{
    margin-right: 20px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 18px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px #ccc dotted;
    display: inline-block;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
