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
	  if(getElementsByClassName(className, this).length !== 0) {
		 results.push(getElementsByClassName(className, this));
	  }
	}
    
    if (this.classList.contains(className)) {
	  results.push(this);
	}
	
    results = [].concat.apply([], results);
  });
 
  console.log(results);
  return results; 
};
