// utils box
export const setRemRatio = function () {
  // var pixelRatio = 1 / window.devicePixelRatio
  // document.write('<meta name="viewport" content="width=device-width,initial-scale=' + pixelRatio + ',minimum-scale=' + pixelRatio + ',maximum-scale=' + pixelRatio + '" />')
  var tid
  var docEl = document.documentElement
  var refreshRem = function () {
    var clientWidth = docEl.clientWidth < 750 ? docEl.clientWidth : 750
    var rem = clientWidth / 750
    docEl.style.fontSize = (rem * 100) + 'px'
  }
  window.addEventListener('resize', function () {
    clearTimeout(tid)
    tid = setTimeout(refreshRem, 300)
  }, false)
  refreshRem()
}

export default {
  setRemRatio
}
