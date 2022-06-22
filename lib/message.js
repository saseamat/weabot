const fs = require('fs')

exports.menu = (username, limit, hit, role) => {
    return `
┌──⭓ *About Me*
│
│⭔ Name ? ${username}
│⭔ Limit ? ${limit}
│⭔ Limit Game ? ${hit}
│⭔ Role ? ${role}
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
│⭔ nekopoi ? -
│⭔ nhentai ? -
│⭔ sauce ? -
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
│⭔ attp ? query
│⭔ botcomment ? query
│⭔ captcha ? query
│⭔ changemymind ? query
│⭔ hartatahta ? query
│⭔ tahtacustom ? query
│⭔ kannagen ? query
│⭔ nuliskanan ? query
│⭔ nuliskiri ? query
│⭔ phcomment ? query
│⭔ smeme ? query
│⭔ trump ? query
│⭔ ttp ? query
│⭔ ttpcustom ? query
│⭔ maketweet ? query
│⭔ waifu2x ? query
│⭔ ytcomment ? query
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
│⭔ truth ? -
│⭔ dare ? -
│
└───────⭓

┌──⭓ *Group Menu*
│
│⭔ leveling -
│
└───────⭓

┌──⭓ *Information Menu*
│
│⭔ covid ? -
│⭔ gempa ? -
│⭔ iplookup ? query
│⭔ kbbi ? query
│⭔ mpl ? -
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
│⭔ triggered ? image
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
│⭔ nomorhoki ? query
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
│⭔ aeunicetjoaa ? -
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

┌──⭓ *Random Text Menu*
│
│⭔ animequote ? query
│⭔ cerpen ? -
│⭔ cersex ? -
│⭔ randomtext ? -
│⭔ textmenu ? -
│
└───────⭓

┌──⭓ *Search Menu*
│
│⭔ animequotes ? query
│⭔ bacaresep ? query
│⭔ dafont ? query
│⭔ gimage ? query
│⭔ jadwaltv ? query
│⭔ liriklagu ? query
│⭔ pin ? query
│⭔ pixiv ? query
│⭔ sfilesearch ? query
│⭔ stickersearch ? query
│⭔ styletext ? query
│⭔ trending ? query
│⭔ wagroup ? query
│⭔ wamod ? query
│⭔ xnxxsearch ? query
│⭔ xvideosearch ? query
│⭔ ytsearch ? query
│
└───────⭓

┌──⭓ *Stalker Menu*
│
│⭔ cekapi ? query
│⭔ stalkig ? username
│
│⭔ nickaov ? query
│⭔ nickautochess ? query
│⭔ nickbigolive ? query
│⭔ nickcocofun ? query
│⭔ nickcod ? query
│⭔ nickdomino ? query
│⭔ nickdragonraja ? query
│⭔ nicksdriver ? query
│⭔ nickff ? query
│⭔ nickhago ? query
│⭔ nicklokapala ? query
│⭔ nicknimotv ? query
│⭔ nickpb ? query
│⭔ nickpubg ? query
│⭔ nicksausage ? query
│⭔ nickzepeto ? query
│⭔ nickml ? query
│⭔ nickkmladventure ? query
│
└───────⭓

┌──⭓ *Users Menu*
│
│⭔ ceklimit ? -
│⭔ cekpremium ? -
│⭔ profile ? -
│⭔ afk ? reason
│⭔ del ? quoted
│
└───────⭓

┌──⭓ *Webzone Menu*
│
│⭔ amino ? query
│⭔ drakor ? query
│⭔ gsmarena ? query
│⭔ jadwalbioskop ? query
│⭔ nowplaying ? -
│⭔ playstore ? query
│⭔ wattpad ? query
│⭔ webtoons ? query
│
└───────⭓

`}