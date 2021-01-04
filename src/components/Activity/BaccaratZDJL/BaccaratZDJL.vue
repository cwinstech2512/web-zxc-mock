<template>
    <div class="baccaratZDJL">
        <section class="c_top">
            <img src="../../../assets/images/activity/BaccaratZDJL/bg01.jpg">
            <div class="c_content">
                <img src="../../../assets/images/activity/BaccaratZDJL/title1.png">
                <img src="../../../assets/images/activity/BaccaratZDJL/title2.png">
                <div class="c_btn">
                    <img src="../../../assets/images/activity/BaccaratZDJL/btn01.png">
                    <span>
                        <img src="../../../assets/images/activity/BaccaratZDJL/btn01_c.png">
                    </span>
                </div>
            </div>
        </section>
        <section class="c_bottom">
            <img src="../../../assets/images/activity/BaccaratZDJL/bg02.jpg">
            <div class="c_content">
                <div class="c_area_1">
                    <div class="c_left">
                        在真人平台（AG、EA和OG）投注百家乐游戏过程中，出现以下牌型即可获得对应单笔投注额度比例奖金。
                    </div>
                    <div class="c_right">
                        <h3>联系在线客服申请即可</h3>
                        <div class="c_content">
                            <div>会员账号：</div>
                            <div>投注金额：</div>
                            <div>所属平台：</div>
                            <div>牌局单号：</div>
                        </div>
                    </div>
                </div>

                <div class="c_area_2">
                    <table>
                        <tr>
                            <th>牌型</th>
                            <th>说明</th>
                            <th>投注额奖金比例</th>
                            <th>优惠上限</th>
                            <th>流水</th>
                        </tr>
                        <tr>
                            <th>同花顺</th>
                            <th>首5牌为同花色且为顺子</th>
                            <th>100%</th>
                            <th>15888元</th>
                            <th>12倍</th>
                        </tr>
                        <tr>
                            <th>四条</th>
                            <th>首4牌相同</th>
                            <th>80%</th>
                            <th>8888元</th>
                            <th>10倍</th>
                        </tr>
                        <tr>
                            <th>同花</th>
                            <th>首5牌为同花色</th>
                            <th>50%</th>
                            <th>5888元</th>
                            <th>8倍</th>
                        </tr>
                        <tr>
                            <th>顺子</th>
                            <th>首5牌为顺子</th>
                            <th>20%</th>
                            <th>1888元</th>
                            <th>6倍</th>
                        </tr>
                        <tr>
                            <th>双对</th>
                            <th>首4牌庄对及闲对</th>
                            <th>10%</th>
                            <th>888元</th>
                            <th rowspan=2 style="border-bottom: none;">5倍</th>
                        </tr>
                        <tr>
                            <th>和气生财</th>
                            <th>庄闲天牌和</th>
                            <th>5%</th>
                            <th>588元</th>
                        </tr>
                    </table>
                </div>

                <div class="c_area_3">
                    会员游戏过程中单笔投注20000元，当局出现【同花顺】牌型，会员在当局投注为20000元即可获得15888元，所需流水为15888x12=190656元。
                </div>

                <div class="c_area_4">
                    <ul>
                        <li>参与会员需成功验证手机；</li>
                        <li>每日仅限申请一次；</li>
                        <li>注单仅限当日申请，超过当日23:59即视为自动放弃，奖金次日下午13点统一派发至【众鑫】账户上</li>
                        <li>注单审核通过后将以站内信通知；</li>
                        <li>该活动仅与返水共享；</li>
                        <li>每位会员只能拥有一个账户，如发现同一IP、同一设备、同一电话、同一邮箱则视为违规账户，将被冻结所有资金，取消所有投注额；</li>
                        <li>任何会员或团体以非正常的方式进行套取活动优惠，众鑫娱乐保留在不通知的情况下冻结或关闭相关账户的权利，并不退还款项且永久列入黑名单；</li>
                        <li>众鑫娱乐对本活动保有最终解释权。</li>
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
.baccaratZDJL{
    margin: 0;
    padding: 0;
}
.baccaratZDJL section{
    position: relative;
}
.baccaratZDJL img{
    width: 100%;
    display: block;
}
.baccaratZDJL section > .c_content{
    position: absolute;
    top: 0;
}
.c_top > .c_content{
    top: 19%;
    left: 7.6%;
    width: 61%;
}
.c_top > .c_content > img:nth-child(1){
    position: relative;
    width: 80%;
    left: 12%;
}
.c_top > .c_content .c_btn{
    position: relative;
    width: 60%;
    left: 56%;
    transform: translateX(-50%);
}
.c_top > .c_content .c_btn span{
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 83%;
}
.c_bottom > .c_content{
    left: 50.2%;
    transform: translateX(-50%);
    width: 57.35%;
    height: 100%;
}
.c_bottom > .c_content > div{
    width: 100%;
}
.c_bottom > .c_content > div.c_area_1{
    position: relative;
    height: 11.5%;
    top: 9.5%;
    display: flex;
    justify-content: space-between;
}
.c_bottom > .c_content > div.c_area_2{
    position: relative;
    width: 97.4%;
    left: 1.44%;
    top: 21.3%;
    height: 20.1%;
}
.c_bottom > .c_content > div.c_area_3{
    position: relative;
    top: 22.3%;
    width: 65%;
    height: 3.8%;
    left: 35.1%;
    color: white;
    padding: 0 2% 0 3%;
    display: flex;
    align-items: center;
}

.c_bottom > .c_content > div.c_area_4{
    position: relative;
    height: 25%;
    top: 33.8%;
    font-size: 1.5rem;
}
.c_bottom > .c_content .c_area_1 > div{
    height: 100%;
    width: 49.3%;
    color: white;
}
.c_bottom > .c_content .c_area_1 > div.c_left{
    padding: 1% 1.7%;
    line-height: 2rem;
    font-size: 1.2rem;
}
.c_bottom > .c_content .c_area_1 > div.c_right{
    padding: 1% 1.7%;
    line-height: 2rem;
}
.c_bottom > .c_content .c_area_1 > div.c_right h3{
    margin: 0;
}
.c_bottom > .c_content .c_area_1 > div.c_right > .c_content{
    display: flex;
    flex-wrap: wrap;
    height: calc(100% - 32px);
    padding: 5% 0;
    align-items: center;
}
.c_bottom > .c_content .c_area_1 > div.c_right > .c_content div{
    width: 50%;
    text-align: center;
    font-size: 1.2rem;
}
.c_bottom > .c_content .c_area_2 > table{
    color: white;
    width: 100%;
    height: 100%;
    border-collapse: collapse;
    letter-spacing: 1.5px;
}
.c_bottom > .c_content .c_area_2 > table th{
    min-height: calc(100%/7);
    border: 1px solid #9d77bf;
    font-size: 1.1rem;
}
.c_bottom > .c_content .c_area_2 > table tr:nth-child(1) > th{
    border-top: none;
}
.c_bottom > .c_content .c_area_2 > table tr:last-child > th{
    border-bottom: none;
}
.c_bottom > .c_content .c_area_2 > table tr > th:nth-child(1){
    border-left: none;
}
.c_bottom > .c_content .c_area_2 > table tr > th:last-child{
    border-right: none;
    width: 12%;
}
.c_bottom > .c_content .c_area_4 > ul{
    margin: 0;
    list-style-type: decimal;
    color: white;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 1% 1% 1% 4.5%;
}
.c_bottom > .c_content .c_area_4 > ul > li{
    width: 100%;
    font-size: 1.15rem;
}
</style>
