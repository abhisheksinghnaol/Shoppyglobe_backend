import jwt from "jsonwebtoken";
import UserModel from "../model/User.model.js";

export function verifyToken(req, res, next) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      "secretkey",
      function (err, verifiedToken) {
        console.log(verifiedToken, "verifiedToken");
        if (err)
          return res.status(403).json({ message: "Invalid JSON web token" });

        UserModel.findById(verifiedToken.id)
          .then((user) => {
            if (!user) {
              return res.status(404).json({ message: "User not found" });
            }
            req.user = user;
            next();
          })
          .catch((err) => {
            res.status(500).json({ message: err.message });
          });
      }
    );
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
}
