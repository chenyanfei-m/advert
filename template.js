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
    <a style="position: fixed;top: 0;right: 0;bottom: 0;left: 0;overflow: hidden;outline: 0;-webkit-overflow-scrolling: touch;background-color: rgb(0, 0, 0); filter: alpha(opacity=0);  background-color: rgba(0, 0, 0, 0);z-index:100000;" id="mask-lksdjflksjfiodsjfjsf" href="<%- params.href%>"/> 
  `
exports.mask_img =
  `
      <a href="<%- params.href%>">
        <img src="<%- params.src%>"/>
      </a>
  `