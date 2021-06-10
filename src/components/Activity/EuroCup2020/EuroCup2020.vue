<template>
  <div>
    <div style="position:relative;">
      <img
        src="../../../assets/images/activity/EuroCup/img/main.png"
        alt="banner"
        class="banner-img"
      />
      <!--表格-->
      <div class="container">
        <img
          src="../../../assets/images/activity/EuroCup/img/table-top.png"
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
        <tr v-for="(item, index) in futurnData" :key="index" >
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
        <tr v-for="(item, index) in historyData" :key="index" >
            <td class="text-center">{{item.DateTimeValidStart}}</td>
            <td class="text-center">{{item.OptValue}}</td>
            <td class="text-center">{{item.OptName}}</td>
            <td class="text-center">{{item.OptText}}</td>
        </tr>
    </table>
      </div>
    </div>
    <!--END表格-->
    <div>
      <img src="../../../assets/images/activity/EuroCup/img/content.png" alt="banner" style="width:100%;" >
    </div>
    <div>
       <img src="../../../assets/images/activity/EuroCup/img/content2.png" alt="content2" style="width:100%">
    </div>
    <div>
      <img
        src="../../../assets/images/activity/EuroCup/img/footer.png"
        alt="footer"
      />
    </div>
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
</style>
