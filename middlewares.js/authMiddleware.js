// const JWT = require('jsonwebtoken');
// module.exports = async(req, res, next) => {
//     try {
//         //get token
//         const token = req.headers["authorization"].split(" ")[1];
//         JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
//             if (err) {
//                 return res.status(401).send({
//                     success: false,
//                     message: "Un-Authorize User"
//                 });
//             } else {
//                 req.body.id = decode.id;
//                 next();
//             }
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: "Error in Auth API",
//             error: error.message,
//         });
//     }
// }
const JWT = require('jsonwebtoken');

module.exports = async(req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            console.error("Authorization header missing");
            return res.status(401).send({
                success: false,
                message: "Authorization header missing"
            });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            console.error("Token missing in authorization header");
            return res.status(401).send({
                success: false,
                message: "Token missing"
            });
        }

        // Verify token
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                console.error("Token verification failed:", err);
                return res.status(401).send({
                    success: false,
                    message: "Unauthorized User"
                });
            } else {
                req.body.id = decode.id;
                next();
            }
        });
    } catch (error) {
        console.error("Error in auth middleware:", error);
        res.status(500).send({
            success: false,
            message: "Error in Auth API",
            error: error.message,
        });
    }
};