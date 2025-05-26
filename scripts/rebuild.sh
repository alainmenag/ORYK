#!/bin/bash

if [ -f .env ]; then
  export $(echo $(cat .env | sed 's/#.*//g'| xargs) | envsubst)
fi

#rm -rf .next

npm run build

pm2 restart $PM2_NAME
