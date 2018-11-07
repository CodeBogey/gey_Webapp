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

// 深拷贝，仅适用于 json 数据
export const deepClone = function (src) {
  return JSON.parse(
    JSON.stringify(src)
  )
}

export const formatNumber = function (n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export const toThousands = function (num) {
  return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}

export const format = function (date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

export const formatTime = function (date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export const toMyriadSimple = function (name, sourceData) {
  if (sourceData[name] > 10000) {
    sourceData[name] = parseFloat(sourceData[name] / 10000).toFixed(1) + '万'
  }
}

export const toMyriadSimpleNum = function (num) {
  if (num > 10000) {
    num = parseFloat(num / 10000).toFixed(1) + '万'
  }
  return num
}

export default {
  setRemRatio,
  deepClone,
  toThousands,
  format,
  formatTime,
  Promise,
  toMyriadSimple,
  toMyriadSimpleNum
}
