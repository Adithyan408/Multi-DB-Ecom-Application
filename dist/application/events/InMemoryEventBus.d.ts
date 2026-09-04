type EventHandler<T> = (event: T) => Promise<void>;
export declare class InMemoryEventBus {
    private handlers;
    subscribe<T>(eventType: string, handler: EventHandler<T>): void;
    publish<T extends {
        type: string;
    }>(event: T): Promise<void>;
}
export {};
