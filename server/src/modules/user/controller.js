require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user/services");
const { messages } = require("../../utils/message");
const { EXPIRE_TIME } = require("../../utils/constants");


exports.getToken = (id, email, secret, expireTime) => {
  const secretKey = secret ? secret : process.env.SECRET_KEY;
  const token = jwt.sign({ userId: id, email: email }, secretKey, {
    expiresIn: expireTime ? expireTime : EXPIRE_TIME,
  });
  return token;
};

// API for user signup or user creation
exports.signupUser = async (name, email, password) => {
  try {
    const user = await User.getUser({ email: email });
    if (user) {
      throw new Error(messages.user.create_error);
    } else {
      const encryPassword = await bcrypt.hash(password, 12);
      const userData = await User.create({
        email: email,
        name: name,
        password: encryPassword,
      });

      const token = this.getToken(userData._id, userData.email);

      return {
        ...userData._doc,
        password: null,
        userId: userData.id,
        token: token,
      };
    }
  } catch (error) {
    throw error;
  }
};

exports.login = async (email, password) => {
  try {
    const user = await User.getUser({ email: email });
    if (!user) {
      throw new Error(messages.user.get_error);
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error(messages.user.password_error);
    }

    const token = this.getToken(user.id, user.email);
    return {
      userId: user.id,
      token: token,
      name: user.name
    };
  } catch (error) {
    throw error;
  }
};









