import moduleAlias from 'module-alias'
import path from 'path'

moduleAlias.addAliases({
  '@src': __dirname,
  '@config': path.join(__dirname, '/config'),
  '@database': path.join(__dirname, '/database'),
  '@docs': path.join(__dirname, '/docs'),
  '@middlewares': path.join(__dirname, '/middlewares'),
  '@modules': path.join(__dirname, '/modules'),
  '@utils': path.join(__dirname, '/utils')
})
