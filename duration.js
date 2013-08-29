(function (undefined) {

    var Duration = function(duration){
        var d = duration;
        if (d) {
            if (d instanceof Duration) {
                d = duration.seconds() + 's';
            }
            this.parse(d);
        }
    };

    Duration.prototype = {
        units: {
            week: {labels: ['week', 'weeks', 'w'], multiplier: 7*24*60*60},
            day: {labels: ['day', 'days', 'd'], multiplier: 24*60*60},
            hour: {labels: ['hour', 'hours', 'h'], multiplier: 60*60},
            minute: {labels: ['minute', 'minutes', 'min', 'mins', 'm'], multiplier: 60},
            second: {labels: ['second', 'seconds', 'sec', 'secs', 's'], multiplier: 1}
        },
        add: function(number, unit) {
            for (var unitType in this.units) {
                var labels = this.units[unitType].labels;
                for (var i = 0; i < labels.length; i++) {
                    if (unit === labels[i]) {
                        this._seconds += number * this.units[unitType].multiplier;
                        return;
                    }
                }
            }

            return this;
        },
        parse: function(duration) {
            this._seconds = 0;
            var times = duration.match(/(\d*\.?\d+)\s*([a-zA-Z]+)/g);

            for (var i = 0; i < times.length; i++) {
                var timePart = /(\d*\.?\d+)\s*([a-zA-Z]+)/i.exec(times[i]);
                var unit = timePart[2].toLowerCase();
                var number = timePart[1];
                this.add(number, unit);
            }

            return this;
        },

        weeks: function() {
            return this._seconds / this.units.week.multiplier;
        },

        days: function() {
            return this._seconds / this.units.day.multiplier;
        },

        hours: function() {
            return this._seconds / this.units.hour.multiplier;
        },

        minutes: function() {
            return this._seconds / this.units.minute.multiplier;
        },

        seconds: function() {
            return this._seconds;
        },

        format: function(format) {
            // Start by the bigger unit
            var full = parseInt(this.weeks(), 10);
            format = format.replace('ww', full);

            var rest = new Duration(this);

            rest.add(- full, 'weeks');
            if (format.indexOf('dd') !== -1) {
                full = parseInt(rest.days(), 10);
                format = format.replace('dd', full);
                rest.add(- full, 'days');
            }

            if (format.indexOf('hh') !== -1) {
                full = parseInt(rest.hours(), 10);
                format = format.replace('hh', full);
                rest.add(- full, 'hours');
            }

            if (format.indexOf('mm') !== -1) {
                full = parseInt(rest.minutes(), 10);
                format = format.replace('mm', full);
                rest.add(- full, 'minutes');
            }


            full = parseInt(rest.seconds(), 10);
            format = format.replace('ss', full);

            return format;
        }
    };

    /************************************
        Exposing Duration
    ************************************/


    // CommonJS module is defined
    var hasModule = (typeof module !== 'undefined' && module.exports);
    if (hasModule) {
        module.exports = Duration;
    }
    /*global ender:false */
    if (typeof ender === 'undefined') {
        // here, `this` means `window` in the browser, or `global` on the server
        // add `Duration` as a global object via a string identifier,
        // for Closure Compiler "advanced" mode
        this.Duration = Duration;
    }
    /*global define:false */
    if (typeof define === "function" && define.amd) {
        define("Duration", [], function () {
            return Duration;
        });
    }
}).call(this);