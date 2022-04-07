import { distinctUntilChanged, map, Observable } from 'rxjs';
import { Action, MolecularStore } from './molecular.store';

// Partial changes

type Reducer<T> = (state: T, payload: unknown) => T;
type Selector<T, K> = (state: T) => K;

export class OrganicStore<T> extends MolecularStore<T> {
  protected readonly reducers: Map<string, Reducer<T>> = new Map();

  public setReducer(actionType: string, reducer: Reducer<T>): void {
    this.reducers.set(actionType, reducer);
  }

  public override dispatch(action: Action): void {
    const current = super.get();
    const payload = action.payload;
    const reducer = this.reducers.get(action.type);
    const next = reducer ? reducer(current, payload) : (payload as T);
    super.applyChange({ action, current, next });
  }

  public select$<K>(selector: Selector<T, K>): Observable<K> {
    return super.get$().pipe(map(selector), distinctUntilChanged());
  }
}
