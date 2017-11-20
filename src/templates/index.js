const indexPageTemplate = ({ htmlWebpackPlugin: { options } }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>${ options.siteTitle }</title>
</head>
<body>
  <div id="app-root"></div>
</body>
</html>
`

module.exports = indexPageTemplate