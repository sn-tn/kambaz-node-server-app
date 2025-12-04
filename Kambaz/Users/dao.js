import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function UsersDao() {
  // let { users } = db;

  const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    // users = [...users, newUser];
    return model.create(newUser);
  };
  const findAllUsers = () => model.find();
  const findUserById = (userId) => model.findById(userId);
  // users.find((user) => user._id === userId);
  const findUserByUsername = (username) => model.findOne({ username });
  // users.find((user) => user.username === username);
  const findUserByCredentials = (username, password) =>
    model.findOne({ username, password });
  // users.find(
  //   (user) => user.username === username && user.password === password
  // );
  const updateUser = (userId, user) =>
    model.updateOne({ _id: userId }, { $set: user });
  // (users = users.map((u) => (u._id === userId ? user : u)));
  const deleteUser = (userId) => model.deleteOne({ _id: userId });
  // (users = users.map((u) => u._id !== userId));
  const findUsersByRole = (role) => model.find({ role: role });
  const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i");
    return model.find({
      $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
    });
  };
  return {
    createUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    updateUser,
    deleteUser,
    findUsersByRole,
    findUsersByPartialName,
  };
}
