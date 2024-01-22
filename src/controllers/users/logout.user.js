export const userLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('logout controller - Error al destruir la sesión', err);
            return res.status(500).send({ error: 'Internal Server Error' });
        }
    })
}