const { default: Konek,Browsers, useMultiFileAuthState,fetchLatestBaileysVersion } = require ('@adiwajshing/baileys')
async function start(){
const sesi = 'zidni'
const { state, saveCreds } = await useMultiFileAuthState(sesi)
const { version } = await fetchLatestBaileysVersion()
const zaa = await Konek({browser: Browsers.baileys('Opera'),printQRInTerminal: true,auth: state,version,})
zaa.ev.on('creds.update', saveCreds)
zaa.ev.on('connection.update', async(z) => {
const { connection, qr, lastDisconnect } = z
  if (lastDisconnect == 'undefined' && qr != 'undefined') {
 require('qrcode-terminal').generate(qr, {small: true}, function (qrcode) {
    console.log(qrcode)
})}
if (connection === 'connecting') {
  console.clear()
}
if (connection === 'close'){
start()}
})            
zaa.ev.on('messages.upsert', async(zid) =>{
    if (!zid.messages) return
    const z = zid.messages[0]
    if (!z.key.fromMe) return 
    zaa.sendMessage(z.key.remoteJid, {video: {url:'https://rr5---sn-5hneknes.googlevideo.com/videoplayback?expire=1675091944&ei=iIvXY4XaA4q8x_APuKqdwAc&ip=157.90.242.21&id=o-AGDI6hr1XcV8L6IsijZv124TebN_Bxu6BiNfE2h5a6Es&itag=22&source=youtube&requiressl=yes&mh=1f&mm=31%2C26&mn=sn-5hneknes%2Csn-4g5ednkl&ms=au%2Conr&mv=u&mvi=5&pl=25&vprv=1&mime=video%2Fmp4&ns=GJFKFDqzubrQIta04TqW9ccL&cnr=14&ratebypass=yes&dur=40.054&lmt=1630708198832151&mt=1675069711&fvip=3&fexp=24007246&c=WEB&txp=6311224&n=CbS3Kavc6YxMP4W&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAPRZoGkt5WpBBGP5FNrK3yzeOrW0f_W5mzWvg-c_L-fCAiAjJjfGBl9orXWS6zbeMZpwsLX1bbHFMw7PHOfnUeCw5w%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl&lsig=AG3C_xAwRQIhALElJH_qhA7KqPTJHVWH4bEBQtLljBdRhCQDyFioe7fxAiAmO5_v0p71Iz1lXx8BDyMxLBBP73ssLVG1Gs1bzKHm0w%3D%3D' }})
})

}
start()