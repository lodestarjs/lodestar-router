const hasConsole = typeof console !== 'undefined';
const hasCollapsedConsole = !!(console.groupCollapsed);
const hasHistory = !!(window.history && history.pushState)

export { hasConsole, hasCollapsedConsole, hasHistory };