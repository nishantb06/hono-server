/**
 * Portkey AI Gateway
 *
 * @module index
 */

import { Hono } from 'hono';
import { prettyJSON } from 'hono/pretty-json';
import { logger } from 'hono/logger';
// Create a new Hono server instance
const app = new Hono();

app.use(async (c, next) => {
  const start = Date.now()
  await next()
  const end = Date.now()
  c.res.headers.set('X-Response-Time-Nishant', `${end - start}`)

  // Use waitUntil for non-blocking background processing
  c.executionCtx.waitUntil((async () => {
    console.log('Background processing started')
    for (let i = 1; i <= 10; i++) {
      console.log(i)
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    console.log('Background processing completed')
  })())
})

app.use('*', prettyJSON());
app.use('*', logger());

app.use(async (_, next) => {
  console.log('middleware 1 start')
  await next()
  console.log('middleware 1 end')
  // run a loop that prints 1 to 10, printing 1 every 500ms
  for (let i = 1; i <= 10; i++) {
    console.log(i)
    await new Promise(resolve => setTimeout(resolve, 500))
  }
})
app.use(async (_, next) => {
  console.log('middleware 2 start')
  await next()
  console.log('middleware 2 end')
})
app.use(async (_, next) => {
  console.log('middleware 3 start')
  await next()
  console.log('middleware 3 end')
})

app.get('/', (c) => {
  console.log('handler')
  return c.text('Hello!')
})

app.get('/health', (c) => c.text('OK'));
app.get('/test', (c) => c.text('test'));

export default app;
