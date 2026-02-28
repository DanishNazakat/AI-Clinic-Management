// const jwt = require("jsonwebtoken");
// require("dotenv").config();


// const authMiddleware = async (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//      return res.status(401).json({
//       success: false,
//       message: "No token, authorization denied "
//     });
//   }
//   try {
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decodedToken;
//     console.log(decodedToken);
//     return next()

//   }catch(err){
//    return res.status(401).json({
//       success: false,
//       message: "No token, authorization denied "
//     });
//   }

// }


// module.exports = authMiddleware;


// const jwt = require("jsonwebtoken");
// require("dotenv").config();


// const authMiddleware =async(req , res , next)=>{
//   const token = req.cookies.token;
//   console.log(token);
//   if(!token){
//     req.user = null;
//     return next();
//   }
//   try{
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
//     req.user = decodedToken;
//   }catch(err){
//     req.user  = null;
//   }
//   next()
// }


// module.exports = authMiddleware ;


const jwt = require("jsonwebtoken");
require("dotenv").config();

// 1. Sirf Token Verify karne ke liye (Sab roles ke liye)
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access Denied. Please login first."
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken; // Isme id aur role dono honge
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token."
    });
  }
};

// 2. Specific Role Check karne ke liye (Extra Power!)
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // req.user humein upar wale middleware se milega
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role (${req.user.role}) is not allowed to access this resource.`
      });
    }
    next();
  };
};

module.exports = { authMiddleware, authorizeRoles };