const middleware = {}

middleware['admin'] = require('..\\src\\middleware\\admin.ts')
middleware['admin'] = middleware['admin'].default || middleware['admin']

middleware['authcust'] = require('..\\src\\middleware\\authcust.ts')
middleware['authcust'] = middleware['authcust'].default || middleware['authcust']

middleware['user'] = require('..\\src\\middleware\\user.ts')
middleware['user'] = middleware['user'].default || middleware['user']

export default middleware
