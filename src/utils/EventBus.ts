type Listener = () => void;

export default class EventBus {
  private _listeners: { [key: string]: Set<Listener> };
  constructor() {
    this._listeners = {}
  }
  on(event: string, callback: Listener) {
    if (!this._listeners[event]) {
      this._listeners[event] = new Set();
    }
    if (callback) {
      this._listeners[event].add(callback);
    }
  }
  off(event: string, callback: Listener) {
    if (!this._listeners[event].has(callback)) {
      throw new Error(`Нет события: ${event}`);
    }
    this._listeners[event].delete(callback);
  }
  emit(event: string) {
    if (!this._listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    this._listeners[event].forEach(listener => listener());
  }

}
