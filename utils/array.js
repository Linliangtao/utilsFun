/**
 * 数组扩展工具函数
 */
import { getType } from './common'
import func from './function'

/**
 * 判断是否是数组
 * @param x
 * @returns {boolean}
 */
const isArray = x => getType(x) === 'Array'

/**
 * entries:方法返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对
 * 循环数组(类似数组的forEach函数，支持递归循环)
 * @param arr 循环的数组
 * @param callback 循环回调 这里只是定义
 * @param parent 上一级,父级的值
 * @param parentIndexes 上一级索引路径
 * @param deep 是否递归
 * @param deepKey 递归的key
 */
const forEach = (arr = [], callback, { parent = {}, parentIndexes = [], deep = true, deepKey = 'children' } = {}) => {
  for (let [index, item] of arr.entries()) {
    const indexes = [].concat(parentIndexes)
    func.is(callback) && callback(item, index, parent, indexes)

    if (deep && isArray(item[deepKey]) && item[deepKey].length > 0) {
      indexes.push(index)
      forEach(item[deepKey], callback, {
        parent: item, // 父亲路由值
        parentIndexes: indexes,
        deep,
        deepKey
      })
    }
  }
}

export default {
  is: isArray,
  forEach
}
