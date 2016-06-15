interface WebpackRequire {
  <T>(path: string): T;
  (paths: string[], callback: (...modules: any[]) => void): void;
  ensure: (
    path: string[],
    callback: (require: <T>(path: string) => T) => void) => void;
}

declare var VERSION: string;
declare var IS_PRODUCTION: boolean;
declare var require: WebpackRequire;
