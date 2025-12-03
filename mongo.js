const mongoose = require("mongoose");

// Модель данных (пример)
const MessageSchema = new mongoose.Schema(
  {
    user_id: Number,
    username: String,
    message: String,
    chat_id: Number,
  },
  { collection: "messages" }
);

const UserSchema = new mongoose.Schema(
  {
    user_id: Number,
    username: String,
  },
  { collection: "users" }
);

const Message = mongoose.model("Message", MessageSchema);

// Подключение к MongoDB
mongoose.connect("mongodb://localhost:27017/anonimbot");

async function saveMessage(message) {
  const messages = new Message(message);
  try {
    await messages.save();
  } catch (error) {
    console.log(error);
  }
}

module.exports = saveMessage;
