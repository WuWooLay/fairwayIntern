'use strict'

function _instanceof(left, right) {
	if (right != null && typeof Symbol !== 'undefined' && right[Symbol.hasInstance]) {
		return right[Symbol.hasInstance](left)
	} else {
		return left instanceof right
	}
}

function _classCallCheck(instance, Constructor) {
	if (!_instanceof(instance, Constructor)) {
		throw new TypeError('Cannot call a class as a function')
	}
}

function _defineProperties(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i]
		descriptor.enumerable = descriptor.enumerable || false
		descriptor.configurable = true
		if ('value' in descriptor) descriptor.writable = true
		Object.defineProperty(target, descriptor.key, descriptor)
	}
}

function _createClass(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties(Constructor.prototype, protoProps)
	if (staticProps) _defineProperties(Constructor, staticProps)
	return Constructor
}

var DateFormGp =
	/*#__PURE__*/
	(function() {
		function DateFormGp() {
			_classCallCheck(this, DateFormGp)
		}

		_createClass(DateFormGp, [
			{
				key: 'construct',
				value: function construct(divArr) {
					var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
					this.divArr = divArr
					this.option = option
					console.log(option)
					console.log(option)
				}
			},
			{
				key: 'getName',
				value: function getName() {
					console.log(this.option)
					return this.option
				}
			}
		])

		return DateFormGp
	})()
