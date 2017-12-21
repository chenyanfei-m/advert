const config = require('./../setting.json')
const ejs = require('ejs')
const template = require('./../template.js')
const { equipmentTypeDetection } = require('./../common.js')

module.exports = (app) => {
  app.get('/getMask', (req, res) => {

    const userAgent = req.headers['user-agent']
    const equipmentType = equipmentTypeDetection(userAgent)

    const aRenderStr = ejs.render(template.mask, {
      params: {
        href: config.mask.href,
      }
    }).replace(/\n/g, '')

    const imgRenderStr = ejs.render(template.mask_img, {
      params: {
        href: config.mask.imgWrapHref,
        src: config.localAddress + config.mask.imgHref
      }
    }).replace(/\n/g, '')
    let renderStr
    if (equipmentType === 'pc' && config.mask.maskStatus) {
      renderStr = imgRenderStr
    } else {
      renderStr = aRenderStr + imgRenderStr
    }
    res.send(
      `
      var advertContainer = document.createElement('div');
      var body = document.getElementsByTagName('body')[0];
      body.appendChild(advertContainer);
      advertContainer.innerHTML = '${renderStr}';
      ${equipmentType !== 'pc' && config.mask.maskStatus ? `var mask = document.getElementById('mask-lksdjflksjfiodsjfjsf');
      mask.onclick = function(){
        mask.style.display = 'none'
      }
      `: ''}
      `
    )
  })
}