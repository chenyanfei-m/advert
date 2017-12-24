const { localAddress, goto } = require('./../setting.json')
const { equipmentTypeDetection } = require('./../common.js')

module.exports = (app) => {
  app.get('/adverta', (req, res) => {

    const userAgent = req.headers['user-agent']
    const equipmentType = equipmentTypeDetection(userAgent)

    const getRenderStr = (clientType) => {
      if (clientType === 'pc') {
        return `var body = document.getElementsByTagName('body')[0]
        var advertContainer = document.createElement('div')
        advertContainer.innerHTML = '<img src=${localAddress + goto.pcImgHref} />'
        body.appendChild(advertContainer)`
      } else if (goto.gotoStatus) {
        return `window.location.href="${goto.href}"`
      } else {
        return `var body = document.getElementsByTagName('body')[0]
        var advertContainer = document.createElement('div')
        advertContainer.innerHTML = '<img src=${localAddress + goto.mobileImgHref} />'
        body.appendChild(advertContainer)`
      }
    }

    res.send(getRenderStr(equipmentType))
  })
}