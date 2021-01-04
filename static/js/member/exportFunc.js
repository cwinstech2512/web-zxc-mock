// import $ from 'jquery'
import './jquery.min'
import './jQueryRotate.2.2'
/**
 * @description 定位抽中位置
 * @param {位置} award
 * @param {文本} text
 */
export function vipRotateSwitch (award, text) {
  var angle = []
  switch (award) {
    case 15:
      angle = [0, 10, 350]
      break
    case 10:
      angle = [270, 260, 280]
      break
    case 3:
      angle = [135, 125, 145]
      break
    case 11:
      angle = [90, 80, 100]
      break
    case 5:
      angle = [225, 215, 235]
      break
    case 14:
      angle = [45, 35, 55]
      break
    case 12:
      angle = [180, 170, 190]
      break
    case 9:
      angle = [315, 305, 325]
      break
    default:
  }
  vipRandomOffset(angle, text)
}
/**
 * @description 随机偏离位置
 * @param {*} angle
 * @param {*} text
 * @param {*} startRotate
 */
export function vipRandomOffset (angle, text, startRotate) {
  angle = angle[Math.floor(Math.random() * angle.length)]
  vipRotateFunc(angle, text)
  startRotate = true
  return false
}
/**
 * @description 抽奖定位显示
 * @param {*} angle
 * @param {*} text
 * @param {*} startRotate
 */
export function vipRotateFunc (angle, text, startRotate) {
  var $lotteryBtn = $('#lotteryBtn')
  var btnimg = $lotteryBtn.css('backgroundImage')
  $('.rotate-bg').stopRotate()
  $('.rotate-bg').rotate({
    angle: 0,
    duration: 15000,
    animateTo: angle + 360 * 20, // angle是图片上各奖项对应的角;
    callback: function () {
      var popups = '.annpop-ups'
      var $pops = $(popups).find('.main')
      $(popups).show()
      $lotteryBtn.css('backgroundImage', btnimg).find('img').hide()
      $pops.addClass('win').find('.text').html('<span>众鑫娱乐恭喜您获得<em><br/>' + text + '</em></span></p><p>请联系VIP专员领取</p>')
      $('#close-annpop').click(function (e) {
        $(popups).hide().find('.text').html('')
      })
      startRotate = false
    }
  })
}
export default {
  vipRotateSwitch,
  vipRandomOffset,
  vipRotateFunc
}
