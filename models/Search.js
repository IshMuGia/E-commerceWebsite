const mongoose = require("mongoose");

const SearchSchema = new mongoose.Schema({
_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true

},
email: {
    type: String,
    required: true

},
word: {
    type: String,
    required: true

}
});
const Search = mongoose.model("Search", SearchSchema,'Search');
module.exports = Search;