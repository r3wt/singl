### install

`npm install singl`

### single 1.0.0

singl provides a concise interface for developing singleton objects. 
the goal of the project is to make your module code more organized


# basic usage


*create a module*
```


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
```

var myInstance = require('my-module')(myOptions);

myInstance.foobar();

myInstance2 = require('my-module')(myOptions);

console.log(myInstance === myInstance2);


```


# function signature

```

function singl( namespace, object[, freeze = false] )

```

# implementation notes

- the singl function expects argument namespace to be of type `string`.
- the singl function expects argument object to be of type `object`, ie a plain object.
- the singl function accepts an optional 3rd argument, freeze, which would freeze the object if the parameter is true.
- this `object` parameter must have a property called `init` which is defined as a function. this is the constructor.
- the single exports a function which will apply all arguments given to the `init` method, and return the instantiated instance.
