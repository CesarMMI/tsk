import { NG_VALUE_ACCESSOR } from '@angular/forms';

export const getValueAccessor = (component: any) => ({
  multi: true,
  provide: NG_VALUE_ACCESSOR,
  useExisting: component,
});
