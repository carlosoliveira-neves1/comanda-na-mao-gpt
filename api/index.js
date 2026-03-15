const app = require("../backend/src/server")

module.exports = (req, res) => {
  req.url = req.url.replace(/^\/api/, "") || "/"
  return app(req, res)
}
