<template>
  <div class="icons-container">
    <el-tabs type="border-card">
      <el-tab-pane label="Icons">
        <div v-for="item of svgIcons" :key="item" @click.stop.prevent="handleClipboard(generateIconCode(item),'svg')">
          <el-tooltip placement="top">
            <div slot="content">
              {{ generateIconCode(item) }}
            </div>
            <div class="icon-item">
              <svg-icon :icon-class="item" class-name="disabled" />
              <span>{{ item }}</span>
            </div>
          </el-tooltip>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Element-UI Icons">
        <div v-for="item of elementIcons" :key="item" @click.stop.prevent="handleClipboard(generateElementIconCode(item),'el')">
          <el-tooltip placement="top">
            <div slot="content">
              {{ generateElementIconCode(item) }}
            </div>
            <div class="icon-item">
              <i :class="'el-icon-'+item" />
              <span>{{ item }}</span>
            </div>
          </el-tooltip>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import svgIcons from './svg-icons'
import elementIcons from './element-icons'
export default {
  data() {
    return {
      svgIcons,
      elementIcons
    }
  },
  methods: {
    generateIconCode(symbol) {
      // return `<svg-icon icon-class="${symbol}" />`
      // return `icon-class="${symbol}"`
      return `${symbol}`
    },
    generateElementIconCode(symbol) {
      // return `<i class="el-icon-${symbol}" />`
      return `el-icon-${symbol}`
    },
    handleClipboard(text, tag) {
      this.bus.$emit('selectIcon', { text, tag })
    }
  }
}
</script>

<style lang="scss" scoped>
  .icons-container {
    margin: 10px 20px 0;
    overflow: auto;
    .el-tab-pane{
      height: 350px;
      width: 597px;
      overflow: auto;
    }
    .icon-item {
      margin: 20px;
      height: 53px;
      text-align: center;
      width: 76px;
      float: left;
      font-size: 16px;
      color: #24292e;
      cursor: pointer;
    }

    span {
      display: block;
      font-size: 16px;
      margin-top: 10px;
    }

    .disabled {
      pointer-events: none;
    }
  }
</style>

