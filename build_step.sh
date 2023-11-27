#!/bin/bash

echo "Build script"

# add the commands here
npm run client-dev
TEST_MONGODB_URI=$TEST_MONGODB_URI PORT=$PORT SECRET=$SECRET npm run start:test
