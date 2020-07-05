const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true

},
email: {
    type: String,
    required: true

},
model_no: {
    type: String,
    required: true

}
});
const Wishlist = mongoose.model("Wishlist", WishlistSchema,'Wishlist');
module.exports = Wishlist;