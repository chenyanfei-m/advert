const ejs = require('ejs')
const imgArrInfo = require('./../setting.json')
const template = require('./../template')

const equipmentTypeDetection = (ua) => {
  const mobileTypeArr = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"]
  const findResult = mobileTypeArr.find(ele => ua.match(new RegExp(ele, 'i')))
  return findResult || 'pc'
}

const urlsParseQuery = (urlArr) => {
  return urlArr.map(ele => {
    const [baseUrl, queryArr] = decodeURIComponent(ele).split('?')
    return {
      baseUrl,
      queryArr: queryArr ? queryArr.split('&') : []
    }
  })
}

const paramsReplace = (urlArr, query) => {
  return urlArr.map(ele => {
    const { baseUrl, queryArr } = ele
    const mapResult = queryArr.map(ele => {
      const [key, value] = ele.split('=')
      if (query[key] !== undefined) {
        return [key, query[key]].join('=')
      }
      return ele
    })
    return baseUrl + '?' + mapResult.join('&')
  })
}

module.exports = (app) => {
  app.get('/getImg', (req, res) => {

    const { query } = req

    const loadImgHrefArr = urlsParseQuery(imgArrInfo.mobileHref)
    const convertResult = paramsReplace(loadImgHrefArr, query)

    const userAgent = req.headers['user-agent']
    const equipmentType = equipmentTypeDetection(userAgent)

    const isPc = equipmentType === 'pc'

    let showImgRenderStr = `<a target="_blank" href="${
      imgArrInfo[isPc ? 'pcImg' : 'mobileImg'].wrapUrl
      }"><img src="${
      imgArrInfo.localAddress + imgArrInfo[isPc ? 'pcImg' : 'mobileImg'].url
      }"/></a>`

    const hiddenImgRenderStr = ejs.render(template.hiddenImg, { params: convertResult || [] }).replace(/\n/g, '')

    let scriptContent = `
    var advertContainer = document.createElement('div')
    advertContainer.setAttribute("class", "cccAdvertContainer")
    advertContainer.innerHTML = '${
      showImgRenderStr + (isPc ? "" : hiddenImgRenderStr)
      }'
    document.getElementsByTagName('body')[0].appendChild(advertContainer);
    `

    res.send(scriptContent)
  })
}