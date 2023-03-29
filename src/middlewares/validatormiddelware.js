const validationMiddleware = (req, res, next) => {
  try {
    const { sku, nombre_producto, descripcion_producto, precio, imagen } =
      req.body;

    if (
      !sku ||
      !nombre_producto ||
      !descripcion_producto ||
      !precio ||
      !imagen
    ) {
      throw {
        code: 401,
        message: "el campo email y password no pueden estar vacios",
      };
    }
    next();
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
};

module.exports = { validationMiddleware };
