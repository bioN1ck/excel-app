import { Reducer, State, Action, ActionType } from '@models/store.model';
import { rootReducer } from '@store/root-reducer';

type Subscriber = (state: State) => void;


export class Store {

  private state: State;
  private subscribers: Subscriber[];

  constructor(reducer: Reducer, initialState: State) {
    this.state = reducer(initialState, { type: ActionType.INIT });
    this.subscribers = [];
  }

  public subscribe(fn: Subscriber): () => void {
    this.subscribers.push(fn);
    const unsubscribe = () => {
      this.subscribers = this.subscribers.filter(sub => sub !== fn);
    };
    return unsubscribe;
  }

  public dispatch(action: Action): void {
    this.state = rootReducer(this.state, action);
    this.subscribers.forEach(subscriber => subscriber(this.state));
  }

  public getState(): State {
    // Глубокое клонирование объекта (hack)
    // Работает только на простых данных
    return JSON.parse(JSON.stringify(this.state));
  }
}
