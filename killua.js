const { getContentType } = require('@adiwajshing/baileys')
const axios = require('axios').default
const ffmpeg = require('fluent-ffmpeg')
const FormData = require('form-data')
const fs = require('fs')
const moment = require('moment-timezone')
const { color, fetchUrl, isUrl } = require("./lib/function")
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
    
    const isCmd = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\\\©^]/.test(body)
    const prefix = isCmd ? body[0] : ''
    
    const isGroupAdmins = groupAdmins.includes(sender)
    const botId = sock.user.id.includes(':') ? sock.user.id.split(':')[0] + '@s.whatsapp.net' : sock.user.id
    const isBotGroupAdmins = groupMetadata && groupAdmins.includes(botId)
    const isOwner = config.owner.includes(sender)

    const command = isCmd ? body.slice(1).trim().split(' ').shift().toLowerCase() : ''
    const quoted = m.quoted ? m.quoted : m
    const mime = (quoted.msg || m.msg).mimetype
    // const isMedia = /image|video|sticker|audio/.test(mime)
    const budy = (typeof m.text == "string" ? m.text : "")
    const args = body.trim().split(' ').slice(1)
    const full_args = body.replace(command, '').slice(1).trim()
    const text = q = args.join(" ")    
    const time = moment().tz('Asia/Jakarta').format('HH:mm:ss')

    if (config.options.autoRead) await sock.sendReadReceipt(from, sender, [m.id])
    if (config.options.self && !isOwner && !m.fromMe) return

    if (!isGroup && !isCmd) console.log(color(`[ ${time} ]`, 'white'), color('[ PRIVATE ]', 'yellow'), color(body.slice(0, 50), 'white'), 'from', color(senderNumber, 'yellow'))
    if (isGroup && !isCmd) console.log(color(`[ ${time} ]`, 'white'), color('[  GROUP  ]', 'yellow'), color(body.slice(0, 50), 'white'), 'from', color(senderNumber, 'yellow'), 'in', color(groupName, 'yellow'))
    if (!isGroup && isCmd) console.log(color(`[ ${time} ]`, 'white'), color('[ COMMAND ]', 'yellow'), color(body, 'white'), 'from', color(senderNumber, 'yellow'))
    if (isGroup && isCmd) console.log(color(`[ ${time} ]`, 'white'), color('[ COMMAND ]', 'yellow'), color(body, 'white'), 'from', color(senderNumber, 'yellow'), 'in', color(groupName, 'yellow'))

    switch (command) {

        // ANIMEWEB COMMNAND
        case 'animeplanet': {
            if (!q) return m.reply(`Example: ${prefix + command} query`)
            let fetch = await fetchUrl(global.api("zenz", "/animeweb/animeplanet", { query: q }, "apikey"))
            let caption = `Animeplanet Search :\n\n`
            for (let i of fetch.result) {
                caption += `⭔ Title : ${i.manga_name}\n`
                caption += `⭔ Link : ${i.manga_url}\n\n`
            }
            sock.sendText(m.from, caption, m)
        }
        break
        
        case 'doujindesu': {
            if (isUrl(text)) {
                if (!q) return m.reply(`Example: ${prefix + command} url`)
                let fetch = await fetchUrl(`https://zenzapis.herokuapp.com/doujin?url=${isUrl(text)[0]}&key=andaracantik`)
                let caption = `Doujindesu Search :\n\n`
                let i = fetch.result
                caption += `⭔ Title : ${i.title}\n`
                caption += `⭔ Date : ${i.date}\n`
                caption += `⭔ Url : ${i.url}\n`
                caption += `⭔ Image Length : ${i.image.length}\n`
                let buttons = [
                    {buttonId: `doujindesupdf ${text}`, buttonText: { displayText: 'Download PDF'}, type: 1 },
                ]
                let buttonMessage = {
                    image: { url: i.image[1] },
                    caption: caption,
                    footer: config.footer,
                    buttons: buttons,
                    headerType: 4
                }
                sock.sendMessage(m.from, buttonMessage, { quoted: m })
            } else if (text) {
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                let fetch = await fetchUrl(global.api("zenz", "/animeweb/doujindesu/search", { query: text }, "apikey"))
                let caption = `Doujindesu Search :\n\n`
                for (let i of fetch.result) {
                    caption += `⭔ Title : ${i.title}\n`
                    caption += `⭔ Score : ${i.score}\n`
                    caption += `⭔ Status : ${i.status}\n`
                    caption += `⭔ Link : ${i.link}\n\n`
                }
                sock.sendText(m.from, caption, m)
            } else {
                let fetch = await fetchUrl(global.api("zenz", "/animeweb/doujindesu/latest", {}, "apikey"))
                let caption = `Doujindesu Latest :\n\n`
                for (let i of fetch.result) {
                    caption += `⭔ Title : ${i.title}\n`
                    caption += `⭔ Score : ${i.score}\n`
                    caption += `⭔ Status : ${i.status}\n`
                    caption += `⭔ Link : ${i.link}\n`
                    caption += `⭔ Last Episode : ${i.last_episode}\n\n`
                }
                sock.sendText(m.from, caption, m)
            }
        }
        break
        
        case 'kiryuu': {
            if (!q) return m.reply(`Example: ${prefix + command} query`)
            let fetch = await fetchUrl(global.api("zenz", "/animeweb/kiryuu", { query: text }, "apikey"))
            let caption = `Kiryuu Search :\n\n`
            for (let i of fetch.result) {
                caption += `⭔ Title : ${i.manga_name}\n`
                caption += `⭔ Episode : ${i.manga_eps}\n`
                caption += `⭔ Rate : ${i.manga_rating}\n`
                caption += `⭔ Link : ${i.manga_url}\n\n`
            }
            sock.sendFile(m.from, fetch.result[0].manga_thumb, "", m, { caption })
        }
        break

        case 'kissmanga': {
            if (!q) return m.reply(`Example: ${prefix + command} query`)
            let fetch = await fetchUrl(global.api("zenz", "/animeweb/kissmanga", { query: text }, "apikey"))
            let caption = `Kissmanga Search :\n\n`
            for (let i of fetch.result) {
                caption += `⭔ Title : ${i.manga_name}\n`
                caption += `⭔ Link : ${i.manga_url}\n\n`
            }
            sock.sendText(m.from, caption, m)
        }
        break

        case 'klikmanga': {
            if (!q) return m.reply(`Example: ${prefix + command} query`)
            let fetch = await fetchUrl(global.api("zenz", "/animeweb/klikmanga", { query: text }, "apikey"))
            let caption = `Klikmanga Search :\n\n`
            for (let i of fetch.result) {
                caption += `⭔ Title : ${i.manga_name}\n`
                caption += `⭔ Episode : ${i.manga_eps}\n`
                caption += `⭔ Author : ${i.manga_author}\n`
                caption += `⭔ Genre : ${i.manga_genre}\n`
                caption += `⭔ Status : ${i.manga_status}\n`
                caption += `⭔ Release : ${i.manga_release}\n`
                caption += `⭔ Desc : ${i.manga_desc}\n`
                caption += `⭔ Link : ${i.manga_url}\n\n`
            }
            sock.sendFile(m.from, fetch.result[0].manga_thumb, "", m, { caption })
        }
        break

        case 'komikstation': {
            if (!q) return m.reply(`Example: ${prefix + command} query`)
            let fetch = await fetchUrl(global.api("zenz", "/animeweb/komikstation", { query: text }, "apikey"))
            let caption = `Komikstation Search :\n\n`
            for (let i of fetch.result) {
                caption += `⭔ Title : ${i.manga_name}\n`
                caption += `⭔ Episode : ${i.manga_eps}\n`
                caption += `⭔ Link : ${i.manga_url}\n\n`
            }
            sock.sendFile(m.from, fetch.result[0].manga_thumb, "", m, { caption })
        }
        break

        case 'mangatoon': {
            if (!q) return m.reply(`Example: ${prefix + command} query`)
            let fetch = await fetchUrl(global.api("zenz", "/animeweb/mangatoon", { query: text }, "apikey"))
            let caption = `Mangatoon Search :\n\n`
            let i = fetch.result
            caption += `⭔ Judul : ${i.judul}\n`
            caption += `⭔ Genre : ${i.genre}\n`
            caption += `⭔ Author : ${i.Author}\n`
            caption += `⭔ Link : ${i.Link}\n`
            sock.sendFile(m.from, i.thumb, "", m, { caption })
        }
        break

        case 'komikstation': {
            if (text.toLowerCase() === "random") {
                let fetch = await fetchUrl(global.api("zenz", "/animeweb/nekopoi/random", {}, "apikey"))
                let caption = `Nekopoi Random :\n\n`
                let i = fetch.result
                caption += `⭔ Title : ${i.title}\n`
                caption += `⭔ Synopsis : ${i.synopsis}\n`
                caption += `⭔ Views : ${i.views}\n`
                caption += `⭔ Japanese : ${i.japanese}\n`
                caption += `⭔ Category : ${i.category}\n`
                caption += `⭔ Episode : ${i.episode}\n`
                caption += `⭔ Status : ${i.status}\n`
                caption += `⭔ Aired : ${i.aired}\n`
                caption += `⭔ Producers : ${i.producers}\n`
                caption += `⭔ Genre : ${i.genre}\n`
                caption += `⭔ Duration : ${i.duration}\n`
                caption += `⭔ Score : ${i.score}\n`
                //sock.sendFile(m.from, fetch.result.img, "", m, { caption }) yg gambarnya kena internet positif
                sock.sendText(m.from, caption, m)
            } else if (text) {
                let fetch = await fetchUrl(global.api("zenz", "/animeweb/nekopoi/search", { query: text }, "apikey"))
                let caption = `Nekopoi Search :\n\n`
                for (let i of fetch.result) {
                    caption += `⭔ Title : ${i.title}\n`
                    caption += `⭔ Link : ${i.link}\n\n`
                }
                //sock.sendFile(m.from, fetch.result[0].img, "", m, { caption }) yg gambarnya kena internet positif
                sock.sendText(m.from, caption, m)
            } else {
                let fetch = await fetchUrl(global.api("zenz", "/animeweb/nekopoi/latest", {}, "apikey"))
                let caption = `Nekopoi Latest :\n\n`
                for (let i of fetch.result) {
                    caption += `⭔ Title : ${i.title}\n`
                    caption += `⭔ Link : ${i.link}\n\n`
                }
                //sock.sendFile(m.from, fetch.result[0].img, "", m, { caption }) yg gambarnya kena internet positif
                sock.sendText(m.from, caption, m)
            }
        }
        break

        case 'nhentai': {
            if (!q) return m.reply(`Example: ${prefix + command} query`)
            let fetch = await fetchUrl(global.api("zenz", "/animeweb/nhentai", { query: text }, "apikey"))
            let caption = `Nhentai Search :\n\n`
            let i = fetch.result
            caption += `⭔ ID : ${i.id}\n`
            caption += `⭔ English Title : ${i.title.english ?? ""}\n`
            caption += `⭔ Japanese Title : ${i.title.japanese ?? ""}\n`
            caption += `⭔ Pretty Title : ${i.title.pretty ?? ""}\n`
            caption += `⭔ Image Length : ${i.image.length}\n`
            let buttons = [
                {buttonId: `nhpdf ${text}`, buttonText: { displayText: 'Download PDF'}, type: 1 },
            ]
            let buttonMessage = {
                image: { url: i.image[0] },
                caption: caption,
                footer: config.footer,
                buttons: buttons,
                headerType: 4
            }
            sock.sendMessage(m.from, buttonMessage, { quoted: m })
        }
        break

        // CONVERT COMMNAND
        case 'sticker': {
            if (!quoted) return  m.reply(`Reply to Supported media With Caption ${prefix + command}`)
            if (/image|video|sticker/.test(mime)) {
                let download = await quoted.download()
                sock.sendFile(m.from, download, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
            } else if (quoted.mentions[0]) {
                let url = await sock.profilePictureUrl(quoted.mentions[0], "image")
                sock.sendFile(m.from, url, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
            } else if (isUrl(text)) {
                if (isUrl(text)) sock.sendFile(m.from, isUrl(text)[0], "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                else m.reply('No Url Match')
            } else {
                return m.reply(`Reply to Supported media With Caption ${prefix + command}`, m.from, { quoted: m })
            }
        }
        break
        
        // CREATOR COMMNAND
        // ENTERTAINMENT COMMNAND
        // GROUP COMMNAND
        // INFORMATION COMMNAND
        // ISLAMI COMMNAND

        case 'listkota': {
            let fetch = await fetchUrl(global.api("zenz", "/islami/listkota", {}, "apikey"))
            let teks = `List Kota Di seluruh Indonesia\n\n`
            for (let i of fetch.result) {
                teks += `⭔ Provinsi : ${i.provinsi}\n`
                teks += `⭔ Kota : \n${i.kota.join("\n")}\n`
                teks += `\n`
            }
            sock.sendText(m.from, teks, m)
        }
        break

        // MORENSFW COMMNAND
        // NEKOSLIFE COMMNAND
        // NEWS COMMNAND
        // OWNER COMMNAND
        // PHOTOEDITOR COMMNAND
        // PRIMBON COMMNAND
        // RANDOMANIME COMMNAND
        // RANDOMASUPAN COMMNAND
        // RANDOMIMAGE COMMNAND
        // RANDOMTEXT COMMNAND
        // SEARCH COMMNAND
        // STALKER COMMNAND
        // TEXTMAKER COMMNAND
        // USERS COMMNAND
        // WEBZONE COMMNAND
    
        // Yang mau nambahin yu boleh banget ^^

        default:
            if (isCmd) {
                m.reply('Command Not Found!')
            }
        break
    }
}