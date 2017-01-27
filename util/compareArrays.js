"use strict";
/**
 * Instructions:
 * Write a solution in Node.JS:
 *
 * How your implementation works:
 * Your function will take two arguments, (prevArray, currArray), flattens the objects inside of prevArray and currArray to 1 level of
 * depth, and returns an HTML Table of the values.  The HTML table you return has a column header which is a superset of all keys in 
 * all the objects in the currArray.  Any values that have changed from the prevArray to the currArray (ie field value changed or is a 
 * new key altogether) should be bolded. In the case that the value has been removed altogether from the prevArray to the currArravy, 
 * you will write out the key in bold DELETED.
 * 
 * Rules:
 * 1. The arrays are arbitrarily deep (see common questions for explanation of arbitrarily deep).
 * 2. The currArray could have more or potentially even be in a different index order.  You cannot depend solely on array index for  
 * comparison.  However, you can assume that each object in the arrays will have an "_id" parameter.  Unless the currArray has no  
 * object with the matching "_id" parameter (for example if the whole row has changed).
 * 3. Do not create global scope.  We have a test runner that will iterate on your function and run many fixtures through it.  If you 
 * create global scope for 1 individual diff between prevArray to currArray you could cause other tests to fail.  
 *
 * Common Questions:
 * 1. Can I use outside packages to solve (e.g. NPM, Bower)?  Yes.  You can use any packages you want to solve the solution.  
 * 2. Can I use google or outside resources (e.g. StackOverflow, GitHub)?  Yes.  Act as you would in your day job.
 * 3. What does arbitrarily deep mean? The prevArray or currArray can have objects inside of objects at different levels of depth. 
 *    You will not know how many levels of depth the objects could have, meaning your code must handle any kind of object.  Your 
 *    solution  must account for this.  Do not assume the examples below are the only fixtures we will use to test your code. 
 * 
 * @param prevArray is an array of objects
 * @param currArray is an array of objects
 * @return a string with HTML markup in it, should return null if error occurs.
 */
module.exports.arrayDiffToHtmlTable = function( prevArray, currArray) {
    // Example, Given the following data set:
    //
            // var prevArray = [ {_id:1, someKey: "RINGING", meta: { subKey1: 1234, subKey2: 52 } } ];
            // var currArray = [ {_id:1, someKey: "HANGUP",  meta: { subKey1: 1234 } },
            //     {_id:2, someKey: "RINGING", meta: { subKey1: 5678, subKey2: 207, subKey3: 52 } } ];
    
            // console.log( arrayDiffToHtmlTable( prevArray, currArray));
    //
    //  OUTPUT (Note this is a text representation... output should be an HTML table):
    //
    //          _id               someKey          meta_subKey1        meta_subKey2        meta_subKey3
    //            1              **HANGUP**             1234              **DELETED**
    //          **2**            **RINGING**          **5678**             **207**             **52**
    //
    //  ** implies this field should be bold or highlighted.
    //  !!! analyze the example carefully as it demonstrates expected cases that need to be handled. !!!
    //
    var result = "hello world";
    if (typeof prevArray === 'undefined' || typeof currArray === 'undefined' ){
        throw("Parameter was undefined");
    }
    
    try {
        //create table
        result = '<table frame="box" cellspacing="10" align="center" width="90%">';
        //create th
            //get all keys from prevArray, 
                //check if value is object, if so concat key with keys inside this object
                //repeat until all levels are complete
                //add each result to a set
            //get all keys from currArray,
                //check does each key exist in set already
                //check the value of each key to see if an object and 
                //check each concatinated key to see if exist in set, add if not already their
            //create a th for each item in the set
        var resultHeaderArray = []
        // recursive call to reach each deep level and create headings for keys
        var prevSet = new Set(prevArray);
        prevSet.forEach(function(obj) {
            extractKeys(obj, "", resultHeaderArray);
        });
        var currSet = new Set(currArray);
        currSet.forEach(function(obj) {
            extractKeys(obj, "", resultHeaderArray);
        });
        
        //convert array to a Set to pull out only unique values
        var resultHeaderSet = new Set(resultHeaderArray);

        console.log(resultHeaderSet);
        resultHeaderSet.forEach(function(value){
            result = result + "<th>" + value + "</th>";
        })
        
        var headerArray = Array.from(resultHeaderSet);

            
        //create rows
            //create a newSet that combine unique values of prev and curr, making sure curr overwrites
            //for each _id create a row from newSet
                //for each header in thArray 
                    //for each key 
                       // if the key has no '_' - it is single carry on as normal
                            //keytoBeChekced = key
                        //else  split key by '_" into an array
                            //loop that array
                        //if currArray === prevArray value
                            //add td with no style
                        //else if currArray key is not in prevArray or key present but values different to prevArray
                            //add td with BOLD style
            result += '<tr><td align="center">stuff</td></tr>';              
        
        
    } catch (err) {
        console.log("Error occured in arrayDiffToHtmlTable %O", err);
        return null;
    }
    result += "</table>";
    return result;
    
}

function extractKeys(obj,key, resultHeaderArray){
    
    var keysArray= Object.keys(obj);
    
    for (var i = 0; i < keysArray.length; i++) {
        if (resultHeaderArray.hasOwnProperty(keysArray[i])){
            continue;
        } 
       if (typeof obj[keysArray[i]] == 'object'){
           extractKeys(obj[keysArray[i]], keysArray[i], resultHeaderArray);
       } else {
           if (key === ''){
               resultHeaderArray.push( keysArray[i]);
           } else {
               resultHeaderArray.push(key + '_' + keysArray[i]); 
           }
       }
       
    }
}

/**
 * Get Object From Array with correct id
 * @param {Array} arr, array of objects
 * @param {String} id, string version of id for type comparison match
 * @return the whole object where id is found, otherwise null
 *
 */
function getObjectFromArray(arr, id) {
    arr.forEach(function(item){
        if (item['_id'].toString() === id) {
            return  item;
        }
    })
    return null;
}