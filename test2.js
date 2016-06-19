var myClass = require('./test');

var myInstance = myClass({ foo: true, bar: false});

myInstance.foobar();

var myInstance2 = myClass({foo: false,bar: true});

console.log( myInstance === myInstance2 );
console.log( myInstance.options );
console.log( myInstance2.options );
