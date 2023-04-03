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
        message:
          "los campos no pueden estar vacios o mal escritos por favor verifique",
      };
    }
    next();
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
};
const token_verificacion = (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    jwt.verify(token, "az_AZ");

    next();
  } catch (error) {
    res.status(error.code || 498).send("error al traer token");
  }
};
module.exports = { validationMiddleware, token_verificacion };
