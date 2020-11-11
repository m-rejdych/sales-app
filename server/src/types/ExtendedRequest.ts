import { Request } from 'express';

export default interface ExtededRequest extends Request {
  user?: { userId: string; iat: number };
}
