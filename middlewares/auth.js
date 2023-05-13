
const jwt=require('jsonwebtoken');

function verifyToken(req, res, next) {
  const SECRET_KEY = process.env.JWT_SECRET;
  const authHeader = req.headers['authorization'];
  const token = authHeader&&authHeader.split(' ')[1] 
  const verified = token && SECRET_KEY ? jwt.verify(token, SECRET_KEY) : null;
  if (!verified) {
    return res.status(401).json({ msg: "Token not provided" });
  }

  try {
    req.body.userId = verified.userId;
    console.log(req.body.userId);
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid token" });
  }
}

module.exports = verifyToken;             