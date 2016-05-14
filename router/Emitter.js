/**
 * https://github.com/ocleo1
 * 
 * @providesModule Emitter
 */

import EventEmitter from 'EventEmitter';

var obj = {};

export function getEmitterInstance() {
  if (!obj.emitter) {
    obj.emitter = new EventEmitter();
  }
  return obj.emitter;
}

export const PUSH = 'push';
export const REPLACE = 'replace';
export const POP = 'pop';
export const POP_TO_ROUTE = 'popToRoute';
export const POP_TO_TOP = 'popToTop';