const DEFAULT_API_BASE_URL = 'http://localhost:8000';

function getCodespaceName() {
  const viteEnv = typeof import.meta !== 'undefined' && import.meta && import.meta.env ? import.meta.env : {};
  const envName = viteEnv.VITE_CODESPACE_NAME || (typeof process !== 'undefined' ? process.env?.VITE_CODESPACE_NAME : '');

  return typeof envName === 'string' ? envName.trim() : '';
}

export function getApiBaseUrl() {
  const codespaceName = getCodespaceName();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return DEFAULT_API_BASE_URL;
}

export function getApiUrl(resource) {
  return `${getApiBaseUrl()}/api/${resource}/`;
}
