# HardwareMarketApp-Back
Desarrollo de la API de la app HardwareMarketApp.

## Aclaraciones para el desarrollo

* Carpetas:
  - config: contendrá todo lo referido a configuraciones, desde coneccion a base de datos, manejador de mails, logger, manejo de sesiones (ej: Passport, inicio de sesion con X plataforma), etc.
  - controller: contendrá el la lógica de negocio, será el nexo entre services y router.
  - services: contendrá el CRUD hacia la base de datos.
  - router: contendrá todas las rutas.
  - middlewares: contendrá todos los filtros necesarios los cuales se interpondrán entre la ruta y el controlador.
  - utils: contendran funciones de útiles para ciertas funcionalidades de la aplicacion, ej (ciertas verificaciones de datos, operaciones especiales necesarias para modificar una return, configuración de multer de ser necesario, etc.).
  - docs: aquí irán archivos yaml por ej. para documentar la app con swagger.