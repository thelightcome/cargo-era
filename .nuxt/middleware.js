const middleware = {}

middleware['admin'] = require('..\\src\\middleware\\admin.ts')
middleware['admin'] = middleware['admin'].default || middleware['admin']

middleware['auth'] = require('..\\src\\middleware\\auth.ts')
middleware['auth'] = middleware['auth'].default || middleware['auth']

middleware['user'] = require('..\\src\\middleware\\user.ts')
middleware['user'] = middleware['user'].default || middleware['user']

export default middleware
