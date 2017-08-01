export function functionUnpacker(filePath){
  
  import * as fn from filePath;
  let entryFn;
  
  if(Object.keys(fn) > 1){
    console.log("More than one function exported");
    //PROMPT for correct function. (FILTER non-functions)
  }
  else {
    // there is only one function located at the 0th index.
    entryFn = fn[Object.keys(fn)[0]];
  }
  
  if(typeof entryFn !== 'function'){
    throw new TypeError("needs to be function"); //TODO ELABORATE
  }
  
  return fn;
}
