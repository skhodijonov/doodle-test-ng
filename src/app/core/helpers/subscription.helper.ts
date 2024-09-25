import {Subscription} from 'rxjs';

export function cleanSub(sub?: Subscription) {
  if (sub && !sub.closed) {
    sub.unsubscribe();
  }
}
