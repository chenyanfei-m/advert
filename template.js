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