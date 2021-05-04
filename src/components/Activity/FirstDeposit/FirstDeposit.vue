<template>
  <div class="firstDeposit">
    <div class="bg"></div>
    <div class="contain">
      <div class="main-banner">
        <img class="float_recircle" src="../../../assets/images/activity/FirstDeposit/recircle.png"/>
        <div class="section">
          <div class="view">
            <div>
              <div>
                <img style="width: 48vw;" src="../../../assets/images/activity/FirstDeposit/a_title.png" />
              </div>
              <div>
                <img style="width: 14vw;" src="../../../assets/images/activity/FirstDeposit/t_act_time.png" />
              </div>
              <div class="text-view">
                <div><p> 2021年5月07日起 </p></div>
              </div>
              <div style="margin-top: 5%">
                <img style="width: 14vw;" src="../../../assets/images/activity/FirstDeposit/t_act_content.png" />
              </div>
            </div>
          </div>
        </div>
        <img class="float_fashion" src="../../../assets/images/activity/FirstDeposit/fashion.png"/>
        <img class="float_itree" src="../../../assets/images/activity/FirstDeposit/itree.png"/>
      </div>
      <div class="act-content">
        <div class="section">

          <div class="view">
            <div class="table-group">
              <div class="group-view">
                <div class="group-title">
                  <div class="title"><p>活动内容：全体无存款记录会员</p></div>
                </div>
                <div class="group-table">
                  <img src="../../../assets/images/activity/FirstDeposit/table_bg.png">
                  <div>
                    <table>
                      <thead>
                        <tr height="10%">
                          <th width="30%"><strong>首存金额</strong></th>
                          <th width="70%"><strong>实物奖品</strong></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><p>1000</p></td>
                          <td><p>进口水果一箱</p></td>
                        </tr>
                        <tr>
                          <td>
                            <p>4999</p>
                          </td>
                          <td>
                            <p>飞利浦剃须刀或利浦电动牙刷</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>19999</p>
                          </td>
                          <td>
                            <p>香奈儿香水 男/女或1000元中国石化加油卡</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>48888</p>
                          </td>
                          <td>
                            <p>6斤/只 生鲜帝王蟹或周生生 黄金吊坠</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>98888</p>
                          </td>
                          <td>
                            <p>
                              10g中国黄金金条或大疆无人机 mini 2
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>188000</p>
                          </td>
                          <td>
                            <p>
                              iPhone 12 Pro Max 256G <br>或 <br>20g中国黄金金条+2000元现金
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="group-desction">
                  <div>注意：1：首存金额计算方式为：第一次投注前累计存款金额</div>
                  <div>2：水果派发类型以季节及新鲜为主</div>
                  <div class="account_block">
                    <div><p>游戏账号：</p></div>
                    <div><input type="text" v-model.trim="username"></div>
                    <div><input type="button" value="立即申请" @click="depositSubmit"/></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="act-t">
              <img style="width: 14vw;" src="../../../assets/images/activity/FirstDeposit/t_act_role.png" />
            </div>
            <div class="act-t">
              <div>
                <ul>
                  <li><i></i>众鑫未充值会员可参与本活动；</li>
                  <li>
                    <i></i>首存金额计算方式为：第一次投注前累计存款金额；
                  </li>
                  <li>
                    <i></i>该活动仅与返水共享；
                  </li>
                  <li>
                    <i></i
                    >本活动首次成功充值后，需于三日内领取礼品，如逾期未领取视为自动放弃；
                  </li>
                  <li>
                    <i></i
                    >本活动只针对娱乐性质的会员，同一手机号码、电子邮箱、相同银行卡、同一个IP地址、同一通信地址、同一台设备，只能由一位会员使用，若发现重复行为，众鑫将无限期保留审核、扣回礼品及所产生的利润之权利；
                  </li>
                  <li>
                    <i></i
                    >本活动中任何用户或团体以不正常的方式套取活动优惠，我司保留在不通知的情况下冻结或关闭账号使用的权力
      且用户会被列入黑名单。若发现有套利客户，对冲，或不诚实获取盈利之行为，将取消其优惠资格；
                  </li>
                  <li>
                    <i></i
                    >为避免文字争议，此活动遵循众鑫活动规则与条款，并由众鑫保留最终解释权；
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <popupbox @tooglePopUp="tooglePopUp" v-if="showPopupBox" :UserName="username" ></popupbox>
  </div>
