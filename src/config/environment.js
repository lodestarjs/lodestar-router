const hasConsole = typeof console !== 'undefined';
const hasCollapsedConsole = !!(console.groupCollapsed);
const hasHistory = !!(window.history && history.pushState);
const hasEventListener = !!window.addEventListener;

export { hasConsole, hasCollapsedConsole, hasHistory, hasEventListener };