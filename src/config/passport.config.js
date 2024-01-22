import config from './config.js';
import passport from 'passport';
// import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import mongoose from 'mongoose';
import UserModel from '../models/schemas/user.model.js';
// import { createUser } from '../utils/user.utils.js';
// import { isValidPassword } from '../utils/validations.utils.js';

const initializePassport = () => {
  // Estrategia de registro local
/*   passport.use(
    'local-register',
    new LocalStrategy(
      { passReqToCallback: true, usernameField: 'email' },
      async (req, username, password, done) => {
        const {
          first_name,
          last_name,
          age,
          address,
          location,
          province,
          country,
        } = req.body;

        try {
          const user = await UserModel.findOne({ email: username });

          // if (user) {
          //   console.error('User already registered');
          //   return res.status(401).send({ message: 'User already registered' });
          // }

          const result = await createUser({
            first_name,
            last_name,
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
          return done('local-register: ' + error);
        }
      }
    )
  );
 */
  // Estrategia de login local
/*   passport.use(
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
 */
  // Estrategia de login con Google //TODO: esta funcionando el logueo pero aun no está guardandose en la base de datos.
  passport.use(
    'google',
    new GoogleStrategy(
      {
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL,
        scope: ['profile', 'email'],
        state: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        const email = profile.emails[0].value;

        //TODO Manejar la respuesta de Google
        // try {
        //   // const user =
        //   //   await UserModel.findOne(/*{ email: profile._json.email }*/);
        //   // si el usuario no existe en la base de datos, agregarlo.
        // } catch (error) {}
        console.log('Estrategia accessToken: ', accessToken);
        console.log('Estrategia refreshToken: ', refreshToken);
        console.log('Estrategia profile: ', profile);
        console.log('Estrategia email: ', email);
        return done(null, profile);
      }
    )
  );

  // Serialización (Guardar el usuario en la sesión (base se datos))
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialización (Recuperar el usuario en la sesión (base se datos))
  passport.deserializeUser(async (id, done) => {
    try {
      let user;

      if (mongoose.Types.ObjectId.isValid(id)) {
        user = await UserModel.findById(id);
      } else {
        user = await UserModel.findOne({ externalId: id });
      }
      done(null, user);
    } catch (error) {
      done('deserializeUser: ' + error);
    }
  });
};

export default initializePassport;
