const Chat = require("../Models/chatModel");
const User = require("../Models/userModel");

const accessChat = async (req, res) => {
  //   console.log(res.user._id);
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isgroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: res.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [res.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).send(FullChat);
    } catch (error) {
      res.status(400);
      throw new error(error.message);
    }
  }
};

// all the chats
const fetchChat = async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: res.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updateAt: -1 })
      .then(async (results) => {
        console.log(results);
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

// group chat
const createGroupChat = async (req, res) => {
  if (req.body.user || !req.body.name) {
    return res.status(400).send({ message: "please fill all the feilds" });
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }
  users.push(res.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: res.user,
    });

    console.log(groupChat);
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).json(fullGroupChat);
    console.log(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

// rename group chat
const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat not Found");
  } else {
    res.json(updatedChat);
  }
};

// add to group
const addToGroup = async (req, res) => {
  console.log(req.body);
  const { chatId, userId } = req.body;

  const added =await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.statuts(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
};

// 
const renameFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  const remove =await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!remove) {
    res.statuts(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(remove);
  }
}
module.exports = { accessChat, fetchChat, createGroupChat, renameGroup,addToGroup,renameFromGroup };
