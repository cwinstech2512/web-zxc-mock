import { clone, read, write, reset } from './state'

const MOCK_TOKEN = 'mock-token-local-only'
const CAPTCHA = 'R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='

function ok (result, message) {
  return {
    Success: true,
    Message: message || '',
    Status: 'Success',
    Result: typeof result === 'undefined' ? {} : result
  }
}

function fail (message, status) {
  return {
    Success: false,
    Message: message,
    Status: status || 'MockError',
    Result: null
  }
}

function parseData (data) {
  if (!data) return {}
  if (typeof data === 'object') return data
  try {
    return JSON.parse(data)
  } catch (error) {
    return {}
  }
}

function normalizePath (url) {
  let path = String(url || '')
  try {
    path = new URL(path, 'http://mock.local').pathname
  } catch (error) {
    path = path.split('?')[0]
  }
  path = '/' + path.replace(/^\/+/, '')
  path = path.replace(/^\/mock-api\/api\//i, '/api/')
  path = path.replace(/^\/api\/api\//i, '/api/')
  if (path.indexOf('/api/') !== 0) {
    path = '/api/' + path.replace(/^\/+/, '')
  }
  return path.toLowerCase().replace(/\/+$/, '')
}

function paginate (items, params) {
  const pageSize = Math.max(1, Number(params.PageSize || params.pageSize || 8))
  const pageIndex = Math.max(1, Number(params.PageIndex || params.pageIndex || 1))
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize))
  const start = (pageIndex - 1) * pageSize
  return { List: items.slice(start, start + pageSize), PageCount: pageCount, TotalCount: items.length }
}

function games () {
  return [
    { Id: 1, GameCode: 'mock-fortune', GameName: 'Mock Fortune', Category: '热门游戏', PicName: 'fortune-mouse.jpg', ImgUrl: 'static/images/slots/PG/fortune-mouse.jpg', GameUrl: '<!doctype html><title>Mock Game</title><h1>Mock Game</h1><p>本页未连接真实游戏平台。</p>', DemoUrl: '#mock-game' },
    { Id: 2, GameCode: 'mock-mahjong', GameName: 'Mock Mahjong', Category: '桌面游戏', PicName: 'mahjong-ways.jpg', ImgUrl: 'static/images/slots/PG/mahjong-ways.jpg', GameUrl: '<!doctype html><title>Mock Mahjong</title><h1>Mock Mahjong</h1>', DemoUrl: '#mock-game' },
    { Id: 3, GameCode: 'mock-dragon', GameName: 'Mock Dragon', Category: '彩池游戏', PicName: 'dragon-hatch.jpg', ImgUrl: 'static/images/slots/PG/dragon-hatch.jpg', GameUrl: '<!doctype html><title>Mock Dragon</title><h1>Mock Dragon</h1>', DemoUrl: '#mock-game' }
  ]
}

function activityResult () {
  return {
    Active: true,
    AvailableTimes: 3,
    BetAmount: 8888,
    DepAmount: 2888,
    TotalTimes: 5,
    RankNo: 8,
    CharmCount: 12,
    Amount: 100,
    Tims: 2,
    BonusType: '现金奖励',
    BonusValue: 88,
    History: [],
    Rank: [],
    Historys: [],
    Count: 1,
    Code: 'MOCK88',
    Text: 'Mock 奖励',
    LevelNum: 50,
    LevelName: '黄金会员',
    ProcessBar: 65,
    ShowFirst: true,
    ShowSecond: true,
    MatchName: 'Mock 友谊赛',
    MatchHome: '主队',
    MatchCustomer: '客队',
    MatchTime: '2026-10-01 20:00',
    LinkUrl: '#mock-activity',
    MatchHomeUrl: '',
    MatchCustomerUrl: '',
    Categorys: [],
    ExtraCategorys: []
  }
}

function addRecord (state, typeCode, type, amount, notes) {
  state.records.unshift({
    Id: state.nextId++,
    TypeCode: String(typeCode),
    CreateTime: '2026-09-29 12:00:00',
    Type: type,
    Amount: Number(amount || 0).toFixed(2),
    State: '成功',
    Notes: notes || 'Mock 操作',
    PromCode: '-',
    ValidDate: '-',
    Plat: 'ZXC',
    BetMultiple: 1
  })
}

