(function(){

	var DatePicker = function(config) {
		this.config = config || {};
		this.data = [];
		this.date = config.getDate();
		this.year = config.getYear();
		this.month = config.getMonth();
		this.day = config.getDay();
		this.preMonth = null;
		this.nextMonth = null; 

		this.init();
	}

	DatePicker.prototype.init = function() {
		this.initData();
		this.initEle();
		this.initEvents();
	}

	DatePicker.prototype.initData = function() {
		var firstDay = 1, 
			firstDayInMonth = new Date(this.year, this.month, firstDay).getDay();

		if(firstDayInMonth === 1) {
			firstDay = firstDay - 8;
		}

		// Get first day on datepicker
		while(firstDayInMonth != 1) {
			firstDayInMonth = new Date(this.year, this.month, firstDay--).getDay();
		}

		// Retrieve all days for the starting month on the datepicker
		for(var dayCount = 0; dayCount < 42; dayCount++) {
			this.data.push(new Date(this.year, this.month, firstDay + 1).getDate());
			firstDay++;
		}
	}

	DatePicker.prototype.initEle = function(data) {
		var datePicker = document.createElement('div'),
			month = getMonthHeader(this.month, this.year),
			weekdays = getDaysRow(),
			dates = getDates(this.data, this.date);

		// Set datepicker attributes
		datePicker.setAttribute('id','date-picker');

		datePicker.appendChild(month);
		datePicker.appendChild(weekdays);
		datePicker.appendChild(dates);
		document.body.appendChild(datePicker);

		// Set DatePicker class properties
		this.preMonth = document.querySelector('.date-picker_preMonth');
		this.nextMonth = document.querySelector('.date-picker_nextMonth');
	}

	DatePicker.prototype.initEvents = function() {
		this.preMonth.addEventListener('click', this.onClickPre.bind(this));
		this.nextMonth.addEventListener('click', this.onClickNext.bind(this));
	}

	DatePicker.prototype.onClickPre = function() {
		this.month = this.month === 0 ? 11 : this.month - 1,
		this.year = this.month === 0 ? this.year - 1 : this.year
		this.refreshData();
	}

	DatePicker.prototype.onClickNext = function() {
		this.month = this.month === 11 ? 0 : this.month + 1,
		this.year = this.month === 11 ? this.year + 1 : this.year
		this.refreshData();
	}

	DatePicker.prototype.refreshData = function() {
		var monthText = document.querySelector('.date-picker_monthText'),
			date = document.querySelectorAll('.date'),
			firstDay = 1, 
			firstDayInMonth = new Date(this.year, this.month, firstDay).getDay();

		var month = getMonthName(this.month);
		monthText.innerHTML = month + ' ' + this.year;

		if(firstDayInMonth === 1) {
			firstDay = firstDay - 8;
		}

		while(firstDayInMonth != 1) {
			firstDayInMonth = new Date(this.year, this.month, firstDay--).getDay();
		}

		for(var dayCount = 0; dayCount < 42; dayCount++) {
			date[dayCount].innerHTML = (new Date(this.year, this.month, firstDay + 1).getDate());
			firstDay++;
		}
	}

	var datePicker = new DatePicker({
		setYearMonth: {
			year: 2017,
			month: 4
		},
		getFullDate: function(year, month) {
			return new Date(this.setYearMonth.year, this.setYearMonth.month);
		},
		getDate: function() {
			return this.getFullDate().getDate();
		},
		getYear: function() {
			return this.getFullDate().getFullYear();
		},
		getMonth: function() {
			return this.getFullDate().getMonth();
		},
		getDay: function() {
			return this.getFullDate().getDay();
		}
	});

	function getDaysRow() {
		var days = document.createElement('div'),
			html = '',
			daysArr = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

		days.setAttribute('class','date-picker_days');

		for(var day = 0; day < 7; day++) {
			html += '<div class="day">' + daysArr[day] + '</div>'; 
		}

		days.innerHTML = html;
		return days;
	}

	function getMonthHeader(month, year) {
		var monthHeader = document.createElement('div'),
			monthText = document.createElement('div'),
			preMonth = document.createElement('div'),
			nextMonth = document.createElement('div');

		monthHeader.setAttribute('class','date-picker_month');
		monthText.setAttribute('class','date-picker_monthText');
		preMonth.setAttribute('class', 'date-picker_preMonth');
		nextMonth.setAttribute('class', 'date-picker_nextMonth');
		
		var month = getMonthName(month);
		monthText.innerHTML = month + ' ' + year;
		preMonth.innerHTML = '<span><</span>';
		nextMonth.innerHTML = '<span>></span>';

		monthHeader.appendChild(preMonth);
		monthHeader.appendChild(monthText);
		monthHeader.appendChild(nextMonth);

		return monthHeader;
	}

	function getDates(data, today) {
		var dataLength = data.length,
			isToday = false,
			dates = document.createElement('div');
		dates.setAttribute('class', 'date-picker_dates');

		for(var dayCount = 0; dayCount < dataLength; dayCount++) {
			date = document.createElement('div');
			date.setAttribute('class','date');
			date.innerHTML = data[dayCount];
			
			// if(data[dayCount] === today) {
			// 	if(isToday){
			// 		date.setAttribute('class','date today');
			// 		dates.appendChild(date);
			// 	}
			// 	isToday = true;
			// }

			dates.appendChild(date);
 		
		}
		return dates;
	}

	function getMonthName(int) {
		var months = {
			0: 'January',
			1: 'February',
			2: 'March', 
			3: 'April',
			4: 'May', 
			5: 'June',
			6: 'July',
			7: 'August',
			8: 'September',
			9: 'October',
			10: 'November',
			11: 'December'
		}	
		return months[int];
	}
})();