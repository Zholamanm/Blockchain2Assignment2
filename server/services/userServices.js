const bcrypt = require("bcryptjs");
const User = require("../models/User");

class UserServices {
  async getUserById(userId) {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async updateUser(userID, username, bio, email, firstname, lastname, password, wallet_address) {
    const updateFields = {};
    if (username) updateFields.username = username;
    if (bio) updateFields.bio = bio;
    if (email) updateFields.email = email;
    if (firstname) updateFields.firstname = firstname;
    if (lastname) updateFields.lastname = lastname;
    if (wallet_address) updateFields.wallet_address = wallet_address;

    const user = await User.findOneAndUpdate({ _id: userID }, updateFields, { new: true });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}

module.exports = new UserServices();
