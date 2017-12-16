exports.equipmentTypeDetection = (ua) => {
  // const typeArr = ['iphone', 'android', 'ipad', 'windows', 'macos', 'windows phone', 'symbianOS', 'ipod']
  const mobileTypeArr = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"]
  const findResult = mobileTypeArr.find(ele => ua.match(new RegExp(ele, 'i')))
  return findResult || 'pc'
}