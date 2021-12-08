import telebot from 'telebot';
import dotenv from "dotenv";
import express from "express";

dotenv.config()

const app = express()

const bot = new telebot({
    token: process.env.TOKEN
})

try {

    if (process.env.PROD == "false") {
        bot.on('text', (msg) => {
            if(msg.text === "#getId") {
                console.log(msg.chat.title, msg.chat.id)
            }
        })
    }

    bot.on('photo', (msg) => {
        if(msg.caption === "#meme" && msg.chat.id === +process.env.GRUPO_ID) {
            var file_id = msg.photo.slice(-1)[0].file_id
            var opt = {
                caption: `Enviado por: ${msg.from.first_name}`
            }
            return bot.sendPhoto(process.env.CANAL_ID, file_id, opt)
        }
        console.log("meme enviado")
    })

    var PORT = process.env.PORT || 3000

    
    app.listen(PORT, () => {
        bot.start()
        console.log(`bot corriendo en el puerto ${PORT}`)
    })

} catch (error) {
    console.log(error)
}
