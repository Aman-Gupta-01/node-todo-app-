import jwt from "jsonwebtoken"

export const validateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    
    if (!token) {
        res.status(401);
        throw new Error("Missing access token, or user is not verified")
    }

    jwt.verify(token, process.env.SECRET_KEY, (error, decode) => {
        if (error){
            res.status(401)
            throw new Error("Invalid token");
        }

        req.user = decode.user;
        next()
    })
}