import { Store } from './store';
import { isEqual } from '@core/utils';
import { ExcelComponent } from '@components/excel/excel.component';
import { StateKey } from '@models/store.model';

export class StoreSubscriber {

  private store: Store;
  private unsubscribe: () => void;
  private prevState: {};

  constructor(store: Store) {
    this.store = store;
    this.unsubscribe = null;
    this.prevState = {};
  }

  subscribeComponents(components: ExcelComponent[]) {
    this.prevState = this.store.getState();
    this.unsubscribe = this.store.subscribe(state => {
      Object.keys(state).forEach((key: StateKey) => {
        // Если старое и новое значение полей не равны
        if (!isEqual(this.prevState[key], state[key])) {
          components.forEach(component => {
            // Если текущий компонент является наблюдателем стейта
            if (component.isWatching(key)) {
              const changes = { [key]: state[key] };
              component.storeChanged(changes);
            }
          });
        }
      });
      this.prevState = this.store.getState();
    });
  }

  unsubscribeFromStore() {
    this.unsubscribe();
  }
}
