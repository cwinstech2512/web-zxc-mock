const STORAGE_KEY = 'web_zxc_mock_state_v2'

function initialState () {
  return {
    version: 2,
    nextId: 100,
    user: {
      Account: 'mockuser',
      Name: '王小明',
      RealName: '王小明',
      VerifyRealName: '王小明',
      NickName: 'Mock 玩家',
      Phone: '0912345678',
      VerifyPhone: '0912345678',
      VerifyEmail: 'mock@example.com',
      Email: 'mock@example.com',
      CellPhone: '0912345678',
      QQ: '12345678',
      VipName: '黄金会员',
      VipLevel: 3,
      VipFlag: true,
      BirthDay: '1990-01-01',
      Birthday: '1990-01-01',
      Gender: '1',
      Sex: 'M',
      UnbindMsg: '',
      UnbindToken: 'mock-unbind-token',
      Balance: '12,500.00'
    },
    balances: {
      ZXC: 12500,
      ZXING: 680,
      AI: 128,
      YSB: 0,
      AG: 320,
      AG2: 0,
      EA: 88,
      OG: 45,
      PT: 210,
      MG: 0,
      DT: 66,
      PG: 156,
      LB: 0,
      KG: 0
    },
    cards: [
      { Id: 'card-1', BankName: '中国银行', CardNumber: '6222 **** **** 8888', Branch: '台北分行' }
    ],
    wallets: [
      { Id: 'wallet-1', ChainName: 'TRC20', WalletAddr: 'TMockWalletAddress11111111111111111', Exange: 'Mock Exchange' }
    ],
    messages: [
      { Id: 1, Title: '欢迎使用 Mock 模式', Time: '2026-09-29 10:00:00', Content: '目前所有资料均来自浏览器本机，不会连线到真实后端。', IsRead: false },
      { Id: 2, Title: '资料重设说明', Time: '2026-09-28 09:30:00', Content: '可在开发者工具执行 window.__WEB_ZXC_MOCK__.reset() 重设资料。', IsRead: true }
    ],
    records: [
      { Id: 1, TypeCode: '1', CreateTime: '2026-09-28 12:10:00', Type: '线上转账', Amount: '1,000.00', State: '成功', Notes: 'Mock 充值', PromCode: '-', ValidDate: '-', Plat: 'ZXC', BetMultiple: 1 },
      { Id: 2, TypeCode: '2', CreateTime: '2026-09-27 15:45:00', Type: '银行卡提款', Amount: '500.00', State: '成功', Notes: 'Mock 提款', PromCode: '-', ValidDate: '-', Plat: 'ZXC', BetMultiple: 1 },
      { Id: 3, TypeCode: '3', CreateTime: '2026-09-26 18:20:00', Type: 'ZXC → AG', Amount: '200.00', State: '成功', Notes: 'Mock 转账', PromCode: '-', ValidDate: '-', Plat: 'AG', BetMultiple: 1 },
      { Id: 4, TypeCode: '4', CreateTime: '2026-09-25 08:00:00', Type: '活动优惠', Amount: '88.00', State: '已派发', Notes: 'Mock 每日签到', PromCode: 'MOCK88', ValidDate: '2026-12-31', Plat: 'ZXC', BetMultiple: 1 },
      { Id: 5, TypeCode: '7', CreateTime: '2026-09-24 08:00:00', Type: '优惠代码', Amount: '100.00', State: '进行中', Notes: 'Mock 优惠代码', PromCode: 'DEMO100', ValidDate: '2026-12-31', Plat: 'PG', BetMultiple: 3 }
    ],
    claims: {},
    signedDates: []
  }
}

function clone (value) {
  return JSON.parse(JSON.stringify(value))
}

function read () {
  if (typeof window === 'undefined' || !window.localStorage) {
    return initialState()
  }
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
    if (stored && stored.version === 2) {
      return stored
    }
  } catch (error) {
    console.warn('[Mock API] Stored data was invalid and has been reset.', error)
  }
  const state = initialState()
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  return state
}

function write (state) {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }
  return state
}

function reset () {
  const state = initialState()
  write(state)
  if (typeof window !== 'undefined' && window.sessionStorage) {
    window.sessionStorage.removeItem('account')
    window.sessionStorage.removeItem('token')
    window.sessionStorage.removeItem('user')
  }
  return clone(state)
}

export { clone, initialState, read, write, reset, STORAGE_KEY }
