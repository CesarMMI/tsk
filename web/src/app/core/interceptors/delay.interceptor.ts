import type { HttpInterceptorFn } from '@angular/common/http';
import { delay } from 'rxjs';

export const delayInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    delay(0)
  );
};
