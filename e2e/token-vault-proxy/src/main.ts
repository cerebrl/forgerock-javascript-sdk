import { proxy } from '@forgerock/token-vault';

// Initialize the token vault proxy
proxy({
  app: {
    origin: 'http://localhost:5823',
  },
  forgerock: {
    clientId: 'CentralLoginOAuthClient',
    oauthThreshold: 5000,
    realmPath: 'root',
    scope: 'openid profile me.read',
    serverConfig: {
      baseUrl: 'https://localhost:9443/am',
    },
  },
});
