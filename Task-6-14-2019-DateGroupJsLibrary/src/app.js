class DateGroupForm {
	constructor(DivArr = [], Option = {}) {
		this.LargeNameMonth = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		]

		this.ShortNameMonth = this.LargeNameMonth.map(v => v.slice(0, 3))

		// Constructor Default Option
		const DefaultOpt = {
			// Month
			monthFormat: 'large',
			monthSelectName: 'Select Month',
			// Year
			minYear: new Date().getFullYear() - 90,
			maxYear: new Date().getFullYear(),

			// Default Update
			defaultDay: 0,
			defaultMonth: 0,
			defaultYear: 0,

			// onChange Option
			onChangeClear: true,
			onChangeGet: false,

			// ClassName
			toggleErrorClass: true,
			toggleErrorClassName: 'error',
			optionClassName: ''
		}

		this.opt = {
			...DefaultOpt,
			...Option
		}

		this.opt['minYear'] = +this.opt['minYear']
		this.opt['maxYear'] = +this.opt['maxYear']

		// Date Group Object Mean Developer Define ['#day', '#month', '#year']
		// is That Element in This Array or Null
		this.dateGroupObj = {
			day: null,
			month: null,
			year: null,
			error: null
		}

		this.day = 0
		this.month = 0
		this.year = 0

		// First Params is Array ["div1", "div2", "div3"]
		// if (!Array.isArray(DivArr)) DivArr = []
		// else if (DivArr.length > 4) throw new Error(`In ${DivArr} \nArray Lenght is MoreThan 3 `)

		// Check Array
		this.isArrayFirstParams(DivArr)
		this.isObjectSecondParams(Option)

		// Set Default Day/Month/Year
		if (0 !== +this.opt.defaultDay && !isNaN(+this.opt.defaultDay)) {
			this.day = +this.opt.defaultDay
			this.dateGroupObj['day'].value = this.day
		}

		if (0 !== +this.opt.defaultMonth && !isNaN(+this.opt.defaultMonth)) {
			this.month = +this.opt.defaultMonth
			this.dateGroupObj['month'].value = this.month
		}

		if (0 !== +this.opt.defaultYear && !isNaN(+this.opt.defaultYear)) {
			this.year = +this.opt.defaultYear
			this.dateGroupObj['year'].value = this.year
		}

		this.getDate = `${this.year}-` + this.setTwoDigitMonth(this.month) + `-${this.day}`
	}

	// Set -----------
	// User Can Set this.setDay('#day').setMonth('#month').setYear('#year')
	setDay(value) {
		return this.setDayElement(this.returnCheckElement(value))
	}
	setMonth(value) {
		return this.setMonthElement(this.returnCheckElement(value))
	}
	setYear(value) {
		return this.setYearElement(this.returnCheckElement(value))
	}
	setError(value) {
		return this.setErrorElement(this.returnCheckElement(value))
	}
	// Option Set ----------
	// User Can Add Option
	option(option = {}) {
		this.opt = {
			...this.opt,
			...option
		}
		// console.log(`this.opt`, this.opt)
		// console.log('option.monthSelectName', option.monthSelectName)
		if (option.monthSelectName) this.setSelectorMonthList()
		return this
	}

	// Set Element ----------
	setDayElement(element) {
		element.maxLength = 2
		element.addEventListener('change', e => this.dayElementOnChange(e))
		element.addEventListener('keyup', e => this.dayElementOnChange(e))

		// console.dir(element)
		this.dateGroupObj['day'] = element
		return this
	}
	setMonthElement(element) {
		this.dateGroupObj['month'] = element
		element.addEventListener('change', e => this.monthElementOnChange(e))
		element.addEventListener('keyup', e => this.monthElementOnChange(e))
		// Set Selector Month To Data Array
		this.setSelectorMonthList()
		return this
	}
	setYearElement(element) {
		element.maxLength = 4
		element.addEventListener('change', e => this.yearElementOnChange(e))
		element.addEventListener('keyup', e => this.yearElementOnChange(e))
		this.dateGroupObj['year'] = element
		return this
	}
	setErrorElement(element) {
		this.dateGroupObj['error'] = element
		return this
	}

	// getDateGp ----------
	getDateGroup() {
		return this.dateGroupObj
	}

	getDay() {
		return this.day
	}

	getMonth() {
		return this.month
	}

	getMonthByName() {
		let month = +this.month
		// console.log('month', month)
		return month === 0
			? this.opt.monthSelectName
			: month > 0 && month < 13
				? this.opt.monthFormat === 'large' ? this.LargeNameMonth[month - 1] : this.ShortNameMonth[month - 1]
				: 'Error'
	}

	getYear() {
		return this.year
	}

	// Change Event ----------
	dayElementOnChange(e) {
		let { value } = e.target
		this.day = +value
		this.onChangeClearDate()
		this.allOnChange()
	}
	monthElementOnChange(e) {
		let { value } = e.target
		this.month = +value
		this.onChangeClearDate()
		this.allOnChange()
	}
	yearElementOnChange(e) {
		let { value } = e.target
		this.year = +value
		this.onChangeClearDate()
		this.allOnChange()
	}
	allOnChange() {
		// console.log('allOnChange')
		this.getDate = `${this.year}-` + this.setTwoDigitMonth(this.month) + `-${this.day}`

		if (this.opt.onChangeGet !== null && typeof this.opt.onChangeGet === 'function') {
			this.opt.onChangeGet({
				day: +this.day,
				month: +this.month,
				year: +this.year,
				getBy(e) {
					return `${this.day}${e}${this.month}${e}${this.year}`
				}
			})
		}
	}

	// Return Element For Given #div or .div , ID or ClassName
	returnCheckElement(v, index = '') {
		if (typeof v === 'string') {
			// Check # or . is the Selector
			if (v[0] !== '#' && v[0] !== '.') throw new Error(`${v} Not Selector`)

			let element =
				v[0] === '#'
					? document.getElementById(v.split('').filter(str => str !== '#').join``)
					: document.querySelector(v)
			if (element === null) throw Error(`Your Index ${index} => ${v} is Not Element \nLwin `)

			return element
		} else {
			if (typeof v === 'object' && v !== null) {
				let length = Object.keys(v).length
				if (length === 0) throw Error(`Your Index ${index} => ${v} is Not Element \nLwin `)
				return v[0]
			} else {
				throw Error(`Your Index ${index} => ${v} is Not Element \nLwin `)
			}
		}
	}

	// Set Selector Month
	setSelectorMonthList() {
		// console.log('Call SetSelector Month List ', this.dateGroupObj['month'])
		let selectBoxes =
			this.opt.monthFormat === 'large'
				? [ this.opt.monthSelectName ].concat(this.LargeNameMonth)
				: [ this.opt.monthSelectName ].concat(this.ShortNameMonth)
		if (this.dateGroupObj['month'] !== null)
			this.dateGroupObj['month'].innerHTML = selectBoxes.map(
				(select, index) => `<option class="${this.opt.optionClassName}" value=${index}>${select}</option>`
			).join``
	}

	// Validation ----------
	validateDay() {
		let value = this.day
		return isNaN(value) || value == '' ? false : value > 0 && value < 32 ? true : false
	}

	validateMonth() {
		let value = this.month
		return isNaN(value) || value == '' ? false : value > 0 && value < 13 ? true : false
	}

	validateYear() {
		let value = this.year
		return isNaN(value) || value == ''
			? false
			: value >= this.opt.minYear && value <= this.opt.maxYear ? true : false
	}

	allValid() {
		return this.validateDay() && this.validateMonth() && this.validateYear()
	}

	isValid() {
		let isValid = false
		if (this.allValid()) {
			if (this.month == 2) {
				let febProb = 28
				if (this.year % 4 == 0) {
					febProb = 29
				}
				return this.day <= febProb
			}

			const thirdayMonth = [ 4, 6, 9, 11 ]
			if (thirdayMonth.indexOf(+this.month) !== -1) {
				// console.log('this.month', this.month)
				return +this.day < 31
			}

			isValid = this.allValid()
		}
		return isValid
	}

	showError() {
		// console.log('Show Error')
		if (this.dateGroupObj['error'] !== null) {
			if (!this.isValid()) {
				let error = `Please Check February and Date`

				const thirdayMonth = [ 4, 6, 9, 11 ]
				if (thirdayMonth.indexOf(+this.month) !== -1) {
					// console.log('this.month', this.month)
					if (+this.day > 30) {
						error = ` Can't 31 in this Month `
					}
				}

				if (!this.validateDay()) {
					error = `Please Enter Valid Day`
				} else if (!this.validateMonth()) {
					error = `Please Enter Valid Month`
				} else if (!this.validateYear()) {
					error = `Please Enter Valid Year`
				}
				this.dateGroupObj['error'].innerHTML = error
			}
		}

		if (this.opt.toggleErrorClass) {
			let addDay = this.dateGroupObj['day']
			let addMonth = this.dateGroupObj['month']
			let addYear = this.dateGroupObj['year']
			addDay !== null && addDay ? addDay.classList.add(this.opt.toggleErrorClassName) : ''
			addMonth !== null && addMonth ? addMonth.classList.add(this.opt.toggleErrorClassName) : ''
			addYear !== null && addYear ? addYear.classList.add(this.opt.toggleErrorClassName) : ''
		}
	}

	clearError() {
		if (this.dateGroupObj['error'] !== null) {
			if (this.validateDay() && this.validateMonth() && this.validateYear()) {
				this.dateGroupObj['error'].innerHTML = ''
				if (this.opt.toggleErrorClass) {
					let addDay = this.dateGroupObj['day']
					let addMonth = this.dateGroupObj['month']
					let addYear = this.dateGroupObj['year']
					let errClass = this.opt.toggleErrorClassName
					addDay.classList.remove(errClass)
					addMonth.classList.remove(errClass)
					addYear.classList.remove(errClass)
				}
			}
		}
	}

	onChangeClearDate() {
		if (this.opt.onChangeClear) {
			if (this.dateGroupObj['error'] !== null) {
				this.clearError()
			}
		}
	}

	// 2dight Set Month
	setTwoDigitMonth(d) {
		return d < 10 ? '0' + d.toString() : d.toString()
	}

	// First Params Is Elements CheckOut
	isArrayFirstParams(DivArr) {
		DivArr.forEach((v, index) => {
			let element = this.returnCheckElement(v, index)
			if (index === 0) this.setDayElement(element)
			if (index === 1) this.setMonthElement(element)
			if (index === 2) this.setYearElement(element)
			if (index === 3) this.setErrorElement(element)
		})
	}
	//Object
	isObjectSecondParams(Option) {
		if (!((typeof Option === 'object' || typeof Option === 'function') && Option !== null))
			throw new Error('Second Param Not Object')
	}
}
