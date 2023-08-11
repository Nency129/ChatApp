const Message = require("../Models/messageModel");
const User = require("../Models/userModel");
const Chat = require("../Models/chatModel");
const { json } = require("express");

const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: res.user._id, // It seems you are trying to access the user from the response object (res), but it's generally stored in the request object (req). Make sure you have middleware that extracts user information and stores it in req.user.
    content: content,
    chat: req.body.chatId,
  };

  console.log(req.body.chatId); // The variable is already destructured as chatId above, so this line is not necessary.

  try {
    var message = await Message.create(newMessage);

    // The `.populate()` method should be used after creating the message object and before saving it. You cannot use it on a message that has already been saved.
    // Also, make sure you populate the 'sender' field with the correct User model path.
    message = await message.populate("sender", "name pic");
    // Assuming 'Chat' is a valid model, you can populate it similarly to the 'sender'.
    message = await message.populate("chat");

    // If you want to populate 'users' field inside the 'Chat' model, use the following:
    message = await message.populate({
      path: "chat.users",
      select: "name pic email",
    });

    // It's recommended to use 'const' instead of 'var' for better scoping.
    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};


const allMessage = async(req,res)=>{
  try {
    console.log(req.params);
    const messages=await Message.find({chat:req.params.chatId})
    .populate("sender", "name pic")
    .populate("chat");
console.log(messages)
    res.json(messages);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendMessage,allMessage };
