TARGET_LOCATION=~/.local/share/gnome-shell/extensions/overview-navigation@nathanielsimard.github.com
BUILD_DIR=build


build: clean
	mkdir -p ${BUILD_DIR}
	cp -r src/* ${BUILD_DIR}
	cp metadata.json ${BUILD_DIR}
	cp stylesheet.css ${BUILD_DIR}
	glib-compile-schemas ${BUILD_DIR}/schemas/


package: build
	zip -rj package.zip ${BUILD_DIR}
	rm -rf ${BUILD_DIR}


install: build
	mkdir -p ${TARGET_LOCATION}
	cp -r ${BUILD_DIR}/* ${TARGET_LOCATION}


clean:
	rm -rf ${BUILD_DIR}


uninstall:
	rm -rf ${TARGET_LOCATION}

