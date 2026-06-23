import jwt from "jsonwebtoken";


const userAuth = (req, res, next) => {
  const {token} = req.headers;
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(decoded.id){
        req.body.userId = decoded.id;
    }else{
        return res.json({ error: "Invalid token. Not authorized. Login again" });
    }
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default userAuth;