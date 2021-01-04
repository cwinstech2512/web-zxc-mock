<template>
  <div id="mobile"></div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'mobile',
  created () {
    let sc = this.getQueryString('sc')
    let vs = this.getQueryString('vs')
    if (this.isMobileDevice() && vs !== 'pc') {
      // top.location.href = sc.length > 0 ? 'Mobile/?sc=' + sc : 'Mobile/'
      top.location.href =
        axios.defaults.baseURL + (sc.length > 0 ? '/APP/?sc=' + sc : '/APP/')
    } else {
      top.location.href = sc.length > 0 ? 'index.html?sc=' + sc : 'index.html'
    }
  }
}
</script>

<style></style>
