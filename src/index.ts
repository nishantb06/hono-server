/**
 * Portkey AI Gateway
 *
 * @module index
 */

import { Hono } from 'hono';
import { prettyJSON } from 'hono/pretty-json';
// Create a new Hono server instance
const app = new Hono();

app.get('/', (c) => c.text('AI Gateway says hey Nishant!'));

export default app;
