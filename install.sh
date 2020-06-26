# Check architecture
if [ $(uname -m) != "x86_64" ]
then
    echo "Sorry, bg is currently only supported on x64 systems."
    exit 1
fi

# Get url
case $(uname -s) in
    Linux) url="https://github.com/alleshq/bg/releases/download/1.0.2/allesbg-linux";;
    Darwin) url="https://github.com/alleshq/bg/releases/download/1.0.2/allesbg-macos";;
    *) echo "This install script only works for Linux and macOS"; exit 1
esac

# Check if already installed
if [ -f /usr/bin/allesbg ]
then
    echo "You already have bg installed!"
    exit 1
fi

# Download and run
wget -O /usr/bin/allesbg $url
chmod +x /usr/bin/allesbg
/usr/bin/allesbg &