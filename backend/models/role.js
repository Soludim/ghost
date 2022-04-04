const mongoose = require("mongoose");

const roleSchema = mongoose.Schema({
	name: { type: String, required: true },
	role_number: { type: Number, required: true },
	location: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
});
let admin_role = mongoose.model("Role", roleSchema);
admin_role.exists({ role_number: 1 }).then((result) => {
	if (!result) {
		admin_role
			.insertMany([
				{
					name: "National Admin",
					role_number: 1,
					location: "6239e27119dda0238c905d93",
				},
				{
					name: "Ashanti Admin",
					role_number: 2,
					location: "6239e27119dda0238c905d92",
				},
			])
			.then({})
			.catch((e) => {
				console.log(e);
			});
	}
});

module.exports = admin_role;
