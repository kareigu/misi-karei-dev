#!/bin/bash

pm2 delete misi.mxrr.dev

pm2 start server.js --name misi.mxrr.dev