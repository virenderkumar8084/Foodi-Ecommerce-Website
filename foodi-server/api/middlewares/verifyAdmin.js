const User = require('../models/User');

const verifyAdmin = async (req, res, next) => {
    try {
        const email = req.decoded?.email;
        if (!email) {
            return res.status(403).send({ message: "forbidden access - email not found!" });
        }

        const user = await User.findOne({ email });
        if (!user || user.role !== 'admin') {
            return res.status(403).send({ message: "forbidden access!" });
        }

        next();
    } catch (error) {
        console.error('Error verifying admin:', error);
        res.status(500).send({ message: "Internal server error" });
    }
};

module.exports = verifyAdmin;
