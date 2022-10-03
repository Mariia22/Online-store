import { Listener } from '../types/listener.type';

export class Signal<ListenerType> {
  private listeners: Listener<ListenerType>[];

  constructor() {
    this.listeners = [];
  }

  add(listener: Listener<ListenerType>) {
    this.listeners.push(listener);
  }

  remove(listener: Listener<ListenerType>) {
    this.listeners = this.listeners.filter((elem) => elem !== listener);
  }

  emit(param: ListenerType) {
    this.listeners.forEach((listener) => listener(param));
  }
}
