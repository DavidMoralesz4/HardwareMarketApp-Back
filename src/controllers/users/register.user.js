export const userRegister = async (req, res) => {
  try {
    const userCreated = req.user;

    res.status(201).json({
      status: 'success',
      message: 'Registro de usuario exitoso. Inicia sesión para continuar.',
      user: userCreated,
    });
  } catch (error) {
      console.error('Register controller - Error creating user: ' + error);
      res.status(500).send({ error: 'Internal Server Error' });
  }
};
