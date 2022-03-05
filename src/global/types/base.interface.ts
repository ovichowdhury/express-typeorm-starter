/* eslint-disable @typescript-eslint/no-explicit-any */

export default interface BaseService {
  create(...args: any[]): any;
  get(...args: any[]): any;
  update?(...args: any[]): any;
  delete?(...args: any[]): any;
  getById?(...args: any[]): any;
}
