<template>
  <div class="message">
    <div class="messageMenu">
      <ul>
        <li class="on">
          <span>消息中心</span>
        </li>
      </ul>
    </div>
    <div class="messageMain">
      <div class="recordpage">
        <div class="tablemain">
          <table>
            <thead>
              <tr>
                <th>标题</th>
                <th>时间</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item,index) in currentPageData"
                :key="index"
                @click="viewInfo(index)"
                ref="read"
                :class="[item.IsRead?'on':'']"
              >
                <td>
                  <em v-show="item.IsRead">(已读)</em>
                  {{item.Title}}
                </td>
                <td>{{item.Time}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="foot">
          <button @click="firstPage()">首页</button>
          <button @click="prevPage()">上一页</button>
          <span>第{{currentPage}}页/共{{totalPage}}页</span>
          <button @click="nextPage()">下一页</button>
          <button @click="lastPage()">尾页</button>
        </div>
      </div>
    </div>
    <div class="messageBox" v-if="boxShow" @click.self="toggleBox">>
      <div class="mboxMain" :class="out? 'out':''">
        <div class="hd">
          <h2>消息中心</h2>
          <i @click="closedBox">×</i>
        </div>
        <div class="bd">
          <div class="tit">
            <span>{{currentPageData[current].Title}}</span>
            <time>{{currentPageData[current].Time}}</time>
          </div>
          <div class="content">
            <p v-html="currentPageData[current].Content"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'message',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data: function () {
    return {
      currentPageData: [],
      totalPage: 1, // 统共页数，默认为1
      currentPage: 1, // 当前页数 ，默认为1
      pageSize: 8, // 每页显示数量
      // begin: '',
      // end: '',
      current: 0,
      boxShow: false,
      out: false
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    getCurrentPageData (pageIndex) {
      let url = '/api/Message/GetList'
      let params = {
        // 'ReadSate': '1', // 读取状态1 ,0
        PageIndex: pageIndex,
        PageSize: this.pageSize,
        Token: this.getinfo().token
      }
      let _this = this
      this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          _this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            _this.currentPageData = res.data.Result.List
            _this.totalPage = res.data.Result.PageCount
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
          console.log(err)
        })
    },
    // 查看信息
    viewInfo (index) {
      this.boxShow = true
      this.current = index
      if (!this.$refs.read[index].classList.contains('on')) {
        let url = '/api/Message/get/' + this.currentPageData[index].Id
        let params = {
          Token: this.getinfo().token
        }
        this.$https
          .fetchPost(url, this.Secret(params))
          .then(res => {
            if (res.data.Success === true) {
              this.getCurrentPageData(this.currentPage)
              this.$bus.$emit('newMsg')
              // console.log(res.data.Result.List)
              // this.currentPageData = res.data.Result.List
              // this.totalPage = res.data.Result.PageCount
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    closedBox () {
      let that = this
      that.out = true
      setTimeout(() => {
        that.boxShow = false
        that.out = false
      }, 600)
    },
    toggleBox () {
      let that = this
      that.out = true
      setTimeout(() => {
        that.boxShow = !that.boxShow
        that.out = false
      }, 600)
    },
    // 拿到页数
    // getCurrentPageData () {
    //   this.begin = (this.currentPage - 1) * this.pageSize
    //   this.end = this.currentPage * this.pageSize
    //   this.totalPage = Math.ceil(this.currentPageData.length / this.pageSize)
    //   this.currentPageData = this.currentPageData.slice(this.begin, this.end)
    // },
    // 上一页
    prevPage () {
      if (this.currentPage === 1) {
        return false
      } else {
        this.currentPage--
        this.getCurrentPageData(this.currentPage)
      }
    },
    // 下一页
    nextPage () {
      if (this.currentPage === this.totalPage) {
        return false
      } else {
        this.getCurrentPageData(++this.currentPage)
      }
    },
    // 首页
    firstPage () {
      this.currentPage = 1
      this.getCurrentPageData(this.currentPage)
    },
    // 尾页
    lastPage () {
      this.currentPage = this.totalPage
      this.getCurrentPageData(this.currentPage)
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.$bus.$emit('loadingShow')
    this.getCurrentPageData(this.currentPage)
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    // this.getCurrentPageData()
  }
}
</script>
<style scoped>
.message {
  width: 100%;
  overflow: hidden;
}
.message .messageMenu {
  width: 100%;
  height: 42px;
  overflow: hidden;
  border-bottom: 1px solid #ddd;
  position: relative;
}
.message .messageMenu ul {
  width: 100%;
}
.message .messageMenu ul li {
  width: 135px;
  height: 42px;
  float: left;
  line-height: 42px;
  font-size: 16px;
  text-align: center;
}
.message .messageMenu ul li.on {
  height: 42px;
  background: #0088ff;
}
.message .messageMenu ul li.on span {
  width: 100%;
  height: 40px;
  font-size: 14px;
  display: block;
  color: #fff;
  box-sizing: border-box;
}
.message .messageMain {
  width: 100%;
  height: 554px;
  box-sizing: border-box;
}
.message .messageMain .messagepage {
  width: 100%;
  overflow: hidden;
}
.message .messageMain .tablemain {
  width: 100%;
  height: 474px;
  overflow: hidden;
}
.message .messageMain .tablemain table {
  width: 100%;
}
.message .messageMain .tablemain table tbody {
  overflow: auto;
}
.message .messageMain .tablemain table thead tr th {
  height: 50px;
  background-color: #fff;
  color: #333;
  font-weight: inherit;
  -webkit-box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
}
.message .messageMain .tablemain table tbody tr.on td {
  color: #a9a9a9;
}
.message .messageMain .tablemain table tbody tr td {
  height: 52px;
  color: #666;
  text-align: center;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}
.message .messageMain .tablemain table tbody tr:hover td {
  color: #0088ff;
}
.message .messageMain .foot {
  width: 100%;
  height: 44px;
  margin-top: 20px;
  padding: 0 20px;
  box-sizing: border-box;
}
.message .messageMain .foot button {
  width: 80px;
  height: 44px;
  margin: 0 10px;
  border: 1px solid #ddd;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
}
.message .messageMain .foot button:hover {
  border: 1px solid #ddd;
  background: #0088ff;
  color: #fff;
}
.message .messageMain .foot span {
  color: #333;
  font-size: 14px;
}
.message .messageBox {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 99;
}
.message .messageBox .mboxMain {
  width: 480px;
  height: 300px;
  background: #fff;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -240px;
  margin-top: -150px;
  overflow: hidden;
  animation: bounceInUp .8s linear;
}
.message .messageBox .mboxMain.out {
  animation: bounceOutUp .8s linear;
}
.message .messageBox .mboxMain .hd {
  width: 100%;
  height: 40px;
  background: #0088ff;
}
.message .messageBox .mboxMain .hd h2 {
  color: #fff;
  line-height: 40px;
  font-size: 16px;
  text-align: center;
}
.message .messageBox .mboxMain .hd i {
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 26px;
  color: #096fc5;
  position: absolute;
  right: 10px;
  top: 3px;
  cursor: pointer;
}
.message .messageBox .mboxMain .hd i:hover {
  color: #fff;
}
.message .messageBox .mboxMain .bd {
  width: 100%;
  overflow: hidden;
}
.message .messageBox .mboxMain .bd .tit {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px dashed #ddd;
}
.message .messageBox .mboxMain .bd .tit span {
  display: block;
  font-size: 16px;
  color: #333;
}
.message .messageBox .mboxMain .bd .tit time {
  font-size: 12px;
  color: #a9a9a9;
}
.message .messageBox .mboxMain .bd .content {
  width: 100%;
  height: 180px;
  padding: 10px;
  box-sizing: border-box;
  overflow-x: auto;
}
.message .messageBox .mboxMain .bd .content::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  border-radius: 10px;
  background-color: #0088ff;
}
.message .messageBox .mboxMain .bd .content::-webkit-scrollbar-track {
  width: 6px;
  height: 6px;
  border-radius: 10px;
  background-color: #f8f8f8;
}
.message .messageBox .mboxMain .bd .content::-webkit-scrollbar-thumb {
  width: 6px;
  height: 6px;
  border-radius: 10px;
  background-color: #0088fe;
}
.message .messageBox .mboxMain .bd .content p {
  font-size: 14px;
  color: #333;
}
</style>
