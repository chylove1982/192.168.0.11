(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-2d0aa7f4"],{"10ed":function(t,e,a){"use strict";a.r(e);var o=a("630e"),i={data:function(){return{chart:null,date:[]}},computed:{options:function(){return{tooltip:{},legend:{data:["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]},xAxis:{data:["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]},yAxis:{},series:[{name:"衬衫",type:"bar",barGap:"-100%",itemStyle:{normal:{color:"#C1232B"}},data:[5,0,0,0,0,0]},{name:"羊毛衫",type:"bar",barGap:"-100%",itemStyle:{normal:{color:"#B5C334"}},data:[0,20,0,0,0,0]},{name:"雪纺衫",type:"bar",barGap:"-100%",itemStyle:{normal:{color:"#FCCE10"}},data:[0,0,36,0,0,0]},{name:"裤子",type:"bar",barGap:"-100%",itemStyle:{normal:{color:"#E87C25"}},data:[0,0,0,10,0,0]},{name:"高跟鞋",type:"bar",barGap:"-100%",itemStyle:{normal:{color:"#27727B"}},data:[0,0,0,0,10,0]},{name:"袜子",type:"bar",barGap:"-100%",itemStyle:{normal:{color:"#FE8463"}},data:[0,0,0,0,0,20]},{name:"访问来源",type:"pie",radius:"28%",center:["75%","35%"],data:[{value:5,name:"衬衫",itemStyle:{color:"#C1232B"}},{value:20,name:"羊毛衫",itemStyle:{color:"#B5C334"}},{value:36,name:"雪纺衫",itemStyle:{color:"#FCCE10"}},{value:10,name:"裤子",itemStyle:{color:"#E87C25"}},{value:10,name:"高跟鞋",itemStyle:{color:"#27727B"}},{value:20,name:"袜子",itemStyle:{color:"#FE8463"}}],itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]}}},methods:{init:function(){var t=this.$echarts.init(this.$refs.chart);this.chart=t,this.chart.setOption(this.options),window.addEventListener("resize",function(){t.resize()})}},mounted:function(){this.init()}},r=a("2877"),n=Object(r.a)(i,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("nm-box",{attrs:{header:"",title:"饼图",icon:"chart-pie"},scopedSlots:e._u([{key:"toolbar-before",fn:function(){return[a("el-date-picker",{staticStyle:{width:"221px !important"},attrs:{size:"mini",type:"daterange",align:"right",valueFormat:"yyyy-MM-dd","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}})]},proxy:!0},{key:"toolbar",fn:function(){return[a("nm-button",{attrs:{icon:"refresh"}})]},proxy:!0}])},[a("div",{ref:"chart",staticStyle:{width:"100%",height:"100%"}})])},[],!1,null,null,null).exports,l={data:function(){return{chart:null,date:[]}},computed:{options:function(){return{backgroundColor:"#FFF",grid:{top:"9%",bottom:"19%",left:"6%",right:"4%"},tooltip:{trigger:"axis",label:{show:!0}},xAxis:{boundaryGap:!0,axisLine:{show:!1},splitLine:{show:!1},axisTick:{show:!1,alignWithLabel:!0},data:["武汉","襄阳","黄冈","荆门","十堰","随州","鄂州","恩施","宜昌","孝感","咸宁","仙桃","潜江","天门","黄石","荆州","神农架"]},yAxis:{axisLine:{show:!1},splitLine:{show:!0,lineStyle:{type:"dashed",color:"rgba(33,148,246,0.2)"}},axisTick:{show:!1},splitArea:{show:!0,areaStyle:{color:"rgb(245,250,254)"}}},series:[{type:"line",symbol:"circle",symbolSize:7,lineStyle:{color:"rgb(33,148,246)",shadowBlur:12,shadowColor:"rgb(33,148,246,0.9)",shadowOffsetX:1,shadowOffsetY:1},itemStyle:{color:"rgb(33,148,246)",borderWidth:1,borderColor:"#FFF"},label:{show:!1,distance:1,emphasis:{show:!0,offset:[25,-2],color:"#FFF",padding:[8,20,8,6],height:36,formatter:function(t){return t.name+"\n数据量："+t.data},rich:{bg:{width:78,color:"#FFF",padding:[20,0,20,10]},br:{width:"100%",height:"100%"}}}},data:[2e3,1800,2800,900,1600,2e3,3e3,2030,1356,1900,4e3,3e3,2e3,3e3,4200,3200,3800]}]}}},methods:{init:function(){var t=this.$echarts.init(this.$refs.chart);this.chart=t,this.chart.setOption(this.options),window.addEventListener("resize",function(){t.resize()})}},mounted:function(){this.init()}},s=Object(r.a)(l,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("nm-box",{attrs:{header:"",title:"折线图",icon:"chart-line"},scopedSlots:e._u([{key:"toolbar-before",fn:function(){return[a("el-date-picker",{staticStyle:{width:"221px !important"},attrs:{size:"mini",type:"daterange",align:"right",valueFormat:"yyyy-MM-dd","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}})]},proxy:!0},{key:"toolbar",fn:function(){return[a("nm-button",{attrs:{icon:"refresh"}})]},proxy:!0}])},[a("div",{ref:"chart",staticStyle:{width:"100%",height:"100%"}})])},[],!1,null,null,null).exports,c={data:function(){return{chart:null,date:[],xData:["芝罘区","福山区","莱山区","牟平区","海阳市","莱阳市","蓬莱市","栖霞市","龙口市","长岛县","招远市","莱州市","开发区","高新区","昆嵛山","龙海","机场","核电"],y1Data:[10758,3975,2980,1831,2122,3018,3525,1729,2764,380,3988,2333,3596,453,365,9,67,48],y2Data:[28,4.4,5.9,.9,.7,1.1,2.1,.4,1.9,3.8,1.6,.7,5.7,6.1]}},computed:{options:function(){return{grid:{left:"5%",right:"5%",top:"20%",bottom:"10%"},title:{show:!1},tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},legend:{data:["监控数量","监控密度"],right:"3%",top:"5%",itemWidth:11,itemHeight:11,textStyle:{fontSize:13}},toolbox:{show:!1},xAxis:[{type:"category",boundaryGap:!0,show:!0,axisTick:{show:!1},axisLabel:{fontSize:15,margin:8,interval:0,formatter:function(t){return t.split("").join("\n")}},axisLine:{lineStyle:{type:"solid",color:"#4e608b",width:"1"}},data:this.xData}],yAxis:[{type:"value",scale:!0,name:"",axisLine:{show:!1},splitNumber:4,axisTick:{show:!1},splitLine:{lineStyle:{color:"#4e608b"}},axisLabel:{fontSize:13,margin:12},max:12e3,min:0,boundaryGap:[.2,.2]},{type:"value",scale:!0,axisLine:{show:!1},splitNumber:3,axisTick:{show:!1},axisLabel:{fontSize:13,margin:12},splitLine:{lineStyle:{color:"#4e608b"}},name:"",max:30,min:0,boundaryGap:[.2,.2]}],series:[{name:"监控数量",type:"bar",label:{normal:{show:!0,position:"top",textStyle:{color:"#1dacfe"}}},itemStyle:{normal:{color:new echarts.graphic.LinearGradient(0,1,0,0,[{offset:0,color:"#4889fb"},{offset:1,color:"#15b3ff"}],!1)}},barWidth:"40%",yAxisIndex:0,data:this.y1Data},{name:"监控密度",yAxisIndex:1,color:"#ffd300",label:{normal:{show:!0,position:"top",textStyle:{color:"#ffd300"}}},lineStyle:{color:"#ffd300"},type:"line",data:this.y2Data}]}}},methods:{init:function(){var t=this.$echarts.init(this.$refs.chart);this.chart=t,this.chart.setOption(this.options),window.addEventListener("resize",function(){t.resize()})}},mounted:function(){this.init()}},d=Object(r.a)(c,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("nm-box",{attrs:{header:"",title:"柱状图",icon:"chart-bar"},scopedSlots:e._u([{key:"toolbar-before",fn:function(){return[a("el-date-picker",{staticStyle:{width:"221px !important"},attrs:{size:"mini",type:"daterange",align:"right",valueFormat:"yyyy-MM-dd","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}})]},proxy:!0},{key:"toolbar",fn:function(){return[a("nm-button",{attrs:{icon:"refresh"}})]},proxy:!0}])},[a("div",{ref:"chart",staticStyle:{width:"100%",height:"100%"}})])},[],!1,null,null,null).exports,h={name:o.default.name,components:{TopLeft:n,TopRight:s,Bottom:d}},p=Object(r.a)(h,function(){var t=this.$createElement,e=this._self._c||t;return e("nm-container",{attrs:{scrollbar:""}},[e("nm-box-row",{attrs:{height:"400px"}},[e("nm-box-col",{attrs:{span:12}},[e("top-left")],1),e("nm-box-col",{attrs:{span:12}},[e("top-right")],1)],1),e("nm-box-row",{attrs:{height:"500px"}},[e("nm-box-col",{attrs:{span:24}},[e("bottom")],1)],1)],1)},[],!1,null,null,null);e.default=p.exports}}]);