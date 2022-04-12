const Admin = require('../models/admin');
const genToken = require('../services/generate_token');

exports.adminLogin = (req, res) => {
    let fetchedAdmin;
    if (!req.body.email) {
        return res.status(400).json({ message: "Email Is Required" })
    }

    Admin.findOne({ email: req.body.email })
        .populate({ path: 'role', populate: 'location' })
        .then(async admin => {
            if (!admin) {
                return res.status(401).json({ message: 'Invalid authentication credentials!' });
            }
            fetchedAdmin = admin;

            let token = genToken(res, fetchedAdmin._id, fetchedAdmin.username,
                fetchedAdmin.email, fetchedAdmin.role.role_number);
            return res.status(200).json({
                message: "Login was successful",
                user: fetchedAdmin,
                token
            })
        }).catch(error => {
            res.status(500).json({ message: 'Authentication Failed' })
        })

}

exports.getAdmin = (req, res) => {
    Admin.findById(req.params.id)
        .then(admin => {
            if (admin) {
                res.status(200).json(admin);
            } else {
                res.status(404).json({ message: "Admin not found!" });
            }
        })
        .catch(error => {
            if (error.kind === "ObjectId")
                return res.status(404).json({ message: "Invalid admin id" });

            res.status(500).json({ message: "Fetching admin failed!" });
        });
}