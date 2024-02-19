import helmet from 'helmet';

export const helmetConfig = (app) => {
  app.disable('x-powered-by');
  app.use(
    helmet({
      xPoweredBy: false,
      xFrameOptions: { action: "deny" },
      contentSecurityPolicy: {
        directives: {
          "script-src": ["'self'", "https://cdn.socket.io", "https://stackpath.bootstrapcdn.com"],
          "style-src": ["'self'", "https://fonts.googleapis.com", "https://stackpath.bootstrapcdn.com"],
          "font-src": ["'self'", "https://fonts.gstatic.com"]
        },
      },
      nosniff: true, // Config "nosniff"
      strictTransportSecurity: false, // HSTS disabled only for work with localhost
      xDnsPrefetchControl: { allow: false } // Disabled DNS prefetching
    })
  );
}

// Hola