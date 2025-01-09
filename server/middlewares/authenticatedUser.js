import jwt from "jsonwebtoken";

const authenticatedUser = async (req, res, next)=> {
    try {
        const token = req.cookies.access_token;
        if(!token) {
            return res.status(401).json({message: "Not authenticated.", success: false});
        }

        const verifyUser = jwt.verify(token , process.env.JWT_SECRET)
        console.log(verifyUser)
        if(!verifyUser) {
            return res.status(401).json({message: "Forbidden.", success: false});
        }

        req.id = verifyUser.id; 
        next()
    } catch (error) {
        console.log(error);
    }
}

export default authenticatedUser;