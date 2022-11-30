const mongoose = require("mongoose");
const MSschema = mongoose.Schema

// mongoose.set("useFindAndModify", false);

const hobbySchema = new MSschema({
    title: String,
    description: String,
});

module.exports = mongoose.model("Hobby", hobbySchema)