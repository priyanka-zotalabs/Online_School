# Replace $HOME with your current working directory.
# You can get it by executing $pwd in your working directory.
# NOTE: Paste the $pwd path with the spaces in case if there are any
WORKING_DIR="$PWD/backend"
cd "$WORKING_DIR"/microservices/databaseConnector
npm i
npm start
cd "$WORKING_DIR"/microservices/blockchainConnector
npm i
npm start
cd "$WORKING_DIR"
npm i
npm start