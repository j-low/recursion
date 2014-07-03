
var getElementsByClassName = function(className, element){
  var results = [];
   
  if (!element) {
    element = document.body;
  }  
  
  if(element.classList.contains(className)) {
    results.push(element);
  }
  
  $(element).children().each(function() {  
    if(this.hasChildNodes()) {
	  results.push(getElementsByClassName(className, this)); 
	} else {
	  if (this.classList.contains(className)) {
	    if (element.classList.contains(className)) {
			results.push(this);
		}
	  }	
		
	}
    	
    results = [].concat.apply([], results);
  });
  console.log(results);
  return results; 
};
