const dev = process.env.NODE_ENV !== 'production'
// const goal = process.env.NODE_ENV

const next = require('next')
const express = require('express')
const LRUCache = require('lru-cache')
const helmet = require('helmet')
const mobxReact = require('mobx-react')
// const R = require('ramda')

const app = next({ dev, quiet: false })
const handle = app.getRequestHandler()
const SERVE_PORT = process.env.SERVE_PORT || 3001

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 1000, // cache item count
  // maxAge: 1000 * 60 * 60, // 1hour
  maxAge: 1000 * 10, // 30 ses
})

mobxReact.useStaticRendering(true)

const HOME_PAGE = '/communities'
app.prepare().then(() => {
  const server = express()
  server.use(express.static('static'))
  server.use(helmet())

  server.get('/_next/:page?', (req, res) => handle(req, res))

  server.get('/', (req, res) => {
    // fconsole.log('match me root')
    return res.redirect(HOME_PAGE)
  })

  server.get('/communities/:sub?', (req, res) => {
    // console.log('match me user')
    // return app.render(req, res, '/user', req.query)
    return renderAndCache(req, res, '/communities', req.query)
  })

  server.get('/users/:sub?', (req, res) => {
    // console.log('match me user')
    // return app.render(req, res, '/user', req.query)
    return renderAndCache(req, res, '/users', req.query)
  })

  server.get('/:main/:sub?', (req, res) => {
    // console.log('match me user')
    // return app.render(req, res, '/user', req.query)
    return renderAndCache(req, res, '/', req.query)
  })

  server.get('*', (req, res) => handle(req, res))

  server.listen(SERVE_PORT, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${SERVE_PORT}`)
  })
})

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey(req) {
  return `${req.url}`
}

async function renderAndCache(req, res, pagePath, queryParams) {
  const key = getCacheKey(req)

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    res.setHeader('x-cache', 'HIT')
    res.send(ssrCache.get(key))
    return
  }

  try {
    // If not let's render the page into HTML
    const html = await app.renderToHTML(req, res, pagePath, queryParams)

    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html)
      return
    }

    // Let's cache this page
    ssrCache.set(key, html)

    res.setHeader('x-cache', 'MISS')
    res.send(html)
  } catch (err) {
    app.renderError(err, req, res, pagePath, queryParams)
  }
}
