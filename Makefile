TARGET_LOCATION=~/.local/share/gnome-shell/extensions/overview-navigation@nathanielsimard.github.com

install:
	mkdir -p ${TARGET_LOCATION}
	cp src/* ${TARGET_LOCATION}
	cp metadata.json ${TARGET_LOCATION}
	cp stylesheet.css ${TARGET_LOCATION}

uninstall:
	rm -rf ${TARGET_LOCATION}
