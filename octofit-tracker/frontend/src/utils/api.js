const DEFAULT_API_BASE_URL = 'http://localhost:8000';

export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return DEFAULT_API_BASE_URL;
}

export function getApiUrl(resource) {
  return `${getApiBaseUrl()}/api/${resource}/`;
}
