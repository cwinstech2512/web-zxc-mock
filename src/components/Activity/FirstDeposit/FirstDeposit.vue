<template>
  <div class="firstDeposit">
    <!-- <div class="bg"></div> -->
    <section class="c_top">
        <img src="../../../assets/images/activity/FirstDeposit/bg01.png">
        <div class="c_content">
            <img src="../../../assets/images/activity/FirstDeposit/n_ptitle.png">
        </div>
    </section>
    <section class="c_bottom">
        <img src="../../../assets/images/activity/FirstDeposit/bg02.png">
        <div class="c_content">
          <div class="c_area_1">
            <img src="../../../assets/images/activity/FirstDeposit/n_pact_time.png">
          </div>
          <div class="c_area_2">
            2021年5月13日起
          </div>
          <div class="c_area_1">
            <img src="../../../assets/images/activity/FirstDeposit/n_pact_content.png">
          </div>
          <div class="c_area_2">
            参加对象：全体无存款记录会员
          </div>
          <div class="c_area_3">
            <table>
              <thead>
                <tr height="10%">
                  <th width="30%"><strong>首存金额</strong></th>
                  <th width="70%"><strong>实物奖品</strong></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><p>≥1000</p></td>
                  <td><p>进口水果一箱(澳洲进口金手指提子)</p></td>
                </tr>
                <tr>
                  <td>
                    <p>≥4999</p>
                  </td>
                  <td>
                    <p>飞利浦剃须刀或飞利浦电动牙刷</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>≥19999</p>
                  </td>
                  <td>
                    <p>香奈儿香水(男/女)或1000元中国石化加油卡</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>≥48888</p>
                  </td>
                  <td>
                    <p>生鲜帝王蟹(6斤/只 )或黄金吊坠(周生生)</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>≥98888</p>
                  </td>
                  <td>
                    <p>
                      中国黄金金条(10g)或大疆无人机(mini 2)
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>≥188000</p>
                  </td>
                  <td>
                    <p>
                      iPhone 13 Pro Max(512G)或中国黄金金条(20g)+2000元现金
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="c_area_1">
            <img src="../../../assets/images/activity/FirstDeposit/n_pact_self.png">
          </div>
          <div class="c_area_4">
            <div class="account_block">
              <div><p>游戏账号：</p></div>
              <div><input type="text" v-model.trim="username"></div>
              <div><input type="button" value="立即申请" @click="depositSubmit"/></div>
            </div>
          </div>
          <div class="c_area_1">
            <img src="../../../assets/images/activity/FirstDeposit/n_pact_role.png">
          </div>
          <div class="c_area_7">
            <ul>
              <li><i></i>众鑫未充值会员可参与本活动。</li>
              <li>
                <i></i>首存金额计算方式为：第一次投注前累计存款金额。
              </li>
              <li>
                <i></i>该活动仅与返水共享。
              </li>
              <li>
                <i></i
                >本活动首次成功充值后，需于三日内领取礼品，如逾期未领取视为自动放弃。
              </li>
              <li>
                <i></i
                >本活动只针对娱乐性质的会员，同一手机号码、电子邮箱、相同银行卡、同一个IP地址、同一通信地址、同一台设备，只能由一位会员使用，若发现重复行为，众鑫将无限期保留审核、扣回礼品及所产生的利润之权利。
              </li>
              <li>
                <i></i
                >本活动中任何用户或团体以不正常的方式套取活动优惠，我司保留在不通知的情况下冻结或关闭账号使用的权力
  且用户会被列入黑名单。若发现有套利客户，对冲，或不诚实获取盈利之行为，将取消其优惠资格。
              </li>
              <li>
                <i></i
                >为避免文字争议，此活动遵循众鑫活动规则与条款，并由众鑫保留最终解释权。
              </li>
            </ul>
          </div>
        </div>
    </section>
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
*{
    box-sizing: border-box;
}
.firstDeposit{
    margin: 0;
    padding: 0;
}
.firstDeposit section{
    position: relative;
    width: 100%;
}
.firstDeposit img{
    width: 100%;
    display: block;
}
.firstDeposit section > .c_content{
    position: absolute;
    top: 0;
}
.c_top > .c_content{
    top: 19% !important;
    right: 18.7%;
    width: 27vw;
}
.c_top > .c_content > img:nth-child(2){
    position: absolute;
    width: 53%;
    left: 50%;
    bottom: -37%;
    transform: translateX(-50%);
}
.c_bottom > .c_content{
    left: 50%;
    transform: translateX(-50%);
    width: 62.7%;
}
.c_bottom > .c_content > div{
    width: 100%;
}
.c_bottom > .c_content > div.c_area_1{
    position: relative;
    height: 10.5%;
    top: 7.5%;
    display: flex;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
    align-items: center;
    padding: 0 4%;
    line-height: 2.5rem;
    margin-top: 5%;
}
.c_bottom > .c_content > div.c_area_1 > img {
    width: auto;
}
.c_bottom > .c_content > div.c_area_2{
    position: relative;
    width: 100%;
    top: 13%;
    height: 13%;
    padding: 1.4%;
    color: #454444;
    font-size: 1.6rem;
    display: flex;
    justify-content: center;
}
.c_bottom > .c_content > div.c_area_3{
    position: relative;
    top: 13%;
    width: 100%;
    left: 4%;
    height: 3.8%;
    color: white;
    font-size: 1.1rem;
    margin-top: 3%;
}
.c_bottom > .c_content > div.c_area_4{
    position: relative;
    height: 2.35%;
    top: 18.8%;
    color: #202020;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2.5%;
}
.c_bottom > .c_content > div.c_area_4 > .account_block{
    width: 80%;
    display: flex;
    justify-content: center;
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
  border-radius:6px;
  display:inline-block;
  cursor:pointer;
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  font-size:24px;
  padding:0px 24px;
}
.account_block > div:nth-child(3) > input:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}
.account_block > div:nth-child(3) > input:active {
  position:relative;
  top:1px;
}
.c_bottom > .c_content > div.c_area_5{
    position: relative;
    width: 100%;
    top: 18.8%;
    height: 13%;
    padding: 1.4%;
    color: white;
}
.c_bottom > .c_content > div.c_area_6{
    position: relative;
    color: white;
    top: 19%;
    width: 88%;
    left: 4%;
}
.c_bottom > .c_content > div.c_area_7{
    position: relative;
    top: 26.4%;
    height: 24.3%;
    padding: 1.4%;
}
table {
  border-collapse: collapse;
  background: #165c94;
  overflow: hidden;
  margin: 0 auto;
  position: relative;
  color: white;
  width: 100%;
}
table thead tr {
  background: #054070;
  color: white;
}
table,
thead {
  border: 1px solid #3dadff;
}
th:first-child,
td:first-child {
  border-right: 1px solid #3dadff;
}
td,
th {
  padding: 1%;
  text-align: center;
}
table thead tr {
  height: 45px;
}
td {
  height: 60px;
}
td:nth-child(n+2) > p {
  background-color: #51a9d3;
  border: 1px solid #4178a1;
  height: 35px;
  display: flex;
  align-items: center;
  padding-left: 3%;
}
table p {
  font-size: 1.2rem;
}
.c_bottom > .c_content .c_area_7 > ul{
    margin: 0;
    list-style-type: decimal;
    color: #666666;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 1% 1% 1% 4.5%;
    line-height: 200%;
}
.c_bottom > .c_content .c_area_7 > ul > li{
    width: 100%;
    text-align: left;
    font-size: 1.1rem;
}
</style>
