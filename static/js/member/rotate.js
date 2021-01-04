$(function () {
  var StartRotate = false
  $('#lotteryBtn').rotate({
    bind:
				{
				  click: function () {
				    if (StartRotate) { // 判断抽奖后不能再次点击
				      return false
				    } else {
				      vipGetRotateFunc(StartRotate)
				    }
				  }
				}
  })
})
