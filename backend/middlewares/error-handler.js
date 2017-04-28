export default async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    let status = e.status || 500
    let message = status === 500 ? 'Server error' : e.message

    ctx.response.status = status
    ctx.response.body = {
      message: message
    }

    console.log(e.stack)
  }
}
