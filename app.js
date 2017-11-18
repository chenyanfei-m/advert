const express = require('express')
const imgArrInfo = require('./setting.json')

let app = express()
app.use(express.static('static'))
app.get('/getImg', (req, res) => {
  const newInfoArr = imgArrInfo.reduce((acc, { imgUrl, redirect, chance }, index, arr) => {
    if (index > 0) {
      return [...acc, { imgUrl, redirect, chance: acc[index - 1].chance + chance }]
    }
    return acc
  }, [imgArrInfo[0]])
  const randomNum = Math.ceil(Math.random() * 100)
  const result = newInfoArr.find(ele => ele.chance > randomNum)
  let scriptContent = `
  var imgTag = new Image();
  imgTag.src = "${result.imgUrl}";
  document.getElementsByTagName('body')[0].appendChild(imgTag);
  
  `
  res.send(scriptContent)
})

app.listen(3000)
  // if(${result.redirect !== ''}){ 
  //   window.location.href = "${result.redirect}"
  // }