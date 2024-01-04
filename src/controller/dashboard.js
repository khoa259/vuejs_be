import Posts from "../models/posts.js";
import Category from "../models/category.js";
import Users from "../models/category.js";
export const Dashboard = async (req, res) => {
  try {
    try {
      // get post top treding
      const getPostsTrending = await Posts.find(
        {},
        { review: 1, title: 1, imagePosts: 1 }
      )
        .sort({ review: -1 })
        .populate("categoryId", "nameCate")
        .limit(10)
        .exec();
      res.status(200).json({
        mesage: "Lấy thành công",
        response: {
          TopTrending: getPostsTrending,
        },
      });
    } catch (error) {
      res.status(500).send({ mesage: "Chưa có bài viết thịnh hành nào" });
    }
  } catch (error) {
    res.status(500).send({ mesage: "Lỗi rồi" });
  }
};
