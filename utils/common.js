/**
 * 公用工具函数
 */

/**
 * 获取变量类型
 * @param x
 * @returns {*|string}
 */
const getType = x => /^\[object (.*)\]$/.exec(Object.prototype.toString.call(x))[1]

/**
 * 读取图片
 * @param src
 * @returns {Promise<any>}
 */
const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.onload = () => {
      resolve(image)
    }

    image.onerror = (e) => {
      reject(e)
    }

    image.src = src
  })
}

/**
 * base64数据转blob对象
 * @param url
 * @return {Blob}
 */
const dataURLToBlob = (url) => {
  const arr = url.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

export default {
  getType,
  loadImage,
  dataURLToBlob
}
