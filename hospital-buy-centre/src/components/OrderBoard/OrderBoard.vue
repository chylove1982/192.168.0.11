<template>
  <div class="container">
    <div class="fl board_left">
      <h4>{{ boardFace.title }}</h4>
      <div class="total">
        <p>总金额</p>
        <p>订单数</p>
      </div>
    </div>
    <div class="boardList fl">
      <div v-for="(item,index) in arr" :key="index" class="item fl">
        <img :src="boardFace.icons[index]">
        <p>{{ item.text }}</p>
        <p class="currentColor">{{ item.totalMoney }}</p>
        <p class="currentColor">{{ item.totalnum }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderBoard',
  props: {
    arr: Array,
    boardFace: Object
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/variables.scss';
  .container{
    overflow: hidden;
    background-color: #ffffff;
    padding: 20px;
    margin-bottom: 20px;
  }
  .board_left{
    width: 20%;
    position: relative;
    height: 152px;
    text-align: right;
    .total{
      position: absolute;
      bottom: 0px;
      width: 100%;
      font-weight: bold;
      color: #909399;
    }
  }
  .boardList{
    width: 80%;
    .currentColor{
      color: $currentColor;
      font-weight: bold;
    }
    .item{
      text-decoration: none;
      text-align: center;
      width: 20%;
    }
  }
</style>
