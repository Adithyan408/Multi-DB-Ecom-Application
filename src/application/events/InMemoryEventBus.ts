type EventHandler<T> = (event: T) => Promise<void>;

export class InMemoryEventBus {
  private handlers = new Map<string, EventHandler<unknown>[]>();

  subscribe<T>(
    eventType: string,
    handler: EventHandler<T>
  ): void {
    const existingHandlers = this.handlers.get(eventType) ?? [];

    existingHandlers.push(handler as EventHandler<unknown>);

    this.handlers.set(eventType, existingHandlers);
  }

  async publish<T extends { type: string }>(event: T): Promise<void> {
    const handlers = this.handlers.get(event.type) ?? [];

    await Promise.all(
      handlers.map((handler) => handler(event))
    );
  }
}