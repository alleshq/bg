if [ $(uname -i) != "x86_64" ]
then
    echo "Sorry, bg is currently only supported on x64 systems."
    exit 1
fi

case $(uname -s) in
    Linux ) url="https://github.com/alleshq/bg/releases/download/1.0.0/allesbg-linux";;
    Darwin ) url="https://github.com/alleshq/bg/releases/download/1.0.0/allesbg-macos";;
    *) echo "This install script only works for Linux and macOS"; exit 1
esac

if [[ -f "/usr/bin/bg" ]]
then
    echo "You already have bg installed!"
    exit 1
fi

wget -O /usr/bin/bg $url
chmod +x /usr/bin/bg
/usr/bin/bg &