var stringifyJSON = function(obj) {

  if(obj === null || typeof(obj) !== "object") {
    // handle simple object or screen undefined/function object
    if(obj !== undefined && typeof(obj) !== 'function') {
	  if (typeof(obj) === 'string') {
	    obj = '"' + obj + '"';
	  } else if(obj === null){
	    obj = 'null';
	  } else {
	    obj = obj.toString();
	  }
	  return obj;
	}
  } else { 
    // handle array or object literal
    var finalObj = [];
	var propCount = 0;
	var isLastCounter = 0;	
	var isArr = (obj instanceof Array) ? true : false;

    for (var prop in obj) {
	  propCount += 1;
	}
	
    finalObj.push(isArr ? '[' : '{');
	
	//begin for loop
	for (var key in obj) {
	  //handle SIMPLE NESTED object
	  isLastCounter += 1;
	  var currentObj;
	  var isLastProp = isLastCounter === propCount ? true : false;
	  
	  if(obj[key] === null || typeof(obj[key]) !== "object") {
		if(obj[key] !== undefined && typeof(obj[key]) !== 'function') {
          if(typeof(obj[key]) === 'string' ) {
		    obj[key] = '"' + obj[key] + '"';
		  }
		  if(obj[key] === null) {
		    obj[key] = 'null';
		  }
		  if(typeof(obj[key]) !== 'string') {
		    obj[key] = obj[key].toString();
		  }
		  obj[key] = obj[key].replace(/\s+/g, '');
		  finalObj.push(isArr ? obj[key] : '"' + key + '":' + obj[key]);
		}
	  } else {
	  //handle COMPLEX NESTED object
	    finalObj.push('"' + key + '":');
	  if(!isArr) {
	  }
	  finalObj.push(stringifyJSON(obj[key]));
	  }
	  if(!isLastProp) {
	    finalObj.push(",");	
	  }
	}
	
	if(finalObj[finalObj.length-1] === ",") {
	  finalObj = finalObj.slice(0, finalObj.length-1);
	}
	finalObj.push(isArr ? ']' : '}');
	finalObj = finalObj.join('');
	return finalObj;
  } 
};


