require("./global")
const axios = require('axios').default
const BodyForm = require('form-data')
const { exec, spawn } = require("child_process")
const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
const moment = require('moment-timezone')
const speed = require('performance-now')
const request = require('request')
const { color, fetchUrl, isUrl, getRandom, sleep } = require("./lib/function")
const { menu } = require('./lib/message')
global.config = JSON.parse(fs.readFileSync('./config.json'))
global.db = JSON.parse(fs.readFileSync("./database/db.json"))
if (global.db) global.db = {
    sticker: {},
    database: {},
    chats: {},
    game: {},
    ...(global.db || {})
}

// Entertainment
global.siapakah = db.game.siapakah = {}
global.caklontong = db.game.caklontong = {}
global.family100 = db.game.family100 = {}
global.tebakkalimat = db.game.tebakkalimat = {}
global.tebakkata = db.game.tebakkata = {}
global.asahotak = db.game.asahotak = {}
global.susunkata = db.game.susunkata = {}
global.tebakbendera = db.game.tebakbendera = {}
global.tebakgambar = db.game.tebakgambar = {}
global.tebakkabupaten = db.game.tebakkabupaten = {}
global.tebaklagu = db.game.tebaklagu = {}
global.tekateki = db.game.tekateki = {}
global.tebaklirik = db.game.tebaklirik = {}
global.tebaktebakan = db.game.tebaktebakan = {}

setInterval(() => {
    fs.writeFileSync('./database/db.json', JSON.stringify(global.db, null, 2))
}, 15 * 1000)

