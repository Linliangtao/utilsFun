/**
 * 对象扩展工具函数
 */
import { getType } from './common'

/**
 * 判断是否是对象
 * @param x
 * @returns {boolean}
 */
const isObject = x => getType(x) === 'Object'

/**
 * 判断是否是空对象
 * @param x
 * @returns {boolean}
 */
const isEmpty = x => {
  return Object.keys(x).length <= 0
}

/**
 * 深拷贝一个json对象
 * @param x
 * @return {any}
 */
const copy = x => JSON.parse(JSON.stringify(x))

/**
 * 过滤转换数据对象
 * @param src
 * @param keys 对象key转换规则，形如{ aB: 'AB' }，将{ aB: 'value' }转换成{ AB: 'value' }
 * @param filterEmpty 是否过滤空值
 * @param filterKeys 过滤掉的key数组，形如[ 'a' ]
 * @param filter 值过滤器
 * @param isFormData 是否转换为FormData对象
 */
const transformData = (src = {}, { keys = {}, filterEmpty = true, filterKeys = [], filter, isFormData = false } = {}) => {
  const formData = isFormData ? new FormData() : {}
  for (let [key, value] of Object.entries(src)) {
    const k = keys[key] || key
    // 属于过滤掉的key、空值并且需要过滤空值 的情况下，跳过此次循环
    if ((!k && k !== 0) || filterKeys.includes(key) || (filterEmpty && !value)) continue
    const v = getType(filter) === 'Function' ? (filter(value, key) || value) : value
    if (isFormData) {
      formData.append(k, v)
    } else {
      formData[k] = v
    }
  }

  return formData
}

export default {
  is: isObject,
  isEmpty,
  copy,
  transformData
}
