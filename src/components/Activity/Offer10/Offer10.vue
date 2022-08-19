<template>
  <div>
    <div style="position:relative;">
      <img
        src="../../../assets/images/activity/Offer10/img/n_main.png"
        alt="banner"
        class="banner-img"
      />
      <div class="section_main" >
        <img
          src="../../../assets/images/activity/Offer10/img/n_main_det.png"
          alt="banner"
          class="banner-img"
        />
      </div>
      <!--表格-->
      <div class="section1">
        <div class="r_content">
          <img src="../../../assets/images/activity/Offer10/img/n_line_time.png" alt="banner" style="width:100%;" >
          <p>2022年8月19日开始</p>
        </div>
        <div class="r_content">
          <img src="../../../assets/images/activity/Offer10/img/n_line_act.png" alt="banner" style="width:100%;" >
          <p>一倍流水，全员十连送</p>
          <div class="table_wrapper">
            <table>
              <thead>
                <tr>
                  <th>申请天数</th>
                  <th>单笔最低存款金额</th>
                  <th>存送比例</th>
                  <th>彩金上限</th>
                  <th class="rightColumn">流水要求</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>第一天</td>
                  <td>1000</td>
                  <td>2%</td>
                  <td>288</td>
                  <td rowspan="10" class="rightColumn">（本金+彩金）一倍</td>
                </tr>
                <tr>
                  <td>第二天</td>
                  <td>1000</td>
                  <td>2%</td>
                  <td>288</td>
                </tr>
                <tr>
                  <td>第三天</td>
                  <td>1000</td>
                  <td>2%</td>
                  <td>288</td>
                </tr>
                <tr>
                  <td>第四天</td>
                  <td>2000</td>
                  <td>3%</td>
                  <td>388</td>
                </tr>
                <tr>
                  <td>第五天</td>
                  <td>2000</td>
                  <td>3%</td>
                  <td>388</td>
                </tr>
                <tr>
                  <td>第六天</td>
                  <td>2000</td>
                  <td>3%</td>
                  <td>388</td>
                </tr>
                <tr>
                  <td>第七天</td>
                  <td>3000</td>
                  <td>4%</td>
                  <td>488</td>
                </tr>
                <tr>
                  <td>第八天</td>
                  <td>3000</td>
                  <td>4%</td>
                  <td>488</td>
                </tr>
                <tr>
                  <td>第九天</td>
                  <td>4000</td>
                  <td>5%</td>
                  <td>588</td>
                </tr>
                <tr>
                  <td>第十天</td>
                  <td>5000</td>
                  <td>5%</td>
                  <td>588</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="r_content">
          <img src="../../../assets/images/activity/Offer10/img/n_line_gift.png" alt="banner" style="width:100%;" >
          <p>无需申请，系统次日晚上20：00前自动派发</p>
        </div>
        <div class="r_content">
          <img src="../../../assets/images/activity/Offer10/img/n_line_role.png" alt="banner" style="width:100%;" >
          <div class="c_area_7">
            <ul>
              <li>
                <i></i>此活动不与任何活动共享，只计算单日单笔最高存款
              </li>
              <li>
                <i></i>每月15日为这个活动新周期的开始。（举例：每月15日为申请第一天）
              </li>
              <li>
                <i></i>依次申请，不能越级，每天只能申请一次
              </li>
              <li>
                <i></i>如有发现对压及不正常投注方式套取彩金，【众鑫娱乐】有权取消优惠以及进行审核！
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

export default {
  components: {},
  data () {
    return {
      futurnData: [],
      historyData: [],
      dataFlag: 0
    }
  },
  Filters: {},
  computed: {},
  watch: {},
  methods: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    // this.loadDataInfo()
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
* {
  font-family: "Ping Fang";
}
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
.section_main {
  position: absolute;
  top: 25.5%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, 0);
  width: 37%;
}
.section1 {
  position: absolute;
  top: 32.2%;
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
  font-size: 24px;
  letter-spacing: 4px;
  color: #f5804b;
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
  background-color: #f5804b;
  border: 1px solid #eef4fd;
  text-align: center;
  font-size: 1.2rem;
  height: 50px;
  color: #ffffff;
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
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 1% 1% 1% 4.5%;
  line-height: 400%;
  font-size: 23px;
  letter-spacing: 2px;
  line-height: 77px;
  color: #f5804b;
  font-weight: 500;
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
