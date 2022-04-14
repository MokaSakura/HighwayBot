const mineflayer = require('mineflayer')
const mineflayernavigate = require('mineflayer-navigate')(mineflayer)
const pathfinder = require('mineflayer-pathfinder').pathfinder
const scaffold = require('mineflayer-scaffold')(mineflayer)
const config = require('./config.json')
const fs = require('fs')
var tpsPlugin = require('mineflayer-tps')(mineflayer)
const mineflayerViewer = require('prismarine-viewer').mineflayer
const { info } = require('console')
const Vec3 = require('vec3').Vec3;
const minecraft = require('minecraft-server-util')
const prefix = config.prefix
const inventoryViewer = require('mineflayer-web-inventory')

function HighwayBot() {
    const bot = mineflayer.createBot({
        username: "highwaybot",
        host: `${config.host}`,
        port: config.port,
        version: '1.17.1'
    })

    //Plugins loader
    bot.loadPlugin(pathfinder)
    bot.loadPlugin(tpsPlugin)
    mineflayernavigate(bot)
    scaffold(bot)
    //inventoryViewer(bot, { port: config.invport })
    
    //cmd handler (useless)
    commandfiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));
    let commands = []
    for (const val of commandfiles) {
        commands.push(val.replace('.js', ''))
    }

    bot.on('chat', async (username, message) => {
        if (!message.startsWith(config.prefix)) return
        const args = message.slice(prefix.length).trim().split(/ +/);
        const cmd = args.shift().toLowerCase();

        //execute commands
        try {
            //if(username == `HackerShader`) { //development commands
                const command = require(`./commands/${cmd}.js`)
                command.execute(bot, message, args, username)
            //} else return
        } catch (err) {
            console.log(err)
        }
    })
    bot.on('kicked', kick => {
        console.log(`Bot đã ngắt kết nối bới server. Lý do ${kick}`)
    })
    bot.on('end', (reason) => {
        console.log('Bot đã ngắt kết nối bới server. Lý do ' + reason)
        setTimeout(() => HighwayBot(), 1000)
    })
    bot.on('spawn', () => {
        console.log('Bot spawn !')
        console.log(bot.entity.position.x, bot.entity.position.y, bot.entity.position.z)
       // mineflayerViewer(bot, { port: config.localport, firstPerson: true })
    })
    

    bot.on('windowOpen', async (window) => {
        var pin = config.pin    
        window.requiresConfirmation = false;
        bot.clickWindow(pin[0], 0, 0);
        bot.clickWindow(pin[1], 0, 0);
        bot.clickWindow(pin[2], 0, 0);
        bot.clickWindow(pin[3], 0, 0);
    
        
        setTimeout(() => { bot.chat('/2y2c') }, 5*1000); // Dùng /2y2c sau khi login xong
    
        setTimeout(() => { bot.clickWindow(10,0,0) }, 7*1000);
    })
    
    bot.on('message', msg => { // Log message từ chat game
        console.log(msg.toString());
    });
}

HighwayBot()  
