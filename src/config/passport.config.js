import config from './config.js';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import UserModel from '../models/schemas/user.model.js';
import { createUser } from '../utils/user.utils.js';
import { isValidPassword } from '../utils/validations.utils.js';

const initializePassport = () => {
  // Estrategia de registro local
  passport.use(
    'local-register',
    new LocalStrategy(
      { passReqToCallback: true, usernameField: 'email' },
      async (req, username, password, done) => {
        const {
          first_name,
          last_name,
          alias,
          age,
          address,
          location,
          province,
          country,
        } = req.body;

        try {
          const user = await UserModel.findOne({ email: username });

          // Verificar si el usuario ya existe en la base de datos
          if (user) {
            console.error('User already registered');
            return done(null, false, { message: 'User already registered' });
          }

          const result = await createUser({
            first_name,
            last_name,
            alias,
            email: username,
            age,
            address,
            location,
            province,
            country,
            password,
          });

          console.log('New user created');
          return done(null, result, { message: 'User created' });
        } catch (error) {
          console.error(
            'Passport Register-Error al obtener el usuario: ',
            error
          );
          return done('error: ' + error);
        }
      }
    )
  );

  // estrategia de login local
  passport.use(
    'local-login',
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },
      async (req, email, password, done) => {
        try {
          // Verificar si es un usuario administrador
          if (
            email === config.admin.username &&
            password === config.admin.password
          ) {
            // Generar el objeto 'user' en  req.session para el usuario admimnistrador
            const userSession = {
              id: 'admin',
              first_name: 'Administrador',
              email: email,
              role: 'admin',
            };
            req.login(userSession, (err) => {
              if (err) {
                return done(err);
              }
              console.log(`user ${userSession.id} succesfully logged in`);
              return done(null, userSession);
            });
          } else {
            const user = await UserModel.findOne({ email });

            if (!user) {
              console.error('Passport local-login - Incorrect credentials');
              return done(null, false, { message: 'Incorrect credentials' });
            }
            // Comparar el password de la db con el que viene del front
            const passwordMatch = isValidPassword(user, password);

            console.log('passwordMatch: ', passwordMatch);

            if (!passwordMatch) {
              console.error('Passport local-login - Incorrect password');
              return done(null, false, { message: 'Incorrect password' });
            }

            console.log(`user ${user.id} succesfully logged in`);
            return done(null, user);
          }
        } catch (error) {
          console.error('Passport local-login - Error getting user: ', error);
          return done(error);
        }
      }
    )
  );

  // Serialización
  passport.serializeUser((user, done) => {
    // Si el usuario es el administrador, simplemente serializar el id "admin"
    if (user.id === 'admin') {
      return done(null, 'admin');
    }
    // Para otros usuarios, serializar su id de forma normal
    done(null, user.id);
  });

  // Deserialización
  passport.deserializeUser(async (id, done) => {
    // Si el id es "admin", devolver el objeto de usuario para el administrador
    if (id === 'admin') {
      const adminUser = {
        id: 'admin',
        email: config.admin.username,
        role: 'admin',
      };
      return done(null, adminUser);
    }
    // Para otros ids, buscar el usuario en la base de datos
    try {
      const user = await UserModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

export default initializePassport;
