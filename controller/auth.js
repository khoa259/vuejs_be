import User from "../models/user.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

const mySort = { createdAt: -1 };

const sendVericationEmail = async (email, verifiedCationToken, userName) => {
  // tao thong tin gui email
  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "lovestory",
    auth: {
      user: "khoa10688@gmail.com",
      pass: "jzrs wqxb qktc ioom",
    },
  });
  // noi dung gui email verifiedCationToken
  const sendMaillerOption = {
    from: "LoveStory",
    to: email,
    subject: "Email Xác Thực Đăng Nhập",
    text: `Xin chào, ${userName}
    Ấn vào link xác thực để đăng nhập: http://localhost:5000/api/verify/${verifiedCationToken}`,
  };

  // gửi Email
  try {
    await transport.sendMail(sendMaillerOption);
  } catch (error) {
    console.log("Gửi email thất bại", error);
  }
};
export const signUp = async (req, res) => {
  const { email } = req.body;
  try {
    //check email có tồn tại không
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(500).json({ message: "Email đã tồn tại" });
    }
    // tạo 1 user mới
    const newUser = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt); // mã hóa password
    newUser.verifiedCationToken = crypto.randomBytes(20).toString("hex");

    //lưu user vào db
    await newUser.save();
    res.json({
      newUser: {
        _id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
      },
    });

    //gửi email xác thực cho user
    sendVericationEmail(
      newUser.email,
      newUser.verifiedCationToken,
      newUser.userName
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "lỗi đăng ký" });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({ verifiedCationToken: token });
    if (!user) {
      res.status(404).json({ message: "Hết hạn Token" });
    }
    user.verified = true;
    user.verifiedCationToken = undefined;
    await user.save();
    res.status(200).json({ message: "email đã được xác thực" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi Token" });
  }
};
const generateKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};
const secretKey = generateKey();

export const login = async (req, res) => {
  try {
    const { email, password, verified } = req.body;
    const user = await User.findOne({ email }).exec();
    if (user.verified === false) {
      return res.status(401).json({ message: "Chưa xác thực email" });
    }
    const checkPassWord = await bcrypt.compare(password, user.password);
    if (!checkPassWord) {
      return res.status(404).json({ message: "Mật khẩu không đúng" });
    }
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "365d",
    });
    res.json({
      message: "Đăng nhập thành công",
      token,
      user: {
        _id: user._id,
        email: user.email,
        userName: user.userName,
        role: user.role,
        timestamps: Date.parse(user.createdAt),
      },
    });
  } catch (error) {
    res.status(400).json({ message: "Loi dang nhap" });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id }).exec();
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: "khong co du lieu" });
  }
};

export const get = async (req, res) => {
  try {
    const user = await User.find().sort(mySort).exec();
    res.json({ response: user });
  } catch (error) {}
};
