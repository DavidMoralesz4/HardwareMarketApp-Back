// Login de usuario
export const userLogin = async (req, res) => {
  try {
    // Generar el objeto 'user' en req.session
    req.session.user = {
      userId: req.user._id,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
      role: req.user.role,
      documents: req.user.documents,
      last_connection: new Date(),
    };
    res.status(200).json({
      status: 'success',
      message: 'Inicio de sesión exitoso.',
      user: req.session.user,
    });
  } catch (error) {
    console.error('userLogin: ', error.message);
    return res.status(500).json({
      message: 'Error al iniciar session',
      err: err.message,
    });
  }
};
