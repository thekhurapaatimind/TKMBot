const { WAConnection, MessageType, Mimetype, MessageOptions } = require('@adiwajshing/baileys');
// const { Client } = require('@open-wa/wa-automate')
const fs = require('fs');
const gm = require('gm');


//const mentionedJidList = message;

async function connectWA() {
    const conn = new WAConnection();
    // const client = new Client();
    // code to save authorization details
    conn.on('open', () => {
        // save credentials whenever updated
        console.log(`credentials updated!`);
        const authInfo = conn.base64EncodedAuthInfo(); // get all the auth info we need to restore this session
        fs.writeFileSync('./auth_info.json', JSON.stringify(authInfo, null, '\t')); // save this info to a file
    });
    try {
        conn.loadAuthInfo('./auth_info.json');
    }
    catch (errN) {
        console.log("No previous session found.");
    }
    await conn.connect();
    conn.on('chat-update', async (chat) => {
        // console.log(chat);
        // if (chat.messages && chat.count) {
        //     const message = chat.messages.all()[0]
        //     console.log (message)
        // } else console.log (chat) // see updates (can be archived, pinned etc.)
        if ((chat.messages)) {
            try {
                const msg = chat.messages.all()[0];
                const msgType = Object.keys(msg.message)[0];
                // console.log(msg);
                // console.log(msgType);

                if (msg.key.fromMe && msg.status !== 2) return;

                if (msgType === MessageType.text) {
                    // console.log(msg);
                    const msgText = msg.message.conversation;
                    if (msgText.startsWith("#")) {
                        console.log("triggered2");
                        await conn.sendMessage(msg.key.remoteJid, "TKM-Bot Recommends you to study for now! See you afterwards : )", MessageType.text)
                    }
                } 
                if (msgType === MessageType.extendedText) {
                    // console.log("extended");
                    let msgText = msg.message.extendedTextMessage.text;
                    if (msgText.startsWith("#")) {
                        await conn.sendMessage(msg.key.remoteJid, "TKM-Bot Recommends you to study for now! \nSee you afterwards : )", MessageType.text)
                        
                    }
                }
            }
            catch (err) {
                console.log("ERROR: " + err);
            }
        }
    });
    console.log("done");
}

function msgSendError(msgError) {
    console.log("ERROR in sending message: " + msgError);
}

connectWA().catch((err) => { console.log("Error: " + err) });

// message: Message {
//     listResponseMessage: ListResponseMessage {
//       title: '#helpme',
//       listType: 1,
//       singleSelectReply: [SingleSelectReply],
//       contextInfo: [ContextInfo]
//     }