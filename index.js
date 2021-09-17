const { WAConnection, MessageType, Mimetype, MessageOptions } = require('@adiwajshing/baileys');
const fs = require('fs');
const gm = require('gm');


//const mentionedJidList = message;

async function connectWA() {
    const conn = new WAConnection();

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
                        console.log("triggered");
                        // var cmd;
                        // if(msgText.startsWith("# ")){cmd = msgText.split(" ")[1].toLowerCase();}
                        // else{cmd = msgText.split(" ")[0].substring(1).toLowerCase()}
                        const cmd = msgText.split(" ")[0].substring(1).toLowerCase();
                        console.log(cmd);
                        let cmdContent = (msgText.indexOf(" ") < 0) ? "" : msgText.substring(msgText.indexOf(" ") + 1);
                        // const actWord = "helloBot";
                        // console.log(cmd);
                        // if(cmd === actWord) {
                        //     // send message
                        //     console.log("Received greeting");
                        //     const toSend = msg.key.remoteJid;
                        //     const response = await conn.sendMessage(toSend, "Hello, World!", MessageType.text);
                        // }
                        switch (cmd) {
                            case "hellobot":
                                console.log("Received greeting");
                                const response = await conn.sendMessage(msg.key.remoteJid, "Hello, World!", MessageType.text);
                                break;

                            case "byebot":
                                console.log("Received greeting");
                                response = await conn.sendMessage(msg.key.remoteJid, "Bye Bruh!", MessageType.text);
                                break;

                            case "hellotkm-bot":
                                console.log("Received greeting from BEWA bhai!");
                                response = await conn.sendMessage(msg.key.remoteJid, "!helloBEWAbot", MessageType.text);
                                console.log("Sent greetings to BEWA bhai!");
                                break;

                            case "bhanda":
                            case "burahua":
                            case "emb":
                            case "facepalm":
                            case "gkm":
                            case "gn":
                            case "haanvro":
                            case "hand":
                            case "hehe":
                            case "hempy":
                            case "hmm":
                            case "isee":
                            case "koini":
                            case "namaste":
                            case "nibbi":
                            case "nibbiforlyf":
                            case "party":
                            case "sabmaloom":
                            case "smug":
                            case "smuggrin":
                            case "srsi":
                            case "sunkarburalaga":
                            case "themks":
                            case "ufff":
                            case "yeah":

                                console.log("sending " + cmd + " sticker.");
                                response = await conn.sendMessage(msg.key.remoteJid, fs.readFileSync("stickers/" + cmd + ".webp"), MessageType.sticker, { quoted: msg, mimetype: Mimetype.webp });
                                break;

                            case "sed":
                                console.log("Received sorrow");
                                const replies = ["I respectfully don't care! 🙂", "Looks Like It's F**K This Shit O'Clock 🗿", "Me: Finally I'm Happy.\n\nLife: Lol, wait a sec 🌚", "*Deja Poo*\n\n_adj._ The feeling of having heard this crap before.", ".....On the bright side, You are not addicted to Cocaine 🐸", "Sometimes I look at people and think:\n*Really? That's the sperm that won?* 🙄", "I don't run from my problems. I sit on my sofa, play on my phone and ignore them.\nLike an adult 🤷‍♂️🤷‍♂️", "Paytm ₹100 to me and u'll be fine 🙃"]
                                response = await conn.sendMessage(msg.key.remoteJid, replies[Math.floor(Math.random() * 8)], MessageType.text);
                                break;

                            case "hbd":
                                console.log("wished bday");
                                const replies2 = ["Q: Do you by any chance know what constantly goes up, but never ever comes down?\n\n\n\n\n\n\n\n\n\nA: Your ever-growing age!", "Q: What does the average cat love to eat at her birthday party?\n\n\n\n\n\n\n\n\n\nA: Mice cream.", "Q: What do Jesus Christ and Mahatma Gandhi both have in common?\n\n\n\n\n\n\n\n\n\nA: They were both born on public holidays.", "Q: What do people who have the most birthdays have in common?\n\n\n\n\n\n\n\n\n\nA: Old age.", "Q: Why did couples have problems with each other before the 2000s?\n\n\n\n\n\n\n\n\n\nA: Because Facebook reminder didn’t exist at that time to remind them of their partners’ birthdays.", "Q: What do chickens love to eat at their birthday parties?\n\n\n\n\n\n\n\n\n\nA: Coop-cakes!", "Q: Where can you find the best birthday present for your cat?\n\n\n\n\n\n\n\n\n\nA: Inside a cat-alogue!", "Q: What type of cake was served at the birthday party of Penny from the Big Bang Theory?\n\n\n\n\n\n\n\n\n\nA: Cheese cake.", "Q: What gift do you always receive on your birthday?\n\n\n\n\n\n\n\n\n\nA: A brand new age."]
                                if (cmdContent.trim()) {
                                    response = await conn.sendMessage(msg.key.remoteJid, "Happy Birthday " + cmdContent.trim().toUpperCase() + "!!🎂🎂🎊🎉🥳🥳\n\n*Quick Question:*\n\n" + replies2[Math.floor(Math.random() * 9)], MessageType.text);
                                }
                                else {
                                    conn.sendMessage(msg.key.remoteJid, "Happy Birthday!! 🎂🎂🎊🎉🥳🥳\n\n*Quick Question:*\n\n" + replies2[Math.floor(Math.random() * 9)], MessageType.text, { quoted: msg }).then((res) => {
                                        console.log("Sent bday wish without name.");
                                    }).catch(msgSendError);
                                }
                                break;

                            case "who":
                                console.log("answered the who question");

                                if (cmdContent.trim()) {
                                    if ((cmdContent.charAt(cmdContent.length - 2) == ' ') && (cmdContent.charAt(cmdContent.length - 1) == 'b' || cmdContent.charAt(cmdContent.length - 1) == 'B' || cmdContent.charAt(cmdContent.length - 1) == 'm' || cmdContent.charAt(cmdContent.length - 1) == 'M')) {
                                        var users = ["Abhinav", "Aryan", "Arjun", "Ayush", "Govind", "Jaskaran", "Saral", "Nachiket", "Omkar", "Paras", "Prashant", "Sahil"]
                                        response = await conn.sendMessage(msg.key.remoteJid, users[Math.floor(Math.random() * 12)].toUpperCase() + " " + cmdContent.trim().toUpperCase().substring(0, cmdContent.length - 1), MessageType.text, { quoted: msg });
                                    }
                                    else if ((cmdContent.charAt(cmdContent.length - 2) == ' ') && (cmdContent.charAt(cmdContent.length - 1) == 'g' || cmdContent.charAt(cmdContent.length - 1) == 'G' || cmdContent.charAt(cmdContent.length - 1) == 'f' || cmdContent.charAt(cmdContent.length - 1) == 'F')) {
                                        var users = ["Anushka", "Bhavya", "Riya!", "Subha", "Sreyashi"]
                                        response = await conn.sendMessage(msg.key.remoteJid, users[Math.floor(Math.random() * 5)].toUpperCase() + " " + cmdContent.trim().toUpperCase().substring(0, cmdContent.length - 1), MessageType.text, { quoted: msg });
                                    }
                                    else {
                                        var users = ["Abhinav", "Anushka", "Aryan", "Arjun", "Ayush", "Bhavya", "Govind", "Jaskaran", "Riya!", "Saral", "Subha", "Nachiket", "Omkar", "Paras", "Prashant", "Sahil", "Sreyashi"]
                                        response = await conn.sendMessage(msg.key.remoteJid, users[Math.floor(Math.random() * 17)].toUpperCase() + " " + cmdContent.trim().toUpperCase(), MessageType.text, { quoted: msg });
                                    }
                                }
                                else {
                                    conn.sendMessage(msg.key.remoteJid, "*#who syntax:*\n\n#who_<Your Question>", MessageType.text, { quoted: msg }).then((res) => {
                                        console.log("Sent who command help message.");
                                    }).catch(msgSendError);
                                }
                                break;

                            case "myself":
                                // console.log("Command content: \"" + cmdContent + "\"");
                                if (cmdContent.trim()) {
                                    const response = await conn.sendMessage(msg.key.remoteJid, "Hello " + cmdContent.trim().toUpperCase() + "! Wassup?", MessageType.text);
                                }
                                else {
                                    conn.sendMessage(msg.key.remoteJid, "*#myself syntax:*\n\n#myself_<Your Name>", MessageType.text, { quoted: msg }).then((res) => {
                                        console.log("Sent myself command help message.");
                                    }).catch(msgSendError);
                                }
                                break;

                            case 'gay':
                                if (cmdContent.trim()) {
                                    var input = cmdContent.trim().toUpperCase();
                                    if (input == "JASKARAN" || input == "JSK") {
                                        const gayPercentage = Math.floor(Math.random() * 11) + 91;
                                        await conn.sendMessage(msg.key.remoteJid, cmdContent.trim().toUpperCase() + " is " + gayPercentage + "% Gay 👬🏻", MessageType.text);

                                    }
                                    else if (input == "ABHINAV" || input == "TKM" || input == "ABHEENAV") {
                                        const gayPercentage = Math.floor(Math.random() * 11);
                                        await conn.sendMessage(msg.key.remoteJid, cmdContent.trim().toUpperCase() + " is " + gayPercentage + "% Gay 👬🏻", MessageType.text);

                                    }
                                    else {
                                        const gayPercentage = Math.floor(Math.random() * 100);
                                        await conn.sendMessage(msg.key.remoteJid, cmdContent.trim().toUpperCase() + " is " + gayPercentage + "% Gay 👬🏻", MessageType.text);
                                    }
                                }
                                else {
                                    conn.sendMessage(msg.key.remoteJid, "*Gay Meter Syntax:*\n\n#gay<space>Name", MessageType.text, { quoted: msg }).then((res) => {
                                        console.log("Sent gay command help message.");
                                    }).catch(msgSendError);
                                }
                                break;
                            case 'devdas':
                                if (cmdContent.trim()) {
                                    var input = cmdContent.trim().toUpperCase();
                                    if (input == "JASKARAN" || input == "JSK") {
                                        const gayPercentage = Math.floor(Math.random() * 11) + 91;
                                        await conn.sendMessage(msg.key.remoteJid, cmdContent.trim().toUpperCase() + " is " + gayPercentage + "% Devdas 🥰", MessageType.text);

                                    }
                                    else if (input == "ABHINAV" || input == "TKM" || input == "ABHEENAV") {
                                        const gayPercentage = Math.floor(Math.random() * 11);
                                        await conn.sendMessage(msg.key.remoteJid, cmdContent.trim().toUpperCase() + " is " + gayPercentage + "% Devdas 🥰", MessageType.text);

                                    }
                                    else {
                                        const gayPercentage = Math.floor(Math.random() * 100);
                                        await conn.sendMessage(msg.key.remoteJid, cmdContent.trim().toUpperCase() + " is " + gayPercentage + "% Devdas 🥰", MessageType.text);
                                    }
                                }
                                else {
                                    conn.sendMessage(msg.key.remoteJid, "*Majnu Meter Syntax:*\n\n#devdas<space>Name", MessageType.text, { quoted: msg }).then((res) => {
                                        console.log("Sent majnu command help message.");
                                    }).catch(msgSendError);
                                }
                                break;
                            case "status":
                                if (cmdContent.trim()) {

                                    let data = cmdContent.trim().toUpperCase();
                                    fs.readFile("./scores/" + data + ".txt", (err, data1) => {
                                        if (err) {

                                            conn.sendMessage(msg.key.remoteJid, "User Does Not Exists! \nTo register yourself, use the *#newuser* command followed by your Username.\nFor more details type *#helpme*", MessageType.text, { quoted: msg }).then((res) => {
                                                console.log("User does not exist.");
                                            }).catch(msgSendError);

                                        }
                                        else {
                                            conn.sendMessage(msg.key.remoteJid, "*Here is your current status:* \n" + data1.toString(), MessageType.text, { quoted: msg }).then((res) => {
                                                console.log("Status Printed.");
                                            }).catch(msgSendError);
                                        }
                                    });
                                }
                                else {
                                    conn.sendMessage(msg.key.remoteJid, "*#status syntax:*\n\n#status_<Your Name>", MessageType.text, { quoted: msg }).then((res) => {
                                        console.log("Sent status command help message.");
                                    }).catch(msgSendError);
                                }
                                break;
                            case "newuser":
                                if (cmdContent.trim()) {

                                    let data = cmdContent.trim().toUpperCase();
                                    fs.readFile("./scores/" + data + ".txt", (err, data1) => {
                                        if (err) {
                                            // Create a file .
                                            fs.writeFile("./scores/" + data + '.txt', "Name: " + data + "\nScore: 0\nLongest Streak: 0\nCurrent Streak: 0", (err) => {

                                                // In case of a error throw err.
                                                if (err) throw err;
                                            })
                                            conn.sendMessage(msg.key.remoteJid, "Hey " + data + "! Your Entry was Successful!", MessageType.text, { quoted: msg }).then((res) => {
                                                console.log("Created new file.");
                                            }).catch(msgSendError);
                                            //const response = await conn.sendMessage(msg.key.remoteJid, "Hey "+data+"! Your Entry was Successful!", MessageType.text);

                                        }
                                        else {
                                            conn.sendMessage(msg.key.remoteJid, "Welcome Back " + data + "! \nYou have already registered!\n\n\n*Here is your current status:* \n" + data1.toString(), MessageType.text, { quoted: msg }).then((res) => {
                                                console.log("Existing User.");
                                            }).catch(msgSendError);

                                            //const response = await conn.sendMessage(msg.key.remoteJid, "Welcome Back "+data+"! \nYou are already registered!", MessageType.text);
                                        }
                                    });
                                }
                                else {
                                    conn.sendMessage(msg.key.remoteJid, "*#newuser syntax:*\n\n#newuser_<Your Name>", MessageType.text, { quoted: msg }).then((res) => {
                                        console.log("Sent newuser command help message.");
                                    }).catch(msgSendError);
                                }
                                break;

                            case "helpme":
                            case "stickerlist":
                            case "xkgstc":
                            case "helpxkg":
                                // WIP

                                fs.readFile("./txt/" + cmd + ".txt", (err, data) => {
                                    if (err) { console.log("error in opening file: " + err); }
                                    else {
                                        conn.sendMessage(msg.key.remoteJid, data.toString(), MessageType.text).then((res) => {
                                            console.log("Sent " + cmd + " commands list.");
                                        }).catch(msgSendError);
                                    }
                                });
                                break;

                            case "meter":
                                if (cmdContent.trim()) {
                                    var find = cmdContent.trim().split(" ")[0].toUpperCase();
                                    var name = (cmdContent.indexOf(" ") < 0) ? "" : cmdContent.substring(cmdContent.indexOf(" ") + 1);
                                    if (name == "" || name == " ") name = "SENDER";
                                    if (name == "JASKARAN" || name == "JSK") {
                                        const percentage = Math.floor(Math.random() * 11) + 91;
                                        await conn.sendMessage(msg.key.remoteJid, name.trim().toUpperCase() + " IS " + percentage + "% " + find + "!", MessageType.text, { quoted: msg });

                                    }
                                    else if (input == "ABHINAV" || input == "TKM" || input == "ABHEENAV") {
                                        const percentage = Math.floor(Math.random() * 11);
                                        await conn.sendMessage(msg.key.remoteJid, name.trim().toUpperCase() + " IS " + percentage + "% " + find + "!", MessageType.text, { quoted: msg });

                                    }
                                    else {
                                        const percentage = Math.floor(Math.random() * 100);
                                        await conn.sendMessage(msg.key.remoteJid, name.trim().toUpperCase() + " IS " + percentage + "% " + find + "!", MessageType.text, { quoted: msg });
                                    }
                                }
                                else {
                                    conn.sendMessage(msg.key.remoteJid, "*Meter Syntax:*\n\n#meter<space>To_Find<space>Name", MessageType.text, { quoted: msg }).then((res) => {
                                        console.log("Sent meter command help message.");
                                    }).catch(msgSendError);
                                }
                                break;

                        }
                    }

                }
                //img to stc
                if (msgType === MessageType.image) {
                    // console.log(msg);
                    let gifTrue = false;
                    if (msg.message.imageMessage.mimetype === Mimetype.gif) {
                        gifTrue = true;
                    }
                    let stickerCommand = "#sticker"
                    if (msg.message.imageMessage.caption.startsWith(stickerCommand)) {
                        console.log("Sticker request received.");
                        conn.downloadMediaMessage(msg, "stream").then((imgStream) => {
                            if (gifTrue) {

                                conn.sendMessage(msg.key.remoteJid, "TKMBot: GIF stickers are still under development.", MessageType.text).then((response) => {
                                    console.log("Animated sticker request declined as WIP");
                                });
                            }
                            else {
                                gm(imgStream).resize(512, 512).background("none").gravity("Center").extent(512, 512).write('sticker.webp', async (err) => {
                                    if (err) { console.log("ERROR1: " + err); }
                                    else {
                                        console.log("Converted sticker");
                                        // const response = await conn.sendMessage(msg.key.remoteJid, fs.readFileSync('./sticker.webp'), MessageType.sticker, {quoted:msg, mimetype:Mimetype.webp});
                                        // console.log("Message sent");
                                        conn.sendMessage(msg.key.remoteJid, fs.readFileSync('./sticker.webp'), MessageType.sticker, { quoted: msg, mimetype: Mimetype.webp }).then((response) => {
                                            console.log("Message sent");
                                            fs.unlink("./sticker.webp", (err) => {
                                                if (err) { console.log("Error in deleting sticker: " + err); }
                                            });
                                        }).catch((err) => {
                                            console.log("Error in sending sticker message: " + err);
                                        });
                                    }
                                });
                            }
                        }).catch((err) => {
                            console.log("ERROR in downloading image: " + err);
                        });
                    }
                }

                // Reply message detector 
                if (msgType === MessageType.extendedText) {
                    let msgText = msg.message.extendedTextMessage.text;
                    if (msgText.startsWith("#")) {
                        // console.log("triggered");
                        const cmd = msgText.split(" ")[0].substring(1).toLowerCase();
                        let cmdContent = msgText.substring(msgText.indexOf(" ") + 1);
                        // console.log(cmd);
                        switch (cmd) {
                            case "hellotkm-bot":
                                console.log("Received greetings from BEWA bhai!");
                                response = await conn.sendMessage(msg.key.remoteJid, "!helloBEWAbot", MessageType.text);
                                console.log("Sent greetings to BEWA bhai!");
                                break;

                            case "sticker":
                                console.log("Received request for converting tagged sticker to image.")
                                let messId = msg.message.extendedTextMessage.contextInfo.stanzaId;
                                conn.loadMessage(msg.key.remoteJid, messId).then((stickerMsg) => {
                                    // console.log(origSticker);
                                    conn.downloadMediaMessage(stickerMsg, "stream").then((imgStream) => {
                                        gm(imgStream).resize(512, 512).background("none").gravity("Center").extent(512, 512).write('sticker.webp', async (err) => {
                                            if (err) { console.log("ERROR in converting to sticker: " + err); }
                                            else {
                                                console.log("Converted sticker");
                                                // const response = await conn.sendMessage(msg.key.remoteJid, fs.readFileSync('./sticker.webp'), MessageType.sticker, {quoted:msg, mimetype:Mimetype.webp});
                                                // console.log("Message sent");
                                                conn.sendMessage(msg.key.remoteJid, fs.readFileSync('./sticker.webp'), MessageType.sticker, { quoted: msg, mimetype: Mimetype.webp }).then((response) => {
                                                    console.log("Message sent");
                                                    fs.unlink("./sticker.webp", (err) => {
                                                        if (err) { console.log("Error in deleting sticker: " + err); }
                                                    });
                                                }).catch((err) => {
                                                    console.log("Error in sending sticker message: " + err);
                                                });
                                            }
                                        });
                                    }).catch((err) => {
                                        console.log("ERROR in downloading sticker: " + err);
                                    });
                                }).catch((err) => {
                                    console.log("ERROR in getting message: " + err);
                                });

                                break;

                            case "sed":
                                console.log("Received sorrow");
                                const replies = ["I respectfully don't care! 🙂", "Looks Like It's F**K This Shit O'Clock 🗿", "Me: Finally I'm Happy.\n\nLife: Lol, wait a sec 🌚", "*Deja Poo*\n\n_adj._ The feeling of having heard this crap before.", ".....On the bright side, You are not addicted to Cocaine 🐸", "Sometimes I look at people and think:\n*Really? That's the sperm that won?* 🙄", "I don't run from my problems. I sit on my sofa, play on my phone and ignore them.\nLike an adult 🤷‍♂️🤷‍♂️", "Paytm ₹100 to me and u'll be fine 🙃"]
                                response = await conn.sendMessage(msg.key.remoteJid, replies[Math.floor(Math.random() * 8)], MessageType.text);
                                break;
                            case 'gay':
                                if (cmdContent.trim()) {
                                    var input = cmdContent.trim().toUpperCase();
                                    if (input == "JASKARAN" || input == "JSK") {
                                        const gayPercentage = Math.floor(Math.random() * 11) + 91;
                                        await conn.sendMessage(msg.key.remoteJid, cmdContent.trim().toUpperCase() + " is " + gayPercentage + "% Gay 👬🏻", MessageType.text);

                                    }
                                    else if (input == "ABHINAV" || input == "TKM" || input == "ABHEENAV") {
                                        const gayPercentage = Math.floor(Math.random() * 11);
                                        await conn.sendMessage(msg.key.remoteJid, cmdContent.trim().toUpperCase() + " is " + gayPercentage + "% Gay 👬🏻", MessageType.text);

                                    }
                                    else {
                                        const gayPercentage = Math.floor(Math.random() * 100);
                                        await conn.sendMessage(msg.key.remoteJid, cmdContent.trim().toUpperCase() + " is " + gayPercentage + "% Gay 👬🏻", MessageType.text);
                                    }
                                }
                                else {
                                    conn.sendMessage(msg.key.remoteJid, "*Gay Meter Syntax:*\n\n#gay<space>Name", MessageType.text, { quoted: msg }).then((res) => {
                                        console.log("Sent gay command help message.");
                                    }).catch(msgSendError);
                                }
                                break;
                            case 'devdas':
                                if (cmdContent.trim()) {
                                    var input = cmdContent.trim().toUpperCase();
                                    if (input == "JASKARAN" || input == "JSK") {
                                        const gayPercentage = Math.floor(Math.random() * 11) + 91;
                                        await conn.sendMessage(msg.key.remoteJid, cmdContent.trim().toUpperCase() + " is " + gayPercentage + "% Devdas 🥰", MessageType.text);

                                    }
                                    else if (input == "ABHINAV" || input == "TKM" || input == "ABHEENAV") {
                                        const gayPercentage = Math.floor(Math.random() * 11);
                                        await conn.sendMessage(msg.key.remoteJid, cmdContent.trim().toUpperCase() + " is " + gayPercentage + "% Devdas 🥰", MessageType.text);

                                    }
                                    else {
                                        const gayPercentage = Math.floor(Math.random() * 100);
                                        await conn.sendMessage(msg.key.remoteJid, cmdContent.trim().toUpperCase() + " is " + gayPercentage + "% Devdas 🥰", MessageType.text);
                                    }
                                }
                                else {
                                    conn.sendMessage(msg.key.remoteJid, "*Majnu Meter Syntax:*\n\n#devdas<space>Name", MessageType.text, { quoted: msg }).then((res) => {
                                        console.log("Sent majnu command help message.");
                                    }).catch(msgSendError);
                                }
                                break;
                            case "hbd":
                                console.log("wished bday");
                                const replies2 = ["Q: Do you by any chance know what constantly goes up, but never ever comes down?\n\n\n\n\n\n\n\n\n\nA: Your ever-growing age!", "Q: What does the average cat love to eat at her birthday party?\n\n\n\n\n\n\n\n\n\nA: Mice cream.", "Q: What do Jesus Christ and Mahatma Gandhi both have in common?\n\n\n\n\n\n\n\n\n\nA: They were both born on public holidays.", "Q: What do people who have the most birthdays have in common?\n\n\n\n\n\n\n\n\n\nA: Old age.", "Q: Why did couples have problems with each other before the 2000s?\n\n\n\n\n\n\n\n\n\nA: Because Facebook reminder didn’t exist at that time to remind them of their partners’ birthdays.", "Q: What do chickens love to eat at their birthday parties?\n\n\n\n\n\n\n\n\n\nA: Coop-cakes!", "Q: Where can you find the best birthday present for your cat?\n\n\n\n\n\n\n\n\n\nA: Inside a cat-alogue!", "Q: What type of cake was served at the birthday party of Penny from the Big Bang Theory?\n\n\n\n\n\n\n\n\n\nA: Cheese cake.", "Q: What gift do you always receive on your birthday?\n\n\n\n\n\n\n\n\n\nA: A brand new age."]
                                if (cmdContent.trim()) {
                                    response = await conn.sendMessage(msg.key.remoteJid, "Happy Birthday " + cmdContent.trim().toUpperCase() + "!!🎂🎂🎊🎉🥳🥳\n\n*Quick Question:*\n\n" + replies2[Math.floor(Math.random() * 9)], MessageType.text);
                                }
                                else {
                                    conn.sendMessage(msg.key.remoteJid, "Happy Birthday!! 🎂🎂🎊🎉🥳🥳\n\n*Quick Question:*\n\n" + replies2[Math.floor(Math.random() * 9)], MessageType.text, { quoted: msg }).then((res) => {
                                        console.log("Sent bday wish without name.");
                                    }).catch(msgSendError);
                                }
                                break;
                            case "bhanda":
                            case "burahua":
                            case "emb":
                            case "facepalm":
                            case "gkm":
                            case "gn":
                            case "haanvro":
                            case "hand":
                            case "hehe":
                            case "hempy":
                            case "hmm":
                            case "isee":
                            case "koini":
                            case "namaste":
                            case "nibbi":
                            case "nibbiforlyf":
                            case "party":
                            case "sabmaloom":
                            case "smug":
                            case "smuggrin":
                            case "srsi":
                            case "sunkarburalaga":
                            case "themks":
                            case "ufff":
                            case "yeah":

                                console.log("sending " + cmd + " sticker.");
                                response = await conn.sendMessage(msg.key.remoteJid, fs.readFileSync("stickers/" + cmd + ".webp"), MessageType.sticker, { quoted: msg, mimetype: Mimetype.webp });
                                break;

                            case "helpme":
                            case "stickerlist":
                            case "xkgstc":
                                // WIP

                                fs.readFile("./txt/" + cmd + ".txt", (err, data) => {
                                    if (err) { console.log("error in opening file: " + err); }
                                    else {
                                        conn.sendMessage(msg.key.remoteJid, data.toString(), MessageType.text).then((res) => {
                                            console.log("Sent " + cmd + " commands list.");
                                        }).catch(msgSendError);
                                    }
                                });
                                break;

                            case "meter":
                                if (cmdContent.trim()) {
                                    var find = cmdContent.trim().split(" ")[0].toUpperCase();
                                    var name = (cmdContent.indexOf(" ") < 0) ? "" : cmdContent.substring(cmdContent.indexOf(" ") + 1);
                                    if (name == "" || name == " ") name = "SENDER";
                                    if (name == "JASKARAN" || name == "JSK") {
                                        const percentage = Math.floor(Math.random() * 11) + 91;
                                        await conn.sendMessage(msg.key.remoteJid, name.trim().toUpperCase() + " IS " + percentage + "% " + find + "!", MessageType.text, { quoted: msg });

                                    }
                                    else if (input == "ABHINAV" || input == "TKM" || input == "ABHEENAV") {
                                        const percentage = Math.floor(Math.random() * 11);
                                        await conn.sendMessage(msg.key.remoteJid, name.trim().toUpperCase() + " IS " + percentage + "% " + find + "!", MessageType.text, { quoted: msg });

                                    }
                                    else {
                                        const percentage = Math.floor(Math.random() * 100);
                                        await conn.sendMessage(msg.key.remoteJid, name.trim().toUpperCase() + " IS " + percentage + "% " + find + "!", MessageType.text, { quoted: msg });
                                    }
                                }
                                else {
                                    conn.sendMessage(msg.key.remoteJid, "*Meter Syntax:*\n\n#meter<space>To_Find<space>Name", MessageType.text, { quoted: msg }).then((res) => {
                                        console.log("Sent meter command help message.");
                                    }).catch(msgSendError);
                                }
                                break;

                            case "who":
                                console.log("answered the who question");

                                if (cmdContent.trim()) {
                                    if (cmdContent.charAt(cmdContent.length - 2) == ' ' && (cmdContent.charAt(cmdContent.length - 1) == 'b' || cmdContent.charAt(cmdContent.length - 1) == 'B' || cmdContent.charAt(cmdContent.length - 1) == 'm' || cmdContent.charAt(cmdContent.length - 1) == 'M')) {
                                        var users = ["Abhinav", "Aryan", "Arjun", "Ayush", "Govind", "Jaskaran", "Saral", "Nachiket", "Omkar", "Paras", "Prashant", "Sahil"]
                                        response = await conn.sendMessage(msg.key.remoteJid, users[Math.floor(Math.random() * 12)].toUpperCase() + " " + cmdContent.trim().toUpperCase().substring(0, cmdContent.length - 1), MessageType.text, { quoted: msg });
                                    }
                                    else if (cmdContent.charAt(cmdContent.length - 2) == ' ' && (cmdContent.charAt(cmdContent.length - 1) == 'g' || cmdContent.charAt(cmdContent.length - 1) == 'G' || cmdContent.charAt(cmdContent.length - 1) == 'f' || cmdContent.charAt(cmdContent.length - 1) == 'F')) {
                                        var users = ["Anushka", "Bhavya", "Riya!", "Subha", "Sreyashi"]
                                        response = await conn.sendMessage(msg.key.remoteJid, users[Math.floor(Math.random() * 5)].toUpperCase() + " " + cmdContent.trim().toUpperCase().substring(0, cmdContent.length - 1), MessageType.text, { quoted: msg });
                                    }
                                    else {
                                        var users = ["Abhinav", "Anushka", "Aryan", "Arjun", "Ayush", "Bhavya", "Govind", "Jaskaran", "Riya!", "Saral", "Subha", "Nachiket", "Omkar", "Paras", "Prashant", "Sahil", "Sreyashi"]
                                        response = await conn.sendMessage(msg.key.remoteJid, users[Math.floor(Math.random() * 17)].toUpperCase() + " " + cmdContent.trim().toUpperCase(), MessageType.text, { quoted: msg });
                                    }
                                }
                                else {
                                    conn.sendMessage(msg.key.remoteJid, "*#who syntax:*\n\n#who_<Your Question>", MessageType.text, { quoted: msg }).then((res) => {
                                        console.log("Sent who command help message.");
                                    }).catch(msgSendError);
                                }
                                break;

                            case "helpme":
                            case "stickerlist":
                            case "xkgstc":
                            case "helpxkg":
                                // WIP

                                fs.readFile("./txt/" + cmd + ".txt", (err, data) => {
                                    if (err) { console.log("error in opening file: " + err); }
                                    else {
                                        conn.sendMessage(msg.key.remoteJid, data.toString(), MessageType.text).then((res) => {
                                            console.log("Sent " + cmd + " commands list.");
                                        }).catch(msgSendError);
                                    }
                                });
                                break;



                        }
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