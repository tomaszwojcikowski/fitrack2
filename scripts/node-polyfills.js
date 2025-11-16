/*
 * Ensures newer web APIs exist when running Expo CLI under older Node (<=16).
 * Expo's undici dependency expects globalThis.ReadableStream and fetch.
 */
(() => {
  try {
    const os = require('os');
    if (typeof os.availableParallelism !== 'function') {
      os.availableParallelism = () => {
        const cpuCount = Array.isArray(os.cpus()) ? os.cpus().length : 1;
        return Math.max(cpuCount, 1);
      };
    }
  } catch (error) {
    console.warn('Failed to polyfill os.availableParallelism.', error);
  }

  try {
    const nodeProcess = require('process');
    if (typeof nodeProcess.getActiveResourcesInfo !== 'function') {
      nodeProcess.getActiveResourcesInfo = () => [];
    }
  } catch (error) {
    console.warn('Failed to polyfill process.getActiveResourcesInfo.', error);
  }

  try {
    const { ReadableStream, WritableStream, TransformStream } = require('stream/web');
    if (typeof globalThis.ReadableStream === 'undefined' && ReadableStream) {
      globalThis.ReadableStream = ReadableStream;
    }
    if (typeof globalThis.WritableStream === 'undefined' && WritableStream) {
      globalThis.WritableStream = WritableStream;
    }
    if (typeof globalThis.TransformStream === 'undefined' && TransformStream) {
      globalThis.TransformStream = TransformStream;
    }
  } catch (error) {
    console.warn('stream/web not available; some builds may still fail.', error);
  }

  try {
    const stream = require('stream');
    if (typeof stream.isReadable !== 'function') {
      stream.isReadable = (obj) => !!(obj && typeof obj.read === 'function');
    }
    if (typeof stream.isWritable !== 'function') {
      stream.isWritable = (obj) => !!(obj && typeof obj.write === 'function');
    }
  } catch (error) {
    console.warn('Failed to polyfill stream helpers.', error);
  }

  if (typeof globalThis.fetch === 'undefined') {
    try {
      // Reuse undici's fetch implementation for compatibility.
      const { fetch, Headers, Request, Response } = require('undici');
      globalThis.fetch = fetch;
      if (typeof globalThis.Headers === 'undefined') {
        globalThis.Headers = Headers;
      }
      if (typeof globalThis.Request === 'undefined') {
        globalThis.Request = Request;
      }
      if (typeof globalThis.Response === 'undefined') {
        globalThis.Response = Response;
      }
    } catch (error) {
      console.warn('Failed to polyfill fetch via undici.', error);
    }
  }

  try {
    if (
      typeof globalThis.AbortSignal !== 'undefined' &&
      typeof globalThis.AbortSignal.prototype.throwIfAborted !== 'function'
    ) {
      globalThis.AbortSignal.prototype.throwIfAborted = function throwIfAborted() {
        if (this.aborted) {
          const reason = this.reason ?? new Error('This operation was aborted');
          throw reason;
        }
      };
    }
  } catch (error) {
    console.warn('Failed to enhance AbortSignal.throwIfAborted.', error);
  }
})();
