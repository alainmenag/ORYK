#!/bin/bash

if [ -f .env ]; then
  export $(echo $(cat .env | sed 's/#.*//g'| xargs) | envsubst)
fi

# Pull the latest changes
pull_output=$(git pull)

# Check if the output contains "Already up to date."
if echo "$pull_output" | grep -q "Already up to date."; then
    echo "Already up to date. Exiting."
    exit 0
fi

# Check if package.json or package-lock.json has been altered, then run npm install
if git diff --name-only HEAD~1 | grep -q "package.json"; then
    echo "package.json changed, running npm install..."
    npm install
else
    echo "No changes in package.json."
fi

npm run build
pm2 restart $PM2_NAME
