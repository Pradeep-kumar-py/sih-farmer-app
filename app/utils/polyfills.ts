// Polyfill for structuredClone in React Native environment
// The structuredClone function is not available in React Native's JavaScript engine

declare global {
  function structuredClone<T>(value: T): T;
}

if (typeof globalThis.structuredClone === 'undefined') {
  globalThis.structuredClone = function <T>(value: T): T {
    // Simple deep clone implementation
    // For production use, consider using a more robust library like lodash.cloneDeep
    return JSON.parse(JSON.stringify(value));
  };
}

export { };
