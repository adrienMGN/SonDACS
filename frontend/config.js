const API_CONFIG = {
  BASE_URL: (() => {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    
    // En développement local
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:4000';
    }
    
    // Sur Railway, l'API et le frontend sont sur le même domaine
    // Railway expose automatiquement sur HTTPS en production
    return `${protocol}//${hostname}`;
  })()
};