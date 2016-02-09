'use strict';

var timerInterval = null;
function showError(){
    stopTimer();
	$('.error-message').show();
	setTimeout(function() {
        $('.error-message').fadeOut(1000);
        
    }, 2000);
    stopTimer();
}

function startTimer(){
	var	setDays = $('.set-days').val(),
		setHours = $('.set-hours').val(),
		setMins = $('.set-mins').val(),
		setSecs = $('.set-secs').val(),

		timer = $('.timer'),

		daysEl = $('.days'),
		hoursEl = $('.hours'),
		minsEl = $('.mins'),
		secsEl = $('.secs'),
		days,
		hours,
		mins,
		secs;

	if(setDays == '' && setHours == '' && setMins == '' && setSecs == ''){
		setDays = 0;
		setHours = 0;
		setMins = 10;
		setSecs = 0;
	}else if(isNaN(setDays) || isNaN(setHours) || isNaN(setMins) || isNaN(setSecs)){
		showError();
		return false;
	}else{
		setDays = (0 + setDays).slice(-2);
		setHours = (0 + setHours).slice(-2);
		setMins = (0 + setMins).slice(-2);
		setSecs = (0 + setSecs).slice(-2);
	}
	timer.show();
	daysEl.text(setDays);
	hoursEl.text(setHours);
	minsEl.text(setMins);
	secsEl.text(setSecs);

	days = daysEl.text(),
	hours = hoursEl.text(),
	mins = minsEl.text(),
	secs = secsEl.text();

  	if (timerInterval !== null) return;
	timerInterval = setInterval(function(){runCountdown(days, hours, mins, secs)}, 1000);

	function runCountdown(day, hour, min, sec){
		days = day;
		hours = hour;
		mins = min;
		secs--;

		if(secs < 0){
			secs = 59;
			mins--;
		}

		if(mins < 0 || mins == 0 && hours !=0 && days !=0){
			mins = 59;
			hours--;
		}else if(mins == 0 && hours == 0 && days == 0){
			mins;
		}

		if(hours < 0 || hours == 0){
			hours = 59;
			days--;
		}else if(hours == 0 && days == 0){
			hours;
		}

		if(days == 0)
			days;

		secsEl.text(secs);
		minsEl.text(mins);
		hoursEl.text(hours);
		daysEl.text(days);

		if(secs == 0 && mins == 0 && hours == 0 && days == 0){
			stopTimer();
			$('.modal').show();
		}
	}
}

function stopTimer(){
	clearInterval(timerInterval);
	timerInterval = null;
}

$(document).ready(function(){
	$('.modal').click(function(e){
		if(e.target != this)
	    	return false
	    $('.modal').hide();
	});
});