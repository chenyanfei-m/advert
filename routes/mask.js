const config = require('./../setting.json')
module.exports = (app) => {
  app.get('/getMask', (req, res) => {
    res.send(
      `
      var mask = document.createElement('a');
      var width = window.innerWidth;
      var height = window.innerHeight;
      mask.style.display = 'block'
      mask.style.width = width + 'px';
      mask.style.height = height + 'px';
      mask.style.position = 'fixed';
      mask.style.top = 0;
      mask.style.left = 0;
      mask.style.cursor = 'default';
      mask.style['z-index'] = 999;
      mask.setAttribute('id', 'mask-lksdjflksjfiodsjfjsf');
      mask.setAttribute('href','${config.maskHref}');
      mask.onclick = function () {
        document.getElementById('mask-lksdjflksjfiodsjfjsf').style.display = 'none'
      };
      document.getElementsByTagName('body')[0].appendChild(mask);
      `
    )

  })
}