<template>
  <temii-container scrollbar>
    <temii-box-row height="400px">
      <temii-box-col :span="12">
        <top-left/>
      </temii-box-col>
      <temii-box-col :span="12">
        <top-right/>
      </temii-box-col>
    </temii-box-row>
    <temii-box-row height="500px">
      <temii-box-col :span="24">
        <bottom/>
      </temii-box-col>
    </temii-box-row>
  </temii-container>
</template>
<script>
import page from './page'
import TopLeft from './components/top-left'
import TopRight from './components/top-right'
import Bottom from './components/bottom'
export default {
  name: page.name,
  components: { TopLeft, TopRight, Bottom }
}
</script>
