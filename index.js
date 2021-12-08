import telebot from 'telebot';
import dotenv from "dotenv";

dotenv.config()

const bot = new telebot(process.env.TOKEN)

/* class Perfil {
    constructor(apodo = "", foto = null, lugar = "", habilidad = "", motivo = "") {
        this.apodo = apodo,
        this.lugar = lugar,
        this.habilidad = habilidad,
        this.motivo = motivo,
        this.foto = foto
    }
    get completed() {
        return this.isCompleted()
    }

    isCompleted() {
        var bool = true
        Object.keys(this).forEach(field => {
            if(["", " ", undefined, null].includes(this[field])) {
                bool = false
            }
        });
        return bool
    }
} */

/* const setTextData = (msg) => {
    console.log(msg)
    var field = msg.text.slice(1).split(" ")[0]
    var value = msg.text.split(" ")[1]

    if(field === "start") return msg.reply.text(`Hola ${msg.from.first_name}`)

    if(!Object.keys(perfil).includes(field)) return msg.reply.text("Comando no encontrado")

    if(["", " ", undefined].includes(value)) return msg.reply.text("Valor no encontrado")

    if(value.length < 3) return msg.reply.text(`El ${field} tiene que tener al menos 3 caracteres`)

    perfil[field] = value

    msg.reply.text(`${field} registrado`)
} */

try {

    //var perfil = new Perfil()
    console.log(process.env.PROD == "false")

    if (process.env.PROD == "false") {
        bot.on('text', (msg) => {
            //console.log(msg)
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
    })

    bot.start()

} catch (error) {
    console.log(error)
}
