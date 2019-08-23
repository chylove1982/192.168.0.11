<template>
  <temii-dialog v-bind="dialog" @open="onOpen" :visible.sync="visible_">
    <el-tabs class="temii-dialog-tabs" v-model="tab" type="card" @tab-click="setProps">
      <el-tab-pane name="node">
        <span slot="label">
          <temii-icon name="node"/>节点
        </span>
        <node-menu ref="node" :parent="parent" :sort="sort" v-on="on"/>
      </el-tab-pane>
      <el-tab-pane name="route">
        <span slot="label">
          <temii-icon name="link"/>路由菜单
        </span>
        <route-menu ref="route" :parent="parent" :sort="sort" v-on="on"/>
      </el-tab-pane>
      <el-tab-pane name="link">
        <span slot="label">
          <temii-icon name="transmit"/>链接菜单
        </span>
        <link-menu ref="link" :parent="parent" :sort="sort" v-on="on"/>
      </el-tab-pane>
    </el-tabs>
    <template v-slot:footer>
      <temii-button text="添加" type="success" @click="onSubmit"/>
      <temii-button text="重置" type="info" @click="onReset"/>
    </template>
  </temii-dialog>
</template>
<script>
import { mixins } from 'temii-lib-skins'
import NodeMenu from './components/node'
import RouteMenu from './components/route'
import LinkMenu from './components/link'
export default {
  mixins: [mixins.dialog],
  components: { NodeMenu, RouteMenu, LinkMenu },
  data() {
    return {
      tab: 'node',
      dialog: {
        footer: true,
        title: '添加菜单',
        icon: 'add',
        width: '60%',
        class: 'temii-admin-menu-add',
        loading: false
      },
      on: {
        success: this.onSuccess,
        error: this.onError,
        'validate-error': this.onValidateError
      }
    }
  },
  props: ['parent', 'sort'],
  methods: {
    onSubmit() {
      this.dialog.loading = true
      this.$refs[this.tab].submit()
    },
    onReset() {
      this.$nextTick(() => {
        this.$refs[this.tab].reset()
      })
    },
    setProps() {
      this.$refs[this.tab].setProps()
    },
    onSuccess() {
      this.dialog.loading = false
      this.$emit('success')
    },
    onError() {
      this.dialog.loading = false
    },
    onValidateError() {
      this.dialog.loading = false
    },
    onOpen() {
      this.onReset()
    }
  }
}
</script>
<style lang="scss">
.temii-admin-menu-add {
  .el-scrollbar__view {
    padding: 0 !important;
  }
}
</style>
