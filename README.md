# Anonymous Messenger Telegram Bot
A modified version of the [Group Bridge Message Relay Telegram Bot](https://github.com/STKDevworks/group-bridge-message-relay-telegram-bot). Links two Telegram Chats together and transmits messages from the Input to the Output Chat. Will not include sender unless forwarded. Perfect for Customer Support teams that wish to maintain their account names private.
  
## REQUIREMENTS

1. Node.js  
2. Telegram bot from @BotFather  

## INSTALLATION

1. Download all files  
2. Extract to preferred hosting folder  
3. Launch Telegram and start a conversation with @BotFather  
4. Create a new bot by following the instructions and copy the API key  
5. Visit the folder you extracted the bot files to and open .env  
6. In the .env file, find the following line in the code TELEGRAM_BOT_TOKEN=YOUR BOT TOKEN HERE and replace YOUR BOT TOKEN HERE with your bot api token.  
7. Find the following line in the code BOTUNAME=YOUR BOT USERNAME HERE and replace YOUR BOT USERNAME HERE with your bot username without the '@'  
8. Open Command Prompt, or other command interface you might have and navigate to the bot folder  
9. Type node index.js or nodemon index.js and press enter  
10. Your bot is now running  

## DISPLAY COMMANDS PREVIEW

1. Go to the @BotFather  
2. Type /mybots  
3. Select your Group Bridge bot  
4. Click Edit Bot  
5. Click Edit Commands  
6. Input the list below as one message and hit enter:  
  
help - Display information on how to use this bot.  
ca - Connect this chat as Input Chat.  
cas - Check which chat ID the Input Chat is connected to.  
cb - Connect CHAT_ID# as Output Chat. E.g. /cb -1001323286228
cbs - Check which chat ID the Output Chat is connected to.   
sr - Start message relay between the Input and Output Chats.  
cr - Cut message relay between the Input and Output Chats. 
rs - Check if the relay is on or off.  

## CHAT COMMANDS

/help - Display information on how to use this bot.  
/ca - Connect this chat as Input Chat.  
/cas - Check which chat ID the Input Chat is connected to.  
/cb - Connect CHAT_ID# as Output Chat. E.g. /cb -1001323286228  
/cbs - Check which chat ID the Output Chat is connected to.   
/sr - Start message relay between the Input and Output Chats.  
/cr - Cut message relay between the Input and Output Chats. 
/rs - Check if the relay is on or off.  
