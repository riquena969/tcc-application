#!/bin/sh

ionic cordova run android 

cp ./platforms/android/app/build/outputs/apk/debug/app-debug.apk ./app.apk
