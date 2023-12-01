import Posts from "../models/posts.js";
import Category from "../models/category.js";
import Users from "../models/category.js";
export const getCountItem = async (req, res) => {
  const { createdAt } = req.body;
  const date = Date.now();
  console.log(date - createdAt);
  try {
    const getItemPosts = await Posts.find({ createdAt }).exec();
    // await Posts.find(parseInt(date - getItemPosts) > 7);
    const getItemCate = await Category.find().exec();
    const getItemUser = await Users.find().exec();
    res.status(200).json({
      mesage: "Lấy thành công",
      response: {
        posts: getItemPosts.length,
        categories: getItemCate.length,
        users: getItemUser.length,
      },
    });
  } catch (error) {}
};
