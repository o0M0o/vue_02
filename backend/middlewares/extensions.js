export default async (ctx, next) => {

  ctx.response.ok = function (message) {
    ctx.response.status = 200

    if (message === null || message === undefined) {
      message = 'OK'
    }

    if (typeof (message) === 'object') {
      ctx.response.body = message
    } else {
      ctx.response.body = { message: message }
    }
  }

  ctx.response.badRequest = function (message) {
    if (Array.isArray(message)) {
      let messages = []

      message.forEach(m => {
        for (const key of Object.keys(m)) {
          messages.push(m[key])
        }
      })

      ctx.throw(messages.join(' '), 400)
      return
    }

    ctx.throw(message, 400)
  }

  ctx.response.notFound = function (message) {
    ctx.throw(message || 'Not found', 404)
  }

  ctx.response.contentCreated = function (data) {
    ctx.response.status = 201
    if (data) {
      ctx.response.body = data
    }
  }

  await next()
}
