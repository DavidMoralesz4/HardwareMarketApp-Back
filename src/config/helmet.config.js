import helmet from 'helmet';

export const helmetConfig = (app) => {
app.disable('x-powered-by')
app.use(
  helmet({
    xPoweredBy: false,
    xFrameOptions: { action: "deny" },
    contentSecurityPolicy: {
      directives: {
        "script-src": ["'self'", "https://cdn.socket.io"],
      },
    },
    nosniff: true, // Config "nosniff"
    strictTransportSecurity: false, // HSTS disabled only for work with localhost
    xDnsPrefetchControl: { allow: false } // Disabled DNS prefetching
  })
);
}
