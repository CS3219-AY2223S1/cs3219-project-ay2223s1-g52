import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "../common/constants.js";

export function authentication (req, res, next) {
    const token = req.headers['authorization'].split(' ')[1];

    if (!token){
        return res.status(401).json({ message: "You do not have access to this system!" });
    }
    
    try {
        const tokenData = jwt.verify(token, SECRET_TOKEN);
        req.userId = tokenData.userId.toString();
        next();
        
    } catch (err) {
        return res.status(403).json({ message: "Token is invalid. You do not have access to this system!" });
    } 
}

export default authentication;