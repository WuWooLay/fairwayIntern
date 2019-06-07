(function() {
	var detector = new google_myanmar_tools.ZawgyiDetector();
	var arr = [ 'h1', 'div', 'span', 'p', 'h2', 'h3', 'h4', 'h5', 'a' ];

	function mouseUp(parents) {
		var nodeList = document.querySelectorAll(parents);
		Array.from(nodeList).map(function(data) {
			data.addEventListener('mouseup', function() {
				// Declare String
				var getTextObj = '';

				// Get Select Text From Window Object
				getTextObj = window.getSelection ? window.getSelection() : document.selection.createRange();

				// String Parse
				var getTextStr = getTextObj.toString() || '';

				if (getTextStr.trim() !== '' || getTextStr.length !== 0) {
					// Change Zawgyi with Rabbit Converter
					var newTextArr = getTextStr.split(' ').map(function(stringMapText) {
						var arrScore = detector.getZawgyiProbability(stringMapText);
						return arrScore > 0.9 && arrScore < 1.3 ? Rabbit.zg2uni(stringMapText) : stringMapText;
					});

					data.innerHTML = data.innerHTML.replace(getTextStr, newTextArr.join(' '));
				} else {
					console.log('Nothign Get');
				}
			});
		});
	}

	function allLoad() {
		arr.forEach(function(value) {
			mouseUp(value);
		});
	}

	setTimeout(function() {
		allLoad();
	}, 800);
})();
