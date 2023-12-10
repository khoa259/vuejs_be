import User from "../models/user.js";

export const addWishlist = async (req, res) => {
  const { email, postsId } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { email },
      {
        $addToSet: {
          wishlist: postsId,
        },
      }
    )
      .populate("wishlist", "title imagePosts")
      .exec();
    res.status(200).json({
      response: {
        email: user.email,
        postsId: user.wishlist,
      },
    });
  } catch (error) {
    console.log("lỗi ", error);
  }
};

export const deleteWishlist = async (req, res) => {
  try {
    const { postsId, email } = req.body;
    const user = await User.findOneAndUpdate(
      { email },
      { $pull: { wishlist: postsId } },
      { new: true }
    ).exec();
    res.status(200).json({
      response: {
        email: user.email,
        postsId: user.wishlist,
      },
    });
  } catch (error) {
    console.log("lỗi ", error);
  }
};

export const getWishList = async (req, res) => {
  try {
    const email = req.query.email;
    console.log(email);
    const user = await User.find({ email })
      .sort({ createdAt: -1 })
      .select("wishlist")
      .populate("wishlist", "title imagePosts")
      .exec();
    res.status(200).json({
      response: user,
    });
  } catch (err) {
    res.status(400).json({
      err: err.message,
    });
  }
};
