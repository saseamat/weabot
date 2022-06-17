const { getContentType } = require('@adiwajshing/baileys')
const axios = require('axios').default
const ffmpeg = require('fluent-ffmpeg')
const FormData = require('form-data')
const fs = require('fs')
const moment = require('moment-timezone')
const { color, fetchUrl } = require("./lib/function")
global.config = JSON.parse(fs.readFileSync('./config.json'))

module.exports = async (sock, m) => {
    const { type, isGroup, sender, from } = m
    const body = (type == "buttonsResponseMessage") ? m.message[type].selectedButtonId : (type == "listResponseMessage") ? m.message[type].singleSelectReply.selectedRowId : (type == "templateButtonReplyMessage") ? m.message[type].selectedId : m.text 
    
    const senderName = m.pushName
    const senderNumber = sender.split('@')[0]

    const groupMetadata = isGroup ? await sock.groupMetadata(from) : null
    const groupName = groupMetadata?.subject || ''
    const groupMembers = groupMetadata?.participants || []
    const groupAdmins = groupMembers.filter((v) => v.admin).map((v) => v.id)

    //const isCmd = body.startsWith(prefix)
    //var prefix = /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#%^&.©^]/gi)[0] : Function.checkPrefix(prefa, body).prefix ?? "#"
    
    const isCmd = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\\\©^]/.test(body)
    const prefix = isCmd ? body[0] : ''
    
    const isGroupAdmins = groupAdmins.includes(sender)
    const botId = sock.user.id.includes(':') ? sock.user.id.split(':')[0] + '@s.whatsapp.net' : sock.user.id
    const isBotGroupAdmins = groupMetadata && groupAdmins.includes(botId)
    const isOwner = config.owner.includes(sender)

    const command = isCmd ? body.slice(1).trim().split(' ').shift().toLowerCase() : ''
    const quoted = m.quoted ? m.quoted : m
    const mime = (quoted.msg || m.msg).mimetype
    const isMedia = /image|video|sticker|audio/.test(mime)
    const budy = (typeof m.text == "string" ? m.text : "")
    const args = body.trim().split(' ').slice(1)
    const full_args = body.replace(command, '').slice(1).trim()
    const text = query = args.join(" ")    
    const time = moment().tz('Asia/Jakarta').format('HH:mm:ss')

    if (config.options.autoRead) await sock.sendReadReceipt(from, sender, [m.id])
    if (config.options.self && !isOwner && !m.fromMe) return

    if (!isGroup && !isCmd) console.log(color(`[ ${time} ]`, 'white'), color('[ PRIVATE ]', 'yellow'), color(body.slice(0, 50), 'white'), 'from', color(senderNumber, 'yellow'))
    if (isGroup && !isCmd) console.log(color(`[ ${time} ]`, 'white'), color('[  GROUP  ]', 'yellow'), color(body.slice(0, 50), 'white'), 'from', color(senderNumber, 'yellow'), 'in', color(groupName, 'yellow'))
    if (!isGroup && isCmd) console.log(color(`[ ${time} ]`, 'white'), color('[ COMMAND ]', 'yellow'), color(body, 'white'), 'from', color(senderNumber, 'yellow'))
    if (isGroup && isCmd) console.log(color(`[ ${time} ]`, 'white'), color('[ COMMAND ]', 'yellow'), color(body, 'white'), 'from', color(senderNumber, 'yellow'), 'in', color(groupName, 'yellow'))

    switch (command) {

        case 'listkota':
            let fetch = await fetchUrl(global.api("zenz", "/islami/listkota", {}, "apikey"))
            let teks = `List Kota Di seluruh Indonesia\n\n`
            for (let i of fetch.result) {
                teks += `⭔ Provinsi : ${i.provinsi}\n`
                teks += `⭔ Kota : \n${i.kota.join("\n")}\n`
                teks += `\n`
            }
            sock.sendText(m.from, teks, m)
        break
    
        default:
            if (isCmd) {
                m.reply('Command Not Found!')
            }
        break
    }
}