const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = parseInt(process.env.PORT, 10) || 3000

console.log(`Starting server in ${dev ? 'development' : 'production'} mode...`)

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    console.log('Next.js app prepared successfully')
    
    const server = createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true)
        await handle(req, res, parsedUrl)
      } catch (err) {
        console.error('Error occurred handling', req.url, err)
        res.statusCode = 500
        res.end('Internal server error')
      }
    })

    server.listen(port, hostname, (err) => {
      if (err) {
        console.error('Server failed to start:', err)
        throw err
      }
      console.log(`> Server ready on http://${hostname}:${port}`)
    })

    // Handle server errors
    server.on('error', (err) => {
      console.error('Server error:', err)
    })

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully')
      server.close(() => {
        console.log('Server closed')
        process.exit(0)
      })
    })
  })
  .catch((err) => {
    console.error('Failed to prepare Next.js app:', err)
    process.exit(1)
  })