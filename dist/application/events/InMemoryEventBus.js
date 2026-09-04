"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryEventBus = void 0;
class InMemoryEventBus {
    handlers = new Map();
    subscribe(eventType, handler) {
        const existingHandlers = this.handlers.get(eventType) ?? [];
        existingHandlers.push(handler);
        this.handlers.set(eventType, existingHandlers);
    }
    async publish(event) {
        const handlers = this.handlers.get(event.type) ?? [];
        await Promise.all(handlers.map((handler) => handler(event)));
    }
}
exports.InMemoryEventBus = InMemoryEventBus;
//# sourceMappingURL=InMemoryEventBus.js.map