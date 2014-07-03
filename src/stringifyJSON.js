var stringifyJSON = function(obj) {

  if(obj === null || typeof(obj) !== "object") {
    // handle SIMPLE OBJECT or screen undefined/function object
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
    // handle ARRAY or OBJECT LITERAL
    var finalObj = [];
	var propCount = 0;
	var isLastCounter = 0;	
	var isArr = (obj instanceof Array) ? true : false;

    for (var prop in obj) {
	  propCount += 1;
	}
	
    finalObj.push(isArr ? '[' : '{');
	
	for (var key in obj) {
	  //handle SIMPLE **NESTED** object
	  isLastCounter += 1;
	  var currentObj;
	  var isLastProp = isLastCounter === propCount ? true : false;
	  
	  //pass all nulls, strings, and numbers
	  if(obj[key] === null || typeof(obj[key]) !== "object") {
		//screen all undefs and functions  
		if(obj[key] !== undefined && typeof(obj[key]) !== 'function') {
		  //format strings	
          if(typeof(obj[key]) === 'string' ) {
		    obj[key] = '"' + obj[key] + '"';
		  }
		  //format nulls
		  if(obj[key] === null) {
		    obj[key] = 'null';
		  }
		  //format nums (convert to strings)
		  if(typeof(obj[key]) !== 'string') {
		    obj[key] = obj[key].toString();
		  }
		  //eliminate white space in value
		  obj[key] = obj[key].replace(/\s+/g, '');
		  finalObj.push(isArr ? obj[key] : '"' + key + '":' + obj[key]);
		}
	  } else {
	  //handle COMPLEX **NESTED** object
	    finalObj.push('"' + key + '":');
	  if(!isArr) {
	  }
	  //recurse nested objects
	  finalObj.push(stringifyJSON(obj[key]));
	  }
	  
	  if(!isLastProp) {
	    finalObj.push(",");	
	  }
	}
	
	//remove last value if === ","
	if(finalObj[finalObj.length-1] === ",") {
	  finalObj = finalObj.slice(0, finalObj.length-1);
	}
	
	//cap complex object with closing bracket/brace; collapse white space between values & return
	finalObj.push(isArr ? ']' : '}');
	finalObj = finalObj.join('');
	return finalObj;
  } 
};


