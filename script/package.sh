#!/bin/sh
. script/config

cd ${BUILD_DIR}; zip -r ../${PACKAGE_NAME} *
rm -rf ${BUILD_DIR}
