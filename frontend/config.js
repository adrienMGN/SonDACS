const API_CONFIG = {
  BASE_URL: (() => {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    
    // Détection automatique du hostname pour l'API
    // L'API sera toujours sur le même hostname mais port 4000
    return `${protocol}//${hostname}:4000`;
  })()
};