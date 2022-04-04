const mongoose = require('mongoose');

const natEmpTableSchema = mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }
});

let natEmpTableModel = mongoose.model("natEmpTable", natEmpTableSchema);
natEmpTableModel.exists({ employee: "6239e4ab5c70a61e471b9ab0" }).then(result => {
    if (!result) {
        natEmpTableModel.insertMany([
            { employee: "6239e4ab5c70a61e471b9ab0" },
            { employee: "6239e4ab5c70a61e471b9ab1" },
            { employee: "6239e4ab5c70a61e471b9ab2" },
            { employee: "6239e4ab5c70a61e471b9ab3" },
            { employee: "6239e4ab5c70a61e471b9ab4" },
            { employee: "6239e4ab5c70a61e471b9ab5" },
            { employee: "6239e4ab5c70a61e471b9ab6" },
            { employee: "6239e4ab5c70a61e471b9ab7" },
        ]).then({}).catch((e) => { console.log(e) });
    }
})


module.exports = natEmpTableModel;