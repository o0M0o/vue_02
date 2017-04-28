'use strict'

import config from './config'
import Koa from'koa'
import Router from 'koa-router'
import body from 'koa-body'
import extensions from './middlewares/extensions'
import errorHandler from './middlewares/error-handler'
import contactsRoute from './routes/contacts'
import logger from './logger'
import koaLogger from 'koa-logger'
import koaValidate from 'koa-validate'
import cors from 'koa-cors'

const app = new Koa()

koaValidate(app)

const router = new Router()
const log = logger.get('app')

contactsRoute(router)

app
  .use(body())
  .use(cors({
    origin: () => '*',
    methods: 'GET,POST,PUT,PATCH,DELETE',
    maxAge: 86400
  }))
  .use(errorHandler)
  .use(extensions)
  .use(koaLogger())
  .use(router.routes())
  .use(router.allowedMethods())
  .on('error', error => {
    log.error(error)
  })
  .listen(config.koa.port, () => {
    log.info(`Contact test api is running. Url: http://localhost:${config.koa.port}.`)
  })

process.on('uncaughtException', error => {
  log.error(`Caught global exception: ${error}`)
})
  .on('unhandledRejection', reason => {
    log.error(`Unhandled rejection: ${reason}`)
  })
