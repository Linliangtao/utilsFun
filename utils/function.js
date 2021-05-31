/**
 * 函数扩展工具函数
 */
import { getType } from './common'

/**
 * 判断是否是函数
 * @param x
 * @returns {boolean}
 */
const isFunction = x => getType(x) === 'Function'

export default {
  is: isFunction
}
