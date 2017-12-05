import stringify from 'json-stable-stringify'

export default{
  ObjCmp: function (o1, o2, except) {
    if (except) {
      for (var key in o1) {
        if (except.indexOf(key) !== -1 && typeof o1[key] === 'string' && o1[key] !== o2[key])
          return false
      }

      if (except && Array.isArray(except) && except.length >= 1) {
        var o1C = {}
        var o2C = {}
        for (key in o1) if (except.indexOf(key) !== -1) o1C[key] = o1[key]
        for (key in o2) if (except.indexOf(key) !== -1) o2C[key] = o2[key]
        return stringify(o1C) === stringify(o2C)
      } else {
        if (Object.keys(o2).length !== Object.keys(o1).length)
          return false
        return stringify(o1) === stringify(o2)
      }
    }
  },
  ObjCmpKeyList: function (o1, o2, keys) {
    for (let key of keys) {
      if (o1[key] !== o2[key])
        return false
    }
    return true
  }
}
