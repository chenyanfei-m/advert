exports.showImg = `
  <% params.forEach(ele => { %>
    <img src="<%- ele%>" />
  <%}); %>
`

exports.hiddenImg =
  `
    <% params.forEach(ele => { %>
      <img src="<%- ele%>" style="width:0;height:0;display:none" />
    <%}); %>
  `
exports.mask =
  `
    <a style="display:block;position:fixed;top:0;left:0;cursor:default;z-index:999" id="mask-lksdjflksjfiodsjfjsf" href="<%- params.href%>"/> 
  `
exports.mask_img =
  `
      <a href="<%- params.href%>">
        <img src="<%- params.src%>"/>
      </a>
  `