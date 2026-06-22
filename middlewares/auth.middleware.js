import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized. Token missing." });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.user = decoded; // { _id, role, etc. }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

// Allow only Admin
export const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    console.log("role",req.user.role)
    return res.status(403).json({ message: "Access denied: Not authorized" });
  }
  next();
};

// Allow Admin Employee user & supplier
export const isAdminEmployeeOrUser = (req, res, next) => {
  if (["admin", "user", "employee","supplier"].includes(req.user?.role)) {
    return next();
  }
  return res.status(403).json({ message: "Access denied: Not authorized" });
};

// Allow  Admin & Employee Admin
export const isAdminOrEmployee = (req, res, next) => {
  if (["admin", "employee"].includes(req.user?.role)) {
    return next();
  }
  return res.status(403).json({ message: "Access denied: Not authorized" });
};

// Allow  Admin Employee Supplier & dealer
export const isAdminOrEmployeeOrDealer = (req, res, next) => {
  if (["admin", "employee",'dealer',"supplier"].includes(req.user?.role)) {
    return next();
  }
  return res.status(403).json({ message: "Access denied: Not authorized" });
};

// Allow Only user
export const isUser = (req, res, next) => {
  if (req.user?.role !== "user") {
    return res.status(403).json({ message: "Access denied: Not authorized" });
  }
  return next();
};


// limiter for security
export const limiter = rateLimit({
  windowMs : 15 * 60 * 1000, // 15 minutes
  max : 400,
  message : "Limit rechead, Signup failed, Try again later !",
  standardHeaders : true,
  legacyHeaders : false
});

// login limitter
export const loginLimiter  = rateLimit({
  windowMs : 10 * 60 * 1000, // ensure 10 minutes
  max : 5,
  message : "Too many login attempts. Try again later.",
  standardHeaders : true,
  legacyHeaders : false,
})