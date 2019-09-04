<template>
  <!--<div class="app-container documentation-container">-->
  <!--<a-->
  <!--class="document-btn"-->
  <!--target="_blank"-->
  <!--&gt;扫码收获</a>-->
  <!--<a-->
  <!--class="document-btn"-->
  <!--target="_blank"-->
  <!--&gt;手动收货</a>-->
  <!--</div>-->
  <div class="container">
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="wrapper">
          <router-link to="/store/sanCode-out">
            <span class="iconfont icon-saoma" />
            <!--<svg-icon class="icon-saoma icon" />-->
            扫码出库
          </router-link>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="wrapper">
          <router-link to="/store/manual-out">
            <span class="iconfont icon-backup-hm" />
            手动出库
          </router-link>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
  .container
    padding 32px
    background-color rgb(240, 242, 245)
    height calc(100vh - 100px)
    /*.documentation-container*/
    /*margin 50px*/
    /*border 1px solid red*/
    /*.document-btn*/
    /*float left*/
    /*display block*/
    /*cursor pointer*/
    /*background black*/
    /*color white*/
    /*height 120px*/
    /*width 46%*/
    /*margin 0 2%*/
    /*padding 30px 20px*/
    /*box-sizing border-box*/
    /*border 1px solid red*/
    /*font-size 20px*/
    /*text-align center*/
    .wrapper
      background black
      margin-bottom 32px
      height 100px
      line-height 100px
      color #fafafa
      font-size 20px
      text-align center
      cursor pointer
      .iconfont
        font-size 20px

</style>
