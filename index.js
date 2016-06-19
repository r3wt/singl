var createProto = function(o){
	function F(){}
	F.prototype = o;
	return new F();
}

module.exports = function singl(namespace,object,freeze){
	
	if(namespace == undefined){
		throw new Error('singl: `namespace` parameter is required');
	}
	
	if(object == undefined){
		throw new Error('singl: `object` parameter is required');
	}
	
	if(typeof namespace != 'string'){
		throw new Error('singl: parameter `namespace` expects a string. a %s was supplied',typeof namespace);
	}
	
	var obType = typeof object == 'object' && (object instanceof Array == false);
	var obTypeRes = object instanceof Array ? 'array' : typeof object;
	
	if( !obType ){
		throw new Error('singl: parameter `object` expects an object. a '+obTypeRes+' was supplied');
	}
	
	//finally, insure that the object has a constructor.
	
	if( ! object.hasOwnProperty('init') || typeof object.init != 'function' ){
		throw new Error('single: parameter `object` must have a property named `init` which is a function. this is your classes constructor.');
	}
	
	const SYS_KEY = Symbol(namespace);
	
	return function(){
		
		var globalSymbols = Object.getOwnPropertySymbols(global);
		var hasInstance = globalSymbols.indexOf(SYS_KEY) > -1;
		
		if(!hasInstance){
			var instance = createProto(object);
			instance.init.apply(instance,arguments);
			global[SYS_KEY] = instance;
			if(freeze){
				Object.freeze(instance);
			}
		}else{
			instance = global[SYS_KEY];
		}

		return instance;
		
	};
	
};

/*usage

//used to create singleton modules, with very readable "class-like" syntax similar to classes in php,c++,python,ruby,java etc.
//this module will export a function that accepts an options object. any subsequent requires will always produce the same global object instance.


//in your module code
module.exports = require('singl')('my-namespace',{
	
	options: {},
	
	//this is the constructor for your module!!! only called once.
	init: function(options){
		this.options = options;
	},
	
	fooBar: function(){
		console.log('hello world!');
	}
	
});

//using your module

var module = require('my-module');

var instance = module(options);

instance.fooBar();

*/