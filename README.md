### install

`npm install singl`

### single 1.0.0

singl provides a concise interface for developing singleton objects. 
the goal of the project is to make your module code more organized and readable. don't worry about decorating prototypes. singl does it for you.


# basic usage


*create yourself a module cityboy *
```js
module.exports = require('singl')( 'my.module', {

	options: {},
	
	//this is the constructor!
	init: function(options){
		this.options = options;
	},
	
	//your methods here.
	foobar: function(){
		console.log('hello world');
	}
	
});

```

*now use your module somewhere*
```js
var myInstance = require('my-module')(myOptions);

myInstance.foobar();

myInstance2 = require('my-module')(myOptions);

console.log(myInstance === myInstance2);

```


# function signature

```js

function singl( namespace, object[, freeze = false] )

```

# implementation notes

- singl expects argument `namespace` to be of type `string`. it is required.
- singl expects argument `object` to be of type `object`, ie a plain object. it is also required.
- singl accepts an optional 3rd argument, `freeze`, of type `bool`, which would freeze the object if the parameter is `true`.
- the `object` parameter must have a property called `init` which is defined as a function. this is the constructor for your class/object/thingy-ma-jig.
- singl returns a constructor function which will apply all arguments given to the `init` method, and return the instantiated instance.

# license

MIT


