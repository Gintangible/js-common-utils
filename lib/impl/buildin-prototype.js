"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Uint32ArrayPrototype = exports.Uint16ArrayPrototype = exports.Uint8ClampedArrayPrototype = exports.Uint8ArrayPrototype = exports.Int32ArrayPrototype = exports.Int16ArrayPrototype = exports.Int8ArrayPrototype = exports.Float64ArrayPrototype = exports.Float32ArrayPrototype = exports.BigUint64ArrayPrototype = exports.BigInt64ArrayPrototype = exports.BigIntPrototype = exports.DataViewPrototype = exports.SharedArrayBufferPrototype = exports.ArrayBufferPrototype = exports.WeakSetPrototype = exports.WeakMapPrototype = exports.SetPrototype = exports.MapPrototype = exports.PromisePrototype = void 0;
// 定义各类ES5+内置对象的prototype

/* eslint-disable no-undef */
var PromisePrototype = typeof Promise !== 'undefined' ? Promise.prototype : undefined;
exports.PromisePrototype = PromisePrototype;
var MapPrototype = typeof Map !== 'undefined' ? Map.prototype : undefined;
exports.MapPrototype = MapPrototype;
var SetPrototype = typeof Set !== 'undefined' ? Set.prototype : undefined;
exports.SetPrototype = SetPrototype;
var WeakMapPrototype = typeof WeakMap !== 'undefined' ? WeakMap.prototype : undefined;
exports.WeakMapPrototype = WeakMapPrototype;
var WeakSetPrototype = typeof WeakSet !== 'undefined' ? WeakSet.prototype : undefined;
exports.WeakSetPrototype = WeakSetPrototype;
var ArrayBufferPrototype = typeof ArrayBuffer !== 'undefined' ? ArrayBuffer.prototype : undefined;
exports.ArrayBufferPrototype = ArrayBufferPrototype;
var SharedArrayBufferPrototype = typeof SharedArrayBuffer !== 'undefined' ? SharedArrayBuffer.prototype : undefined;
exports.SharedArrayBufferPrototype = SharedArrayBufferPrototype;
var DataViewPrototype = typeof DataView !== 'undefined' ? DataView.prototype : undefined;
exports.DataViewPrototype = DataViewPrototype;
var BigIntPrototype = typeof BigInt !== 'undefined' ? BigInt.prototype : undefined;
exports.BigIntPrototype = BigIntPrototype;
var BigInt64ArrayPrototype = typeof BigInt64Array !== 'undefined' ? BigInt64Array.prototype : undefined;
exports.BigInt64ArrayPrototype = BigInt64ArrayPrototype;
var BigUint64ArrayPrototype = typeof BigUint64Array !== 'undefined' ? BigUint64Array.prototype : undefined;
exports.BigUint64ArrayPrototype = BigUint64ArrayPrototype;
var Float32ArrayPrototype = typeof Float32Array !== 'undefined' ? Float32Array.prototype : undefined;
exports.Float32ArrayPrototype = Float32ArrayPrototype;
var Float64ArrayPrototype = typeof Float64Array !== 'undefined' ? Float64Array.prototype : undefined;
exports.Float64ArrayPrototype = Float64ArrayPrototype;
var Int8ArrayPrototype = typeof Int8Array !== 'undefined' ? Int8Array.prototype : undefined;
exports.Int8ArrayPrototype = Int8ArrayPrototype;
var Int16ArrayPrototype = typeof Int16Array !== 'undefined' ? Int16Array.prototype : undefined;
exports.Int16ArrayPrototype = Int16ArrayPrototype;
var Int32ArrayPrototype = typeof Int32Array !== 'undefined' ? Int32Array.prototype : undefined;
exports.Int32ArrayPrototype = Int32ArrayPrototype;
var Uint8ArrayPrototype = typeof Uint8Array !== 'undefined' ? Uint8Array.prototype : undefined;
exports.Uint8ArrayPrototype = Uint8ArrayPrototype;
var Uint8ClampedArrayPrototype = typeof Uint8ClampedArray !== 'undefined' ? Uint8ClampedArray.prototype : undefined;
exports.Uint8ClampedArrayPrototype = Uint8ClampedArrayPrototype;
var Uint16ArrayPrototype = typeof Uint16Array !== 'undefined' ? Uint16Array.prototype : undefined;
exports.Uint16ArrayPrototype = Uint16ArrayPrototype;
var Uint32ArrayPrototype = typeof Uint32Array !== 'undefined' ? Uint32Array.prototype : undefined;
exports.Uint32ArrayPrototype = Uint32ArrayPrototype;