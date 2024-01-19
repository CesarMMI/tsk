import { Type } from "@angular/core";

export type DialogConfig = {
  component: Type<any>;
  width?: string;
  height?: string;
  inputs?: Record<string, unknown>;
};
