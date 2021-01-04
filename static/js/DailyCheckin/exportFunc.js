import $ from 'jquery'
export function drawSignFunc (dateVal, dateArr, endDate) {
  // var sf = this
  var signdateArray = []// [ '2019-03-01', '2019-03-03', '2019-02-02', '2019-01-01', '2018-12-12', '2018-11-11', '2018-11-01']; // 已经签到的
  var $dateBox = $('#js-qiandao-list')
  var $currentDate = $('.current-date')
  var $lastMonth = $('#lastMonth')
  var $thisMonth = $('#thisMonth')
  var _html = ''
  var myDate = new Date(dateVal)
  signdateArray = dateArr
  for (var i = 0; i < 42; i++) { // 画出表格
    _html += '<li></li>'
  }
  var thisMonth = function () {
    if (!$lastMonth.hasClass('on')) {
      $lastMonth.addClass('on')
    }
    var monthtext = dateFtt('yyyy-MM-', myDate)
    $currentDate.text(dateFtt('yyyy年MM月', myDate)) // 当前时间
    $currentDate.attr('data-month', 0)
    var monthFirst = new Date(myDate.getFullYear(), parseInt(myDate.getMonth()), 1).getDay()
    var d = new Date(myDate.getFullYear(), parseInt(myDate.getMonth() + 1), 0)
    var totalDay = d.getDate() // 获取当前月的天数

    $dateBox.html(_html) // 生成日历网格

    var $dateLi = $dateBox.find('li')
    for (var i = 0; i < totalDay; i++) {
      $dateLi.eq(i + monthFirst).addClass('date' + monthtext + ((i + 1).toString().length === 1 ? '0' : '') + parseInt(i + 1)).append(parseInt(i + 1)) // 当月第一天位置
    }
    for (var j = 0; j < signdateArray.length; j++) {
      $('.date' + signdateArray[j]).addClass('qiandao')
    }
    // 生成当月的日历且含已签到
    $('.date' + dateFtt('yyyy-MM-dd', myDate)).addClass('able-qiandao') // 当天的标识
  }
  thisMonth()
  $thisMonth.on('click', function () { // 查询本月
    thisMonth()
  })
  var lastMonth = function (params) {
    var newdate = new Date(new Date(myDate.setDate(1)).setMonth(myDate.getMonth() - parseInt($currentDate.attr('data-month')) - 1))
    if (newdate.getTime() < endDate.getTime()) {
      return
    }
    if (dateFtt('yyyy-MM', newdate) === dateFtt('yyyy-MM', endDate)) {
      $(this).removeClass('on')
    }
    // alert(newdate.toLocaleString());
    var monthtext = dateFtt('yyyy-MM-', newdate)
    $currentDate.text(dateFtt('yyyy年MM月', newdate)) // 当前时间
    $currentDate.attr('data-month', parseInt($currentDate.attr('data-month')) + 1)
    var monthFirst = new Date(newdate.getFullYear(), parseInt(newdate.getMonth()), 1).getDay()
    var d = new Date(newdate.getFullYear(), parseInt(newdate.getMonth() + 1), 0)
    var totalDay = d.getDate() // 获取当前月的天数

    $dateBox.html(_html) // 生成日历网格

    var $dateLi = $dateBox.find('li')
    for (var i = 0; i < totalDay; i++) {
      $dateLi.eq(i + monthFirst).addClass('date' + monthtext + ((i + 1).toString().length === 1 ? '0' : '') + parseInt(i + 1)).append(parseInt(i + 1))
    } // 生成上个月的日历
    for (var j = 0; j < signdateArray.length; j++) {
      $('.date' + signdateArray[j]).addClass('qiandao')
    }
  }
  // 查询上个月
  $lastMonth.off('click').click(function () {
    lastMonth()
  })
  // $lastMonth.on('click', function () { // 查询上个月
  //   lastMonth()
  // })
}
function dateFtt (fmt, date) { // author: meizz
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  }
  return fmt
}
export default {
  drawSignFunc
}
