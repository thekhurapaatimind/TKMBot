const { WAConnection, MessageType, Mimetype, MessageOptions } = require('@adiwajshing/baileys');
const fs = require('fs');
// const gif2webp = require ("gif2webp");

async function connectWA() {
    const conn = new WAConnection();

    // code to save authorization details
    conn.on ('open', () => {
        // save credentials whenever updated
        console.log (`credentials updated!`);
        const authInfo = conn.base64EncodedAuthInfo(); // get all the auth info we need to restore this session
        fs.writeFileSync('./auth_info.json', JSON.stringify(authInfo, null, '\t')); // save this info to a file
    });
    try {
        conn.loadAuthInfo ('./auth_info.json');
    }
    catch (errN) {
        console.log("No previous session found.");
    }
    await conn.connect();
    conn.on('chat-update', async (chat) => {
        // console.log(chat);
        if ((chat.messages)) {  
            try {
                const msg = chat.messages.all()[0];
                const msgType = Object.keys(msg.message)[0];
                // console.log(msg);
                // console.log(msgType);

                if(msg.key.fromMe && msg.status !== 2) return;

                if(msgType === MessageType.text) {
                    // console.log(msg);
                    const msgText = msg.message.conversation;
                    if(msgText.startsWith("!")) {
                        // console.log("triggered");
                        const cmd = msgText.split(" ")[0].substring(1);
                        let cmdContent = (msgText.indexOf(" ") < 0) ? "" : msgText.substring(msgText.indexOf(" ") + 1);
                        // const actWord = "helloBot";
                        // console.log(cmd);
                        // if(cmd === actWord) {
                        //     // send message
                        //     console.log("Received greeting");
                        //     const toSend = msg.key.remoteJid;
                        //     const response = await conn.sendMessage(toSend, "Hello, World!", MessageType.text);
                        // }
                        switch(cmd) {
                            case "helloBot":
                                console.log("Received greeting");
                                const response = await conn.sendMessage(msg.key.remoteJid, "Hello, World!", MessageType.text);
                                break;

                            case "myself":
                                // console.log("Command content: \"" + cmdContent + "\"");
                                if(cmdContent.trim()) {
                                    const response = await conn.sendMessage(msg.key.remoteJid, "Hello "+cmdContent.trim()+"! Wassup?", MessageType.text);
                                }
                                else {
                                    conn.sendMessage(msg.key.remoteJid, "*!myself syntax:*\n\n!myself_<Your Name>", MessageType.text, {quoted: msg} ).then((res) => {
                                        console.log("Sent myself command help message.");
                                    }).catch(msgSendError);
                                }
                        }
                    }

                }
            }
            catch(err) {
                console.log("ERROR: " + err);
            }
        }
    });
    console.log("done");
}

function msgSendError(msgError) {
    console.log("ERROR in sending message: " + msgError);
} 

connectWA().catch((err) => {console.log("Error: " + err)});