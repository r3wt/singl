module.exports = function singl(namespace,object,freeze){
	
	if(namespace == undefined){
		throw new Error('singl: `namespace` parameter is required');
	}
	
	if(object == undefined){
		throw new Error('singl: `object` parameter is required');
	}
	
	var namespaceTypeRes = typeof namespace;
	
	if(namespaceTypeRes != 'string'){
		throw new Error('singl: parameter `namespace` expects a string. a '+namespaceTypeRes+' was supplied');
	}
	
	var obType = typeof object == 'object' && (object instanceof Array == false);
	var obTypeRes = object instanceof Array ? 'array' : typeof object;
	
	if( !obType ){
		throw new Error('singl: parameter `object` expects an object. a '+obTypeRes+' was supplied');
	}
	
	//finally, ensure that the object has a constructor.
	if( ! object.hasOwnProperty('init') || typeof object.init != 'function' ){
		throw new Error('singl: parameter `object` must have a property named `init` which is a function. this is your classes constructor.');
	}
	
	var SYS_KEY = Symbol(namespace);
	
	//export a constructor to instantiate the object
	return function construct(){
		
		var globalSymbols = Object.getOwnPropertySymbols(global);
		var hasInstance = globalSymbols.indexOf(SYS_KEY) > -1;
		
		if(!hasInstance){
			var instance = Object.create(object);
			//pass any arguments to the init method
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