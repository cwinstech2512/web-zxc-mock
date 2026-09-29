<template>
  <div class="record">
    <!-- <div class="recordMenu">
      <div class="swiper-container" id="recordMenu">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(Menu, index) in recordMenu"
            :key="index"
            @click="switchRecord(index)"
            :class="[{on: index == active},Menu.code]"
          >
            <span>{{Menu.name}}</span>
          </div>
        </div>
      </div>
      <div class="recPrev"></div>
      <div class="recNext"></div>
    </div> -->
    <ul class="recordMenu">
      <li
        v-for="(Menu, index) in recordMenu"
        :key="index"
        @click="switchRecord(index)"
        :class="[{on: index == active},Menu.code]"
      ><span>{{Menu.name}}</span></li>
    </ul>
    <div class="recordMain">
      <div class="recordpage" v-show="active === 0">
        <div class="tablemain">
          <table>
            <thead>
              <tr>
                <th>充值时间</th>
                <th>充值方式</th>
                <th>金额</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              <tr class="empty" v-show="!showPgination">
                <td colspan="4">您没有充值记录！</td>
              </tr>
              <tr v-for="(item,index) in currentPageData" :key="index">
                <td>{{item.CreateTime}}</td>
                <td>{{item.Notes}} <b v-show="item.Notes && item.Notes.length>10" @click="handleCopy(item.Notes,$event)">复制订单号</b></td>
                <td :class="item.State=='无效订单'? 'r':''">{{item.Amount}}</td>
                <td :class="item.State=='已支付'? 'b': item.State=='无效订单'? 'r':''">{{item.State}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="foot" v-show="showPgination">
          <button @click="firstPage()">首页</button>
          <button @click="prevPage()">上一页</button>
          <span>第{{currentPage}}页/共{{totalPage}}页</span>
          <button @click="nextPage()">下一页</button>
          <button @click="lastPage()">尾页</button>
        </div>
      </div>
      <div class="recordpage" v-show="active === 1">
        <div class="tablemain">
          <table>
            <thead>
              <tr>
                <th>提款时间</th>
                <th>提款银行/备注</th>
                <th>金额</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              <tr class="empty" v-show="!showPgination">
                <td colspan="4">您没有提款记录！</td>
              </tr>
              <tr v-for="(item,index) in currentPageData" :key="index">
                <td>{{item.CreateTime}}</td>
                <td>{{item.Notes}}</td>
                <td>{{item.Amount}}</td>
                <td :class="item.State=='已支付'? 'b':''">{{item.State}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="foot" v-show="showPgination">
          <button @click="firstPage()">首页</button>
          <button @click="prevPage()">上一页</button>
          <span>第{{currentPage}}页/共{{totalPage}}页</span>
          <button @click="nextPage()">下一页</button>
          <button @click="lastPage()">尾页</button>
        </div>
      </div>
      <div class="recordpage" v-show="active === 2">
        <div class="tablemain">
          <table>
            <thead>
              <tr>
                <th>转账时间</th>
                <th>转账类型</th>
                <th>金额</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              <tr class="empty" v-show="!showPgination">
                <td colspan="4">您没有转账记录！</td>
              </tr>
              <tr v-for="(item,index) in currentPageData" :key="index">
                <td>{{item.CreateTime}}</td>
                <td>{{item.Type}}</td>
                <td>{{item.Amount}}</td>
                <td>成功</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="foot" v-show="showPgination">
          <button @click="firstPage()">首页</button>
          <button @click="prevPage()">上一页</button>
          <span>第{{currentPage}}页/共{{totalPage}}页</span>
          <button @click="nextPage()">下一页</button>
          <button @click="lastPage()">尾页</button>
        </div>
      </div>
      <div class="recordpage" v-show="active === 3">
        <div class="tablemain">
          <table>
            <thead>
              <tr>
                <th>派发时间</th>
                <th>备注</th>
                <th>金额</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              <tr class="empty" v-show="!showPgination">
                <td colspan="4">您没有优惠记录！</td>
              </tr>
              <tr v-for="(item,index) in currentPageData" :key="index">
                <td>{{item.CreateTime}}</td>
                <td>{{item.Notes}}</td>
                <td>{{item.Amount}}</td>
                <td>已派发</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="foot" v-show="showPgination">
          <button @click="firstPage()">首页</button>
          <button @click="prevPage()">上一页</button>
          <span>第{{currentPage}}页/共{{totalPage}}页</span>
          <button @click="nextPage()">下一页</button>
          <button @click="lastPage()">尾页</button>
        </div>
      </div>
      <!-- <div class="recordpage" v-show="active === 4">
        <div class="tablemain">
          <table>
            <thead>
              <tr>
                <th>派发时间</th>
                <th>类型</th>
                <th>金币</th>
                <th>备注</th>
              </tr>
            </thead>
            <tbody>
              <tr class="empty" v-show="!showPgination">
                <td colspan="4">您没有淘金币记录！</td>
              </tr>
              <tr v-for="(item,index) in currentPageData" :key="index">
                <td>{{item.CreateTime}}</td>
                <td>{{item.Type}}</td>
                <td>{{item.Integral}}</td>
                <td>{{item.Notes}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="foot" v-show="showPgination">
          <button @click="firstPage()">首页</button>
          <button @click="prevPage()">上一页</button>
          <span>第{{currentPage}}页/共{{totalPage}}页</span>
          <button @click="nextPage()">下一页</button>
          <button @click="lastPage()">尾页</button>
        </div>
      </div>
      <div class="recordpage" v-show="active === 5">
        <div class="tablemain">
          <table>
            <thead>
              <tr>
                <th>兑换时间</th>
                <th>名称</th>
                <th>价格(金币)</th>
                <th>筹码价值</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              <tr class="empty" v-show="!showPgination">
                <td colspan="5">您没有筹码兑换记录！</td>
              </tr>
              <tr v-for="(item,index) in currentPageData" :key="index">
                <td>{{item.CreateTime}}</td>
                <td>{{item.Name}}</td>
                <td>{{item.Price}}</td>
                <td>{{item.ProductValue}}</td>
                <td>兑换成功</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="foot" v-show="showPgination">
          <button @click="firstPage()">首页</button>
          <button @click="prevPage()">上一页</button>
          <span>第{{currentPage}}页/共{{totalPage}}页</span>
          <button @click="nextPage()">下一页</button>
          <button @click="lastPage()">尾页</button>
        </div>
      </div> -->
      <div class="recordpage" v-show="active === 4">
        <div class="tablemain">
          <table>
            <thead>
              <tr>
                <th>日期</th>
                <th>优惠代码</th>
                <th>有效日期</th>
                <th>活动平台</th>
                <th>转入金额</th>
                <th>投注倍数</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              <tr class="empty" v-show="!showPgination">
                <td colspan="7">您没有优惠代码记录！</td>
              </tr>
              <tr v-for="(item,index) in currentPageData" :key="index">
                <td>{{item.CreateTime}}</td>
                <td>{{item.PromCode}}</td>
                <td>{{item.ValidDate}}</td>
                <td>{{item.Plat}}</td>
                <td>{{item.Amount}}</td>
                <td>{{item.BetMultiple}}</td>
                <td>{{item.State}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="foot" v-show="showPgination">
          <button @click="firstPage()">首页</button>
          <button @click="prevPage()">上一页</button>
          <span>第{{currentPage}}页/共{{totalPage}}页</span>
          <button @click="nextPage()">下一页</button>
          <button @click="lastPage()">尾页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import clipboard from '@/plugin/clipboard.js'
import Swiper from 'swiper/dist/js/swiper.min.js'
export default {
  name: 'record',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //  这里存放数据
    return {
      active: 0,
      recordMenu: [
        {
          code: '1',
          name: '充值记录'
        },
        {
          code: '2',
          name: '提款记录'
        },
        {
          code: '3',
          name: '转账记录'
        },
        {
          code: '4',
          name: '优惠记录'
        },
        {
          code: '7',
          name: '优惠代码记录'
        }
      ],
      swiperRecordMenu: null, // 初始swiper动画
      showPgination: false,
      // productList2: [], // 所有数据2
      // productList: [], // 所有数据1
      totalPage: 1, // 统共页数，默认为1
      currentPage: 1, // 当前页数 ，默认为1
      pageSize: 8, // 每页显示数量
      currentPageData: [] // 当前页显示内容
      // begin: '',
      // end: ''
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    // 复制信息
    handleCopy (text, event) {
      clipboard((text).replace(/[^0-9]/ig, ''), event)
    },
    SwiperMenu () {
      var that = this
      that.$nextTick(function () {
        that.swiperRecordMenu = new Swiper('#recordMenu', {
          observer: true,
          observeParents: true,
          simulateTouch: false,
          slidesPerView: 6,
          navigation: {
            nextEl: '.recNext',
            prevEl: '.recPrev'
          }
        })
      })
    },
    // 切换导航
    switchRecord (index) {
      var that = this
      that.active = index
      // this.swiperRecordMenu.slideTo(index)
      that.$nextTick(function () {
        that.$bus.$emit('loadingShow')
        that.showPgination = false
        that.currentPageData = []
        that.currentPage = 1
        that.getCurrentPageData()
      })
    },
    // 设置当前页面数据，对数组操作的截取规则为[0~9],[10~20]...,
    // 当currentPage为1时，我们显示(0*pageSize+1)-1*pageSize，当currentPage为2时，我们显示(1*pageSize+1)-2*pageSize...
    getCurrentPageData () {
      this.getRecord(this.recordMenu[this.active].code, this.currentPage)
    },
    getPagination () {
      // 是否显示页脚
      if (this.totalPage >= 1) {
        this.showPgination = true
      } else {
        this.showPgination = false
      }
    },
    // 上一页
    prevPage () {
      if (this.currentPage === 1) {
        return false
      } else {
        this.currentPage--
        this.getCurrentPageData()
      }
    },
    // 下一页
    nextPage () {
      if (this.currentPage === this.totalPage) {
        return false
      } else {
        this.currentPage++
        this.getCurrentPageData()
      }
    },
    // 首页
    firstPage () {
      this.currentPage = 1
      this.getCurrentPageData()
    },
    // 尾页
    lastPage () {
      this.currentPage = this.totalPage
      this.getCurrentPageData()
    },
    /**
     * @description 查询交易记录
     */
    getRecord (type, pageIndex) {
      let _this = this
      let url = '/api/Record/Get'
      let params = {
        Type: type,
        PageIndex: pageIndex,
        PageSize: _this.pageSize,
        Token: _this.getinfo().token
      }
      _this.$https
        .fetchPost(url, _this.Secret(params))
        .then(res => {
          _this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            // console.info('succ_', res.data.Result)
            _this.currentPageData = res.data.Result.List
            _this.totalPage = res.data.Result.PageCount
            _this.getPagination()
          } else {
            _this
              .$swal({
                text: res.data.Message,
                type: 'error',
                confirmButtonText: '确定'
              })
              .then(r => {
                if (res.data.Status === 'LoginExpire') {
                  _this.logout()
                  _this.$router.push('/login')
                }
              })
          }
        })
        .catch(err => {
          console.log('error', err)
        })
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$bus.$emit('loadingShow')
    // this.SwiperMenu()
    this.getCurrentPageData()
  }
}
</script>
<style scoped>
.record {
  width: 100%;
  overflow: hidden;
}
.record .recordMenu {
  width: 100%;
  height: 42px;
  overflow: hidden;
  border-bottom: 1px solid #ddd;
  position: relative;
}
.record .recordMenu li {
  float: left;
  width: 130px;
  height: 42px;
  line-height: 42px;
  text-align: center;
  cursor: pointer;
}
.record .recordMenu li.on {
  background: #0088ff;
  color: #fff;
}
.record .swiper-container {
  width: 810px;
  margin: 0;
  border-right: 1px solid #ddd;
}
.swiper-slide {
  width: 110px;
  height: 42px;
  line-height: 42px;
  text-align: center;
  cursor: pointer;
}
.swiper-slide span {
  display: block;
  width: 100%;
  height: 100%;
  font-size: 14px;
  color: #333;
}
.swiper-slide.on {
  background: #0088ff;
}
.swiper-slide.on span {
  color: #fff;
}
.recPrev {
  width: 25px;
  height: 24px;
  background: url(../../assets/images/account/button.png);
  background-position: 0 0;
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  right: 45px;
  outline: none;
}
.recNext {
  width: 25px;
  height: 24px;
  background: url(../../assets/images/account/button.png);
  background-position: -25px 0;
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  right: 20px;
  outline: none;
}
.recPrev.swiper-button-disabled,
.recPrev.swiper-button-disabled:hover {
  opacity: 0.3;
  background-position: 0 0;
  cursor: default;
}
.recNext.swiper-button-disabled,
.recNext.swiper-button-disabled:hover {
  opacity: 0.3;
  background-position: -25px 0;
  cursor: default;
}
.recPrev:hover {
  background-position: 0 -24px;
}
.recNext:hover {
  background-position: -25px -24px;
}
.record .recordMain {
  width: 100%;
  height: 554px;
  box-sizing: border-box;
}
.record .recordMain .recordpage {
  width: 100%;
  overflow: hidden;
}
.record .recordMain .tablemain {
  width: 100%;
  height: 474px;
  overflow: hidden;
}
.record .recordMain .tablemain table {
  width: 100%;
}
.record .recordMain .tablemain table tbody {
  overflow: auto;
}
.record .recordMain .tablemain table thead tr th {
  height: 50px;
  background-color: #fff;
  color: #333;
  font-weight: inherit;
  -webkit-box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
}
.record .recordMain .tablemain table tbody tr td {
  height: 52px;
  color: #666;
  text-align: center;
  border-bottom: 1px solid #eee;
}
.record .recordMain .tablemain table tbody tr td.b {
  color: #06c141;
}
.record .recordMain .tablemain table tbody tr td.r {
  color: #e40839;
  text-decoration:line-through;
}
.record .recordMain .tablemain table tbody tr td b{
  padding: 5px 8px;
  background: #0088ff;
  float: right;
  color: #fff;
  border-radius: 3px;
  font-weight: normal;
  cursor: pointer;
}
.record .recordMain .tablemain table tbody tr td b:hover{
  background: #fca42c;
}
.record .recordMain .foot {
  width: 100%;
  height: 44px;
  margin-top: 20px;
  padding: 0 20px;
  box-sizing: border-box;
}
.record .recordMain .foot button {
  width: 80px;
  height: 44px;
  margin: 0 10px;
  border: 1px solid #ddd;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
}
.record .recordMain .foot button:hover {
  border: 1px solid #ddd;
  background: #0088ff;
  color: #fff;
}
.record .recordMain .foot span {
  color: #333;
  font-size: 14px;
}
</style>
