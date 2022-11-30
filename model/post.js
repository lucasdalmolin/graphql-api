const mongoose = require("mongoose");
const MSschema = mongoose.Schema

// mongoose.set("useFindAndModify", false);

const postSchema = new MSschema({
    comment: String,
});

module.exports = mongoose.model("Post", postSchema)