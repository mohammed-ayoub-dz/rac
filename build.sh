#!/bin/bash

set -e

echo "1. Entering frontend directory and building React..."
cd frontend
bun run build
cd ..

echo "2. Converting index.html to a C byte array..."
xxd -i frontend/dist/index.html > assets_html.c

sed -i 's/frontend_dist_index_html/assets_index_html/g' assets_html.c

echo "3. Compiling and linking everything into a single executable..."
g++ index.c assets_html.c -O3 --std=c++11 $(pkg-config --cflags --libs gtk+-3.0 webkit2gtk-4.1) -ldl -o my_desktop_app

echo "4. Cleaning up temporary files..."
rm assets_html.c

echo "Build successful! The ready executable file is: ./my_desktop_app"