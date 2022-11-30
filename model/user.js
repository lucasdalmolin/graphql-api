const mongoose = require("mongoose");
const MSschema = mongoose.Schema

// mongoose.set("useFindAndModify", false);

const userSchema = new MSschema({
    name: String,
    age: Number,
    profession: String,
});

module.exports = mongoose.model("User", userSchema)