module.exports = async (sock, m) => {
    try {
        const { type, isGroup, sender, from } = m
        const body = (type == "buttonsResponseMessage") ? m.message[type].selectedButtonId : (type == "listResponseMessage") ? m.message[type].singleSelectReply.selectedRowId : (type == "templateButtonReplyMessage") ? m.message[type].selectedId : m.text 
        const senderName = m.pushName
        const senderNumber = sender.split('@')[0]
        const groupMetadata = isGroup ? await sock.groupMetadata(from) : null
        const groupName = groupMetadata?.subject || ''
        const groupMembers = groupMetadata?.participants || []
        const groupAdmins = groupMembers.filter((v) => v.admin).map((v) => v.id)
        const isGroupAdmins = groupAdmins.includes(sender)
        const isBotGroupAdmins = groupAdmins.includes(sock.user?.jid)
        const isOwner = [sock.user?.jid, ...config.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(sender)

        global.isPremium = user.checkPremiumUser(m.sender, _user)
        global.isAntidelete = group.cekAntidelete(m.from, _group)
        global.isOffline = group.cekOffline(from, _group)
        global.isAntilink = group.cekAntilink(m.from, _group)

        user.expiredCheck(sock, m, _user)
        user.addUser(m.sender, m.pushName, _user)
        if (isGroup) group.addGroup(m.from)

        const isCmd = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\\\©^]/.test(body) && sock.sendPresenceUpdate('composing', from)
        const prefix = isCmd ? body[0] : ''
        const command = isCmd ? body.slice(1).trim().split(' ').shift().toLowerCase() : ''
        const quoted = m.quoted ? m.quoted : m
        const mime = (quoted.msg || m.msg)
        const isMedia = /image|video|sticker|audio/.test(mime)
        const budy = (typeof m.text == "string" ? m.text : "")
        const args = body.trim().split(' ').slice(1)
        const fargs = body.replace(command, '').slice(1).trim()
        const ar = args.map((v) => v.toLowerCase())
        const text = q = args.join(" ")    
        const time = moment().tz(config.timezone).format('HH:mm:ss')

        if (!isGroup && !isCmd) console.log(color(`[ ${time} ]`, 'white'), color('[ PRIVATE ]', 'yellow'), color(body.slice(0, 50), 'white'), 'from', color(senderNumber, 'yellow'))
        if (isGroup && !isCmd) console.log(color(`[ ${time} ]`, 'white'), color('[  GROUP  ]', 'yellow'), color(body.slice(0, 50), 'white'), 'from', color(senderNumber, 'yellow'), 'in', color(groupName, 'yellow'))
        if (!isGroup && isCmd) console.log(color(`[ ${time} ]`, 'white'), color('[ COMMAND ]', 'yellow'), color(body, 'white'), 'from', color(senderNumber, 'yellow'))
        if (isGroup && isCmd) console.log(color(`[ ${time} ]`, 'white'), color('[ COMMAND ]', 'yellow'), color(body, 'white'), 'from', color(senderNumber, 'yellow'), 'in', color(groupName, 'yellow'))

        if (config.options.self && !isOwner && !m.fromMe) return

        if (asahotak.hasOwnProperty(m.sender.split('@')[0]) && !isCmd) {
            jawaban = asahotak[m.sender.split('@')[0]]
            if (budy.toLowerCase() == jawaban) {
                await sock.sendMessage(m.from, { text:`Selamat Jawaban ${budy} Benar 🎉\n\nIngin bermain lagi? Tekan Tombol Lanjut dibawah\n`, footer:'Entertainment\nPowered By https://zenzapis.xyz', buttons:[{ buttonId: '.asahotak', buttonText:{ displayText:'Lanjut'}, type:1 }], headerType:4 }, { quoted: m })
                delete asahotak[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
        }
        if (caklontong.hasOwnProperty(m.sender.split('@')[0]) && !isCmd) {
            jawaban = caklontong[m.sender.split('@')[0]]
            if (budy.toLowerCase() == jawaban) {
                await killua.sendMessage(m.from, { text:`Selamat Jawaban ${budy} Benar 🎉\n\nIngin bermain lagi? Tekan Tombol Lanjut dibawah\n`, footer:'Entertainment\nPowered By https://zenzapis.xyz', buttons:[{ buttonId: '.caklontong', buttonText:{ displayText:'Lanjut'}, type:1 }], headerType:4 }, { quoted: m })
                delete caklontong[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
        }
        if (family100.hasOwnProperty(m.sender.split('@')[0]) && !isCmd) {
            jawaban = family100[m.sender.split('@')[0]]
            result = Array.from(jawaban).find((v) => v === budy)
            if (budy.toLowerCase() == result) {
                await killua.sendMessage(m.from, { text:`Benar Salah Satu Jawabanya Adalah ${budy} Selamat 🎉\n\nIngin bermain lagi? Tekan Tombol Lanjut dibawah\n`, footer:'Entertainment\nPowered By https://zenzapis.xyz', buttons:[{ buttonId: '.family100', buttonText:{ displayText:'Lanjut'}, type:1 }], headerType:4 }, { quoted: m })
                delete family100[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
        }
        if (siapakah.hasOwnProperty(m.sender.split('@')[0]) && !isCmd) {
            jawaban = siapakah[m.sender.split('@')[0]]
            if (budy.toLowerCase() == jawaban) {
                await killua.sendMessage(m.from, { text:`Selamat Jawaban ${budy} Benar 🎉\n\nIngin bermain lagi? Tekan Tombol Lanjut dibawah\n`, footer:'Entertainment\nPowered By https://zenzapis.xyz', buttons:[{ buttonId: '.siapakah', buttonText:{ displayText:'Lanjut'}, type:1 }], headerType:4 }, { quoted: m })
                delete siapakah[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
        }
        if (susunkata.hasOwnProperty(m.sender.split('@')[0]) && !isCmd) {
            jawaban = susunkata[m.sender.split('@')[0]]
            if (budy.toLowerCase() == jawaban) {
                await killua.sendMessage(m.from, { text:`Selamat Jawaban ${budy} Benar 🎉\n\nIngin bermain lagi? Tekan Tombol Lanjut dibawah\n`, footer:'Entertainment\nPowered By https://zenzapis.xyz', buttons:[{ buttonId: '.susunkata', buttonText:{ displayText:'Lanjut'}, type:1 }], headerType:4 }, { quoted: m })
                delete susunkata[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
        }
        if (tebakbendera.hasOwnProperty(m.sender.split('@')[0]) && !isCmd) {
            jawaban = tebakbendera[m.sender.split('@')[0]]
            if (budy.toLowerCase() == jawaban) {
                await killua.sendMessage(m.from, { text:`Selamat Jawaban ${budy} Benar 🎉\n\nIngin bermain lagi? Tekan Tombol Lanjut dibawah\n`, footer:'Entertainment\nPowered By https://zenzapis.xyz', buttons:[{ buttonId: '.tebakbendera', buttonText:{ displayText:'Lanjut'}, type:1 }], headerType:4 }, { quoted: m })
                delete tebakbendera[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
        }
        if (tebakgambar.hasOwnProperty(m.sender.split('@')[0]) && !isCmd) {
            jawaban = tebakgambar[m.sender.split('@')[0]]
            if (budy.toLowerCase() == jawaban) {
                await killua.sendMessage(m.from, { text:`Selamat Jawaban ${budy} Benar 🎉\n\nIngin bermain lagi? Tekan Tombol Lanjut dibawah\n`, footer:'Entertainment\nPowered By https://zenzapis.xyz', buttons:[{ buttonId: '.tebakgambar', buttonText:{ displayText:'Lanjut'}, type:1 }], headerType:4 }, { quoted: m })
                delete tebakgambar[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
        }
        if (tebakkabupaten.hasOwnProperty(m.sender.split('@')[0]) && !isCmd) {
            jawaban = tebakkabupaten[m.sender.split('@')[0]]
            if (budy.toLowerCase() == jawaban) {
                await killua.sendMessage(m.from, { text:`Selamat Jawaban ${budy} Benar 🎉\n\nIngin bermain lagi? Tekan Tombol Lanjut dibawah\n`, footer:'Entertainment\nPowered By https://zenzapis.xyz', buttons:[{ buttonId: '.tebakkabupaten', buttonText:{ displayText:'Lanjut'}, type:1 }], headerType:4 }, { quoted: m })
                delete tebakkabupaten[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
        }
        if (tebakkalimat.hasOwnProperty(m.sender.split('@')[0]) && !isCmd) {
            jawaban = tebakkalimat[m.sender.split('@')[0]]
            if (budy.toLowerCase() == jawaban) {
                await killua.sendMessage(m.from, { text:`Selamat Jawaban ${budy} Benar 🎉\n\nIngin bermain lagi? Tekan Tombol Lanjut dibawah\n`, footer:'Entertainment\nPowered By https://zenzapis.xyz', buttons:[{ buttonId: '.tebakkalimat', buttonText:{ displayText:'Lanjut'}, type:1 }], headerType:4 }, { quoted: m })
                delete tebakkalimat[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
        }
        if (tebakkata.hasOwnProperty(m.sender.split('@')[0]) && !isCmd) {
            jawaban = tebakkata[m.sender.split('@')[0]]
            if (budy.toLowerCase() == jawaban) {
                await killua.sendMessage(m.from, { text:`Selamat Jawaban ${budy} Benar 🎉\n\nIngin bermain lagi? Tekan Tombol Lanjut dibawah\n`, footer:'Entertainment\nPowered By https://zenzapis.xyz', buttons:[{ buttonId: '.tebakkata', buttonText:{ displayText:'Lanjut'}, type:1 }], headerType:4 }, { quoted: m })
                delete tebakkata[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
        }
        if (tebaklagu.hasOwnProperty(m.sender.split('@')[0]) && !isCmd) {
            jawaban = tebaklagu[m.sender.split('@')[0]]
            if (budy.toLowerCase() == jawaban) {
                await killua.sendMessage(m.from, { text:`Selamat Jawaban ${budy} Benar 🎉\n\nIngin bermain lagi? Tekan Tombol Lanjut dibawah\n`, footer:'Entertainment\nPowered By https://zenzapis.xyz', buttons:[{ buttonId: '.tebaklagu', buttonText:{ displayText:'Lanjut'}, type:1 }], headerType:4 }, { quoted: m })
                delete tebaklagu[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
        }
        if (tekateki.hasOwnProperty(m.sender.split('@')[0]) && !isCmd) {
            jawaban = tekateki[m.sender.split('@')[0]]
            if (budy.toLowerCase() == jawaban) {
                await killua.sendMessage(m.from, { text:`Selamat Jawaban ${budy} Benar 🎉\n\nIngin bermain lagi? Tekan Tombol Lanjut dibawah\n`, footer:'Entertainment\nPowered By https://zenzapis.xyz', buttons:[{ buttonId: '.tekateki', buttonText:{ displayText:'Lanjut'}, type:1 }], headerType:4 }, { quoted: m })
                delete tekateki[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
        }
        if (tebaklirik.hasOwnProperty(m.sender.split('@')[0]) && !isCmd) {
            jawaban = tebaklirik[m.sender.split('@')[0]]
            if (budy.toLowerCase() == jawaban) {
                await killua.sendMessage(m.from, { text:`Selamat Jawaban ${budy} Benar 🎉\n\nIngin bermain lagi? Tekan Tombol Lanjut dibawah\n`, footer:'Entertainment\nPowered By https://zenzapis.xyz', buttons:[{ buttonId: '.tebaklirik', buttonText:{ displayText:'Lanjut'}, type:1 }], headerType:4 }, { quoted: m })
                delete tebaklirik[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
        }
        if (tebaktebakan.hasOwnProperty(m.sender.split('@')[0]) && !isCmd) {
            jawaban = tebaktebakan[m.sender.split('@')[0]]
            if (budy.toLowerCase() == jawaban) {
                await killua.sendMessage(m.from, { text:`Selamat Jawaban ${budy} Benar 🎉\n\nIngin bermain lagi? Tekan Tombol Lanjut dibawah\n`, footer:'Entertainment\nPowered By https://zenzapis.xyz', buttons:[{ buttonId: '.tebaktebakan', buttonText:{ displayText:'Lanjut'}, type:1 }], headerType:4 }, { quoted: m })
                delete tebaktebakan[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
        }

        switch (command) {

            // ANIMEWEB COMMNAND
            case 'animeplanet': {
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/animeweb/animeplanet", { query: q }, "apikey"))
                let caption = `Animeplanet Search :\n\n`
                for (let i of fetch.result) {
                    caption += `⭔ Title : ${i.manga_name}\n`
                    caption += `⭔ Link : ${i.manga_url}\n\n`
                }
                sock.sendText(m.from, caption, m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'doujindesu': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                if (isUrl(text)) {
                    let fetch = await fetchUrl(`https://zenzapis.herokuapp.com/doujin?url=${isUrl(text)[0]}&key=andaracantik`)
                    let caption = `Doujindesu Search :\n\n`
                    let i = fetch.result
                    caption += `⭔ Title : ${i.title}\n`
                    caption += `⭔ Date : ${i.date}\n`
                    caption += `⭔ Url : ${i.url}\n`
                    caption += `⭔ Image Length : ${i.image.length}\n`
                    let buttons = [
                        { buttonId: `${prefix}doujindesupdf ${text}`, buttonText: { displayText: 'Download PDF'}, type: 1 },
                    ]
                    let buttonMessage = {
                        image: { url: i.image[1] },
                        caption: caption,
                        footer: config.footer,
                        buttons: buttons,
                        headerType: 4
                    }
                    sock.sendMessage(m.from, buttonMessage, { quoted: m })
                    user.limitAdd(m.sender, isPremium, isOwner, _user)
                } else if (text) {
                    let fetch = await fetchUrl(global.api("zenz", "/animeweb/doujindesu/search", { query: text }, "apikey"))
                    let caption = `Doujindesu Search :\n\n`
                    for (let i of fetch.result) {
                        caption += `⭔ Title : ${i.title}\n`
                        caption += `⭔ Score : ${i.score}\n`
                        caption += `⭔ Status : ${i.status}\n`
                        caption += `⭔ Link : ${i.link}\n\n`
                    }
                    sock.sendText(m.from, caption, m)
                    user.limitAdd(m.sender, isPremium, isOwner, _user)
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
                    user.limitAdd(m.sender, isPremium, isOwner, _user)
                }
            }
            break
            case 'kiryuu': {
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/animeweb/kiryuu", { query: text }, "apikey"))
                let caption = `Kiryuu Search :\n\n`
                for (let i of fetch.result) {
                    caption += `⭔ Title : ${i.manga_name}\n`
                    caption += `⭔ Episode : ${i.manga_eps}\n`
                    caption += `⭔ Rate : ${i.manga_rating}\n`
                    caption += `⭔ Link : ${i.manga_url}\n\n`
                }
                sock.sendFile(m.from, fetch.result[0].manga_thumb, "", m, { caption })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'kissmanga': {
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/animeweb/kissmanga", { query: text }, "apikey"))
                let caption = `Kissmanga Search :\n\n`
                for (let i of fetch.result) {
                    caption += `⭔ Title : ${i.manga_name}\n`
                    caption += `⭔ Link : ${i.manga_url}\n\n`
                }
                sock.sendText(m.from, caption, m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'klikmanga': {
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
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
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'komikstation': {
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/animeweb/komikstation", { query: text }, "apikey"))
                let caption = `Komikstation Search :\n\n`
                for (let i of fetch.result) {
                    caption += `⭔ Title : ${i.manga_name}\n`
                    caption += `⭔ Episode : ${i.manga_eps}\n`
                    caption += `⭔ Link : ${i.manga_url}\n\n`
                }
                sock.sendFile(m.from, fetch.result[0].manga_thumb, "", m, { caption })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'mangatoon': {
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/animeweb/mangatoon", { query: text }, "apikey"))
                let caption = `Mangatoon Search :\n\n`
                let i = fetch.result
                caption += `⭔ Judul : ${i.judul}\n`
                caption += `⭔ Genre : ${i.genre}\n`
                caption += `⭔ Author : ${i.Author}\n`
                caption += `⭔ Link : ${i.Link}\n`
                sock.sendFile(m.from, i.thumb, "", m, { caption })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'komikstation': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
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
                    user.limitAdd(m.sender, isPremium, isOwner, _user)
                } else if (text) {
                    let fetch = await fetchUrl(global.api("zenz", "/animeweb/nekopoi/search", { query: text }, "apikey"))
                    let caption = `Nekopoi Search :\n\n`
                    for (let i of fetch.result) {
                        caption += `⭔ Title : ${i.title}\n`
                        caption += `⭔ Link : ${i.link}\n\n`
                    }
                    //sock.sendFile(m.from, fetch.result[0].img, "", m, { caption }) yg gambarnya kena internet positif
                    sock.sendText(m.from, caption, m)
                    user.limitAdd(m.sender, isPremium, isOwner, _user)
                } else {
                    let fetch = await fetchUrl(global.api("zenz", "/animeweb/nekopoi/latest", {}, "apikey"))
                    let caption = `Nekopoi Latest :\n\n`
                    for (let i of fetch.result) {
                        caption += `⭔ Title : ${i.title}\n`
                        caption += `⭔ Link : ${i.link}\n\n`
                    }
                    //sock.sendFile(m.from, fetch.result[0].img, "", m, { caption }) yg gambarnya kena internet positif
                    sock.sendText(m.from, caption, m)
                    user.limitAdd(m.sender, isPremium, isOwner, _user)
                }
            }
            break
            case 'nhentai': {
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/animeweb/nhentai", { query: text }, "apikey"))
                let caption = `Nhentai Search :\n\n`
                let i = fetch.result
                caption += `⭔ ID : ${i.id}\n`
                caption += `⭔ English Title : ${i.title.english ?? ""}\n`
                caption += `⭔ Japanese Title : ${i.title.japanese ?? ""}\n`
                caption += `⭔ Pretty Title : ${i.title.pretty ?? ""}\n`
                caption += `⭔ Image Length : ${i.image.length}\n`
                let buttons = [
                    { buttonId: `${prefix}nhpdf ${text}`, buttonText: { displayText: 'Download PDF'}, type: 1 },
                ]
                let buttonMessage = {
                    image: { url: i.image[0] },
                    caption: caption,
                    footer: config.footer,
                    buttons: buttons,
                    headerType: 4
                }
                sock.sendMessage(m.from, buttonMessage, { quoted: m })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break

            // CONVERT COMMNAND
            case 'emoji': {
                if (!q) return m.reply(`List Type :\n\n${emoji_type().sort((a, b) => a - b).join("\n")}\n\nEmoji : ${prefix + command} 🤔\nEmoji 2 : ${prefix + command} 🤔 <type>`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
                let [a, b] = args
                let fetch = await fetchUrl(global.api("zenz", "/creator/emoji", { query: a }, "apikey"))
                if (b) {
                    switch(b.toLowerCase()) {
                        case "apple": 
                            sock.sendFile(m.from, fetch.result.apple, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "google":
                            sock.sendFile(m.from, fetch.result.google, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "samsung":
                            sock.sendFile(m.from, fetch.result.samsung, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "microsoft":
                            sock.sendFile(m.from, fetch.result.microsoft, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "whatsapp":
                            sock.sendFile(m.from, fetch.result.whatsapp, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "twitter":
                            sock.sendFile(m.from, fetch.result.twitter, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "facebook":
                            sock.sendFile(m.from, fetch.result.facebook, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "skype":
                            sock.sendFile(m.from, fetch.result.skype, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "joypixels":
                            sock.sendFile(m.from, fetch.result.joypixels, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "openmoji":
                            sock.sendFile(m.from, fetch.result.openmoji, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "emojidex":
                            sock.sendFile(m.from, fetch.result.emojidex, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "notoemoji":
                            sock.sendFile(m.from, fetch.result.noto_emoji, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "messenger":
                            sock.sendFile(m.from, fetch.result.messenger, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "lg":
                            sock.sendFile(m.from, fetch.result.LG, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "htc":
                            sock.sendFile(m.from, fetch.result.HTC, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "mozilla":
                            sock.sendFile(m.from, fetch.result.mozilla, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "softbank":
                            sock.sendFile(m.from, fetch.result.softbank, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "docomo":
                            sock.sendFile(m.from, fetch.result.docomo, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "kddi":
                            sock.sendFile(m.from, fetch.result.au_by_kddi, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                    }
                } else {
                    sock.sendFile(m.from, fetch.result.google, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                }
                function emoji_type() {
                    return ["apple", "google","samsung", "microsoft", "whatsapp", "twitter", "facebook", "skype", "joypixels", "openmoji", "emojidex", "noto_emoji", "messanger", "lg", "htc", "mozilla", "softbank", "docomo", "kddi"]
                }
            }
            break
            case 'emojimix': {
                if (!q) return m.reply(`Example: \nEmojimix : ${prefix + command} 🤔\nEmojimix 2 : ${prefix + command} 😅🤔`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
                let [a, b] = args.join("")
                if (b) {
                    sock.sendFile(m.from, global.api("zenz", `/creator/emojimix`, {text: a, text2: b}, "apikey"), "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                } else {
                    sock.sendFile(m.from, global.api("zenz", `/creator/emojimix2`, {text: a}, "apikey"), "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                }
            }
            break
            case 'stickerc': case 'scircle': {
                if (!quoted) return  m.reply(`Reply to Supported media With Caption ${prefix + command} or url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
                if (/image/.test(mime)) {
                    let download = await sock.downloadAndSaveMediaMessage(quoted)
                    file_name = getRandom('jpg')
                    request({
                        url: global.api("zenz", "/photoeditor/circle", {}, "apikey"),
                        method: 'POST',
                        formData: {
                            "sampleFile": fs.createReadStream(download)
                        },
                        encoding: "binary"
                    }, async function(error, response, body) {
                        fs.unlinkSync(download)
                        fs.writeFileSync(file_name, body, "binary")
                        ini_buff = fs.readFileSync(file_name)
                        await sock.sendFile(m.from, ini_buff, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] }).then(() => {
                            fs.unlinkSync(file_name)
                        })
                    })
                } else if (isUrl(text)) {
                    sock.sendFile(m.from, global.api("zenz", "/photoeditor/circle", { url: isUrl(text)[0] }, "apikey"), "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                }   else {
                    return m.reply(`Reply to Supported media With Caption ${prefix + command} or url`, m.from, { quoted: m })
                }
            }
            break
            case 'sticker': case 'stiker': case 's': {
                if (!quoted) return  m.reply(`Reply to Supported media With Caption ${prefix + command} or url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
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
                    return m.reply(`Reply to Supported media With Caption ${prefix + command} or url or @tag`, m.from, { quoted: m })
                }
            }
            break
            case 'stickernobg': case 'stickerbg': {
                if (!quoted) return  m.reply(`Reply to Supported media With Caption ${prefix + command} or url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
                if (/image/.test(mime)) {
                    let download = await sock.downloadAndSaveMediaMessage(quoted)
                    file_name = getRandom('jpg')
                    request({
                        url: global.api("zenz", "/convert/sticker-nobg", {}, "apikey"),
                        method: 'POST',
                        formData: {
                            "sampleFile": fs.createReadStream(download)
                        },
                        encoding: "binary"
                    }, async function(error, response, body) {
                        fs.unlinkSync(download)
                        fs.writeFileSync(file_name, body, "binary")
                        ini_buff = fs.readFileSync(file_name)
                        await sock.sendFile(m.from, ini_buff, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] }).then(() => {
                            fs.unlinkSync(file_name)
                        })
                    })
                } else if (isUrl(text)) {
                    sock.sendFile(m.from, global.api("zenz", "/convert/sticker-nobg", { url: isUrl(text)[0] }, "apikey"), "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                }   else {
                    return m.reply(`Reply to Supported media With Caption ${prefix + command} or url`, m.from, { quoted: m })
                }
            }
            break
            case 'stickerp': case 'stickernocrop': {
                if (!quoted) return  m.reply(`Reply to Supported media With Caption ${prefix + command} or url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
                if (/image|video|sticker/.test(mime)) {
                    let download = await sock.downloadAndSaveMediaMessage(quoted)
                    file_name = getRandom('webp')
                    ffmpeg(`./${download}`).input(download).on('end', function () {
                        sock.sendFile(m.from, fs.readFileSync(file_name), "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] }).then(() => {
                            fs.unlinkSync(download)
                            fs.unlinkSync(file_name)
                        })
                    })
                    .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`]).toFormat('webp').save(file_name)
                } else {
                    return m.reply(`Reply to Supported media With Caption ${prefix + command}`, m.from, { quoted: m })
                }
            }
            break
            case 'takesticker': case 'colong': {
                if (!quoted) return  m.reply(`Reply to Supported media With Caption ${prefix + command} or url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
                if (/image|video|sticker/.test(mime)) {
                    anu = args.join(" ").split('|')
                    const packname = anu[0] !== '' ? anu[0] : config.exif.packname
                    const author = anu[1] !== '' ? anu[1] : config.exif.author
                    let download = await quoted.download()
                    sock.sendFile(m.from, download, "", m, { asSticker: true, author: author, packname: packname, categories: ['😄','😊'] })
                } else {
                    return m.reply(`Reply to Supported media With Caption ${prefix + command}`, m.from, { quoted: m })
                }
            }
            break
            case 'toimg': case 'toimage': {
                if (!quoted) return  m.reply(`Reply to Supported media With Caption ${prefix + command}`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
                if (/image|video|sticker/.test(mime)) {
                    let download = await sock.downloadAndSaveMediaMessage(quoted)
                    let ran = getRandom('png')
                    exec(`ffmpeg -i ${download} ${ran}`, (err) => {
                        fs.unlinkSync(download)
                        if (err) return m.reply('Error')
                        buffer = fs.readFileSync(ran)
                        sock.sendFile(m.from, buffer, "", m)
                        fs.unlinkSync(ran)
                    })
                } else {
                    return m.reply(`Reply to Supported media With Caption ${prefix + command}`, m.from, { quoted: m })
                }
            }
            break
            case 'tourl': case 'uploader': {
                if (!quoted) return  m.reply(`Reply to Supported media With Caption ${prefix + command}`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                if (/image|video|sticker/.test(mime)) {
                    let download = await sock.downloadMediaMessage(quoted)
                    const form = new BodyForm()
                    form.append('sampleFile', download, { filename: 'fromBot-' + getRandom('jpg') })
                    if (text) {
                        form.append('comment', text)
                    } else {
                        form.append('comment', "sock BOT")
                    }
                    axios.post(global.api("zenz", "/uploader", {}, "apikey"), form.getBuffer(), { headers: { "content-type": `multipart/form-data; boundary=${form._boundary}`}
                    }).then(({ data }) => {
                        let caption = `Convert Image To Url :\n\n`
                        caption += `⭔ Title : ${data.result.originalname}\n`
                        caption += `⭔ Size : ${data.result.size}\n`
                        caption += `⭔ MimeType : ${data.result.mimetype}\n`
                        caption += `⭔ Comment : ${data.result.comment}\n`
                        caption += `⭔ CreatedOn : ${data.result.createdOn}\n`
                        caption += `⭔ Url : https://zenzapis.xyz/uploader/${data.result.originalname}\n`
                        sock.sendFile(m.from, data.result.url, "", m, { caption })
                        user.limitAdd(m.sender, isPremium, isOwner, _user)
                    })
                } else {
                    return m.reply(`Reply to Supported media With Caption ${prefix + command}`, m.from, { quoted: m })
                }
            }
            break
            case 'tovideo': case 'tomedia': {
                if (!quoted) return  m.reply(`Reply to Supported media With Caption ${prefix + command}`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
                if (/image|video|sticker/.test(mime)) {
                    let download = await sock.downloadMediaMessage(quoted)
                    const form = new BodyForm()
                    form.append('sampleFile', download, { filename: getRandom('webp') })
                    axios.post(global.api("zenz", "/convert/webp-to-mp4", {}, "apikey"), form.getBuffer(), { headers: { "content-type": `multipart/form-data; boundary=${form._boundary}`}
                    }).then(({ data }) => {
                        sock.sendFile(m.from, data.result, "", m, { caption: 'Convert Sticker Gif To Video' })
                    })
                } else if (isUrl(text)) {
                    let fetch = await fetchUrl(global.api("zenz", "/convert/webp-to-mp4", { url: isUrl(text)[0] }, "apikey"))
                    sock.sendFile(m.from, fetch.result, "", m, { caption: 'Convert Sticker Gif To Video' })
                }   else {
                    return m.reply(`Reply to Supported media With Caption ${prefix + command}`, m.from, { quoted: m })
                }
            }
            break
            case 'whatmusic': case 'findmusic': {
                if (!quoted) return  m.reply(`Reply to Supported media With Caption ${prefix + command} or url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
                if (/audio/.test(mime)) {
                    let download = await sock.downloadMediaMessage(quoted)
                    const form = new BodyForm()
                    form.append('sampleFile', download, { filename: getRandom('mp3') })
                    axios.post(global.api("zenz", "/convert/whatmusic", {}, "apikey"), form.getBuffer(), { headers: { "content-type": `multipart/form-data; boundary=${form._boundary}`}
                    }).then(({ data }) => {
                        let caption = `What Music :\n\n`
                        caption += `⭔ Title : ${data.result.title}\n`
                        caption += `⭔ Artist : ${data.result.artist}\n`
                        caption += `⭔ Album : ${data.result.album}\n`
                        caption += `⭔ Genres : ${data.result.genres}\n`
                        caption += `⭔ Release : ${data.result.crereleaseatedOn}\n`
                        sock.sendText(m.from, caption, m)
                    })
                } else if (isUrl(text)) {
                    let fetch = await fetchUrl(global.api("zenz", "/convert/whatmusic", { url: isUrl(text)[0] }, "apikey"))
                    let caption = `What Music :\n\n`
                    let i = fetch.result
                    caption += `⭔ Title : ${i.title}\n`
                    caption += `⭔ Artist : ${i.artist}\n`
                    caption += `⭔ Album : ${i.album}\n`
                    caption += `⭔ Genres : ${i.genres}\n`
                    caption += `⭔ Release : ${i.crereleaseatedOn}\n`
                    sock.sendText(m.from, caption, m)
                } else {
                    return m.reply(`Reply to Supported media With Caption ${prefix + command} or url`, m.from, { quoted: m })
                }
            }
            break
            
            // CREATOR COMMNAND
            case 'botcomment': case 'changemymind': case 'kannagen': case 'trump': {
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
                sock.sendFile(m.from, global.api("zenz", "/creator/" + command, { 
                    text: text 
                }, "apikey"), "", m)
            }
            break
            case 'smeme': case 'stickermeme': {
                if (!quoted) return  m.reply(`Reply to Supported media With Caption ${prefix + command} or url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
                if (!text.includes('|')) return m.reply(`Example : ${prefix + command} Top|Bottom`)
                if (/image/.test(mime)) {
                    let [a, b] = text.split`|`
                    let download = await sock.downloadAndSaveMediaMessage(quoted)
                    file_name = getRandom('jpg')
                    request({
                        url: global.api("zenz", "/creator/smeme", {text: a, text2: b}, "apikey"),
                        method: 'POST',
                        formData: {
                            "sampleFile": fs.createReadStream(download)
                        },
                        encoding: "binary"
                    }, async function(error, response, body) {
                        fs.unlinkSync(download)
                        fs.writeFileSync(file_name, body, "binary")
                        ini_buff = fs.readFileSync(file_name)
                        await sock.sendFile(m.from, ini_buff, "", m).then(() => {
                            fs.unlinkSync(file_name)
                        })
                    })
                } else if (isUrl(text)) {
                    let [a, b, c] = text.split`|`
                    sock.sendFile(m.from, global.api("zenz", "/creator/smeme", {
                        text: a, 
                        text2: b,
                        url: c
                    }, "apikey"), "", m)
                } else {
                    return m.reply(`Reply to Supported media With Caption ${prefix + command} or url`, m.from, { quoted: m })
                }
            }
            break
            case 'ytcomment': case 'phcomment': case 'maketweet':case 'captcha': {
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                sock.sendFile(m.from, global.api("zenz", "/creator/" + command, {
                    url: "https://tse2.mm.bing.net/th?id=OIP.n1C1oxOvYLLyDIavrBFoNQHaHa&pid=Api&P=0&w=153&h=153",
                    text: text, 
                    text2: m.pushName
                }, "apikey"), "", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'waifu2x': {
                if (!quoted) return  m.reply(`Reply to Supported media With Caption ${prefix + command} or url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
                if (/image/.test(mime)) {
                    let download = await sock.downloadAndSaveMediaMessage(quoted)
                    file_name = getRandom('jpg')
                    request({
                        url: global.api("zenz", "/creator/waifu2x", {}, "apikey"),
                        method: 'POST',
                        formData: {
                            "sampleFile": fs.createReadStream(download)
                        },
                        encoding: "binary"
                    }, async function(error, response, body) {
                        fs.unlinkSync(download)
                        fs.writeFileSync(file_name, body, "binary")
                        ini_buff = fs.readFileSync(file_name)
                        await sock.sendFile(m.from, ini_buff, "", m).then(() => {
                            fs.unlinkSync(file_name)
                        })
                    })
                } else if (isUrl(text)) {
                    sock.sendFile(m.from, global.api("zenz", "/creator/waifu2x", { url: isUrl(text)[0] }, "apikey"), "", m)
                }   else {
                    return m.reply(`Reply to Supported media With Caption ${prefix + command} or url`, m.from, { quoted: m })
                }
            }
            break

            // DOWNLOADER COMMNAND
            case 'cocofun': {
                if (!isUrl(text)) return m.reply(`Example: ${prefix + command} url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/cocofun", { url: isUrl(text)[0] }, "apikey"))
                let teks = `⭔ Title : ${fetch.result.title}\n⭔ Desc : ${fetch.result.desc}\n⭔ Like : ${fetch.result.like}\n⭔ Count : ${fetch.result.play_count}\n⭔ Shared : ${fetch.result.shared}\n⭔ Resolution : ${fetch.result.resolution}\n⭔ Duration : ${fetch.result.duration}\n\n`
                sock.sendFile(m.from, fetch.result.url, "", m, { caption: teks })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'dl_': {
                if (!isUrl(text)) return m.reply(`Example: ${prefix + command} url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let [a, b] = args
                if (a.toLowerCase() === "audio") {
                    sock.sendMessage(m.from, { audio: { url: isUrl(b)[0] }, mimetype: "audio/mpeg", fileName: ".mp3" }, { quoted: m })
                    user.limitAdd(m.sender, isPremium, isOwner, _user)
                } else {
                    sock.sendFile(m.from, isUrl(a)[0], "", m)
                    user.limitAdd(m.sender, isPremium, isOwner, _user)
                }
            }
            break
            case 'facebook': case 'fbdl': {
                if (!isUrl(text)) return m.reply(`Example: ${prefix + command} url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/facebook", { url: isUrl(text)[0] }, "apikey"))
                let caption = `*Facebook Downloader*\n\n`
                let i = fetch.result
                caption += `⭔ Title : ${i.title}\n`
                caption += `⭔ Source Url : ${i.url}\n`
                caption += `⭔ Duration : ${i.duration}\n`
                caption += `⭔ Source : ${i.source}\n`
                let buttons = [
                    { buttonId: `${prefix}dl_ ${i.medias[0].url}`, buttonText: { displayText: 'Video SD'}, type: 1 },
                    { buttonId: `${prefix}dl_ ${i.medias[1].url}`, buttonText: { displayText: 'Video HD'}, type: 1 }
                ]
                let buttonMessage = {
                    image: { url: i.thumbnail },
                    caption: caption,
                    footer: config.footer,
                    buttons: buttons,
                    headerType: 4
                }
                sock.sendMessage(m.from, buttonMessage, { quoted: m })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'gore': case 'gorevideo': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/gore", {}, "apikey"))
                let teks = `⭔ Title : ${fetch.result.title}\n⭔ Tag : ${fetch.result.tag}\n⭔ Upload : ${fetch.result.upload}\n⭔ Author : ${fetch.result.author}`
                sock.sendFile(m.from, fetch.result.video1, "", m, { caption: teks })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'hentaivideo': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/hentaivid", {}, "apikey"))
                let teks = `⭔ Title : ${fetch.result.title}\n⭔ Category : ${fetch.result.category}\n⭔ Share : ${fetch.result.share_count}\n⭔ Views : ${fetch.result.views_count}`
                sock.sendFile(m.from, fetch.result.video_1, "", m, { caption: teks })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'instagram': case 'igdl': case 'igtv': case 'igreel': {
                if (!isUrl(text)) return m.reply(`Example: ${prefix + command} url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/instagram", { url:isUrl(text)[0] }, "apikey"))
                for (let url of fetch.result) sock.sendFile(m.from, url, "", m, { caption: `Download Media From : ${isUrl(text)[0]}` })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'instastory': case 'igstory': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                if (!q) return m.reply(`Example: ${prefix + command} url or username`)
                if (isUrl(text)) {
                    let fetch = await fetchUrl(global.api("zenz", "/downloader/instastory", { url:isUrl(text)[0] }, "apikey"))
                    sock.sendFile(m.from, fetch.result.media[0].url, "", m, { caption: `Download Story From : ${isUrl(text)[0]}\n\nType: ${fetch.result.type}` })
                    user.limitAdd(m.sender, isPremium, isOwner, _user)
                } else {
                    let fetch = await fetchUrl(global.api("zenz", "/downloader/igstory", { username: text }, "apikey"))
                    for (let i of fetch.result) sock.sendFile(m.from, i.url, "", m, { caption: `Download Story From : ${text}\n\nType: ${i.type}` })
                    user.limitAdd(m.sender, isPremium, isOwner, _user)
                }
            }
            break
            case 'joox': {
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/joox", { query: text }, "apikey"))
                let teks = `⭔ Title : ${fetch.result.lagu}\n⭔ Album : ${fetch.result.album}\n⭔ Penyanyi : ${fetch.result.penyanyi}\n⭔ Publish : ${fetch.result.publish}`
                let buttons = [
                    { buttonId: `${prefix}dl_ audio ${fetch.result.mp3Link}`, buttonText: { displayText: 'Audio MP3'}, type: 1 },
                    { buttonId: `${prefix}dl_ audio ${fetch.result.mp4aLink}`, buttonText: { displayText: 'Audio MP4A'}, type: 1 }
                ]
                let buttonMessage = {
                    image: { url: fetch.result.img },
                    caption: teks,
                    footer: config.footer,
                    buttons: buttons,
                    headerType: 1
                }
                sock.sendMessage(m.from, buttonMessage, { quoted: m })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'mediafire': {
                if (!isUrl(text)) return m.reply(`Example: ${prefix + command} url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/mediafire", { url: isUrl(text)[0] }, "apikey"))
                sock.sendFile(m.from, fetch.result, "", m)
            }
            break
            case 'pinterest': case 'pinvideo': {
                if (!isUrl(text)) return m.reply(`Example: ${prefix + command} url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/pinterestdl", { url: isUrl(text)[0] }, "apikey"))
                sock.sendFile(m.from, fetch.result, "", m, { caption: `Download Pinterest Video From : ${isUrl(text)[0]}` })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'soundcloud': case 'scdl': {
                if (!isUrl(text)) return m.reply(`Example: ${prefix + command} url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/soundcloud", { url: isUrl(text)[0] }, "apikey"))
                sock.sendFile(m.from, fetch.result.url, "", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'tiktok': {
                if (!isUrl(text)) return m.reply(`Example: ${prefix + command} url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/musically", { url: isUrl(text)[0] }, "apikey"))
                let buttons = [
                    { buttonId: `${prefix}tiktokwm ${text}`, buttonText: {displayText: '► With Watermark'}, type: 1},
                    { buttonId: `${prefix}tiktokmp3 ${text}`, buttonText: {displayText: '♫ Audio'}, type: 1}
                ]
                let buttonMessage = {
                    video: { url: fetch.result.nowm },
                    caption: `Download Tiktok From : ${isUrl(text)[0]}`,
                    footer: config.footer,
                    buttons: buttons,
                    headerType: 5
                }
                sock.sendMessage(m.from, buttonMessage, { quoted: m })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'tiktokporn': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/tikporn", {}, "apikey"))
                let teks = `⭔ Title : ${fetch.result.title}\n⭔ Desc : ${fetch.result.desc}\n⭔ Upload : ${fetch.result.upload}\n⭔ Like : ${fetch.result.like}\n⭔ Dislike : ${fetch.result.dislike}\n⭔ Views : ${fetch.result.views}`
                sock.sendFile(m.from, fetch.result.video, "", m, { caption: teks })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'tiktokmp3': {
                if (!isUrl(text)) return m.reply(`Example: ${prefix + command} url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/musically", { url: isUrl(text)[0] }, "apikey"))
                let buttons = [
                    { buttonId: `${prefix}tiktokwm ${text}`, buttonText: {displayText: '► With Watermark'}, type: 1},
                    { buttonId: `${prefix}tiktoknowm ${text}`, buttonText: {displayText: '► Without Watermark'}, type: 1}
                ]
                let buttonMessage = {
                    video: { url: fetch.result.prefiew },
                    caption: `Download Tiktok From : ${isUrl(text)[0]}`,
                    footer: config.footer,
                    buttons: buttons,
                    headerType: 5
                }
                sock.sendMessage(m.from, buttonMessage, { quoted: m })
                sock.sendFile(m.from, fetch.result.audio, "", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'tiktokwm': {
                if (!isUrl(text)) return m.reply(`Example: ${prefix + command} url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/tiktok", { url: isUrl(text)[0] }, "apikey"))
                let buttons = [
                    { buttonId: `${prefix}tiktoknowm ${text}`, buttonText: {displayText: '► With Watermark'}, type: 1},
                    { buttonId: `${prefix}tiktokmp3 ${text}`, buttonText: {displayText: '♫ Audio'}, type: 1}
                ]
                let buttonMessage = {
                    video: { url: fetch.result.watermark },
                    caption: `Download Tiktok From : ${isUrl(text)[0]}`,
                    footer: config.footer,
                    buttons: buttons,
                    headerType: 5
                }
                sock.sendMessage(m.from, buttonMessage, { quoted: m })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'twitter': {
                if (!isUrl(text)) return m.reply(`Example: ${prefix + command} url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/twitter", { url: isUrl(text)[0] }, "apikey"))
                let caption = `*Twitter Downloader*\n\n`
                let i = fetch.result
                caption += `⭔ Desc : ${i.desc}\n`
                let buttons = [
                    { buttonId: `${prefix}dl_ ${i.sd}`, buttonText: { displayText: 'Video SD'}, type: 1 },
                    { buttonId: `${prefix}dl_ ${i.hd}`, buttonText: { displayText: 'Video HD'}, type: 1 },
                    { buttonId: `${prefix}dl_ audio ${i.audio}`, buttonText: { displayText: 'Audio'}, type: 1 }
                ]
                let buttonMessage = {
                    image: { url: i.thumb },
                    caption: caption,
                    footer: config.footer,
                    buttons: buttons,
                    headerType: 4
                }
                sock.sendMessage(m.from, buttonMessage, { quoted: m })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'twittermp3': {
                if (!isUrl(text)) return m.reply(`Example: ${prefix + command} url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/twitter", { url: isUrl(text)[0] }, "apikey"))
                let buttons = [
                    { buttonId: `${prefix}twitter ${text}`, buttonText: {displayText: '► Video'}, type: 1}
                ]
                let buttonMessage = {
                    video: { url: fetch.result.thumb },
                    caption: `⭔ Desc : ${fetch.result.desc}\n⭔ Source Url : ${isUrl(text)[0]}`,
                    footer: config.footer,
                    buttons: buttons,
                    headerType: 4
                }
                sock.sendMessage(m.from, buttonMessage, { quoted: m })
                sock.sendFile(m.from, fetch.result.audio, "", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'xnxx': case 'xvideos': {
                if (!isUrl(text)) return m.reply(`Example: ${prefix + command} url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/" + command, { url: isUrl(text)[0] }, "apikey"))
                let teks = `⭔ Title : ${fetch.result.title}\n⭔ Duration : ${fetch.result.duration}s`
                sock.sendFile(m.from, fetch.result.files.low, "", m, { caption: teks })
            }
            break
            case 'youtube': case 'ytdl': case 'ytshorts': {
                if (!isUrl(text)) return m.reply(`Example: ${prefix + command} url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/youtube", { url: isUrl(text)[0] }, "apikey"))
                let caption = `*Youtube Downloader*\n\n`
                let i = fetch.result
                caption += `⭔ Title : ${i.title}\n`
                caption += `⭔ Size : ${i.size}\n`
                caption += `⭔ Views : ${i.views}\n`
                caption += `⭔ Likes : ${i.likes}\n`
                caption += `⭔ Dislike : ${i.dislike}\n`
                caption += `⭔ Channel : ${i.channel}\n`
                caption += `⭔ UploadDate : ${i.uploadDate}\n\n`
                caption += `⭔ Desc : ${i.desc}\n`
                let buttons = [
                    { buttonId: `${prefix}dl_ audio ${i.getVideo}`, buttonText: { displayText: 'Get Audio'}, type: 1 },
                    { buttonId: `${prefix}dl_ ${i.getVideo}`, buttonText: { displayText: 'Get Video'}, type: 1 }
                ]
                let buttonMessage = {
                    image: { url: i.thumb },
                    caption: caption,
                    footer: config.footer,
                    buttons: buttons,
                    headerType: 4
                }
                sock.sendMessage(m.from, buttonMessage, { quoted: m })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'ytplay': {
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/ytplay", { query: text }, "apikey"))
                let caption = `*Youtube Play*\n\n`
                let i = fetch.result
                caption += `⭔ Title : ${i.title}\n`
                caption += `⭔ Size : ${i.size}\n`
                caption += `⭔ Views : ${i.views}\n`
                caption += `⭔ Likes : ${i.likes}\n`
                caption += `⭔ Dislike : ${i.dislike}\n`
                caption += `⭔ Channel : ${i.channel}\n`
                caption += `⭔ UploadDate : ${i.uploadDate}\n\n`
                caption += `⭔ Desc : ${i.desc}\n`
                let buttons = [
                    { buttonId: `${prefix}dl_ audio ${i.getVideo}`, buttonText: { displayText: 'Get Audio'}, type: 1 },
                    { buttonId: `${prefix}dl_ ${i.getVideo}`, buttonText: { displayText: 'Get Video'}, type: 1 }
                ]
                let buttonMessage = {
                    image: { url: i.thumb },
                    caption: caption,
                    footer: config.footer,
                    buttons: buttons,
                    headerType: 4
                }
                sock.sendMessage(m.from, buttonMessage, { quoted: m })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'zippyshare': {
                if (!isUrl(text)) return m.reply(`Example: ${prefix + command} url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/zippyshare", { url: isUrl(text)[0] }, "apikey"))
                sock.sendFile(m.from, fetch.result.link, "", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break

            // ENTERTAINMENT COMMNAND
            case 'asahotak': {
                if (asahotak.hasOwnProperty(m.sender.split('@')[0])) return m.reply("Masih Ada Sesi Yang Belum Diselesaikan!")
                let fetch = await fetchUrl(global.api("zenz", "/entertainment/asahotak", {}, "apikey"))
                let result = await fetch.result
                sock.sendText(m.from, `Silahkan Jawab Pertanyaan Berikut\n\n${result.soal}\n\nWaktu : 30s`, m).then(() => {
                    asahotak[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
                    console.log("Jawaban: " + result.jawaban)
                })
                await sleep(30000)
                if (asahotak.hasOwnProperty(m.sender.split('@')[0])) {
                    sock.sendText(m.from, `Waktu Habis\n\nJawaban:  ${asahotak[m.sender.split('@')[0]]}`, m)
                    delete asahotak[m.sender.split('@')[0]]
                }
            }
            break

            // GROUP COMMNAND
            // INFORMATION COMMNAND
            // ISLAMI COMMNAND

            case 'listkota': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/islami/listkota", {}, "apikey"))
                let teks = `List Kota Di seluruh Indonesia\n\n`
                for (let i of fetch.result) {
                    teks += `⭔ Provinsi : ${i.provinsi}\n`
                    teks += `⭔ Kota : \n${i.kota.join("\n")}\n`
                    teks += `\n`
                }
                sock.sendText(m.from, teks, m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break

            // MAIN COMMAND
            case 'help': case 'menu': {
                const help = (menu(senderName))
                sock.sendText(m.from, help, m)
            }
            break
            case 'ping': case 'p': {
                const timestamp = speed();
                const latensi = speed() - timestamp
                exec(`neofetch --stdout`, (error, stdout, stderr) => {
                    const pingnya = `*_Speed: ${latensi.toFixed(4)}s_*`
                    m.reply(pingnya)
                })
            }
            break

            // MORENSFW COMMNAND
            // NEKOSLIFE COMMNAND
            // NEWS COMMNAND
            // OWNER COMMNAND

            case 'getcase': {
                if (!isOwner) return m.reply('Perintah ini hanya dapat digunakan oleh Owner!')
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                try {
                    m.reply("case" + text + fs.readFileSync('./sock.js').toString().split('case \''+ text +'\'')[1].split("break")[0] + "break")
                } catch {
                    m.reply("Case tidak ditemukan")
                }
            }
            break

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
    } catch (e) {
        m.reply(String(e))
        var child = spawn('rs');
        child.on('error', (err) => {
            console.log(color('|ERR|', 'red'), color(err, 'cyan'))
        })
    }
}
