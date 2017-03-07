/**
 * 判断是否为数组
 * @param {*}object
 */
const isArray = function (object) {
  return Object.prototype.toString.call(object) === '[object Array]'
}

/**
 * 深拷贝对象
 * @param {*对象参数}object
 */
const deepClone = function (object) {
  if (typeof object === 'object') {
    if (isArray(object)) {
      var newArr = []
      for (var i = 0; i < object.length; i++) newArr.push(object[i])
      return newArr
    } else {
      if (object === null) {
        return null
      }
      var newObj = {}
      for (var key in object) {
        newObj[key] = deepClone(object[key])
      }
      return newObj
    }
  } else {
    return object
  }
}

export default {
  deepClone,
  isArray
}
