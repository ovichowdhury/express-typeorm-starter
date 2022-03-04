/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace Express {
  export interface Request {
    user?: any;
    payload?: any;
  }
}
