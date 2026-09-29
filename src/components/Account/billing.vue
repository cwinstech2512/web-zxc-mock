<template>
<div class='billing'>
  <div class="billingMenu">
    <ul>
      <li class="on">
        <span>投注记录</span>
      </li>
    </ul>
    <div class="timeFilter">
      <input
        type="text"
        placeholder="选择起始日期"
        id="start"
        onclick="WdatePicker({skin:'default',dateFmt:'yyyy-MM-dd',maxDate:'%y-%M-%d'})"
      />
      <span>至</span>
      <input
        type="text"
        placeholder="选择截至日期"
        id="next"
        onclick="WdatePicker({skin:'default',dateFmt:'yyyy-MM-dd',maxDate:'%y-%M-%d'})"
      />
      <button @click="debounceSearch">确定</button>
    </div>
  </div>
  <div class="billingMain">
    <div class="billingpage">
      <div class="tablemain">
        <table>
          <thead>
            <tr>
              <th>平台</th>
              <th>有效流水</th>
              <th>截止日期</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in tableBetstat" :key="index">
              <td>
                  {{item.PlatText}}
              </td>
              <td>
                  {{item.ValidStake}}
              </td>
              <td>
                  {{item.LastDate}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="foot">
        <span>总存款：<em>{{totalDepAmount}}</em></span>
        <span>总流水：<em>{{totalBetAmount}}</em></span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'billing',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
      startDate: '',
      nextDate: '',
      totalDepAmount: '0.00',
      totalBetAmount: '0.00',
      tableBetstat: []
    }
  },
  //  监听属性 类似于data概念
  computed: {
  },
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    /**
     * @description 查询事件
     */
    getSearch () {
      this.startDate = document.querySelector('#start').value
      this.nextDate = document.querySelector('#next').value

      let _this = this
      let url = '/api/batstat/get'
      let params = {
        'StartDate': _this.startDate,
        'EndDate': _this.nextDate,
        'Token': _this.getinfo().token
      }
      _this.$https.fetchPost(url, _this.Secret(params))
        .then((res) => {
          if (res.data.Success === true) {
            _this.totalDepAmount = res.data.Result.TotalDepAmount
            _this.totalBetAmount = res.data.Result.TotalBetAmount
            _this.tableBetstat = res.data.Result.TableList
            // console.log('tag_succ', res.data.Result)
          } else {
            // console.log('tag_false', res.data.Result)
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: '确定'
            })
          }
        }).catch(err => {
          console.log('tag', err)
        })
    },
    // eslint-disable-next-line no-undef
    debounceSearch: _.debounce(function () {
      // console.log('current_time', new Date())
      this.getSearch()
    }, 1000, {
      leading: true,
      trailing: false
    })
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    const s = document.createElement('script')
    s.type = 'text/javascript'
    s.src = 'static/js/My97DatePicker/WdatePicker.js'
    document.body.appendChild(s)
  }
}
</script>
<style scoped>
.billing {
  width: 100%;
  overflow: hidden;
}
.billing .billingMenu {
  width: 100%;
  height: 42px;
  overflow: hidden;
  border-bottom: 1px solid #ddd;
  position: relative;
}
.billing .billingMenu ul {
  width: 100%;
}
.billing .billingMenu ul li {
  width: 135px;
  height: 42px;
  line-height: 42px;
  font-size: 16px;
  text-align: center;
}
.billing .billingMenu ul li.on {
  height: 42px;
  background: #0088ff;
}
.billing .billingMenu ul li.on span {
  width: 100%;
  height: 40px;
  font-size: 14px;
  display: block;
  color: #fff;
  box-sizing: border-box;
}
.billing .billingMenu .timeFilter{
  position: absolute;
  right: 0;
  top: 0;
  width: 380px;
  height: 42px;
}
.billing .billingMenu .timeFilter input{
  width: 96px;
  height: 32px;
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 0 5px;
  margin: 4px 10px 0 10px;
  outline:none;
  position: relative;
}
::-webkit-input-placeholder{
  color: #cecece;
}
.billing .billingMenu .timeFilter button{
  width: 80px;
  height: 34px;
  border: 1px solid #ddd;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
  background: #0088ff;
  color: #fff;
}
.billing .billingMenu .timeFilter button:hover{
  background: #1d95ff;
}
.billing .billingMain {
  width:100%;
  box-sizing: border-box;
}
.billing .billingMain .billingpage{
  width:100%;
  overflow: hidden;
}
.billing .billingMain .tablemain {
  width:100%;
  height: 520px;
  overflow:hidden;
}
.billing .billingMain .tablemain table {
  width:100%;
}
.billing .billingMain .tablemain table tbody{
  overflow: auto;
}
.billing .billingMain .tablemain table thead tr th {
  height:50px;
  background-color:#FFF;
  color:#333;
  font-weight:inherit;
  -webkit-box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
}
.billing .billingMain .tablemain table tbody tr td {
  height:46px;
  color:#666;
  text-align:center;
}
.billing .billingMain .tablemain table tbody tr{
  border-bottom:1px solid #eee;
}
.billing .billingMain .tablemain table tbody tr:hover td {
  color:#0088ff;
}
.billing .billingMain .foot{
  width: 100%;
  height: 44px;
  margin-top: 20px;
  padding: 0 20px;
  box-sizing: border-box;
}
.billing .billingMain .foot span{
  color: #333;
  font-size: 16px;
  margin-right: 20px;
}
.billing .billingMain .foot span em{
  color: #ff2424;
  font-size: 18px;
}
</style>
