#!/bin/bash
wget https://zlib.net/zlib-1.2.9.tar.gz
tar -xzf zlib-1.2.9.tar.gz
cd zlib-1.2.9
./configure
make
cp libz.so.1.2.9 ../node_modules/canvas/build/Release/libz.so.X
cd ..
patchelf --replace-needed /lib64/libz.so.1 libz.so.X ./node_modules/canvas/build/Release/libpng16.so.16
