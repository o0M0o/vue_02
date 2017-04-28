import ContactService from '../services/contact-service'

const _service = new ContactService()

export default router => {
  router
    .get('/contacts', (ctx, next) => {
      ctx.response.ok(_service.getAll())
    })
    .post('/contacts', (ctx, next) => {
      ctx.checkBody('first_name').notEmpty()
      ctx.checkBody('last_name').notEmpty()
      ctx.checkBody('email').notEmpty()
      ctx.checkBody('description').notEmpty()

      if (ctx.errors) {
        ctx.response.badRequest(ctx.errors, 400)
        return
      }

      let id = _service.add(ctx.request.body)

      ctx.response.ok({ id: id })
    })
    .put('/contacts/:id', (ctx, next) => {
      ctx.checkBody('first_name').notEmpty()
      ctx.checkBody('last_name').notEmpty()
      ctx.checkBody('email').notEmpty()
      ctx.checkBody('description').notEmpty()

      if (ctx.errors) {
        ctx.response.badRequest(ctx.errors, 400)
        return
      }

		console.log("org id : " + ctx.params.id);
		console.log("org data : " + ctx.request.body);
      _service.update(parseInt(ctx.params.id), ctx.request.body)

      ctx.response.ok('Contact is updated')
    })
    .delete('/contacts/:id', (ctx, next) => {
		console.log(ctx.params);
		_service.delete(parseInt(ctx.params.id));
		ctx.response.ok('Contact is deleted');
    })
    .get('/contacts/:id', (ctx, next) => {
      ctx.response.ok(_service.get(parseInt(ctx.params.id)))
    })
}
