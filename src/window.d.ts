export declare const env: (key: string, defaultValue?: any) => any;
declare global {
  interface Window {
    hdm_env: {
      [key: string]: string;
    };
  }
}
