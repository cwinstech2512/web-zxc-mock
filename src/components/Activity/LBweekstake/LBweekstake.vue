<template>
    <div class="LBweekstake">
        <section class="c_top">
            <img src="../../../assets/images/activity/LBweekstake/bg01.jpg">
            <div class="c_content">
                <div class="c_left"><h3>活动时间</h3>2021年1月18日起</div>
                <div class="c_center"><h3>活动对象</h3>众鑫会员</div>
                <div class="c_right"><h3>派发方式</h3><span>每周一下午16:00系统自动发放</span></div>
            </div>
        </section>
        <section class="c_bottom">
            <img src="../../../assets/images/activity/LBweekstake/bg02.jpg">
            <div class="c_content">
                <div class="c_area_1">
                    LB周周返现，最高返现11888元!
                </div>
                <div class="c_area_2">
                    <table>
                        <tr>
                            <td>LB快乐彩周投注额</td>
                            <td>≥5W</td>
                            <td>≥20W</td>
                            <td>≥100W</td>
                            <td>≥400W</td>
                            <td>≥700W</td>
                        </tr>
                        <tr>
                            <td style="color: black;">最高彩金奖励</td>
                            <td>188</td>
                            <td>888</td>
                            <td>2688</td>
                            <td>5888</td>
                            <td>11888</td>
                        </tr>
                        <tr>
                            <td>流水要求</td>
                            <td>1倍</td>
                            <td>2倍</td>
                            <td>4倍</td>
                            <td>4倍</td>
                            <td>8倍</td>
                        </tr>
                    </table>
                </div>
                <div class="c_area_3">
                    *注：每个会员每周仅限一次申请机会（长期单边投注不享有该优惠。例如，只投注“大”或只投注“小”）
                </div>
                <div class="c_area_4">
                    <ul>
                        <li>该活动除每日签到、返水外，不与其他活动流水共享；</li>
                        <li>该优惠只针对LB平台游戏投注有效</li>
                        <li>活动时间以自然周为单位</li>
                        <li>每位有效玩家、每一手机号码、电子邮箱、相同银行卡、每一个IP地址、每一台电脑者每周只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利的权利</li>
                        <li>无论是个人或团体，如有任何威胁、滥用此优惠套取利益，一经核实，众鑫娱乐有权利取消、收回优惠以及优惠产生的盈利</li>
                        <li>众鑫娱乐保留对本次活动的修改、修订和最终解释权，以及在无通知情况下修改本次活动的权利</li>
                    </ul>
                </div>

            </div>
        </section>
    </div>
</template>
<script>
export default {
  components: {},
  data () {
    return {
      QuestionShow: false
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {},
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
.LBweekstake{
    margin: 0;
    padding: 0;
}
.LBweekstake section{
    position: relative;
}
.LBweekstake img{
    width: 100%;
    display: block;
}
.LBweekstake section > .c_content{
    position: absolute;
    top: 0;
}
.LBweekstake section.c_top > .c_content{
    top: 69.2%;
    height: 11%;
    left: 50%;
    transform: translateX(-50%);
    width: 71.5%;
    display: flex;
    justify-content: space-between;
}

.c_top > .c_content > div{
    width: 32%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-wrap: wrap;
    color: #f7e2cb;
    font-size: 2rem;
    padding: 1% 0;
}
.c_top > .c_content > div > h3{
    color: #f7e2cb;
    font-size: 2rem;
    margin: 0;
    width: 100%;
}
.c_top > .c_content > div > span{
    font-size: 1.4rem;
    display: block;
    width: 100%;
    color: #f7e2cb;
}

.c_bottom > .c_content{
    left: 50%;
    transform: translateX(-50%);
    width: 74.5%;
    height: 100%;
}
.c_bottom > .c_content > div.c_area_1{
    position: relative;
    height: 6.5%;
    top: -4%;
    color: #f7e2cb;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
}
.c_bottom > .c_content > div.c_area_2{
    position: relative;
    width: 100%;
    top: -3%;
    height: 27.4%;
    color: #f7e2cb;
    padding: 0.91% 1%;
}

.c_area_2 > table{
    width: 100%;
    height: 100%;
}
.c_area_2 > table tr{
    height: calc(100%/3);
}
.c_area_2 > table td{
    text-align: center;
    width: calc(90%/5 + 0.2%);
    font-size: 1.8rem;
}
.c_area_2 > table td:nth-child(1){
    text-align: center;
    width: 10%;
    font-size: 1.5rem;
}

.c_bottom > .c_content > div.c_area_3{
    position: relative;
    top: -2.6%;
    width: 97%;
    color: #f7e2cb;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.5rem;
}
.c_bottom > .c_content > div.c_area_4{
    position: relative;
    height: 41%;
    top: 13.8%;
    color: white;
    display: flex;
    align-items: center;
}
.c_area_4 > ul{
    margin: 0;
    height: 100%;
    padding: 1% 2% 1% 5%;
    color: #f7e2cb;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}
.c_area_4 > ul > li{
    list-style-type: decimal;
    font-size: 1.8rem;
    width: 100%;
}
</style>
