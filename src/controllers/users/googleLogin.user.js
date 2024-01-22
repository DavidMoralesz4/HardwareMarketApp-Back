import * as userServices from '../../services/database/users.services.js';

// TODO: Tengo que manejar el profile que me llega, insertarlo en la base de datos y enviarle los datos al front.
export const googleLoginCallback = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      console.log('user google authenticated');
      const user = req.user;
      const userId = user.id;
      
      const userSession = {
        userId,
        first_name: user.name.givenName,
        last_name: user.name.familyName,
        email: user.emails[0].value,
        last_connection: new Date(),
      }
      
      // console.log('userId: ', userId);

      // const { sub, given_name, family_name, picture, email } = user._json;
      // console.log('Google User: ', user._json);

      // res.status(200).json({status:'success',message:});
      res.send(
        `<h1>You are logged in</h1><span>${JSON.stringify(
          req.user,
          null,
          2
        )}</span>`
      );
    }
  } catch (error) {
    console.error('googleCallback: ', error.message);
    return res.status(500).json({
      message: 'Error al iniciar session con Google',
      err: err.message,
    });
  }
};
