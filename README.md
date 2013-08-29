Travis CI: [![Build Status](https://travis-ci.org/khepin/durationjs.png?branch=master)](https://travis-ci.org/khepin/durationjs)

# DurationJS

Duration allows you to parse human written durations such as "1 hour 30min" and
get them back in a variety of formats.

Examples:

    var d = new Duration('1 hour 30m');

    d.hours() // 1.5
    d.parse('1h3m').minutes() // 63
    d.parse('1 hours 33 mins 2 s').seconds() // 5582


## Methods

 - `new Duration(string)` Creates a new duration object from the parsed string
 - `d.add(X, Unit)` Will add X "units" to the current duration. For example :
 `d.add(5, 'hours')`.
 - `d.parse(string)` Will reset the current duration to a new one based on the parsed
 string
 - `d.weeks()` Gives you the current duration as a number of weeks
 - `d.days()` Gives you the current duration as a number of days
 - `d.hours()` Gives you the current duration as a number of hours
 - `d.minutes()` Gives you the current duration as a number of minutes
 - `d.seconds()` Gives you the current duration as a number of seconds
 - `d.format(f)` Returns the current duration formatted according to f


 ### Formatting

 `Duration.format` will work as follows:

     var d = new Duration('5 week 2d 7h 17 minutes 6 s');

     d.format('ww weeks and hh hours') // => 5 weeks and 55 hours
     d.format('ww weeks, dd days and hh hours') // => 5 weeks, 2 days and 7 hours
     d.format('mm minutes ss seconds') // => 3317 minutes 6 seconds