/**
 * Note that all inputs are strings, but there is the types const array from addSearchParameterSelection.js 
 * that contains the expected output for each input
 */

let formIsValid = true;
// all parameters
let inputRefs = [];
// all invalid parameters
let invalids = [];

function validateForm() {
    // reset stuff
    formIsValid = true;
    inputRefs = [];
    invalids = [];

    for(let i = 0; i < containerRef.children.length; i++) {
        // first have to figure out which children of form are actually parameters

        // make sure that it has left and right half
        if(containerRef.children[i].children.length == 2) {
            
            // continuation of above
            if(containerRef.children[i].children[0].className == "half") {
                
                // make sure that there is a p label and tooltip container
                if(containerRef.children[i].children[0].children.length == 2) {
                    
                    // check if p label exists
                    if(containerRef.children[i].children[0].children[1].nodeName == "P") {
                        let ref = containerRef.children[i].children[0].children[1];

                        let rightSide = containerRef.children[i].children[1];

                        let parent = containerRef.children[i];

                        // separate function to help with code organization
                        checkParameter(ref, rightSide, parent);
                    }

                }

            }

        }

    }

    highlightInvalids();

    return false;
}

const validCharacters = [
    "a", "b", "c", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " ", "-", ".", ",", "/", "&", "'"
];

const validLocations = [
    "suburban", "urban", "small-city", "small city", "-1"
];

const validControls = [
    "private", "state", "city", "-1"
];

// for parameters that are from 1 - 5
const validScale = [
    "1", "2", "3", "4", "5"
];

// validates an individual parameter
function checkParameter(param, rightSide, parent) {
    let inputed = [];
    let inputedIndex = 0;

    // first get what is in all of the inputs
    for(let i = 0; i < rightSide.children.length; i++) {
        let ref = rightSide.children[i];

        if(ref.nodeName == "INPUT") {
            inputRefs.push(ref);

            inputed[inputedIndex] = ref.value;

            ++inputedIndex;
        }
    }

    // actually go through and validate input

    // first check lengths
    for(let i = 0; i < inputed.length; i++) {
        if(inputed[i].length === 0) {
            formIsValid = false;
            invalids.push(inputRefs[
                inputRefs.length - inputed.length + i
            ]);
        }
    }

    switch(types[options.indexOf(param.innerHTML)]) {
        case "Number":
            for(let i = 0; i < inputed.length; i++) {
                // remove commas to allow numbers with commas as valid input
                let commasRemoved = inputed[i].replaceAll(",", "");

                let specialCases = ["academics scale (1-5)", "social scale (1-5)", "quality of life scale (1-5)"];

                // deal with special cases first
                // 1 - 5 scale
                if(specialCases.includes(param.innerHTML.toLowerCase())) {
                    // don't need to convert input to lowercase because it is a number
                    if(!validScale.includes(inputed[i])) {
                        formIsValid = false;
                        invalids.push(inputRefs[
                            inputRefs.length - inputed.length + i
                        ]);
                    }
                }
                // %, can't be over 100
                else if(param.innerHTML.includes("%")) {
                    if(!(Number.isInteger(Number(commasRemoved))) || 
                    parseInt(commasRemoved) < 0 || parseInt(commasRemoved) > 100) {
                        formIsValid = false;
                        invalids.push(inputRefs[
                            inputRefs.length - inputed.length + i
                        ]);
                    }
                }
                // general cases
                else if(!(Number.isInteger(Number(commasRemoved))) || parseInt(commasRemoved) < 0) {
                    formIsValid = false;
                    invalids.push(inputRefs[
                        inputRefs.length - inputed.length + i
                    ]);
                }
            }
            break;
        
        case "String":
            for(let i = 0; i < inputed.length; i++) {
                for(let j = 0; j < inputed[i].length; j++) {
                    // deal with special cases first
                    if(param.innerHTML.toLowerCase() == "location") {
                        if(!validLocations.includes(inputed[i].toLowerCase())) {
                            formIsValid = false;
                            invalids.push(inputRefs[
                                inputRefs.length - inputed.length + i
                            ]);
                        }
                    }
                    else if(param.innerHTML.toLowerCase() == "control") {
                        if(!validControls.includes(inputed[i].toLowerCase())) {
                            formIsValid = false;
                            invalids.push(inputRefs[
                                inputRefs.length - inputed.length + i
                            ]);
                        }
                    }
                    // general cases
                    else if(!validCharacters.includes(inputed[i].substr(j, 1).toLowerCase())) {
                        formIsValid = false;
                        invalids.push(inputRefs[
                            inputRefs.length - inputed.length + i
                        ]);
                    }
                }
            }
            break;
    }
}

function highlightInvalids() {
    // first remove error message
    document.getElementById("invalidInputErrorMessage").style.visibility = "hidden";

    // then clear all error highlighting
    for(let i = 0; i < inputRefs.length; i++) {
        inputRefs[i].style.border = "none";
        inputRefs[i].style.borderBottom = "2px solid var(--thirdColor)";
    }

    // then add error highlighting that is needed
    for(let i = 0; i < invalids.length; i++) {
        invalids[i].style.border = "2px solid var(--errorColor)";
    }

    // and finally let user know they done goofed up
    if(invalids.length > 0) {
        document.getElementById("invalidInputErrorMessage").style.visibility = "visible";

        // scroll to the top of the page
        window.scrollTo({
            top: 0, 
            behavior: "smooth"
        });
    }
    else {
        window.open("searchResults.html", "_self");
    }

}

// when the form is reset, errors should be removed
function clearErrorsOnReset() {
    // first remove error message
    document.getElementById("invalidInputErrorMessage").style.visibility = "hidden";

    // then clear all error highlighting
    for(let i = 0; i < inputRefs.length; i++) {
        inputRefs[i].style.border = "none";
        inputRefs[i].style.borderBottom = "2px solid var(--thirdColor)";
    }

    // scroll to the top of the page
    window.scrollTo({
        top: 0, 
        behavior: "smooth"
    });
}

// this function is in this file instead of the other one so that clearErrorsOnReset can be called
function removeAllParameters() {
    clearErrorsOnReset();
    
    let elementsCount = containerRef.children.length;

    // remove everything
    for(let i = 0; i < elementsCount; i++) {
        containerRef.removeChild(containerRef.children[0]);
    }

    // reset data
    added = [];
    availableOptions = [...options];

    // add select
    addParameterSelection(true);
}