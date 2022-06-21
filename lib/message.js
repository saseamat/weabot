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
│⭔ caklontong ? -
│⭔ family100 ? -
│⭔ jagokata ? query
│⭔ siapakah ? -
│⭔ simi ? - query
│⭔ susunkata ? -
│⭔ tebakbendera ? -
│⭔ tebakgambar ? -
│⭔ tebakkabupaten ? -
│⭔ tebakkalimat ? -
│⭔ tebakkata ? -
│⭔ tebaklagu ? -
│⭔ tebaklirik ? -
│⭔ tebaktebakan ? -
│⭔ tekateki ? -
│
└───────⭓

┌──⭓ *Information Menu*
│
│⭔ covid ? -
│⭔ gempa ? -
│⭔ iplookup ? query
│⭔ kbbi ? query
│⭔ translate ? query
│⭔ wikipedia ? query
│
└───────⭓

┌──⭓ *Islami Menu*
│
│⭔ audioayat ? query
│⭔ audiosurah ? query
│⭔ jadwalsholat ? query
│⭔ kisahmuslim ? -
│⭔ kisahnabi ? query
│⭔ listkota ? query
│⭔ listsurah ? query
│
└───────⭓

┌──⭓ *Main Menu*
│
│⭔ help ? -
│⭔ ping ? -
│⭔ premiumlist ? -
│
└───────⭓

┌──⭓ *More Nsfw Menu*
│
│⭔ mnsfwimage ? query
│⭔ mnsfwmenu ? -
│
└───────⭓

┌──⭓ *Nekoslife Menu*
│
│⭔ sfwgif ? query
│⭔ sfwimage ? query
│⭔ sfwmenu ? -
│
└───────⭓

┌──⭓ *News Menu*
│
│⭔ antaranews ? -
│⭔ bbcnews ? -
│⭔ cnbcnews ? -
│⭔ dailynews ? -
│⭔ detiknews ? -
│⭔ inews ? -
│⭔ kompasnews ? -
│⭔ kontanews ? -
│⭔ koransindo ? -
│⭔ okezone ? -
│⭔ temponews ? -
│⭔ tribunews ? -
│
└───────⭓

┌──⭓ *Photo Editor Menu*
│
│⭔ blur ? image
│⭔ brighten ? image
│⭔ circle ? image
│⭔ comrade ? image
│⭔ contrast ? image
│⭔ gay ? image
│⭔ glass ? image
│⭔ greyscale ? image
│⭔ invert ? image
│⭔ jail ? image
│⭔ passed ? image
│⭔ pixelate ? image
│⭔ 2x ? image
│⭔ sepia ? image
│⭔ upscale ? image
│⭔ wasted ? image
│
└───────⭓

┌──⭓ *Primbon Menu*
│
│⭔ artimimpi ? query
│⭔ artinama ? query
│⭔ shio ? query
│⭔ zodiak ? query
│⭔ haribaik ? query
│⭔ harilarangan ? query
│⭔ jadian ? query
│⭔ rejekiweton ? query
│
└───────⭓

┌──⭓ *Random Anime Menu*
│
│⭔ randomanime ? query
│⭔ animecouple ? -
│⭔ animemenu ? -
│
└───────⭓

┌──⭓ *Random Asupan Menu*
│
│⭔ randomasupan ? query
│⭔ asupan ? -
│⭔ asupantiktok ? -
│⭔ natajadeh ? -
│⭔ asupanmenu ? -
│
└───────⭓

┌──⭓ *Random Image Menu*
│
│⭔ randomimage ? query
│⭔ imagemenu ? -
│
└───────⭓

┌──⭓ *Search Menu*
│
│⭔ animequotes ? query
│⭔ dafontsearch ? query
│⭔ gimage ? query
│⭔ liriklagu ? query
│⭔ pin ? query
│
└───────⭓


`}