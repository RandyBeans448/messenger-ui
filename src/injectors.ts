import { InjectionToken } from "@angular/core";
import { EnvironmentNamespace } from "./environments/interfaces/environment.namespace";

export const APP_CONFIG: InjectionToken<EnvironmentNamespace.MainConfig>
  = new InjectionToken<EnvironmentNamespace.MainConfig>('Application Configuration');