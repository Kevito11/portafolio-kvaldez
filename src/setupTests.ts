import '@testing-library/jest-dom';

// Mock IntersectionObserver for Framer Motion
class IntersectionObserverMock {
    readonly root: Element | null = null;
    readonly rootMargin: string = '';
    readonly thresholds: ReadonlyArray<number> = [];

    constructor(public callback: IntersectionObserverCallback, public options?: IntersectionObserverInit) { }

    observe() {
        return null;
    }
    unobserve() {
        return null;
    }
    disconnect() {
        return null;
    }
    takeRecords() {
        return [];
    }
}

globalThis.IntersectionObserver = IntersectionObserverMock as any;
