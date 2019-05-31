TARGET_LOCATION=~/.local/share/gnome-shell/extensions/overview-navigation@nathanielsimard.github.com
BUILD_DIR=build
PACKAGE_NAME=package.zip


build: clean
	mkdir -p ${BUILD_DIR}
	cp -r src/* ${BUILD_DIR}
	npm install
	node import-compatibility.js
	cp metadata.json ${BUILD_DIR}
	cp stylesheet.css ${BUILD_DIR}
	glib-compile-schemas ${BUILD_DIR}/schemas/


package: build
	cd ${BUILD_DIR}; zip -r ../${PACKAGE_NAME} *
	rm -rf ${BUILD_DIR}


install: package
	rm -rf ${TARGET_LOCATION}
	mkdir ${TARGET_LOCATION}
	cp ${PACKAGE_NAME} ${TARGET_LOCATION}
	cd ${TARGET_LOCATION}; unzip ${PACKAGE_NAME}


clean:
	rm -rf ${PACKAGE_NAME}
	rm -rf ${BUILD_DIR}


uninstall:
	rm -rf ${TARGET_LOCATION}

