import { handle } from 'hono/vercel'
import app from '../server/app.mjs'

// Vercel's Node.js runtime passes a Web `Request` only to named HTTP-method
// exports. A plain default export receives Node's (req, res) instead, which
// Hono cannot read, so every API call hung until the platform timeout.
// All /api/* paths are rewritten here (see vercel.json) so nested routes such as
// /api/fonts/similar/:family and DELETE /api/favourites/:id resolve too.
const handler = handle(app)

export const GET = handler
export const POST = handler
export const PUT = handler
export const PATCH = handler
export const DELETE = handler
export const OPTIONS = handler