function handle (config) {
  const path = normalizePath(config.url)
  const params = Object.assign({}, config.params || {}, parseData(config.data))
  const state = read()

  if (path === '/api/other/check') {
    return ok({ Status: 200, IP: '127.0.0.1', Scode: params.SCode || 'MOCK', Limit: 0 })
  }
  if (path === '/api/other/qq') return '84071236'
  if (path === '/api/bannernotice/get') {
    return ok({
      Notice: [
        { name: 'Mock 公告', content: '目前为 Mock 模式，所有业务资料仅储存在此浏览器。' },
        { name: '操作提示', content: '可使用任意帐号与密码登入测试。' }
      ],
      Banner: [
        { Paths: 'static/images/phone', PicName: 'home_phone_qrcode.jpg', ContentPath: '/promotion' }
      ]
    })
  }
  if (path === '/api/popup/dialog') {
    return ok({
      Popup: { Bit: false, PromoUrl: '' },
      Redpkg: { Bit: false, Msg: '', Amount: '0.00' },
      Toasts: []
    })
  }
  if (path === '/api/reg/vcode') return ok({ Img: CAPTCHA, Key: 'mock-captcha-key' })

  if (path === '/api/login/login' || path === '/api/login/loginbyslidepicture' || path === '/api/login/ipdifflogincheckcode') {
    const account = params.Account || params.UserName || params.account || 'mockuser'
    state.user.Account = account
    write(state)
    return ok({ Token: MOCK_TOKEN, Balance: state.balances.ZXC, LastLoginTime: '2026-09-29 10:00:00' }, '登入成功')
  }
  if (path === '/api/login/ipdifflogincheckcode1step') return ok({ cellPhone: state.user.CellPhone })
  if (/^\/api\/login\/[^/]+$/.test(path)) return ok('#mock-game', 'Mock 模式不会开启真实游戏平台')

  if (path === '/api/reg/phone' || path === '/api/reg/username' || path === '/api/reg/usernamebyslidepicture' || path === '/api/reg/accountbygeetest') {
    return ok({ Token: MOCK_TOKEN, Balance: state.balances.ZXC, LastLoginTime: '2026-09-29 10:00:00' }, '注册成功')
  }
  if (path.indexOf('/api/sendsmscode/') === 0 || path.indexOf('/api/sendemailcode/') === 0 || path === '/api/recaptchav3/sendcode') {
    return ok({ VCode: '123456' }, '验证码为 123456')
  }
  if (path === '/api/forgotpwd/step1' || path === '/api/forgotpwd/step1bygeetest' || path === '/api/account/unbind') {
    return ok({ Token: 'mock-reset-token', QAData: [{ Question: '您的 Mock 问题一？' }, { Question: '您的 Mock 问题二？' }] })
  }
  if (path.indexOf('/api/forgotpwd/') === 0 || path === '/api/account/unbindverify' || path === '/api/account/emailauth') return ok({ VCode: '123456' }, '验证成功')

  if (path === '/api/account/getinfo') {
    state.user.Balance = Number(state.balances.ZXC).toFixed(2)
    return ok(clone(state.user))
  }
  if (path === '/api/account/saveinfo') {
    Object.keys(params).forEach(key => {
      if (Object.prototype.hasOwnProperty.call(state.user, key)) state.user[key] = params[key]
    })
    write(state)
    return ok(clone(state.user), '资料已更新')
  }
  if (path === '/api/account/verifyrealname') {
    state.user.RealName = params.RealName || params.Name || state.user.RealName
    state.user.VerifyRealName = state.user.RealName
    write(state)
    return ok(state.user.VerifyRealName, '实名验证成功')
  }
  if (path === '/api/account/verifyphone') {
    state.user.Phone = params.Phone || params.CellPhone || state.user.Phone
    state.user.VerifyPhone = state.user.Phone
    write(state)
    return ok(state.user.VerifyPhone, '手机验证成功')
  }
  if (path === '/api/account/modifyuserpwd' || path === '/api/account/savesafequestanswer' || path === '/api/account/createplatpwd') return ok({}, '设定成功')

  if (path === '/api/balance/get') {
    const plat = String(params.Plat || 'ZXC').toUpperCase()
    return ok(Number(state.balances[plat] || 0).toFixed(2))
  }
  if (path === '/api/gameplat/get') {
    return ok(Object.keys(state.balances).filter(item => item !== 'ZXC' && item !== 'ZXING').map(item => ({ Plat: item, PlatName: item, Name: item, GameName: item + ' 平台' })))
  }
  if (path === '/api/transfer/post') {
    const from = String(params.FromPlat || params.OutPlat || params.OutGame || params.From || 'ZXC').toUpperCase()
    const to = String(params.ToPlat || params.InPlat || params.InGame || params.To || 'AG').toUpperCase()
    const amount = Number(params.Amount || 0)
    if (amount <= 0 || Number(state.balances[from] || 0) < amount) return fail('余额不足或金额不正确', 'BalanceError')
    state.balances[from] -= amount
    state.balances[to] = Number(state.balances[to] || 0) + amount
    addRecord(state, 3, from + ' → ' + to, amount, 'Mock 转账')
    write(state)
    return ok({}, '转账成功')
  }
  if (path === '/api/transfer/all') {
    Object.keys(state.balances).forEach(plat => {
      if (plat !== 'ZXC' && plat !== 'ZXING') {
        state.balances.ZXC += Number(state.balances[plat] || 0)
        state.balances[plat] = 0
      }
    })
    write(state)
    return ok({}, '余额已全部回收')
  }

  if (path === '/api/message/getlist') {
    const page = paginate(state.messages, params)
    return ok({ List: page.List, PageCount: page.PageCount, TotalCount: page.TotalCount })
  }
  if (/^\/api\/message\/get\/\d+$/.test(path)) {
    const id = Number(path.split('/').pop())
    const message = state.messages.find(item => Number(item.Id) === id)
    if (!message) return fail('找不到讯息', 'NotFound')
    message.IsRead = true
    write(state)
    return ok(clone(message))
  }
  if (path === '/api/toast/message') return ok({ Title: 'Mock 通知', Time: '2026-09-29 12:00:00', Content: '这是一则本机通知。' })
  if (path === '/api/toast/check') return ok(false)

  if (/^\/api\/slots\/[^/]+$/.test(path)) {
    let filtered = games()
    const category = String(params.Category || '').toLowerCase()
    const search = String(params.GameName || '').toLowerCase()
    if (category) filtered = filtered.filter(item => item.Category.toLowerCase().indexOf(category) >= 0)
    if (search) filtered = filtered.filter(item => item.GameName.toLowerCase().indexOf(search) >= 0)
    const page = paginate(filtered, params)
    return ok({
      Category: [{ Code: '', Name: '全部' }, { Code: '热门游戏', Name: '热门游戏' }, { Code: '桌面游戏', Name: '桌面游戏' }],
      PageCount: page.PageCount,
      Data: page.List,
      Status: 'Logged'
    })
  }
  if (path === '/api/promo/list') {
    return ok({
      Category: [{ Id: 1, Name: '全部活动' }],
      Data: [{ Id: 1, Title: 'Mock 新手优惠', Summary: '仅供前端操作测试', Pic: '', Url: '#mock-promo' }],
      List: [{ Id: 1, Title: 'Mock 新手优惠', Summary: '仅供前端操作测试', Pic: '', Url: '#mock-promo' }],
      PageCount: 1
    })
  }

  if (path === '/api/geetest/initgeetest') {
    return JSON.stringify({ success: 0, gt: 'mock-gt', challenge: 'mock-challenge', new_captcha: true })
  }

  if (path === '/api/withdrawal/getdrawcard') return ok({ Data: clone(state.cards), Name: state.user.Name, BankList: ['中国银行', '工商银行', '建设银行'] })
  if (path === '/api/withdrawal/getvirtualacc') return ok({ Data: clone(state.wallets), Name: state.user.Name, BankList: [] })
  if (path === '/api/withdrawal/binddrawcard') {
    state.cards.push({ Id: 'card-' + state.nextId++, BankName: params.BankName, CardNumber: params.BankCardNo, Branch: params.Branch })
    write(state)
    return ok({}, '银行卡已新增')
  }
  if (path === '/api/withdrawal/bindvirtualwallet') {
    state.wallets.push({ Id: 'wallet-' + state.nextId++, ChainName: params.chainname || params.ChainName, WalletAddr: params.walletaddr || params.WalletAddr, Exange: params.Exange })
    write(state)
    return ok({}, '钱包已新增')
  }
  if (path === '/api/withdrawal/getinfo') {
    return ok({ BankCards: clone(state.cards), RemainDrawCount: 3, MaxLimit: '50,000.00', MinLimit: '100.00', DrawCount: '5', DrawSum: '100,000.00', RemainDrawSum: '80,000.00', Balance: Number(state.balances.ZXC).toFixed(2) })
  }
  if (path === '/api/withdrawal/withdraw' || path === '/api/withdrawal/usdtwithdraw') {
    const amount = Number(params.Amount || params.CNY || 0)
    if (amount <= 0 || state.balances.ZXC < amount) return fail('余额不足或金额不正确', 'BalanceError')
    state.balances.ZXC -= amount
    addRecord(state, 2, path.indexOf('usdt') >= 0 ? 'USDT 提款' : '银行卡提款', amount, 'Mock 提款')
    write(state)
    return ok({}, '提款申请已送出')
  }

  if (path === '/api/deposit/getrechargetype') {
    return ok({
      Methods: [
        { TypeCode: 'onlineTransfer', Name: '网银转账', GroupList: [], TransferPropety: { BankNames: ['中国银行'], MinAmount: 100, MaxAmount: 50000 } },
        { TypeCode: 'usdtTransfer', Name: 'USDT 慢充', GroupList: [], TransferPropety: { BankNames: ['TRC20'], MinAmount: 20, MaxAmount: 8000 } },
        { TypeCode: 'USDTfor3tp', Name: 'USDT 快充', GroupList: [], TransferPropety: { BankNames: ['TRC20'], MinAmount: 20, MaxAmount: 8000 } }
      ],
      DepositUrl: []
    })
  }
  if (path === '/api/deposit/getusdtrate') return ok({ Rate: 7.2 })
  if (path === '/api/deposit/getwechatrate') return ok({ Rate: 1 })
  if (path === '/api/deposit/createorder' || path === '/api/deposit/createusdtorder') {
    const amount = Number(params.Amount || params.CNY || 1000)
    addRecord(state, 1, '本机模拟充值', amount, '待人工确认的 Mock 订单')
    write(state)
    return ok({ ID: state.nextId++, BankName: '中国银行', Name: 'Mock 收款户', CardNumber: '6222 0000 0000 8888', WalletAddr: 'TMockDepositAddress111111111111111', ChainName: 'TRC20', Amount: amount, Code: 'MOCK' + state.nextId })
  }
  if (path === '/api/deposit/createolorder') return ok('#mock-payment', 'Mock 模式不跳转真实支付页')
  if (path === '/api/deposit/wechatpaysk') return ok({ QRCode: 'MOCK-QR-CODE', Amount: Number(params.Amount || 100) })
  if (path === '/api/deposit/getproceed') return ok({ BankName: '中国银行', Name: 'Mock 收款户', CardNumber: '6222 0000 0000 8888', Amount: Number(params.Amount || 1000), Code: 'MOCK88' })

  if (path === '/api/record/get') {
    const items = state.records.filter(item => String(item.TypeCode) === String(params.Type || '1'))
    const page = paginate(items, params)
    return ok({ List: page.List, PageCount: page.PageCount, TotalCount: page.TotalCount })
  }
  if (path === '/api/batstat/get') return ok({ TotalDepAmount: '10,000.00', TotalBetAmount: '8,888.00', TableList: [{ Plat: 'PG', BetAmount: '5,000.00', ValidBetAmount: '4,500.00' }] })
  if (path === '/api/backwater/info') return ok({ Categorys: [{ Id: 1, Name: '电子返水', Amount: 18.8 }], ExtraCategorys: [{ Id: 2, Name: '额外返水', Amount: 8.8 }] })
  if (path === '/api/backwater/get' || path === '/api/backwater/extra') return ok({}, '领取成功')

  if (path === '/api/vip/freeinfo' || path === '/api/vip/forwardinfo' || path === '/api/vip/feedinfo') return ok({ Categorys: [{ Id: 1, Name: 'Mock VIP 优惠', Amount: 88, CanGet: true }] })
  if (path === '/api/vip/info') return ok(activityResult())

  const infoPaths = [
    '/api/allplatbet/info', '/api/betmatch/info', '/api/carnival/info', '/api/charmtree/info',
    '/api/depsign/info', '/api/fightsport/info', '/api/flashsale/info', '/api/nba/info',
    '/api/ogexpegold/info', '/api/policy/info', '/api/signin/info', '/api/zodiac/info',
    '/api/loverelay/info', '/api/europeancup/info'
  ]
  if (infoPaths.indexOf(path) >= 0) return ok(activityResult())

  const historyPaths = ['/api/charmtree/history', '/api/charmtree/rank', '/api/fightsport/history', '/api/fightsport/poolhistory', '/api/fightsport/rank', '/api/zodiac/history']
  if (historyPaths.indexOf(path) >= 0) return ok([{ Id: 1, Account: 'mock***', Amount: 88, Time: '2026-09-29 12:00:00', Rank: 1 }])

  const actionPaths = [
    '/api/allplatbet/get', '/api/betmatch/forward', '/api/callback/post', '/api/carnival/bet',
    '/api/carnival/dep', '/api/charmtree/extchange', '/api/charmtree/refresh', '/api/charmtree/shake',
    '/api/depsign/get', '/api/fightsport/apply', '/api/fightsport/change', '/api/fightsport/open',
    '/api/fightsport/pool', '/api/fightsport/refresh', '/api/firstdepositpromo/firstdepositpromostep1',
    '/api/firstdepositpromo/firstdepositpromostep2', '/api/flashsale/getfirst', '/api/flashsale/getsecond',
    '/api/loverelay/getbonus', '/api/loverelay/turnplate', '/api/nba/apply', '/api/newitem/getbonus',
    '/api/ogexpegold/get', '/api/self/chipcash', '/api/signin/signin', '/api/unionpay/apply',
    '/api/vip/feedget', '/api/vip/forwardget', '/api/vip/freeget', '/api/vip/lucky',
    '/api/vip/rotate', '/api/zodiac/apply'
  ]
  if (actionPaths.indexOf(path) >= 0) {
    state.claims[path] = Number(state.claims[path] || 0) + 1
    write(state)
    return ok(Object.assign(activityResult(), { Code: 'MOCK-' + state.claims[path] }), 'Mock 操作成功')
  }
  if (path === '/api/self/slotsget' || path === '/api/self/slotsdata') return ok({ List: [], PageCount: 1, Categorys: [] })

  const error = new Error('[Mock API] 未覆盖的请求：' + String(config.method || 'get').toUpperCase() + ' ' + path)
  error.code = 'MOCK_NOT_IMPLEMENTED'
  error.response = {
    status: 501,
    statusText: 'Mock Not Implemented',
    data: fail(error.message, 'MOCK_NOT_IMPLEMENTED'),
    headers: { 'x-mock-api': 'true' },
    config: config
  }
  console.error(error.message)
  throw error
}

function createMockAdapter () {
  const delay = Math.max(0, Number(process.env.WEB_MOCK_DELAY || 0))
  return function mockAdapter (config) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const data = handle(config)
          resolve({
            data: clone(data),
            status: 200,
            statusText: 'OK',
            headers: { 'x-mock-api': 'true' },
            config: config,
            request: { mock: true }
          })
        } catch (error) {
          reject(error)
        }
      }, delay)
    })
  }
}

function installMockApi (axios) {
  axios.defaults.adapter = createMockAdapter()
  axios.defaults.baseURL = '/mock-api'
  if (typeof window !== 'undefined') {
    window.__WEB_ZXC_MOCK__ = {
      enabled: true,
      reset: function () {
        const state = reset()
        console.info('[Mock API] Data reset. Reload the page to see the initial state.')
        return state
      },
      state: function () { return clone(read()) }
    }
  }
  console.info('[Mock API] Enabled. No Axios request will be sent to the real backend.')
}

export { createMockAdapter, installMockApi, handle, normalizePath }
