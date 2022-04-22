const router = require("express").Router();
const Cart = require("../models/cart");
const {
  verifyToken,
  verifyTokenAuth,
  verifyTokenAdmin,
} = require("./verifyToken");

//CREATE

router.post("/", verifyTokenAuth, async(req, res ) =>{
  const newCart = new Cart(req.body)

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err.message)
  }
})

//update
router.put("/:id", verifyTokenAuth, async (req, res) => {

  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete

router.delete("/:id", verifyTokenAuth, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//Get user cart
router.get("/find/:userId", verifyTokenAuth,  async (req, res) => {
  try {
    const cart = await Cart.findBy({userId: req.params.userId});
    
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//Get all 
router.get("/", verifyTokenAdmin, async (req, res) => {
  
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err.message);
  }
});



module.exports = router;
