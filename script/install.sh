#!/bin/sh
. script/config

rm -rf ${TARGET_LOCATION}
mkdir ${TARGET_LOCATION}
cp ${PACKAGE_NAME} ${TARGET_LOCATION}
cd ${TARGET_LOCATION}; unzip ${PACKAGE_NAME}
