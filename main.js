'use strict';
var app = angular.module("ujebywacz",["ngStorage"]);
app.run(function($rootScope, $interval, $localStorage){
    var rs = $rootScope;
    rs.day = +$localStorage.day || 14;
    rs.hour = +$localStorage.hour || 11;
    rs.minute = +$localStorage.minute || 0;
    rs.subject = $localStorage.subject || "ustny polski";
    rs.saveUjebanie = function(){
        $localStorage.subject = rs.subject;
        $localStorage.day = rs.day;
        $localStorage.hour = rs.hour;
        $localStorage.minute = rs.minute;
    }
    rs.placeholder = "Dzień maja, w którym chcesz ujebać ustny polski";
    rs.toAbs = function(num){ return Math.abs(num)};
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
    var pad = function(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }
    var refresh = function(){
        var dateEnd = new Date("2015-05-"+pad(rs.day, 2)+"T"+pad(rs.hour, 2)+":"+pad(rs.minute, 2)+":00");
        var current = new Date();
        var delta = rs.delta = (dateEnd-current) - 3600000*2;
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
    };
    refresh();
    $interval(function(){
        if(rs.form.$valid) refresh();
    },1000);
});
