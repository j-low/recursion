var stringifyJSON = function(obj) {
  var isArr = (obj instanceof Array);
  
  //screen undefs and functions; pass strings, nums and nulls
  if(typeof(obj) !== 'object' || obj === null) {
    if(typeof(obj) === 'function' || typeof(obj) === 'undefined') {
		return;
	} 
    if (typeof(obj) === 'string'){
	  obj = '"' + obj + '"';
	} else {
	  obj = String(obj);
	}
	return obj;
  }  else {
    //pass arrays, object literals and nulls.
	var finalObj = [];
	
	for (var key in obj) {
	  var isStringifiable = false;	
	  if (typeof(obj[key]) === 'string') {
		  isStringifiable = true;
	     obj[key] = '"'  + obj[key] + '"';
	  } else if (typeof (obj[key]) === 'object' && (obj[key] !== null)) {
		 isStringifiable = true;
	     //recurse if obj[key] is array or object literal; screen null objects
	    obj[key] = stringifyJSON(obj[key]);
	  } else if (typeof(obj[key]) === 'number' || obj[key] === null || typeof(obj[key]) === 'boolean') {
		isStringifiable = true;
	    obj[key] = String(obj[key]);
	  }
	  
      if(isStringifiable) {
	    finalObj.push((isArr ? '' : '"' + key + '":') + obj[key]);
      }
	}
	
	finalObj = (isArr ? '[' : '{') + String(finalObj) + (isArr ? ']' : '}');
	return finalObj;
  }
}; 

var compareAll = function(arr) {
  for(var i = 0; i < arr.length; i++) {
	console.log('OURS: ' + stringifyJSON(arr[i]));
	console.log('THEIRS: ' + JSON.stringify(arr[i]));
  }	
};








