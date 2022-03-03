/* eslint-disable @typescript-eslint/no-explicit-any */
export const wrap =
  (fn: any) =>
  (...args: any[]) =>
    fn(...args).catch(args[2]);
