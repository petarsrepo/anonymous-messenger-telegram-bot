const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const token = process.env.TELEGRAM_BOT_TOKEN
const botuname = process.env.BOTUNAME
const bot = new TelegramBot(token, {interval: 100, timeout: 20, polling: true});
bot.on("polling_error", console.log);
var chatAID = null;
var chatBID = null;
var relaying = false;
var forwarded = false;

console.log(botuname);

//MESSAGE LISTENER

bot.on('message', (msg) => {
  var NewMsg = "";

//RELAY COMMANDS

//START RELAY
  if (msg.text == ("/sr@" + botuname) || msg.text == "/sr") {


    if (chatAID != null && chatBID != null){
      relaying = true;
      bot.sendMessage(msg.chat.id, " Relaying set to " + relaying.toString() + " @" + msg.from.username + ".");
    } else if (chatAID == null && chatBID != null) {
      bot.sendMessage(msg.chat.id, " Input Chat is not set. Connect it by typing /ca");
    } else if (chatAID != null && chatBID == null) {
      bot.sendMessage(msg.chat.id, " Output Chat is not set. Connect it by typing /cb");
    } else {
      bot.sendMessage(msg.chat.id, " No Input, or Output Chats are set " + "@" + msg.from.username + ". Connect them by typing /ca in group A and /cb in group B");
    }
  }

//STOP RELAY

  if (msg.text == ("/cr@" + botuname) || msg.text == "/cr") {
    relaying = false;
    bot.sendMessage(msg.chat.id, " Relaying set to " + relaying.toString() + " @" + msg.from.username + ".");
  }

//SET INPUT CHAT

  if (msg.text == ("/ca@" + botuname) || msg.text == "/ca") {
    chatAID = msg.chat.id;
    bot.sendMessage(chatAID, "Input Chat connected.")
    if (chatAID == chatBID) {
      chatBID = null;
      bot.sendMessage(chatAID, "Cannot relay between one group, so Output Chat has been reset. Please set Output Chat to another group, by typing /cb.")
    };
  }

//SET OUTPUT CHAT
if (msg.text != null) {
  if (msg.text.startsWith ("/cb@" + botuname) || msg.text.startsWith("/cb")) {
    var chatID = msg.text.split(" ");
    chatBID = chatID[1];
    bot.sendMessage(chatAID, "Output Chat connected.")
    if (chatBID == chatAID) {
      chatAID = null;
      bot.sendMessage(chatAID, "Cannot relay between one group, so Input Chat has been reset. Please set Input Chat to another group, by typing /ca.")
    };
  }
}
//RELAY STATUS COMMANDS

//INPUT CHAT STATUS

  if (msg.text == ("/cas@" + botuname) || msg.text == "/cas") {
    if (chatAID != null) {
    bot.sendMessage(msg.chat.id, " Input Chat is with ID: " + chatAID + ".");
  } else {
    bot.sendMessage(msg.chat.id, " Input Chat is not set.");
  }
  }

//OUTPUT CHAT STATUS

  if (msg.text == ("/cbs@" + botuname) || msg.text == "/cbs") {
    if (chatBID != null) {
    bot.sendMessage(msg.chat.id, " Output Chat is with ID: " + chatBID + ".");
  } else {
    bot.sendMessage(msg.chat.id, " Output Chat is not set.");
  }
  }

//RELAY STATUS

  if (msg.text == ("/rs@" + botuname) || msg.text == "/rs") {
    bot.sendMessage(msg.chat.id, " Relaying set to " + relaying.toString() + ".");
  }

//HELP

  if (msg.text == ("/help@" + botuname) || msg.text == "/help") {
    bot.sendMessage(msg.chat.id, " I am a bot that links two groups together to relay messages from the Input to the Output Chat. This allows anonymous sending of messages from one to the other. To begin message relay connect the Input Chat, by typing /ca, Output Chat by typing /cb and then type /sr to start the relay." + " @" + msg.from.username + ".");
  }

  //CHECK IF NOT MEDIA

  if (msg.text != null && msg.media_group_id == null){

  //PREVENT RELAY OF BOT COMMANDS
if (msg.text != null) {
  if (msg.text.startsWith ("/")) {
    nospecial = false;
  } else {
    nospecial = true;
  }
}
  //CHECK IF FORWARDED

  if (msg.forward_from == null && msg.forward_from_chat == null) {
    forwarded = false;
  } else {
    forwarded = true;
  }

//RELAY MESSAGE FROM INPUT TO OUTPUT CHAT

  if (msg.chat.id == chatAID && relaying && nospecial && !forwarded && msg.text.length < (4092 - msg.from.username.length)) {

//ENSURE CORRECT ORDER WITH TIMEOUT

  setTimeout(() => {
    bot.sendMessage(chatBID, msg.text.toString(NewMsg));
  }, 200);

//FORWARD IF FORWARDED

} else if (msg.chat.id == chatAID && relaying && nospecial && forwarded) {
  bot.forwardMessage(chatBID, chatAID, msg.message_id);

//FORWARD IF TOO LONG

} else if (msg.chat.id == chatAID && relaying && nospecial && !forwarded && msg.text.length >= (4092 - msg.from.username.length)) {
bot.forwardMessage(chatBID, chatAID, msg.message_id);
}
}

//IF NOT MEDIA FORWARD

 else {
  bot.forwardMessage(chatBID, chatAID, msg.message_id);
}
});
