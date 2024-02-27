#!/bin/sh

if [[ -f ../dist ]]; then
	rm -rf ../dist
fi

cp -r ./build ../dist
