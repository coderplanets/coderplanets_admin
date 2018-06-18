const dev = process.env.NODE_ENV !== 'production'

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const mobxReact = require('mobx-react')
const pathMatch = require('path-match')
const { basename } = require('path')
const accepts = require('accepts')
const glob = require('glob')

const app = next({ dev })
const handle = app.getRequestHandler()
const route = pathMatch()
const SERVE_PORT = 3001

// const moduleAlias = require('module-alias')
// For the development version, we'll use React.
// Because, it support react hot loading and so on.
/*
   if (!dev) {
   moduleAlias.addAlias('react', 'preact-compat')
   moduleAlias.addAlias('react-dom', 'preact-compat')
   }
 */

// TODO: server static: https://github.com/zeit/next.js/blob/master/examples/root-static-files/server.js
mobxReact.useStaticRendering(true)

const supportLanguages = glob
  .sync('./lang/*.json')
  .map(f => basename(f, '.json'))

const messageCache = new Map()
const getMessages = locale => {
  if (!messageCache.has(locale)) {
    /* eslint-disable import/no-dynamic-require */
    /* eslint-disable global-require */
    let langData = {}

    try {
      langData = require(`./lang/${locale}.json`)
      messageCache.set(locale, langData)
    } catch (e) {
      return { error: 'this lang is not supported' }
    }
  }
  return messageCache.get(locale)
}

// routes
const communitiesQuery = route('/communities/:sub?')
const usersQuery = route('/users/:sub?')
const localeQuery = route('/locale/:lang')
const communityQuery = route('/:main/:sub?')

app.prepare().then(() => {
  createServer((req, res) => {
    const urlParts = parse(req.url, true)
    /* const { pathname } = parse(req.url) */
    const { pathname, query } = urlParts

    const accept = accepts(req)
    const locale = accept.language(supportLanguages) // 'zh'

    if (localeQuery(pathname)) {
      res.setHeader('Content-Type', 'application/json;charset=utf-8')
      return res.end(JSON.stringify(getMessages(localeQuery(pathname).lang)))
    } else if (communitiesQuery(pathname)) {
      console.log('on server communities')
      return app.render(req, res, '/communities', query)
    } else if (usersQuery(pathname)) {
      return app.render(req, res, '/users', query)
    } else if (communityQuery(pathname)) {
      return app.render(req, res, '/', query)
    }

    // now index page go this way
    req.locale = locale
    req.messages = getMessages(locale)

    return handle(req, res)
  }).listen(SERVE_PORT, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3001')
  })
})
