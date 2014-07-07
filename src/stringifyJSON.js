
var stringifyJSON = function(obj) {
  var isArr = (obj instanceof Array);
  var deepCopy = function(origin) {
    var isArray = origin instanceof Array;
    var isObj = Object.prototype.toString.call(origin) === '[object Object]';
    var newObj = isArray ? [] : {};
  
    if(isArray) {
      //console.log('Array block called');
      for (var i = 0; i < origin.length; i++) {
	    var isObjOrArray = origin[i] instanceof Array || Object.prototype.toString.call(origin[i]) === '[object Object]';
        newObj.push(isObjOrArray ? deepCopy(origin[i]) : origin[i]);   
      }
    } else if (origin === null) {
	  newObj = null;
    } else {
	  //console.log('Object literal block called');
      for (var key in origin) {
	    var isObjOrArray = origin.key instanceof Array || Object.prototype.toString.call(origin.key) === '[object Object]';	
	    newObj[key] = isObjOrArray ? deepCopy(origin[key]) : origin[key];
 	  }
    }
    return newObj;
  };
  
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
    //pass arrays and object literals
	var objCopy = deepCopy(obj);
	var finalObj = [];
	
	for (var key in objCopy) {
	  var isStringifiable = false;	
	  if (typeof(objCopy[key]) === 'string') {
		  isStringifiable = true;
	     objCopy[key] = '"'  + objCopy[key] + '"';
	  } else if (typeof (objCopy[key]) === 'object' && (objCopy[key] !== null)) {
		 isStringifiable = true;
	     //recurse if objCopy[key] is array or object literal; screen null objects
	    objCopy[key] = stringifyJSON(objCopy[key]);
	  } else if (typeof(objCopy[key]) === 'number' || objCopy[key] === null || typeof(objCopy[key]) === 'boolean') {
		isStringifiable = true;
	    objCopy[key] = String(objCopy[key]);
	  }
	  
      if(isStringifiable) {
	    finalObj.push((isArr ? '' : '"' + key + '":') + objCopy[key]);
      }
	}
	
	finalObj = (isArr ? '[' : '{') + String(finalObj) + (isArr ? ']' : '}');
	return finalObj;
  }
}; 


var compareAll = function(arr) {
  for(var i = 0; i < arr.length; i++) {
	console.log('OWN CODE: ' + stringifyJSON(arr[i]));
	console.log('NAT CODE: ' + JSON.stringify(arr[i]));
  }	
};



