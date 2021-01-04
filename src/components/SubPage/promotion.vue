<template>
  <div class="promotion">
    <div class="banner-bg">
      <div class="banner-text">
        <em/><span/>
      </div>
    </div>
    <div class="promotion-box">
      <div class="pro-nav">
        <ul>
          <li
            :class="{on: index == active}"
            v-for="(pro, index) in proNav"
            :key="index"
            @click="navToggle(index,pro.Id.toString())"
          >{{pro.TypeName}}</li>
        </ul>
      </div>
      <div class="pro-main">
        <div
          data-aos="zoom-in-up"
          data-aos-anchor=".nav"
          class="pro-box"
          v-for="(proboxs, index) in proBoxCurrent"
          :key="index"
          :class="proboxs.TypeId.toString()"
          @click="ProboxShow(index)"
        >
          <div class="img">
            <img :src="proboxs.Img" alt />
          </div>
          <div class="tit">
            <h2>{{proboxs.Title}}</h2>
          </div>
        </div>
      </div>
    </div>
    <!-- 详情弹窗 -->
    <promotionbox
      :Infos="proBoxCurrent"
      :index="index"
      @hidden="hiddenShow"
      @toggleBox="toggleBox"
      v-if="proboxShow"
    />
  </div>
</template>

<script>
import promotionbox from '@/components/SubPage/promotionbox'
import $ from 'jquery'
export default {
  name: 'promotion',
  components: {
    promotionbox
  },
  data () {
    //  这里存放数据
    return {
      index: 0,
      active: 0,
      proboxShow: false,
      proBoxCurrent: [],
      proNav: [],
      proBox: [],
      proBoxBefore: []
    }
  },
  //  监听属性 类似于data概念
  computed: {
    proBoxHot () {
      return this.proBox.filter(function (proboxs) {
        return proboxs.Hot === 1
      })
    }
  },
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    navToggle (index, Id) {
      this.active = index
      switch (Id) {
        case '101':
          this.proBoxCurrent = this.proBox
          this.$nextTick(function () {
            $('.pro-box').show()
          })
          break
        case '102':
          this.proBoxCurrent = this.proBoxHot
          this.$nextTick(function () {
            $('.pro-box').show()
          })
          break
        case '4':
          this.proBoxCurrent = this.proBoxBefore
          this.$nextTick(function () {
            $('.pro-box').show()
          })
          break
        default:
          this.proBoxCurrent = this.proBox
          this.$nextTick(function () {
            $('.pro-box').hide()
            $('.pro-box.' + Id).show()
          })
          break
      }
    },
    hiddenShow () {
      this.proboxShow = false
    },
    // 空白区隐藏公告弹窗
    toggleBox () {
      this.proboxShow = !this.proboxShow
    },
    ProboxShow (index) {
      this.index = index
      this.$nextTick(function () {
        this.proboxShow = true
      })
    },
    getPromo () {
      let _this = this
      _this.$bus.$emit('loadingShow')
      let url = '/api/promo/list'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then(res => {
          _this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            _this.proNav = res.data.Result.Category
            _this.proBox = res.data.Result.Data
            _this.proBoxCurrent = res.data.Result.Data
            _this.proBoxBefore = res.data.Result.BeforeData
            // let ps = this.$route.params.index
            // if (ps) {
            //   _this.navToggle(ps, '4')
            // }
          } else {
            _this.$bus.$emit('loadingHide')
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: '确定'
            })
          }
        })
        .catch(err => {
          _this.$bus.$emit('loadingHide')
          console.log(err)
        })
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getPromo()
  },
  mounted () {}
}
</script>
<style scoped>
.promotion {
  width: 100%;
  overflow: hidden;
  background: url(../../assets/images/SubPage/bg.jpg) no-repeat center;
  background-attachment: fixed;
}
.promotion .banner-bg {
  width: 1200px;
  height: 350px;
  background: url(../../assets/images/pormotion/vip-banner_promo_bg.jpg);
  margin: 0 auto 10px auto;
  border-radius: 6px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2);
  position: relative;
}
.promotion .banner-bg .banner-text{
  width: 800px;
  position: absolute;
  left: 50%;
  margin-left: -400px;
  top: 45%;
}
.promotion .banner-bg .banner-text em {
  display: block;
  width: 800px;
  height: 90px;
  background: url(../../assets/images/pormotion/vip-banner_promo_text.png);
  background-position: 0 0;
  animation: fadeInDown 1.5s ease-in-out forwards alternate;
}
.promotion .banner-bg .banner-text span {
  display: block;
  margin-top: 20px;
  width: 800px;
  height: 40px;
  background: url(../../assets/images/pormotion/vip-banner_promo_text.png);
  background-position: 0 -90px;
  animation: fadeInDown 2s ease-in-out forwards alternate;
}
.promotion .promotion-box {
  width: 1200px;
  margin: 0 auto;
  background: #fff;
  border-radius: 8px 8px 0 0;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2);
}
.promotion .promotion-box .pro-nav {
  width: 100%;
  height: 48px;
  padding: 25px 0;
  overflow: hidden;
}
.promotion .promotion-box .pro-nav ul {
  width: 1140px;
  margin: 0 auto;
}
.promotion .promotion-box .pro-nav ul li {
  float: left;
  width: 152px;
  line-height: 48px;
  font-size: 18px;
  text-align: center;
  color: #333;
  cursor: pointer;
}
.promotion .promotion-box .pro-nav ul li:hover {
  color: #00a2ff;
}
.promotion .promotion-box .pro-nav ul li.on {
  background: #00a2ff;
  box-shadow: 0px 3px 6px 0px rgba(0, 162, 255, 0.4);
  border-radius: 50px;
  color: #fff;
}
.promotion .promotion-box .pro-main {
  width: 100%;
  overflow: hidden;
}
.promotion .promotion-box .pro-main .pro-box {
  width: 360px;
  height: 242px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2);
  margin: 20px;
  border-radius: 4px;
  float: left;
  overflow: hidden;
  cursor: pointer;
  display: block;
}
.promotion .promotion-box .pro-main .pro-box .img {
  width: 100%;
  height: 180px;
  overflow: hidden;
  background: url(../../assets/images/pormotion/Promotion.jpg);
  background-size: 100% 100%;
}
.promotion .promotion-box .pro-main .pro-box .img img {
  width: 100%;
  height: 100%;
  transition: all 0.4s cubic-bezier(0.4, 0.01, 0.165, 0.99);
}
.promotion .promotion-box .pro-main .pro-box:hover .img img {
  transform: scale(1.1);
}
.promotion .promotion-box .pro-main .pro-box:hover .tit h2 {
  color: #0088ff;
}
.promotion .promotion-box .pro-main .pro-box .tit {
  width: 100%;
  line-height: 42px;
  padding: 10px;
  box-sizing: border-box;
}
.promotion .promotion-box .pro-main .pro-box .tit h2 {
  font-size: 16px;
  color: #5f5f5f;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: inherit;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
