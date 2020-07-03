const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    email: {
      type: String,
      ref: "User"
    },
    products: [
      {
        _id: Number,
        model_no: Number,
        quantity: Number,
        price: Number
        
      }
    ],
});
const Cart = mongoose.model("Cart", CartSchema,'Cart');
module.exports = Cart;
/*module.exports = function cart(oldCart) {
    this.product = oldCart.product || 0; 
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice;
 
    this.add = function(item, model_no){
        var storedProduct = this.product[id];
        if (!storedProduct) {
            storedProduct = this.product[model_no] = {product: product, qty: 0, price: 0 };
        }
        storedProduct.qty++;
        storedProduct.price = storedProduct.product.price * storedProduct.qty;
        this.totalQty++;
        this.totalPrice += storedProduct.product.price;
    }
    this.generateArray = function(){
       var arr= [];
       for(var model_no in this.product) {
           arr.push(this.product.model_no);    
       }
       return arr;
 
    };
 };*/
 