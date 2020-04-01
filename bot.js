var Discord = require('discord.js');
var client = new Discord.Client();
var auth = require('./auth.json');
var snekfetch = require('snekfetch');

client.on("ready", () => {
    console.log(`logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {

    if (msg.content.toLowerCase() === 'hello help') {
        msg.channel.send({ embed: {
            color: 3447003,
            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL
            },
            title: 'Help',
            description: 'Help for commands with Hello There Bot.',
            fields: [{
                name: 'hello there',
                value: 'When a user types "hello there" as a message the bot with respond with, "General Kenobi!".'
            },
            {
                name: 'cp battalion [name]',
                value: 'tts copy-pasta about playing battalion. replace [name] with a name. Do not include the [] in the text.'
            }],
            timestamp: new Date(),
            footer: {
                icon_url: client.user.avatarURL,
                text: "© HelloThereBot"
              }
        }});
    }

    if(msg.content.toLowerCase() === 'hello there') {
        msg.channel.send('General Kenobi!');
    }

    let parsed = msg.content.split(' ');

    if (parsed[0].toLowerCase() === 'cp') {
        if (parsed[1].toLowerCase() === 'battalion' && parsed[2] !== null) {
            msg.channel.send(`dear diary today i play battalion 1944 with ${parsed[2]} and he sucked. how do i tell him that i dont want to play with him woithout hurting his feelings?`, {
                tts: true
            });
        }

        if (parsed[1].toLowerCase() === 'ocean' && parsed[2].toLowerCase() === 'man') {
            var message = 'OCEAN MAN 🌊 😍 Take me by the hand ✋ lead me to the land that you understand 🙌\n'+
            '🌊 OCEAN MAN 🌊 😍 The voyage 🚲 to the corner of the 🌎 globe is a real trip 👌 🌊 OCEAN MAN 🌊\n'+
            '😍 The crust of a tan man 👳 imbibed by the sand 👍 Soaking up the 💦 thirst of the land 💯'
            msg.channel.send(message, {
                tts: false
            });
        }

        if (parsed[1].toLowerCase() === 'minecraft' && parsed[2] !== null) {
            msg.channel.send(`dear diary today I played Minecraft with ${parsed[2]} and he got no diamonds. How do I tell him to stop using a wooden pick to mine ore woithout making him feel stupid?`, {
                tts: true
            });
        }
    }

    if (msg.content.toLowerCase() === 'owo') {
        var message = "https://www.youtube.com/watch?v=h6DNdop6pD8";
        msg.channel.send(message, {
            tts: false
        });
    }

    if (msg.content.toLowerCase() === 'vanguard') {
        var message = "https://www.youtube.com/watch?v=s6jqZoztMSM";
        msg.channel.send(message, {
            tts: false
        });
    }

    if (msg.content.toLowerCase() === 'cp fresh') {
        try {
            const { body } = await snekfetch
                .get('https://www.reddit.com/r/copypasta.json?sort=top&t=week')
                .query({ limit: 800 });
            const allowed = msg.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
            if (!allowed.length){
                return msg.channel.send('It seems we are out of fresh pasta!');
            }

            const randomnumber = Math.floor(Math.random() * allowed.length)
            var displayText;
            if (allowed[randomnumber].data.selftext.length > 2000) {
                displayText = allowed[randomnumber].data.selftext.subString(0,2000);
            } else {
                displayText = allowed[randomnumber].data.selftext;
            }

            const embed = new Discord.RichEmbed()
            .setColor(0x00A2E8)
            .setTitle(allowed[randomnumber].data.title)
            .setDescription(displayText)
            .setFooter(`👍${allowed[randomnumber].data.ups} | 💬${allowed[randomnumber].data.num_comments}`)
            msg.channel.send(embed)
        } catch (err) {
            return console.log(err);
        }
    }

    if (msg.content.toLowerCase() === 'surreal') {
        try {
            const { body } = await snekfetch
                .get('https://www.reddit.com/r/surrealmemes.json?sort=top&t=week')
                .query({ limit: 800 });
            const allowed = msg.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);

            if (!allowed.length){
                return msg.channel.send('It seems we are out of enslaved memes!');
            }

            const randomnumber = Math.floor(Math.random() * allowed.length)
            const embed = new Discord.RichEmbed()
            .setColor(0x00A2E8)
            .setTitle(allowed[randomnumber].data.title)
            .setDescription("u/" + allowed[randomnumber].data.author)
            .setImage(allowed[randomnumber].data.url)
            .setFooter(`👍${allowed[randomnumber].data.ups} | 💬${allowed[randomnumber].data.num_comments}`)
            msg.channel.send(embed)
        } catch (err) {
            return console.log(err);
        }
    }
    
});

client.login(auth.token);