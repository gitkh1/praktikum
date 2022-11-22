export type EventCallback = [(event: Event) => unknown, boolean?];

type EventHandler = Record<string, EventCallback>;

export default EventHandler;
