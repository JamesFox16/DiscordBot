var Discord = require('discord.js');
var client = new Discord.Client();
var auth = require('./auth.json');

client.on("ready", () => {
    console.log(`logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

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
            },
            {
                name: 'cp ninja',
                value: 'Watch out when you talk to ninja.'
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

        if (parsed[1].toLowerCase() === 'ninja') {
            var message = 'THE FUCK YOU SAY TO ME YOU LITTLE SHIT? HA HA HA HA HA HA HOW ARE YOU NOT IN FUCKING SCHOOL? YOU KISS YOUR MOTHER WITH THAT MOUTH?';
            msg.channel.send(message, {
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
    }
    
});

client.login(auth.token);