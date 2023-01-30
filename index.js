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
    zaa.sendMessage(z.key.remoteJid, { text 'okk'})
   })

}
start()