export default {
  install (Vue, options) {
    /**
     * @description 格式化金额
     * @param number：要格式化的数字
     * @param decimals：保留几位小数 默认0位
     * @param decPoint：小数点符号 默认.
     * @param thousandsSep：千分位符号 默认为,
     */
    Vue.prototype.numberFormat = function (number, decimals = 0, decPoint = '.', thousandsSep = ',') {
      number = (number + '').replace(/[^0-9+-Ee.]/g, '')
      let n = !isFinite(+number) ? 0 : +number
      let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
      let sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
      let dec = (typeof decPoint === 'undefined') ? '.' : decPoint
      let s = ''
      let toFixedFix = function (n, prec) {
        let k = Math.pow(10, prec)
        return '' + Math.ceil(n * k) / k
      }
      s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
      let re = /(-?\d+)(\d{3})/
      while (re.test(s[0])) {
        s[0] = s[0].replace(re, '$1' + sep + '$2')
      }
      if ((s[1] || '').length < prec) {
        s[1] = s[1] || ''
        s[1] += new Array(prec - s[1].length + 1).join('0')
      }
      return s.join(dec)
    }
    /**
     * @description 小数转成百分数
     * @param point:小数
     */
    Vue.prototype.pointToPercent = function (point) {
      let percent = Number(point * 100).toFixed(1)
      percent += '%'
      return percent
    }
    /**
       * @description 百分比转成小数
       * @param percent:百分比字符
       */
    Vue.prototype.percentToPoint = function (percent) {
      let str = percent.replace('%', '')
      str = str / 100
      return str
    }

    Vue.prototype.toDecimal2 = function (x) {
      return parseFloat(x).toFixed(2)
    }
  }
}
