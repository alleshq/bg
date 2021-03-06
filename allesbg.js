const axios = require("axios");
const wallpaper = require("wallpaper");
const envPaths = require("env-paths");
const paths = envPaths("allesbg", {suffix: ""});
const fs = require("fs");
let url;

// Check Platform
if (!["win32", "linux", "darwin"].includes(process.platform)) {
    console.log("Not supported on this platform");
    process.exit(1);
}

// Get Wallpaper
const fetchWallpaper = () => axios.get("https://bg.alles.cx/url").then(res => {
    if (url === res.data) return;
    url = res.data;
    axios.get(url, {
        responseType: "arraybuffer",
        timeout: 30000
    }).then(res => {
        fs.writeFileSync(paths.data, res.data);
        wallpaper.set(paths.data);
    }).catch(() => {})
}).catch(() => {});

fetchWallpaper();
setInterval(fetchWallpaper, 60000);

// Autostart
const autoLaunch = require("auto-launch");
if (process.pkg) (new autoLaunch({
    name: "allesbg",
    path: process.platform === "windows" ? "C:\\Program Files\\allesbg.exe" : "/usr/local/bin/allesbg"
})).enable();