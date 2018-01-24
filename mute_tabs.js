"use strict";

function muteTab(tab) {
	chrome.tabs.update(tab.id, {muted: true});
}

function unmuteTab(tab) {
	chrome.tabs.update(tab.id, {muted: false});
}

function tabUpdated(tabId, changeInfo, tab) {

	const newUrl = changeInfo.url;

	if (!newUrl) {
		return;
	}

	var urlstart1 = newUrl.substr(0, 24);
	var urlstart2 = newUrl.substr(0, 30); // https://www.netflix.com/browse

	if (urlstart1 == 'https://www.netflix.com/') {
		if (urlstart2 == 'https://www.netflix.com/browse') {
			muteTab(tab);
		}
		else {
			unmuteTab(tab);
		}
	}
}

function iconClicked(tab) {
	if (tab.mutedInfo.muted) {
		unmuteTab(tab);
	}
	else {
		muteTab(tab);
	}
}

async function start() {

	chrome.tabs.onUpdated.addListener(tabUpdated);

	chrome.browserAction.onClicked.addListener(iconClicked);
}

start();
