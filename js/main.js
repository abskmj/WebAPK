var isOnline = true;

function checkOnlineStatus(){
	isOnline = navigator.onLine;
	console.log("[*] Connection status has changed to: "+(isOnline?"online":"offline"));
	if (isOnline){
		$("#connection abbr").html("&#128246;");
		$("#connection abbr").attr("title","You are online!");
	}
	else {
		$("#connection abbr").html("&#9888;");
		$("#connection abbr").attr("title","You are offline!");
	}
}

function init(){
	// Register service worker
	if ('serviceWorker' in navigator) {
		console.log("[*] Register serviceWorker ...");
		navigator.serviceWorker.register('/WebAPK/js/serviceWorker.js').then(function(registration) {
			// Registration was successful
			console.log('[*] ServiceWorker registration successful with scope: ', registration.scope);
		}, function(err) {
			// registration failed :(
			console.log('[*] ServiceWorker registration failed: ', err);
		});
	}
	else console.log("[*] ServiceWorker not supported by your browser!");
	
	// Trigger install prompt for WebAPK
	window.addEventListener("beforeinstallprompt",function(event){
		console.log("[*] WebAPK install event fired!");
		showInstallPromotion();
		event.prompt();
	});
	
	// Initialize online/offline detection
	checkOnlineStatus();
	window.addEventListener("online",checkOnlineStatus);
	window.addEventListener("offline",checkOnlineStatus);
}

init();