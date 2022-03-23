const jwt = require("jsonwebtoken");
let fetchUser = (req, res, next) => {
  const JWT_SECRET = "ThisIsAJWTSecretString*&^%$#@!";
  // get the user from the jwt token and add id to req object
  let jwtToken = req.header("auth-token");
  if (!jwtToken) {
      console.log(jwtToken+ " " + req.header('auth-token'))
    res.status(401).json({ error: "please authenticate using a valid token" });
  } else {
      try {
        let userData = jwt.verify(jwtToken, JWT_SECRET);
        req.user = userData.user;
        next();      
      } catch (error) {
          console.log(error.message);
        res.status(401).json({ error: "please authenticate using a valid token" });
      }
    
  }
};
module.exports = fetchUser;
