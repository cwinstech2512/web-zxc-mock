<template>
<div class='help'>
<div class="help-main">
    <div class="help-tit"></div>
    <div class="help-box">
      <div class="help-nav">
        <ul>
          <li
            :class="{on: index == navActive}"
            v-for="(nav, index) in helpNav"
            :key="index"
            @click="navToggle(nav.code,index)"
          >
            {{nav.name}}
          </li>
        </ul>
      </div>
      <div class="help-bd">
       <router-view/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'help',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
      navActive: 0,
      helpNav: [
        {
          name: '新手帮助',
          code: 'new'
        },
        {
          name: '规则条款',
          code: 'rul'
        },
        {
          name: '隐私政策',
          code: 'pri'
        },
        {
          name: '理性博彩',
          code: 'rea'
        }
      ]
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {
    $route () {
      let name = this.$route.name
      switch (name) {
        case 'new':
          this.navActive = 0
          break
        case 'rul':
          this.navActive = 1
          break
        case 'pri':
          this.navActive = 2
          break
        case 'rea':
          this.navActive = 3
          break
        default:
          break
      }
    }
  },
  //  方法集合
  methods: {
    navToggle (code, index) {
      this.navActive = index
      this.$router.push('/help/' + code)
    },
    getRouter () {
      this.navActive = this.$route.query.page
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    if (this.$route.query.page) {
      this.getRouter()
    } else {
      this.navActive = 0
      this.$router.push('/help/new')
    }
  }
}
</script>
<style scoped>
.help{
  width: 100%;
  height: 972px;
  margin: 0 auto;
  background: url(../../../assets/images/SubPage/bg.jpg) no-repeat center;
  background-size: cover;
}
.help .help-main {
  width: 1200px;
  padding-top: 50px;
  margin: 0 auto;
}
.help .help-main .help-tit {
  width: 800px;
  height: 66px;
  background: url(../../../assets/images/user/user_title.png) center no-repeat;
  background-position: 0 -198px;
  margin: 0 auto;
}
.help .help-main .help-box {
  width: 1200px;
  padding: 40px 40px 80px 40px;
  box-sizing: border-box;
  margin-top: 40px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
}
.help .help-box .help-nav{
  width: 100%;
  height: 48px;
  padding: 10px 0;
  overflow: hidden;
}
.help .help-box .help-nav ul{
  width: 1140px;
  margin: 0 auto;
}
.help .help-box .help-nav ul li{
  float: left;
  width: 152px;
  line-height: 48px;
  font-size: 18px;
  text-align: center;
  color: #333;
  cursor: pointer;
}
.help .help-box .help-nav ul li:hover{
  color: #0088ff
}
.help .help-box .help-nav ul li.on{
  background: #00a2ff;
  box-shadow: 0px 3px 6px 0px rgba(0, 162, 255, 0.4);
  border-radius: 50px;
  color: #fff;
}
.help .help-box .help-nav ul li a{
  display: block;
  width: 100%;
  height: 100%;
  font-size: 18px;
}
.help .help-box .help-bd{
  width: 100%;
  height: 500px;
  overflow: auto;
}
.help .help-box .help-bd::-webkit-scrollbar {
  width: 6px;
  background-color:rgba(0,0,0,.1);
}
.help .help-box .help-bd::-webkit-scrollbar-track {
  width: 6px;
  background-color:rgba(0,0,0,.1);
}
.help .help-box .help-bd::-webkit-scrollbar-thumb {
  width: 6px;
  background-color: #0088ff;
}
.help .help-box .help-bd >>> h2{
  font-size: 18px;
  font-weight: normal;
  color: #fca42c;
  margin: 10px 0;
}
.help .help-box .help-bd >>> p{
  font-size: 14px;
  color: #333;
}
.help .help-box .help-bd >>> ol{
  font-size: 16px;
  color: #333;
  padding: 0 25px;
}
.help .help-box .help-bd >>> ol li{
  margin: 8px 0;
  list-style-type: decimal;
  list-style-position: outside;
}
.help .help-box .help-bd >>> ol li em,
.help .help-box .help-bd >>> p em{
  color: #0088ff;
  font-style: normal;
  font-size: 14px;
}
</style>
