(function() {
	var nodeList = document.querySelectorAll('div');
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
				var detector = new google_myanmar_tools.ZawgyiDetector();
				var newTextArr = getTextStr.split(' ').map(function(stringMapText) {
					var arrScore = detector.getZawgyiProbability(stringMapText);
					return arrScore > 0.9 && arrScore < 1.3 ? stringMapText : Rabbit.uni2zg(stringMapText);
				});

				data.innerHTML = data.innerHTML.replace(getTextStr, newTextArr.join(' '));
			} else {
				console.log('Nothign Get');
			}
		});
	});
})();
