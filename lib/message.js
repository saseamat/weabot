const fs = require('fs')

exports.menu = (username) => {
    return `
┌──⭓ *About Me*
│
│⭔ Nama ? ${username}
│
└───────⭓

┌──⭓ *Animeweb Menu*
│
│⭔ animeplanet ? query
│⭔ doujindesu ? query
│⭔ kiryuu ? query
│⭔ kissmanga ? query
│⭔ klikmanga ? query
│⭔ komikstation ? query
│⭔ mangatoon ? query
│⭔ komikstation ? query
│⭔ nhentai ? query
│
└───────⭓

┌──⭓ *Convert Menu*
│
│⭔ emoji ? query
│⭔ emojimix ? query
│⭔ stickerc ? query
│⭔ sticker ? query
│⭔ stickernobg ? query
│⭔ stickerp ? query
│⭔ takesticker ? query
│⭔ toimg ? query
│⭔ tourl ? query
│⭔ tovideo ? query
│⭔ whatmusic ? query
│
└───────⭓

┌──⭓ *Creator Menu*
│
│⭔ botcomment ? query
│⭔ changemymind ? query
│⭔ kannagen ? query
│⭔ trump ? query
│⭔ stickermeme ? query
│⭔ ytcomment ? query
│⭔ phcomment ? query
│⭔ maketweet ? query
│⭔ captcha ? query
│⭔ waifu2x ? query
│
└───────⭓

┌──⭓ *Downloader Menu*
│
│⭔ cocofun ? url
│⭔ facebook ? url
│⭔ gore ? -
│⭔ hentaivideo ? -
│⭔ instagram ? url
│⭔ instastory ? url
│⭔ joox ? query
│⭔ mediafire ? url
│⭔ pinterest ? url
│⭔ soundcloud ? url
│⭔ tiktok ? url
│⭔ tiktokporn ? -
│⭔ tiktokmp3 ? url
│⭔ tiktokwm ? url
│⭔ twitter ? url
│⭔ xnxx ? url
│⭔ xvideos ? url
│⭔ youtube ? url
│⭔ ytplay ? url
│⭔ zippyshare ? url
│
└───────⭓


┌──⭓ *Entertainment Menu*
│
│⭔ asahotak ? -
│
└───────⭓

┌──⭓ *Islami Menu*
│
│⭔ listkota ? query
│
└───────⭓

┌──⭓ *Main Menu*
│
│⭔ help ? -
│⭔ ping ? -
│
└───────⭓

┌──⭓ *Owner Menu*
│
│⭔ getcase ? query
│
└───────⭓

`}