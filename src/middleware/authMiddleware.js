import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const protect = async (req, res, next) => {
  let token;

  console.log('\n--- PROTECT MIDDLEWARE HIT ---');
  console.log('Request Headers:', req.headers);
 

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
   
      console.log('Extracted Token:', token);

     
      console.log('Attempting to verify token with JWT_SECRET:', process.env.JWT_SECRET ? `(Value: ${process.env.JWT_SECRET.substring(0, 5)}...)` : ' (Value is undefined/null)');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
      console.log('Token Decoded Successfully:', decoded);

  
      req.user = await User.findById(decoded.id).select("-password");
  
      console.log('User Found (req.user):', req.user ? req.user._id : 'User not found');

      if (!req.user) {
        
          console.log('Authentication Failed: User not found for decoded ID.');
          return res.status(401).json({ message: "Not authorized, user not found" });
      }

     
      console.log('Authentication Successful. Proceeding to next middleware/route.');
      next();
    } catch (error) {
      
      console.error("Token Verification Error:", error.name, error.message);
      if (error.name === 'TokenExpiredError') {
          return res.status(401).json({ message: "Not authorized, token expired" });
      } else if (error.name === 'JsonWebTokenError') {
          return res.status(401).json({ message: `Not authorized, invalid token: ${error.message}` });
      } else {
          return res.status(401).json({ message: "Not authorized, token failed" });
      }

    }
  } else {
 
    console.log('Authentication Failed: No token provided in headers.');
    return res.status(401).json({ message: "No token provided" });
  }
};

