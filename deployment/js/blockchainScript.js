var mining_threads = 1;
var pending = 0;
/**
 * This function is to check pending Tx for mining
 * @private
 */
function checkWork() {
	console.log("Current pending pool status: ", txpool.status.pending);
	if (eth.getBlock("pending").transactions.length > 0 || txpool.status.pending > 0) {
		pending = 1;
		if (eth.mining) return;
		console.log("Mining pending transactions...");
		miner.start(mining_threads);
	} else {
		pending = 0;
		console.log("Mining will stop in next 5 second");
		setTimeout(function () {
			if(pending == 0){
				miner.stop();
				console.log("No pending transactions! Stopped mining.");
			}
		}, 6000);
	}
}

eth.filter("latest", function (err, block) { checkWork(); });
eth.filter("pending", function (err, block) { checkWork(); });
checkWork();