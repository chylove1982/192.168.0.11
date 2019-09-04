<template>
  <div class="title">
    {{ title }}
    <slot></slot>
    <span class="sub">{{ subtitle }}</span>
    <slot name="append" />
  </div>
</template>

<script>
export default {
  name: 'SuperTitle',
  props: {
    title: {
      type: String,
      require: true
    },
    subtitle: String
  }
}
</script>

<style lang="stylus" scoped>
.title
  height 60px;
  line-height 60px;
  background-color #ffffff;
  padding 0px 16px;
  margin-bottom 10px;
  .sub
    font-size 12px;
    margin-left 10px;
</style>
