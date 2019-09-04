<template>
  <div class="steps" :style="{width: w+'px'}">
    <div v-for="(item,index) in steps" :key="index" class="step fl">
      <div class="fl icon">
        <img v-if="curStep === item.stepDot" :src="item.curUrl">
        <img v-else="curStep !== item.stepDot" :src="item.noCurUrl">
        <p>{{ item.stepName }}</p>
      </div>
      <img v-if="index !== steps.length-1" class="fl" style="margin-right: 30px; margin-top: 5px" src="@/icons/image/process/arrows-r.png">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Steps',
  props: {
    steps: Array,
    curStep: Number,
    w: Number
  }
}
</script>

<style lang="stylus" scoped>
.steps
  overflow hidden
  margin auto
  margin-bottom 10px
  .step
    .icon
      margin-right 30px
      text-align center
</style>
