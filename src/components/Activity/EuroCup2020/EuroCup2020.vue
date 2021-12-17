<template>
  <div>
    <div style="position:relative;">
      <img
        src="../../../assets/images/activity/EuroCup/img/n_main.png"
        alt="banner"
        class="banner-img"
      />
      <!--表格-->
      <div class="container" >
        <div class="active_date"><h3>活动时间：2021年12月18日起</h3></div>
        <div class="active_content_title"><h3>【仅限AI体育平台】 每周六指定赛事负盈利100%包赔</h3></div>
        <img
          src="../../../assets/images/activity/EuroCup/img/n_table-top.png"
          alt="Snow"
          class="table-top"
        />
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" :class="dataFlag==0?'btn-active':''" @click="changeFlag(0)" class="btn btn-play">近期赛事</button>
          <button type="button" :class="dataFlag==1?'btn-active':''" @click="changeFlag(1)" class="btn btn-play">历史赛事</button>
        </div>
        <table id="tbFuture" v-if="dataFlag==0">
          <tr>
              <td class="play-title">比赛日期</td>
              <td class="play-title">赛事名称</td>
              <td class="play-title">主队名称</td>
              <td class="play-title">客队名称</td>
          </tr>
          <tr v-for="(item, index) in futurnData.slice(0, 13)" :key="index" >
              <td class="text-center">{{item.DateTimeValidStart | formatDate}}</td>
              <td class="text-center">{{item.OptValue}}</td>
              <td class="text-center">{{item.OptName}}</td>
              <td class="text-center">{{item.OptText}}</td>
          </tr>
        </table>
        <table id="tbHistory" v-else>
            <tr>
                <td class="play-title">比赛日期</td>
                <td class="play-title">赛事名称</td>
                <td class="play-title">主队名称</td>
                <td class="play-title">客队名称</td>
            </tr>
            <tr v-for="(item, index) in historyData.slice(0, 13)" :key="index" >
                <td class="text-center">{{item.DateTimeValidStart}}</td>
                <td class="text-center">{{item.OptValue}}</td>
                <td class="text-center">{{item.OptName}}</td>
                <td class="text-center">{{item.OptText}}</td>
            </tr>
        </table>
      </div>
      <div class="section1">
        <div class="r_content">
          <img src="../../../assets/images/activity/EuroCup/img/n_line_act.png" alt="banner" style="width:100%;" >
          <p>近一周内满足相应有效投注额即可在周六指定赛事享受100%包赔，最高1888元。</p>
        </div>
        <div class="r_content">
          <img src="../../../assets/images/activity/EuroCup/img/n_line_gift.png" alt="banner" style="width:100%;" >
          <div class="table_wrapper">
            <table>
              <thead>
                <tr>
                  <th>近一周总有效投注</th>
                  <th>包赔上限</th>
                  <th class="rightColumn">流水</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>≥5000</td>
                  <td>58元</td>
                  <td rowspan="8" class="rightColumn">一倍流水</td>
                </tr>
                <tr>
                  <td>≥10000</td>
                  <td>88元</td>
                </tr>
                <tr>
                  <td>≥20000</td>
                  <td>188元</td>
                </tr>
                <tr>
                  <td>≥50000</td>
                  <td>288元</td>
                </tr>
                <tr>
                  <td>≥100000</td>
                  <td>388元</td>
                </tr>
                <tr>
                  <td>≥200000</td>
                  <td>588元</td>
                </tr>
                <tr>
                  <td>≥500000</td>
                  <td>888元</td>
                </tr>
                <tr>
                  <td>≥1000000</td>
                  <td>1888元</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="r_content">
          <img src="../../../assets/images/activity/EuroCup/img/n_line_role.png" alt="banner" style="width:100%;" >
          <div class="c_area_7">
            <ul>
              <li>
                <i></i>该活动仅与返水共享；
              </li>
              <li>
                <i></i>近一周内需单笔有效存款≥500元；注：近一周指上周六00:00~本周五23:59，且计算有效投注均以结算时间为准。
              </li>
              <li>
                <i></i>仅限第一笔投注于早盘独赢、让球及大小盘口注单;
              </li>
              <li>
                <i></i>彩金将于赛事结束后24小时内自动派发；
              </li>
              <li>
                <i></i>若指定赛事出现腰斩，凡满足要求的会员均可获得幸运红包88元；
              </li>
              <li>
                <i></i>同一IP、同一设备、同一电话、同一邮箱则视为违规账户，将取消所有优惠并冻结所有资金；
              </li>
              <li>
                <i></i>任何会员或团体以非正常的方式进行套取活动优惠，众鑫娱乐保留在不通知的情况下冻结或关闭相关账户的权利，并不退还款项且永久列入黑名单；
              </li>
              <li>
                <i></i>众鑫娱乐对本活动保有最终解释权。
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!--END表格-->
  </div>
</template>

<script>
import moment from 'moment'

export default {
  components: {},
  data () {
    return {
      futurnData: [],
      historyData: [],
      dataFlag: 0
    }
  },
  Filters: {
    formatDate (val) {
      if (val) {
        return moment(String(val)).format('MM/DD/YYYY hh:mm')
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    changeFlag (val) {
      this.dataFlag = val
    },
    loadDataInfo () {
      let _this = this
      let url = 'api/EuropeanCup/info'
      let params = {
        Token: _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            this.futurnData = res.data.Result.future
            this.historyData = res.data.Result.history
          }
        }).catch(err => {
          console.log('error', err)
        })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.loadDataInfo()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
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
@import "../../../assets/images/activity/EuroCup/style/bootstrap.min.css";
@import "../../../assets/images/activity/EuroCup/style/bootstrap-theme.min.css";
@import "../../../assets/images/activity/EuroCup/style/default.css";

.active_date {
  position: absolute;
  left: 56.5%;
  top: 17.7%;
  width: 34.2%;
}
.active_date > h3 {
  color: #ac3224;
  letter-spacing: 8px;
  text-align: center;
}
.active_content_title {
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.active_content_title  > h3{
  letter-spacing: 4px;
}
.section1 {
  position: absolute;
  top: 38.2%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, 0);
  width: 70%;
}
.section1 > .r_content {
  position: relative;
  padding-top: 3%;
}
.section1 > .r_content > p {
  padding: 2%;
  font-size: 18px;
  letter-spacing: 4px;
}
.section1 > .r_content > .table_wrapper {
  position: relative;
  padding: 2% 0;
}
.section1 > .r_content > .table_wrapper > table {
  position: relative;
  width: 80%;
  margin: 0 auto;
}
.section1 > .r_content > .table_wrapper > table td {
  background: #b3d9f5;
  text-align: center;
  font-size: 1.2rem;
  border: 1px solid #ffffff;
  height: 50px;
  color: #2e2e2e;
}
.section1 > .r_content > .table_wrapper > table th {
  background: #2e2e2e;
  color: #fff;
  font-size: 1.3rem;
  text-align: center;
  border: 1px solid #ffffff;
}
.section1 > .r_content > .table_wrapper > table thead {
  height: 60px;
}
.section1 > .r_content .c_area_7 > ul{
    margin: 0;
    list-style-type: decimal;
    color: #666666;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 1% 1% 1% 4.5%;
    line-height: 400%;
}
.section1 > .r_content .c_area_7 > ul > li{
    width: 100%;
    text-align: left;
    font-size: 1.3rem;
}
.section1 > .r_content > div.c_area_7{
    position: relative;
    /* top: 26.4%;
    height: 24.3%; */
    padding: 1.4% 0;
}
</style>
