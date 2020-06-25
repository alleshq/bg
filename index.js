const axios = require("axios");
const wallpaper = require("wallpaper");
let url;

const fetchWallpaper = () => axios.get("https://bg.alles.cx/url").then(res => {
    if (url === res.data) return;
    url = res.data;

    axios.get(url, {
        responseType: "arraybuffer"
    }).then(res => {
        console.log(url);
    }).catch(() => {})
}).catch(() => {});

fetchWallpaper();
setInterval(fetchWallpaper, 60000);