'use strict';
var app = angular.module("ujebywacz",["ngStorage"]);
app.run(function($rootScope, $interval, $localStorage){
    var rs = $rootScope;
    rs.day = $localStorage.day || 14;
    rs.hour = $localStorage.hour || 11;
    rs.minute = $localStorage.minute || 0;

    rs.saveUjebanie = function(){
        $localStorage.day = rs.day;
    }
    rs.placeholder = "Dzień maja, w którym chcesz ujebać ustny polski";
    rs.c={
        days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            string: ""
    };
    rs.remaining = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    };
    var refresh = function(){
        var tempDay = rs.day<10?"0"+rs.day:rs.day;
        var tempHour = rs.hour<10?"0"+rs.hour:rs.hour;
        var tempMinute = rs.minute<10?"0"+rs.minute:rs.minute;
        var dateEnd = new Date("2015-05-"+tempDay+"T"+tempHour+":"+tempMinute+":00");
        var current = new Date();
        var delta = dateEnd-current;
        rs.remaining.seconds = Math.floor(delta/1000);
        rs.remaining.minutes = Math.floor(delta/1000/60);
        rs.remaining.hours = Math.floor(delta/1000/3600);
        rs.remaining.days = Math.floor(delta/1000/3600/24);
        var tempDelta = delta;
        rs.c.days = rs.remaining.days;
        tempDelta-=rs.c.days*3600*24000;
        rs.c.hours = Math.floor(tempDelta/3600000);
        tempDelta-=rs.c.hours*3600000;
        rs.c.minutes = Math.floor(tempDelta/60000);
        tempDelta-=rs.c.minutes*60000;
        rs.c.seconds = Math.floor(tempDelta/1000);
        rs.c.string = rs.c.days+"d+" + rs.c.hours+":"+rs.c.minutes+":"+rs.c.seconds;
    }
    refresh();
    $interval(refresh,1000);
});