var Rx = require('rxjs/Rx');

var observable = Rx.Observable.interval(1000);
var subscription = observable.subscribe(x => console.log(x));
// Later:
// This cancels the ongoing Observable execution which
// was started by calling subscribe with an Observer.
//subscription.unsubscribe();