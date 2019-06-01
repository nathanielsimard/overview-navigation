#!/bin/sh
. script/config

rm -rf ${PACKAGE_NAME}
rm -rf ${BUILD_DIR}
mkdir ${BUILD_DIR}
cp -r src/* ${BUILD_DIR}
node script/import-compatibility.js
cp metadata.json ${BUILD_DIR}
cp stylesheet.css ${BUILD_DIR}
glib-compile-schemas ${BUILD_DIR}/schemas/
