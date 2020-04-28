export const env = (key: string, defaultValue?: any): any => {
  if (window.hdm_env[`REACT_APP_${ key }`]) {
    return window.hdm_env[`REACT_APP_${ key }`];
  }

  return defaultValue ? defaultValue : null;
};
