describe("DurationJS", function() {

    it("can parse durations as strings", function(){
        var d = new Duration();

        expect(d.parse('1 hours 33 mins 2 seconds').seconds()).toBe(5582)
        expect(d.parse('2 w 3day 1 h 33 m 2 sec').seconds()).toBe(1474382)

        expect(d.parse('5 weeks').weeks()).toBe(5);
        expect(d.parse('6w').weeks()).toBe(6);
        expect(d.parse('12           week').weeks()).toBe(12);

        expect(d.parse('9d').days()).toBe(9);
        expect(d.parse('2 days           ').days()).toBe(2);
        expect(d.parse('  19518    day      qsdlmfkj ---').days()).toBe(19518);

        expect(d.parse(' 78     h mlkj').hours()).toBe(78);
        expect(d.parse('22 hours ').hours()).toBe(22);
        expect(d.parse('3 hour').hours()).toBe(3);

        expect(d.parse('4min').minutes()).toBe(4);
        expect(d.parse('7 mins').minutes()).toBe(7);
        expect(d.parse('3 m').minutes()).toBe(3);
        expect(d.parse('8minutes').minutes()).toBe(8);
        expect(d.parse('90      minute').minutes()).toBe(90);

        expect(d.parse('4sec').seconds()).toBe(4);
        expect(d.parse('7 secs').seconds()).toBe(7);
        expect(d.parse('3 s').seconds()).toBe(3);
        expect(d.parse('8seconds').seconds()).toBe(8);
        expect(d.parse('90      second').seconds()).toBe(90);
    });

    it("can parse decimal numbers too", function(){
        var d = new Duration();

        expect(d.parse('0.5 hours').seconds()).toBe(1800);
        expect(d.parse('.2 hours').seconds()).toBe(720);

        expect(d.parse('.5 seconds').seconds()).toBe(0.5);
    });

});
/**
 * Starts the testing environment
 */
(function() {
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 250;

    /**
    Create the `HTMLReporter`, which Jasmine calls to provide results of each spec and each suite. The Reporter is responsible for presenting results to the user.
    */
    var htmlReporter = new jasmine.HtmlReporter();
    jasmineEnv.addReporter(htmlReporter);

    /**
    Delegate filtering of specs to the reporter. Allows for clicking on single suites or specs in the results to only run a subset of the suite.
    */
    jasmineEnv.specFilter = function(spec) {
        return htmlReporter.specFilter(spec);
    };

    /**
    Run all of the tests when the page finishes loading - and make sure to run any previous `onload` handler

    ### Test Results

    Scroll down to see the results of all of these specs.
    */
    var currentWindowOnload = window.onload;
    window.onload = function() {
        if (currentWindowOnload) {
          currentWindowOnload();
        }

        execJasmine();
    };

    function execJasmine() {
    jasmineEnv.execute();
    }
})();