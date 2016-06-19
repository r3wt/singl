module.exports = require('./index')( 'foo.bar', {

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
