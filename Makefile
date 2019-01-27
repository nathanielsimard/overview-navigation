TARGET_LOCATION=~/.local/share/gnome-shell/extensions/multi-monitors-overview-navigation@nathanielsimard.github.com

all:
	cat main.js > build/extension.js
	find src/* -exec cat {} + >> build/extension.js

install: all
	mkdir -p ${TARGET_LOCATION}
	cp build/* ${TARGET_LOCATION}
	cp metadata.json ${TARGET_LOCATION}
	cp stylesheet.css ${TARGET_LOCATION}

uninstall:
	rm -rf ${TARGET_LOCATION}


