const axios = require("axios");
const wallpaper = require("wallpaper");
const envPaths = require("env-paths");
const imagePath = envPaths("allesbg", {suffix: ""}).data;
const fs = require("fs");
let url;

if (!["win32", "linux", "darwin"].includes(process.platform)) {
    console.log("Not supported on this platform");
    process.exit(1);
}

const fetchWallpaper = () => axios.get("https://bg.alles.cx/url").then(res => {
    if (url === res.data) return;
    url = res.data;
    axios.get(url, {
        responseType: "arraybuffer",
        timeout: 30000
    }).then(res => {
        fs.writeFileSync(imagePath, res.data);
        wallpaper.set(imagePath);
    }).catch(() => {})
}).catch(() => {});

fetchWallpaper();
setInterval(fetchWallpaper, 60000);

const autoLaunch = require("auto-launch");
if (process.pkg) (new autoLaunch({
    name: "allesbg",
    path: process.platform === "windows" ? "C:\\Program Files\\bg.exe" : "/usr/bin/bg"
})).enable();