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
	let link = document.getElementById('s-ui-cc-read-more-link');
	let close = document.getElementById('s-ui-cc-close-btn');
	
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
		close.setAttribute('aria-label', 'Dismiss');
		close.innerHTML = '<span class="fa fa-close" aria-hidden="true"></span><span> Dismiss</span>';
	}
	
	privacyNoticeObserver.disconnect();
}

