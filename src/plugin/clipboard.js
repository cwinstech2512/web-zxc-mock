import Vue from 'vue'
import Clipboard from 'clipboard'

function clipboardSuccess () {
  Vue.prototype.$swal({
    text: '复制成功！',
    type: 'success',
    confirmButtonText: '确定'
  })
}

function clipboardError () {
  Vue.prototype.$swal({
    text: '复制失败，请重新复制！',
    type: 'error',
    confirmButtonText: '确定'
  })
}

export default function handleClipboard (text, event) {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