</template>
<script>
import popupbox from '@/components/Activity/FirstDeposit/PopupBox'
export default {
  components: {
    popupbox
  },
  data () {
    return {
      username: '',
      showPopupBox: false
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    tooglePopUp () {
      this.showPopupBox = !this.showPopupBox
    },
    depositSubmit () {
      let _this = this
      if (_this.username === '') {
        _this.$swal({
          text: '游戏账号不能为空！',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      let initGeetestUrl = '/api/Geetest/initGeetest'
      _this.$bus.$emit('loadingShow')
      this.$https
        .fetchGet(initGeetestUrl, {})
        .then(res => {
          var resMessage = JSON.parse(res.data)
          // eslint-disable-next-line
          initGeetest({
            gt: resMessage.gt,
            challenge: resMessage.challenge,
            offline: !resMessage.success, // 表示用户后台检测极验服务器是否宕机
            new_captcha: resMessage.new_captcha,
            product: 'bind'
          }, function (captchaObj) {
            captchaObj.onReady(function () {
              captchaObj.verify()
            }).onSuccess(function () {
              var result = captchaObj.getValidate()
              let url = '/api/FirstDepositPromo/FirstDepositPromoStep1'
              let params = {
                GameAccount: _this.username,
                seccodeGeetest: result.geetest_seccode,
                validateGeetest: result.geetest_validate,
                challengeGeetest: result.geetest_challenge
              }
              _this.$https
                .fetchPost(url, _this.Secret(params))
                .then(res => {
                  _this.$bus.$emit('loadingHide')
                  if (res.data.Success === true) {
                    _this.showPopupBox = true
                  } else {
                    _this.$bus.$emit('loadingHide')
                    _this.$swal({
                      text: res.data.Message,
                      type: 'error',
                      confirmButtonText: '确定'
                    })
                    captchaObj.reset()
                  }
                })
                .catch(err => {
                  _this.$bus.$emit('loadingHide')
                  console.log(err)
                  captchaObj.reset()
                })
            }).onError(function () {
              _this.$bus.$emit('loadingHide')
              // console.log(err)
            })
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {},
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
.main-banner {
  position: relative;
  z-index: 2;
}
.act-content {
  position: relative;
  z-index: 1;
  height: 1700px;
}
.section {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
.main-banner .bg {
  z-index: -1;
  min-width: 100%;
  min-height: 496px;
  max-width: 100%;
  max-height: 100vh;
  object-fit: cover;
  background: url(../../../assets/images/activity/FirstDeposit/recircle.png)
    no-repeat;
}
.act-content > .bg {
  min-width: 100%;
  min-height: 2763px;
  max-width: 100%;
  max-height: 100vh;
  margin-top: -25%;
  object-fit: cover;
  z-index: -1;
  background: url(../../../assets/images/activity/Iphone12/content_bg.jpg)
    no-repeat center;
}
.contain {
  position: absolute;
  width: 100vw;
  left: 0;
  top: 0;
}
.contain > .main-banner > .float_recircle {
  width: 66%;
  margin: 0 auto;
  margin-top: -5%;
}
.contain > .main-banner > .float_fashion {
  position: absolute;
  right: 28%;
  top: 9%;
  width: 7vw;
}
.contain > .main-banner > .float_itree {
  position: absolute;
  left: 4%;
  top: 2%;
  width: 20vw;
}
.firstDeposit img {
  width: auto;
  margin: 0 auto;
}
.firstDeposit > .bg {
  background: url(../../../assets/images/activity/FirstDeposit/all_bg.png)
    no-repeat center;
  min-width: 100%;
  min-height: 2534px;
  max-width: 100%;
  max-height: 100vh;
}
.firstDeposit {
  width: 100%;
  position: absolute;
  font-size: 15px;
}
.main-banner .section {
  left: 0;
  top: 0;
  align-items: center;
}
.main-banner .view {
  height: 100%
}
.main-banner .view > div {
  display: flex;
  flex-direction: column;
  margin-top: 17%;
  min-width: 35vw;
}
.main-banner .view .text-view{
  border: 1px #5dcefa solid;
  margin: 0 auto;
  width: 18vw;
  padding: 1% 3%;
}
.main-banner .view .text-view > div > p{
  font-size: 24px;
  color: #c99d14;
  text-align: center;
}
.main-banner .view > div > div {
  margin-top: 8%;
}
.main-banner .view > div > .section-content > .section-content-title {
  flex: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.main-banner .view > div > .section-content > .section-content-detail {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  color: white;
}
.main-banner .view > div > .section-content > .section-content-detail > ul {
  list-style-type: none;
}
.main-banner
  .view
  > div
  > .section-content
  > .section-content-detail
  > ul
  > li {
  text-align: right;
}
.act-content .section {
  left: 0;
  top: 0;
}
.act-content .section .view {
  width: 64vw;
}
.act-content .section .view > .act-t {
  margin-top: 5%;
  display: flex;
  justify-content: center;
}
.act-content .section .view > .act-t .time{
  border: 1px solid #282828;
  padding: 10px;
  border-radius: 25px;
  width: 15vw;
  margin: 1% auto;
  text-align: center;
}
.act-content .section .view .table-group {
  display: flex;
  width: 64vw;
  margin: 0 auto;
}
.act-content .section .view .group-view {
  flex: 1;
  padding: 0 2%;
}
.act-content .section .view .group-view > .group-table {
  position: relative;
}
.act-content .section .view .group-view > .group-table >img {
  position: absolute;
  width: 100%;
  height: 100%;
}
.act-content .section .view .group-view > .group-table > div {
  padding: 1%
}
.act-content .section .view .group-view .group-memo,
.act-content .section .view .group-view .group-title {
  text-align: left;
}
.act-content .section .view .group-view .group-title > div > p{
  font-size: 24px;
  letter-spacing: 5px;
}
.act-content .section .view .group-view .group-desction {
  text-align: center;
  font-size: 14px;
}
.act-content .section .view .group-view .group-desction > .account_block {
  display: flex;
  justify-content: center;
  margin-top: 3px;
}
.account_block > div {
  margin-left: 1%;
  display: flex;
  align-items: stretch;
  justify-content: center;
  align-self: center;
}
.account_block > div:nth-child(1) p{
  /*flex: 1;*/
  font-size: 24px;
}
.account_block > div:nth-child(2) {
  /*flex: 3;*/
}
.account_block > div:nth-child(3) {
  /*flex: 2;*/
}
.account_block > div:nth-child(2) > input{
  border: 1px solid #282828;
  font-size: 24px;
}
.account_block > div:nth-child(3) > input{/*
  background-color: #ffe25f;
  padding: 2%;
  border: none;
  box-shadow: 0px 10px 5px -2px rgb(255,226,95,0.3), 0px 1px 2px 3px rgb(255,226,95,0.3);*/
}
.account_block > div:nth-child(3) > input {
  box-shadow: 0px 1px 0px 0px #fff6af;
  background:linear-gradient(to bottom, #ffec64 5%, #ffab23 100%);
  background-color:#ffec64;
  border-radius:6px;
  display:inline-block;
  cursor:pointer;
  color:#333333;
  font-family:Arial;
  font-size:24px;
  padding:0px 24px;
  text-decoration:none;
  text-shadow:0px 1px 0px #ffee66;
}
.account_block > div:nth-child(3) > input:hover {
  background:linear-gradient(to bottom, #ffab23 5%, #ffec64 100%);
  background-color:#ffab23;
}
.account_block > div:nth-child(3) > input:active {
  position:relative;
  top:1px;
}

.act-content .section .view > .act-t > div {
  width: 100%;
}
.act-content .section .view > .act-t ul {
  list-style-type: decimal;
  line-height: 250%;
  padding: 0 3%;
}
.act-content .section .view > .act-t ul > li {
  text-align: left;
  font-size: 16px;
}
table {
  border-collapse: collapse;
  overflow: hidden;
  margin: 0 auto;
  position: relative;
  color: white;
  width: 100%;
  min-height: 600px;
}
table thead tr {
  color: white;
}
table,
td,
th {
  border: 1px solid #fff;
  color: #fff200;
}
td,
th {
  padding: 1%;
  text-align: center;
  font-size: 14px;
}
table thead tr {
  height: 70px;
}
table th strong,
table td p {
  font-size: 18px;
}
</style>
