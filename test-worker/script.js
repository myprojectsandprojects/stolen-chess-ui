if(window.Worker) {
	console.log("Web Workers are available");
	const my_worker = new Worker("worker.js");
}else{
	console.error("Web Workers are not available");
}