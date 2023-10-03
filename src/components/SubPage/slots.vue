<template>
  <div class="slots">
    <div class="banner-bg">
      <div class="banner-bg-main">
        <div class="img-left"></div>
        <div class="img-text"></div>
        <div class="img-right"></div>
      </div>
    </div>
    <div class="slots-box">
      <div class="slots-nav">
        <ul>
          <li :class="{on: 0 == navActive}"
              :key="0"
              @click="navToggle(0,'PG')">PG老虎机</li>
          <li :class="{on: 1 == navActive}"
              :key="1"
              @click="navToggle(1,'PT')">PT老虎机</li>
          <li :class="{on: 2 == navActive}"
              :key="2"
              @click="navToggle(2,'MG')">MG老虎机</li>
          <li :class="{on: 3 == navActive}"
              :key="3"
              @click="navToggle(3,'DT')">DT老虎机</li>
          <li>
            <a href="Game.html?act=ag&gameCode=Slots"
               target="_blank">AG老虎机</a>
          </li>
          <li>
            <a href="Game.html?act=ag&gameCode=YoPlay"
               target="_blank">AG街机游戏</a>
          </li>
        </ul>
      </div>
      <div class="game-box">
        <div class="slots-sort">
          <ul v-if="category.length>0">
            <li :class="[{on: index == menuActive},getIco(menu.text)]"
                v-for="(menu, index) in category"
                :key="index"
                @click="menuToggle(index,menu.value)">
              <i />
              {{menu.text}}
            </li>
            <li class="ptd"
                v-show="PGdownload"><a target="_blank"
                 href="//app.pgjksonc.club/AC006497-5D72-4613-9283-5F8F7DD699C6/index.html">下载Win版</a></li>
            <li class="ptd"
                v-show="PGdownload"><a target="_blank"
                 href="//app.pgjksonc.club/AC006497-5D72-4613-9283-5F8F7DD699C6/index.html">下载Wac版</a></li>
            <li class="ptd"
                v-show="PTdownload"><a href="https://app.zxapp.net/zxcbet_pt.rar">下载客户端</a></li>
          </ul>
          <div class="search">
            <input type="text"
                   placeholder="输入游戏名称"
                   v-model.trim="gameName"
                   @blur="changefoot" />
            <i @click="searchBtn" />
          </div>
        </div>
        <div class="slots-main"
             v-if="currentPageData.length>0">
          <ul>
            <li v-for="(game, index) in currentPageData"
                :key="index">
              <div class="hd">
                <div class="img">
                  <i />
                  <img :src="'static/images/slots/'+ currentPlat +'/'+ game.ImageName " />
                </div>
                <div :class="[currentPlat!=='MG'? '':'one','btn']">
                  <a @click="LoginGame($event,game)">
                    <span>立即游戏</span>
                  </a>
                  <a v-if="currentPlat !=='MG'"
                     target="_blank"
                     :href="game.DemoUrl"
                     @click="DemoGame(game.DemoUrl)">
                    <span>试玩游戏</span>
                  </a>
                </div>
              </div>
              <div class="bd">
                <p>{{game.GameName}}</p>
              </div>
            </li>
          </ul>
          <div class="foot"
               v-show="footShow">
            <button @click="firstPage()">首页</button>
            <button @click="prevPage()">上一页</button>
            <span>第{{currentPage}}页/共{{totalPage}}页</span>
            <button @click="nextPage()">下一页</button>
            <button @click="lastPage()">尾页</button>
          </div>
        </div>
      </div>
    </div>
    <div class="slotsLogin-box"
         v-if="isFirst">
      <!-- 第一次修改平台密码 -->
      <div class="slotsLogin">
        <h1>设置{{currentPlat}}登录密码</h1>
        <i title="关闭"
           @click="isFirst=false"
           class="close">×</i>
        <div class="lab">
          <input type="password"
                 v-model="platPwd.pwd"
                 placeholder="平台密码" />
        </div>
        <div class="lab">
          <input type="password"
                 v-model="platPwd.surePwd"
                 placeholder="确认平台密码" />
        </div>
        <div class="lab">
          <button id="btnSetPlatPass"
                  @click="savePlatPwd()">保存登录</button>
        </div>
        <div>
          <h2>特别提醒：</h2>
          <p>1. 可用此密码在{{currentPlat}}平台登录游戏；</p>
          <p>2. 与众鑫密码相互独立，可设置不同密码。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'slots',
  components: {},
  data () {
    //  这里存放数据
    return {
      navActive: 0,
      menuActive: 1,
      gameName: '',
      status: '',
      isFirst: false, // 是否是第一次
      currentPlat: 'PG',
      currentCategory: '',
      totalPage: 1, // 统共页数，默认为1
      currentPage: 1, // 当前页数 ，默认为1
      pageSize: 20, // 每页显示数量
      currentPageData: [], // 当前页显示内容
      category: [],
      footShow: true,
      platPwd: {
        pwd: '',
        surePwd: ''
      },
      PTdownload: false,
      PGdownload: true
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    // 菜单按钮切换
    navToggle (index, code) {
      this.gameName = ''
      this.currentPage = 1
      this.menuActive = 1
      this.currentPlat = code
      sessionStorage.setItem(
        'soltplat',
        JSON.stringify({
          plat: code,
          index: index
        })
      )
      if (index < 4) {
        this.navActive = index
      }
      if (code !== 'MG') {
        this.currentCategory = 'hot'
      } else {
        this.currentCategory = 'Slot'
      }
      if (code !== 'PT') {
        this.PTdownload = false
      } else {
        this.PTdownload = true
      }
      if (code !== 'PG') {
        this.PGdownload = false
      } else {
        this.PGdownload = true
      }
      this.$bus.$emit('loadingShow')
      this.getCurrentPageData()
    },
    // 子菜单按钮切换
    menuToggle (index, code) {
      this.menuActive = index
      this.currentPage = 1
      this.currentCategory = code
      this.$bus.$emit('loadingShow')
      this.getCurrentPageData()
    },
    searchBtn () {
      this.currentPage = 1
      this.$bus.$emit('loadingShow')
      this.getCurrentPageData()
    },
    getCurrentPageData () {
      if (this.currentCategory === 'all') {
        this.currentCategory = ''
      }
      this.category = []
      this.totalPage = 1
      this.currentPageData = []
      let _this = this
      let url = '/api/Slots/' + this.currentPlat
      var params = {
        // Plat: _this.currentPlat,
        Category: _this.currentCategory,
        GameName: _this.gameName,
        PageIndex: _this.currentPage,
        PageSize: _this.pageSize,
        Token: this.getinfo().token
        // os: 'Web'
      }
      _this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          _this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            _this.category = res.data.Result.Category
            _this.totalPage = res.data.Result.PageCount
            _this.currentPageData = res.data.Result.Data
            _this.status = res.data.Result.Status
          } else {
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: '确定'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 上一页
    prevPage () {
      if (this.currentPage === 1) {
        return false
      } else {
        this.currentPage--
        this.$bus.$emit('loadingShow')
        this.getCurrentPageData()
      }
    },
    // 下一页
    nextPage () {
      if (this.currentPage === this.totalPage) {
        return false
      } else {
        this.currentPage++
        this.$bus.$emit('loadingShow')
        this.getCurrentPageData()
      }
    },
    // 首页
    firstPage () {
      this.currentPage = 1
      this.$bus.$emit('loadingShow')
      this.getCurrentPageData()
    },
    // 尾页
    lastPage () {
      this.currentPage = this.totalPage
      this.$bus.$emit('loadingShow')
      this.getCurrentPageData()
    },
    changefoot () {
      if (this.gameName !== '') {
        this.footShow = false
      } else {
        this.footShow = true
      }
    },
    getIco (name) {
      if (name.indexOf('所有') >= 0) {
        return 'all'
      }
      if (name.indexOf('热门') >= 0) {
        return 'hot'
      }
      if (name.indexOf('视频') >= 0) {
        return 'cctv'
      }
      if (name.indexOf('老虎机') >= 0) {
        return 'angle'
      }
      if (name.indexOf('扑克') >= 0) {
        return 'poker'
      }
      if (name.indexOf('街机') >= 0) {
        return 'arcade'
      }
      if (name.indexOf('刮刮乐') >= 0) {
        return 'scratch'
      }
      if (name.indexOf('体育') >= 0) {
        return 'sports'
      }
      if (name.indexOf('桌') >= 0) {
        return 'windows'
      }
      if (name.indexOf('其它') >= 0) {
        return 'other'
      }
      if (name.indexOf('彩池') >= 0) {
        return 'jp'
      }
    },
    // 登录游戏
    LoginGame (event, game) {
      let user = this.getinfo()
      if (user.account === '') {
        this.$swal({
          text: '请先登录，若无账号请注册',
          type: 'error',
          confirmButtonText: '确定'
        })
        return false
      }
      if (this.status === 'NOLogged') {
        this.$swal({
          text: '请重新登录',
          type: 'error',
          confirmButtonText: '确定'
        })
        return false
      }
      if (this.status === 'PlatLocked') {
        this.$swal({
          text: '平台维护，请稍后在试',
          type: 'error',
          confirmButtonText: '确定'
        })
        return false
      }
      if (this.status === 'LoggFailed') {
        this.$swal({
          text: '进入游戏失败，请稍后在试',
          type: 'error',
          confirmButtonText: '确定'
        })
        return false
      }
      switch (this.currentPlat) {
        case 'PT':
          // alert(axios.defaults.baseURL)
          let url =
            this.$axios.defaults.baseURL +
            '/LoginPT?t=' +
            user.token +
            '&gc=' +
            game.GameCode
          window.open(
            url,
            'ptGame',
            'height=600,width=800,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no'
          )
          return false
        case 'MG':
          event.currentTarget.href =
            'Game.html?act=' + this.currentPlat + '&gameCode=' + game.GameCode
          event.currentTarget.target = '_blank'
          return true
        case 'PG':
          switch (this.status) {
            case 'Logged': // 登录成功
              // eslint-disable-next-line no-undef
              PGSDK.launchGame(game.GameUrl)
              return false
          }
          break
        case 'DT':
          switch (this.status) {
            case 'Logged': // 登录成功
              event.currentTarget.href = game.GameUrl
              event.currentTarget.target = '_blank'
              return true
            case 'FirstDT': // 第一次
              // this.status = true
              this.isFirst = true
              break
          }
      }
    },
    // 试玩
    DemoGame (url) {
      switch (this.currentPlat) {
        case 'PT':
          window.open(
            url,
            'ptDemo',
            'height=600,width=800,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no'
          )
          return false
        case 'PG':
          // eslint-disable-next-line no-undef
          PGSDK.launchGame(url)
          // window.open(url, 'pgDemo', 'height=600,width=800,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no')
          return false
        case 'DT':
          return true
      }
    },
    // 保存平台密码
    savePlatPwd () {
      if (this.platPwd.pwd.length < 1) {
        this.$swal({
          text: '请输入平台密码',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (this.platPwd.surePwd.length < 1) {
        this.$swal({
          text: '请再次输入平台密码',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (this.platPwd.pwd !== this.platPwd.surePwd) {
        this.$swal({
          text: '两次输入的密码不一致',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      let _this = this
      let url = '/api/account/CreatePlatPwd'
      var params = {
        Plat: this.currentPlat,
        Pwd: this.platPwd.pwd,
        Token: this.getinfo().token
      }
      _this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          if (res.data.Success === true) {
            // _this.status = 'Logged'
            // _this.$router.push('/')
            // _this.$router.go(0)
            document.location.reload()
          } else {
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: '确定'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    let soltplat = sessionStorage.getItem('soltplat')
    // debugger
    if (soltplat) {
      let p = JSON.parse(soltplat)
      this.navToggle(p.index, p.plat)
    } else {
      this.navToggle(0, 'PG')
    }
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    const s = document.createElement('script')
    s.type = 'text/javascript'
    s.src = ' https://public.ecloudplayer.xyz/sdk/main.min.js'
    s.defer = 'defer'
    document.body.appendChild(s)
  }
}
</script>
<style scoped>
.slots {
  width: 100%;
  overflow: hidden;
  background: url(../../assets/images/SubPage/bg.jpg) no-repeat center;
  background-attachment: fixed;
}
.slots .banner-bg {
  width: 100%;
  height: 400px;
  background: url(../../assets/images/SubPage/solts/slots_banner_bg.png) center
    no-repeat;
}
.slots .banner-bg .banner-bg-main {
  width: 1480px;
  height: 400px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}
.slots .banner-bg .banner-bg-main .img-left,
.slots .banner-bg .banner-bg-main .img-right {
  width: 528px;
  height: 452px;
  position: absolute;
  background: url(../../assets/images/SubPage/solts/slots_banner_model.png)
    center no-repeat;
}
.slots .banner-bg .banner-bg-main .img-left {
  background-position: 0 0;
  left: 0;
}
.slots .banner-bg .banner-bg-main .img-right {
  background-position: -528px 0;
  right: 0;
}
.slots .banner-bg .banner-bg-main .img-text {
  width: 272px;
  height: 144px;
  position: absolute;
  left: 50%;
  margin-left: -144px;
  top: 25%;
  background: url(../../assets/images/SubPage/solts/slots_banner_title.png)
    center no-repeat;
  animation: fadeInDown 1s ease-in-out forwards alternate;
}
.slots .slots-box {
  width: 1200px;
  margin: 0 auto;
  background: #fff;
  border-radius: 8px 8px 0 0;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2);
}
.slots .slots-box .slots-nav {
  width: 100%;
  height: 48px;
  padding: 30px 0;
  overflow: hidden;
}
.slots .slots-box .slots-nav ul {
  width: 1140px;
  margin: 0 auto;
}
.slots .slots-box .slots-nav ul li {
  float: left;
  width: 152px;
  line-height: 48px;
  font-size: 18px;
  text-align: center;
  color: #333;
  cursor: pointer;
}
.slots .slots-box .slots-nav ul li:hover {
  color: #0088ff;
}
.slots .slots-box .slots-nav ul li.on {
  background: #00a2ff;
  box-shadow: 0px 3px 6px 0px rgba(0, 162, 255, 0.4);
  border-radius: 50px;
  color: #fff;
}
.slots .slots-box .slots-nav ul li a {
  display: block;
  width: 100%;
  height: 100%;
  font-size: 18px;
}
.slots .slots-box .slots-sort {
  width: 100%;
  overflow: hidden;
}
.slots .slots-box .slots-sort ul {
  width: 1140px;
  margin: 0 auto;
}
.slots .slots-box .slots-sort ul li {
  float: left;
  margin-right: 20px;
  line-height: 16px;
  font-size: 14px;
  text-align: center;
  color: #333;
  padding-bottom: 10px;
  cursor: pointer;
}
.slots .slots-box .slots-sort ul li:hover,
.slots .slots-box .slots-sort ul li.on {
  color: #00a2ff;
  border-bottom: 1px solid #0088ff;
}
.slots .slots-box .slots-sort ul li.ptd {
  color: #fca42c;
  font-weight: bold;
  font-size: 16px;
}
.slots .slots-box .slots-sort ul li.ptd a {
  color: #fca42c;
  font-weight: bold;
  font-size: 16px;
}
.slots .slots-box .slots-sort ul li.ptd:hover {
  border: none;
}
.slots .slots-box .slots-sort ul li.ptd:hover a {
  color: #00a2ff;
}
.slots .slots-box .slots-sort ul li i {
  display: block;
  width: 16px;
  height: 16px;
  float: left;
  background: url(../../assets/images/SubPage/solts/slots_game_ico.png);
}
.slots .slots-box .slots-sort ul li.all i {
  background-position: 0 0;
}
.slots .slots-box .slots-sort ul li.hot i {
  background-position: -16px 0;
}
.slots .slots-box .slots-sort ul li.angle i {
  background-position: -32px 0;
}
.slots .slots-box .slots-sort ul li.poker i {
  background-position: -48px 0;
}
.slots .slots-box .slots-sort ul li.arcade i {
  background-position: -64px 0;
}
.slots .slots-box .slots-sort ul li.cctv i {
  background-position: -80px 0;
}
.slots .slots-box .slots-sort ul li.scratch i {
  background-position: -96px 0;
}
.slots .slots-box .slots-sort ul li.sports i {
  background-position: -112px 0;
}
.slots .slots-box .slots-sort ul li.windows i {
  background-position: -128px 0;
}
.slots .slots-box .slots-sort ul li.other i {
  background-position: -144px 0;
}
.slots .slots-box .slots-sort ul li.jp i {
  background-position: -160px 0;
}
.slots .slots-box .slots-sort ul li.all:hover i,
.slots .slots-box .slots-sort ul li.on.all i {
  background-position: 0 -16px;
}
.slots .slots-box .slots-sort ul li.hot:hover i,
.slots .slots-box .slots-sort ul li.on.hot i {
  background-position: -16px -16px;
}
.slots .slots-box .slots-sort ul li.angle:hover i,
.slots .slots-box .slots-sort ul li.on.angle i {
  background-position: -32px -16px;
}
.slots .slots-box .slots-sort ul li.poker:hover i,
.slots .slots-box .slots-sort ul li.on.poker i {
  background-position: -48px -16px;
}
.slots .slots-box .slots-sort ul li.arcade:hover i,
.slots .slots-box .slots-sort ul li.on.arcade i {
  background-position: -64px -16px;
}
.slots .slots-box .slots-sort ul li.cctv:hover i,
.slots .slots-box .slots-sort ul li.on.cctv i {
  background-position: -80px -16px;
}
.slots .slots-box .slots-sort ul li.scratch:hover i,
.slots .slots-box .slots-sort ul li.on.scratch i {
  background-position: -96px -16px;
}
.slots .slots-box .slots-sort ul li.sports:hover i,
.slots .slots-box .slots-sort ul li.on.sports i {
  background-position: -112px -16px;
}
.slots .slots-box .slots-sort ul li.windows:hover i,
.slots .slots-box .slots-sort ul li.on.windows i {
  background-position: -128px -16px;
}
.slots .slots-box .slots-sort ul li.other:hover i,
.slots .slots-box .slots-sort ul li.on.other i {
  background-position: -144px -16px;
}
.slots .slots-box .slots-sort ul li.jp:hover i,
.slots .slots-box .slots-sort ul li.on.jp i {
  background-position: -160px -16px;
}
.slots .slots-box .slots-sort .search {
  width: 240px;
  height: 32px;
  float: right;
  position: relative;
  margin-right: 20px;
}
.slots .slots-box .slots-sort .search input {
  width: 240px;
  height: 32px;
  padding: 5px 20px;
  border: 1px solid #dddddd;
  border-radius: 16px;
  box-sizing: border-box;
}
.slots .slots-box .slots-sort .search i {
  width: 16px;
  height: 16px;
  display: block;
  position: absolute;
  right: 15px;
  top: 7px;
  cursor: pointer;
  background: url(../../assets/images/SubPage/solts/slots_game_ico.png);
  background-position: -192px 0;
}
.slots .slots-box .slots-main {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  padding: 20px 25px;
}
.slots .slots-box .slots-main ul {
  width: 100%;
  overflow: hidden;
}
.slots .slots-box .slots-main ul li {
  width: 210px;
  height: 200px;
  float: left;
  cursor: pointer;
  margin: 0 10px 20px 10px;
}
.slots .slots-box .slots-main ul li .hd {
  width: 210px;
  height: 158px;
  overflow: hidden;
  position: relative;
}
.slots .slots-box .slots-main ul li .hd .img {
  width: 100%;
  height: 100%;
  position: relative;
  animation: flipInX 1.5s ease-in-out 1;
}
.slots .slots-box .slots-main ul li .hd .img img {
  transition: all 0.4s cubic-bezier(0.4, 0.01, 0.165, 0.99);
}
.slots .slots-box .slots-main ul li:hover .hd .img img {
  transform: scale(1.1);
}
.slots .slots-box .slots-main ul li:hover .hd .img i {
  display: block;
  width: 210px;
  height: 158px;
  position: absolute;
  z-index: 1;
  background: rgba(0, 0, 0, 0.5);
}
.slots .slots-box .slots-main ul li .bd {
  width: 210px;
  height: 42px;
  line-height: 42px;
  text-align: center;
  color: #333333;
  font-size: 16px;
}
.slots .slots-box .slots-main ul li:hover .hd .btn {
  display: block;
}
/* .slots .slots-box .slots-main ul li:hover .hd .btn a {
  animation: slideInDown .3s linear 1;
} */
.slots .slots-box .slots-main ul li .hd .btn {
  width: 120px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -60px;
  z-index: 11;
  display: none;
}
.slots .slots-box .slots-main ul li .hd .btn.one a {
  margin: 30px 0;
}
.slots .slots-box .slots-main ul li .hd .btn a {
  display: block;
  width: 120px;
  height: 30px;
  overflow: hidden;
  background-color: #0088ff;
  border-radius: 3px;
  cursor: pointer;
  float: left;
  margin: 10px 0;
  text-align: center;
  line-height: 30px;
  color: #fff;
}
.slots .slots-box .slots-main ul li .hd .btn a:hover {
  background-color: #faa02a;
  animation: hvr_pop 0.3s linear 1;
}
@-webkit-keyframes hvr_pop {
  50% {
    transform: scale(1.2);
  }
}
@keyframes hvr_pop {
  50% {
    transform: scale(1.2);
  }
}
.slots >>> .game-box .slots-sort {
  width: 100%;
  overflow: hidden;
}
.slots >>> .game-box .slots-sort ul {
  width: 1140px;
  margin: 0 auto;
}
.slots >>> .game-box .slots-sort ul li {
  float: left;
  margin-right: 20px;
  line-height: 16px;
  font-size: 14px;
  text-align: center;
  color: #333;
  padding-bottom: 10px;
  cursor: pointer;
}
.slots >>> .game-box .slots-sort ul li:hover,
.slots >>> .game-box .slots-sort ul li.on {
  color: #00a2ff;
  border-bottom: 1px solid #0088ff;
}
.slots >>> .game-box .slots-sort ul li i {
  display: block;
  width: 16px;
  height: 16px;
  float: left;
  margin-right: 8px;
  background: url(../../assets/images/SubPage/solts/slots_game_ico.png);
}
.slots >>> .game-box .slots-sort ul li.all i {
  background-position: 0 0;
}
.slots >>> .game-box .slots-sort ul li.hot i {
  background-position: -16px 0;
}
.slots >>> .game-box .slots-sort ul li.angle i {
  background-position: -32px 0;
}
.slots >>> .game-box .slots-sort ul li.poker i {
  background-position: -48px 0;
}
.slots >>> .game-box .slots-sort ul li.arcade i {
  background-position: -64px 0;
}
.slots >>> .game-box .slots-sort ul li.cctv i {
  background-position: -80px 0;
}
.slots >>> .game-box .slots-sort ul li.scratch i {
  background-position: -96px 0;
}
.slots >>> .game-box .slots-sort ul li.sports i {
  background-position: -112px 0;
}
.slots >>> .game-box .slots-sort ul li.windows i {
  background-position: -128px 0;
}
.slots >>> .game-box .slots-sort ul li.other i {
  background-position: -144px 0;
}
.slots >>> .game-box .slots-sort ul li.jp i {
  background-position: -160px 0;
}
.slots >>> .game-box .slots-sort ul li.all:hover i,
.slots >>> .game-box .slots-sort ul li.on.all i {
  background-position: 0 -16px;
}
.slots >>> .game-box .slots-sort ul li.hot:hover i,
.slots >>> .game-box .slots-sort ul li.on.hot i {
  background-position: -16px -16px;
}
.slots >>> .game-box .slots-sort ul li.angle:hover i,
.slots >>> .game-box .slots-sort ul li.on.angle i {
  background-position: -32px -16px;
}
.slots >>> .game-box .slots-sort ul li.poker:hover i,
.slots >>> .game-box .slots-sort ul li.on.poker i {
  background-position: -48px -16px;
}
.slots >>> .game-box .slots-sort ul li.arcade:hover i,
.slots >>> .game-box .slots-sort ul li.on.arcade i {
  background-position: -64px -16px;
}
.slots >>> .game-box .slots-sort ul li.cctv:hover i,
.slots >>> .game-box .slots-sort ul li.on.cctv i {
  background-position: -80px -16px;
}
.slots >>> .game-box .slots-sort ul li.scratch:hover i,
.slots >>> .game-box .slots-sort ul li.on.scratch i {
  background-position: -96px -16px;
}
.slots >>> .game-box .slots-sort ul li.sports:hover i,
.slots >>> .game-box .slots-sort ul li.on.sports i {
  background-position: -112px -16px;
}
.slots >>> .game-box .slots-sort ul li.windows:hover i,
.slots >>> .game-box .slots-sort ul li.on.windows i {
  background-position: -128px -16px;
}
.slots >>> .game-box .slots-sort ul li.other:hover i,
.slots >>> .game-box .slots-sort ul li.on.other i {
  background-position: -144px -16px;
}
.slots >>> .game-box .slots-sort ul li.jp:hover i,
.slots >>> .game-box .slots-sort ul li.on.jp i {
  background-position: -160px -16px;
}
.slots >>> .game-box .slots-sort .search {
  width: 240px;
  height: 32px;
  float: right;
  position: relative;
  margin-right: 20px;
}
.slots >>> .game-box .slots-sort .search input {
  width: 240px;
  height: 32px;
  padding: 5px 20px;
  border: 1px solid #dddddd;
  border-radius: 16px;
  box-sizing: border-box;
}
.slots >>> .game-box .slots-sort .search i {
  width: 16px;
  height: 16px;
  display: block;
  position: absolute;
  right: 15px;
  top: 7px;
  cursor: pointer;
  background: url(../../assets/images/SubPage/solts/slots_game_ico.png);
  background-position: -192px 0;
}
.slots >>> .game-box .slots-main {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  padding: 20px 25px;
}
.slots >>> .game-box .slots-main ul {
  width: 100%;
  overflow: hidden;
}
.slots >>> .game-box .slots-main ul li {
  width: 210px;
  height: 200px;
  float: left;
  cursor: pointer;
  margin: 0 10px 20px 10px;
}
.slots >>> .game-box .slots-main ul li .hd {
  width: 210px;
  height: 158px;
  overflow: hidden;
  position: relative;
}
.slots >>> .game-box .slots-main ul li .hd .img {
  width: 100%;
  height: 100%;
  position: relative;
  background: url(../../assets/images/pormotion/Promotion.jpg);
  background-size: 100% 100%;
}
.slots >>> .game-box .slots-main ul li .hd .img img {
  transition: all 0.4s cubic-bezier(0.4, 0.01, 0.165, 0.99);
}
.slots >>> .game-box .slots-main ul li:hover .hd .img img {
  transform: scale(1.1);
}
.slots >>> .game-box .slots-main ul li:hover .hd .img i {
  display: block;
  width: 210px;
  height: 158px;
  position: absolute;
  z-index: 1;
  background: rgba(0, 0, 0, 0.5);
}
.slots >>> .game-box .slots-main ul li .bd {
  width: 210px;
  height: 42px;
  line-height: 30px;
  text-align: center;
}
.slots >>> .game-box .slots-main ul li .bd p {
  color: #333333;
  font-size: 14px;
}
.slots >>> .game-box .slots-main ul li:hover .bd p {
  color: #0088ff;
}
.slots >>> .game-box .slots-main ul li:hover .hd .btn {
  display: block;
}
.slots >>> .game-box .slots-main ul li .hd .btn {
  width: 120px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -60px;
  z-index: 11;
  display: none;
}
.slots >>> .game-box .slots-main ul li .hd .btn a {
  display: block;
  width: 120px;
  height: 30px;
  overflow: hidden;
  background-color: #0088ff;
  border-radius: 3px;
  cursor: pointer;
  float: left;
  margin: 10px 0;
  text-align: center;
  line-height: 30px;
  color: #fff;
}
.slots >>> .game-box .slots-main ul li .hd .btn a:hover {
  background-color: #faa02a;
}
.slots >>> .game-box .slots-main .foot {
  width: 100%;
  height: 44px;
  margin-top: 20px;
  padding: 0 20px;
  box-sizing: border-box;
}
.slots >>> .game-box .slots-main .foot button {
  width: 80px;
  height: 44px;
  margin: 0 10px;
  border: 1px solid #ddd;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
}
.slots >>> .game-box .slots-main .foot button:hover {
  border: 1px solid #ddd;
  background: #0088ff;
  color: #fff;
}
.slots >>> .game-box .slots-main .foot span {
  color: #333;
  font-size: 14px;
}
.slots .slotsLogin-box {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
}
.slots .slotsLogin-box .close {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 30px;
  height: 30px;
  font-size: 30px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}
.slots .slotsLogin-box .slotsLogin {
  width: 320px;
  height: 280px;
  padding: 0 20px;
  box-sizing: border-box;
  background: #fff;
  border-radius: 6px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -140px;
  margin-left: -160px;
}
.slots .slotsLogin-box .slotsLogin h1 {
  color: #0088ff;
  font-size: 20px;
  line-height: 60px;
  text-align: center;
}
.slots .slotsLogin-box .slotsLogin .lab {
  width: 100%;
  height: 34px;
  margin-bottom: 10px;
}
.slots .slotsLogin-box .slotsLogin .lab input {
  width: 100%;
  height: 100%;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 3px;
  border: 1px solid #ddd;
}
.slots .slotsLogin-box .slotsLogin .lab button {
  width: 100%;
  height: 100%;
  border-radius: 3px;
  background: #0088ff;
  color: #fff;
  text-align: center;
  line-height: 34px;
}
.slots .slotsLogin-box .slotsLogin h2 {
  font-size: 14px;
  color: #faa02a;
}
.slots .slotsLogin-box .slotsLogin p {
  font-size: 14px;
  color: #333;
}
</style>
