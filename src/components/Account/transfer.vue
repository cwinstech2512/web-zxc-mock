<template>
  <div class="transfer">
    <div class="transferMenu">
      <ul>
        <li class="on">
          <span>转账</span>
        </li>
      </ul>
    </div>
    <div class="transferMain" v-if="gamePlat.length>0">
      <ul>
        <li>
          <label>转出账户：</label>
          <select v-model="Outval" @change="changeAcc('out',Outval)">
            <option value="out">----选择转出账户----</option>
            <option
              v-for="(item, index) in gamePlat"
              :key="index"
              :value="item.Plat"
              :disabled="index==0?true:false"
            >{{item.GameName}}</option>
          </select>
        </li>
        <li>
          <label>转入账户：</label>
          <select v-model="Inval" @change="changeAcc('in',Inval)">
            <option value="in">----选择转入账户----</option>
            <option
              v-for="(item, index) in gamePlat"
              :key="index"
              :value="item.Plat"
              :disabled="index==0?true:false"
            >{{item.GameName}}</option>
          </select>
        </li>
        <li>
          <label>转账金额：</label>
          <input type="number" placeholder="0元" v-model.trim="amount" @change="changeAmount" />
          <span>
            <em>*请输入转账金额</em>
          </span>
        </li>
        <li>
          <ul class="amountBtn" onselectstart="return false">
            <li
              v-for="(abtn, index) in amountBtn"
              :key="index"
              :class="abtn.code"
              @click="addAmount(abtn.code)"
            >{{abtn.text}}</li>
          </ul>
        </li>
        <li>
          <button :class="hidBtn||sending? 'hid':''" @click="send()">立即转账</button>
        </li>
      </ul>
      <div class="cutover">
        <i id="CutOver" @click="changeVal()"></i>
      </div>
      <div class="text">
        <p>
          <span>转账没有成功，但是钱却没了怎么办？</span>
          <br />答：转账时请先退出游戏平台再操作。如转账掉单，请联系在线客服查询补单。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'transfer',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //  这里存放数据
    return {
      gamePlat: [],
      Outval: 'out',
      Inval: 'in',
      amount: '',
      hidBtn: true,
      amountBtn: [
        {
          code: 'sum100',
          text: '100'
        },
        {
          code: 'sum500',
          text: '500'
        },
        {
          code: 'sum1000',
          text: '1000'
        },
        {
          code: 'sum5000',
          text: '5000'
        },
        {
          code: 'all',
          text: '全部'
        },
        {
          code: 'clear',
          text: '清除'
        }
      ],
      sending: false,
      getbaling: false
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {},
  //  方法集合
  methods: {
    // 选择账户切换
    changeAcc (item, val) {
      if (item === 'out') {
        if (val === 'ZXC') {
          this.Inval = 'in'
        } else {
          this.Inval = 'ZXC'
        }
      } else {
        if (val === 'ZXC') {
          this.Outval = 'out'
        } else {
          this.Outval = 'ZXC'
        }
      }
      this.changeAmount()
    },
    // 点击切换账户
    changeVal (Outval, Inval) {
      if (this.Outval !== 'out' && this.Inval !== 'in') {
        Outval = this.Outval
        Inval = this.Inval
        this.Outval = Inval
        this.Inval = Outval
      }
    },
    // 改变金额
    changeAmount () {
      if (this.Outval !== 'out' || this.Inval !== 'in') {
        if (this.amount > 0) {
          this.hidBtn = false
        } else {
          this.hidBtn = true
        }
      }
    },
    // 增加金额
    addAmount (code) {
      if (this.amount.length < 1) {
        this.amount = 0
      } else {
        this.amount = parseInt(this.amount)
      }
      switch (code) {
        case 'sum100':
          this.amount += 100
          break
        case 'sum500':
          this.amount += 500
          break
        case 'sum1000':
          this.amount += 1000
          break
        case 'sum5000':
          this.amount += 5000
          break
        case 'clear':
          this.amount = ''
          break
        case 'all':
          if (this.Outval === 'out' || this.getbaling === true) {
            return
          }
          this.getbaling = true
          let _this = this
          let url = '/api/balance/get'
          let params = {
            Plat: this.Outval,
            Token: this.getinfo().token
          }
          _this.$https
            .fetchPost(url, this.Secret(params))
            .then(res => {
              _this.getbaling = false
              if (res.data.Success === true) {
                _this.amount = parseInt(res.data.Result.replace(/,/g, ''))
              } else {
                _this.amount = 0
              }
              _this.changeAmount()
            })
            .catch(err => {
              _this.getbaling = false
              _this.amount = 0
              _this.changeAmount()
              console.log(err)
            })
          break
        default:
          break
      }
      this.changeAmount()
    },
    // 获取游戏平台
    getGamePlat () {
      let _this = this
      let url = '/api/gameplat/get'
      _this.$https
        .fetchPost(url, {})
        .then(res => {
          _this.$bus.$emit('loadingHide')
          if (res.data.Success === true) {
            _this.gamePlat = res.data.Result
            _this.gamePlat.unshift({ GameName: '众鑫账户', Plat: 'ZXC' })
          } else {
            _this.$swal({
              text: res.data.Message,
              type: 'error',
              confirmButtonText: '确定'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 提交
    send () {
      if (this.hidBtn === true || this.sending === true) {
        return
      }
      let _this = this
      if (_this.Outval === 'out') {
        _this.$swal({
          text: '请选择转出账户',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.Inval === 'in') {
        _this.$swal({
          text: '请选择转入账户',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (_this.amount < 1) {
        _this.$swal({
          text: '最低转账1元',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      if (!/^[0-9]*[1-9][0-9]*$/.test(_this.amount)) {
        _this.$swal({
          text: '转账金额必须为整数',
          type: 'warning',
          confirmButtonText: '确定'
        })
        return
      }
      _this.sending = true
      let url = '/api/transfer/post'
      _this.$bus.$emit('loadingShow')
      var params = {
        OutGame: _this.Outval,
        InGame: _this.Inval,
        Amount: _this.amount,
        Token: _this.getinfo().token
      }
      _this.$https
        .fetchPost(url, this.Secret(params))
        .then(res => {
          _this.$bus.$emit('loadingHide')
          _this.sending = false
          if (res.data.Success === true) {
            _this.amount = 0
            _this.$parent.getZxBalance('ZXC')
            if (_this.Outval === 'ZXC') {
              _this.$parent.getGameBalance(_this.Inval)
            } else {
              _this.$parent.getGameBalance(_this.Outval)
            }
            _this.$swal({
              text: '转账成功',
              type: 'success',
              confirmButtonText: '确定'
            })
          } else {
            _this.$bus.$emit('loadingHide')
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
          _this.$bus.$emit('loadingHide')
          _this.sending = false
          console.log(err)
        })
    }
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.$bus.$emit('loadingShow')
    this.getGamePlat()
  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {}
}
</script>
<style scoped>
.transfer {
  width: 100%;
  overflow: hidden;
}
.transfer .transferMenu {
  width: 100%;
  height: 42px;
  overflow: hidden;
  border-bottom: 1px solid #ddd;
  position: relative;
}
.transfer .transferMenu ul {
  width: 100%;
}
.transfer .transferMenu ul li {
  width: 135px;
  height: 42px;
  line-height: 42px;
  font-size: 16px;
  text-align: center;
}
.transfer .transferMenu ul li.on {
  height: 42px;
  background: #0088ff;
}
.transfer .transferMenu ul li.on span {
  width: 100%;
  height: 40px;
  font-size: 14px;
  display: block;
  color: #fff;
  box-sizing: border-box;
}
.transfer .transferMain {
  width: 100%;
  padding-left: 250px;
  box-sizing: border-box;
  position: relative;
}
.transfer .transferMain ul {
  width: 100%;
  box-sizing: border-box;
  padding-top: 50px;
  position: relative;
}
.transfer .transferMain ul li {
  width: 100%;
  height: 42px;
  position: relative;
  margin-bottom: 16px;
}
.transfer .transferMain ul li input {
  width: 220px;
  height: 42px;
  padding: 5px;
  font-size: 16px;
  color: #4b4b4b;
  line-height: 22px;
  border-radius: 2px;
  border: 1px solid #4385f5;
  box-sizing: border-box;
  background-color: #fff;
}
.transfer .transferMain ul li.error input {
  border: 1px solid #ec1414;
}
.transfer .transferMain ul li input[name='readonly'] {
  border: 1px solid #b0b0b0;
  color: #0088fe;
}
.transfer .transferMain ul li select {
  width: 220px;
  height: 42px;
  font-size: 16px;
  color: #4b4b4b;
  border-radius: 2px;
  line-height: 22px;
  box-sizing: border-box;
  padding: 5px;
  border: 1px solid #b0b0b0;
  background-color: #f9f9f9;
}
.transfer .transferMain ul li label {
  font-size: 16px;
  color: #4b4b4b;
  width: 100px;
  float: left;
  line-height: 42px;
}
.transfer .transferMain ul li span {
  font-size: 14px;
  color: #f77575;
  height: 20px;
  line-height: 20px;
  position: relative;
  padding-left: 15px;
}
.transfer .transferMain ul li.error span {
  color: #ec1414;
}
.transfer .transferMain ul li button {
  width: 220px;
  height: 42px;
  font-size: 16px;
  color: #fff;
  border-radius: 2px;
  background-color: #0088fe;
  margin-left: 84px;
  cursor: pointer;
}
.transfer .transferMain ul li button.hid {
  background-color: #ddd;
  cursor: default;
}
.transfer .transferMain ul li .amountBtn {
  width: 100%;
  padding: 0;
  padding-left: 80px;
  overflow: hidden;
}
.transfer .transferMain ul li .amountBtn li {
  float: left;
  width: 42px;
  height: 42px;
  border: 1px solid #ddd;
  border-radius: 50%;
  text-align: center;
  line-height: 42px;
  margin-left: 20px;
  color: #333;
  cursor: pointer;
}
.transfer .transferMain .cutover {
  width: 35px;
  height: 62px;
  position: absolute;
  top: 65px;
  right: 335px;
  border-top: 1px solid #b0b0b0;
  border-bottom: 1px solid #b0b0b0;
  border-right: 1px solid #b0b0b0;
}
.transfer .transferMain .cutover i {
  display: block;
  width: 30px;
  height: 30px;
  position: absolute;
  left: 20px;
  top: 15px;
  cursor: pointer;
  border-radius: 3px;
  background: #909090 url(../../assets/images/account/transfer_ico.png);
}
.transfer .transferMain .text {
  width: 800px;
  box-sizing: border-box;
  padding: 20px;
  margin-top: 50px;
  margin-left: -200px;
  float: left;
  background: #fffef4;
  border: 1px dashed #ffb729;
}
.transfer .transferMain .text p {
  line-height: 25px;
  color: #5f5f5f;
}
.transfer .transferMain .text p span {
  line-height: 25px;
  color: #0088ff;
  font-size: 16px;
}
.transfer .transferMain .text p a {
  color: #0088ff;
  margin-left: 10px;
  text-decoration: underline;
}
</style>
