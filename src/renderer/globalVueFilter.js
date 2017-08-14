export default {
  filename (f) {
    if (!f.includes('\\'))
      return f
    var ar = f.split(/[.\\]/)
    return ar[ ar.length - 2 ]
  },
  isoToLocal (d) {
    let dObj = {date: new Date(d)}
    let ds = dObj.date.toLocaleDateString()
    delete dObj.date
    return ds
  }
}
