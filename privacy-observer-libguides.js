/*
MutationObserver for creation of #s-lc-privacy-statement
	button.close aria-label create/set to "close"
	h4.modal-title changed to h1
	div.modal-header add role=header
	div.modal-body add role=main
	div.modal-footer add role=footer
	
MutationObserver for creation of #s-ui-cc-msg-container
	Remove button aria-label and chagne text
*/

const privacyNoticeObserver = new MutationObserver(function(mutations_list) {
	mutations_list.forEach(function(mutation) {
		for(added_node of mutation.addedNodes) {
			if(added_node.nodeType != 1)
				continue;
			if(!added_node.querySelector('#s-ui-cc-msg'))
				continue;
			processPrivacyNotice(added_node);
		}
	});
});

// Start Observer
privacyNoticeObserver.observe(document.body, { subtree: true, childList: true });

function processPrivacyNotice(note) {
	let msg = document.getElementById('s-ui-cc-msg');
	let notice = document.getElementById('s-ui-cc-navbar');
	let link = document.getElementById('s-ui-cc-read-more-link');
	let close = document.getElementById('s-ui-cc-close-btn');
	
	// privacy notice detected, so let's turn on the privacy class.
	document.querySelector('html').classList.add('privacy');
	
	// setup size monitor for scroll padding
	const privacySizeObserver = new ResizeObserver(getPrivacyNoticeHeight);
	privacySizeObserver.observe(notice);
	
	// fix various elements
	if(link && link.nodeName == 'A') {
		link.setAttribute('role', 'button');
		link.setAttribute('ariahaspopup', 'dialog');
		link.addEventListener('keyup', function(evt) {
			console.log(evt);
			if(evt.key == ' ')
				evt.currentTarget.click();
		});
	}
	if(close) {
		close.innerHTML = '<span class="fa fa-close" aria-hidden="true"></span><span class="sr-only"> CLOSE</span>';
		close.addEventListener('click', function(evt) { 
			console.log('close'); 
			document.querySelector('html').classList.remove('privacy');
			privacySizeObserver.disconnect();
		});
	}
	
	// turn off privacyNoticeObserver
	privacyNoticeObserver.disconnect();
}


function getPrivacyNoticeHeight() {
	console.log('height check');
	let notice = document.getElementById('s-ui-cc-navbar');
	let height = notice.offsetHeight;
	document.documentElement.style.setProperty('--privacy-height', `${height}px`);
}
