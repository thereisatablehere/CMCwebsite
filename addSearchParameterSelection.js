// reference to container for all parameter stuff
const containerRef = document.getElementById("searchParametersContainer");

// possible search parameter options
const options = [
    "School Name", 
    "State", 
    "Location", 
    "Control", 
    "Student Count", 
    "% of Students Female", 
    "SAT Verbal", 
    "SAT Math", 
    "Expenses", 
    "% Financial Aid", 
    "Applicants Count", 
    "% Admitted", 
    "% Enrolled", 
    "Academics Scale (1-5)", 
    "Social Scale (1-5)", 
    "Quality of Life Scale (1-5)", 
    "Emphases"
];

// how many total search parameter options there are
const count = options.length;

// the data types for each search parameter option for creating correct inputs and input validation
const types = [
    "String", // school name
    "String", // state
    "String", // location
    "String", // control
    "Number", // student count
    "Number", // % of students female
    "Number", // SAT verbal
    "Number", // SAT math
    "Number", // expenses
    "Number", // % financial aid
    "Number", // applicants count
    "Number", // % admitted
    "Number", // % enrolled
    "Number", // academics scale
    "Number", // social scale
    "Number", // quality of life scale
    "String" // emphases
];

// whether or not the search parameter requires two inputs for a range
const range = [
    false, // school name
    false, // state
    false, // location
    false, // control
    true, // student count
    true, // % of students female
    true, // SAT verbal
    true, // SAT math
    true, // expenses
    true, // % financial aid
    true, // applicants count
    true, // % admitted
    true, // % enrolled
    true, // academics scale
    true, // social scale
    true, // quality of life scale
    false  // emphases
];

/**
 * any extra instructions that should be added to search parameter
 * first index of each index is if should be added to the beggining or end
 * I maybe should have created another array instead of making this multi-dimensional
 */
const extras = [
    [true, "Contains"], // school name
    [true, "Contains"], // state
    [false, "(suburban, urban, small-city, or -1 for unknown)"], // location
    [false, "(private, state, city, or -1 for unknown)"], // control
    [true, ""], // student count
    [true, ""], // % of students female
    [true, ""], // SAT verbal
    [true, ""], // SAT math
    [true, ""], // expenses
    [true, ""], // % financial aid
    [true, ""], // applicants count
    [true, ""], // % admitted
    [true, ""], // % enrolled
    [true, ""], // academics scale
    [true, ""], // social scale
    [true, ""], // quality of life scale
    [true, "Contains Either"] // emphases
];

// the detailed explanation of each parameter
const explanations = [
    "The name of the school. Note that you do not have to know the entire name of the school.", // school name
    "The state the school is in.", // state
    "As shown next to the input, what type of area the school is located in.", // location
    "As shown next to the input, what type of school it is.", // control
    "A range of the number of students currentlu enrolled at the school. Note that you can include commas.", // student count
    "How many students, as a %, out of all of the students are female. Note that you can include commas.", // % of students female
    "A range of accepted SAT verbal scores. Note that you can include commas.", // SAT verbal
    "A range of accepted SAT math scores. Note that you can include commas.", // SAT math
    "A range of the cost to attend the school without financial aid. Note that you can include commas.", // expenses
    "A range of the % of financial aid given. Note that you can include commas.", // % financial aid
    "How many students currently have submitted an application to the school. Note that you can include commas.", // applicants count
    "How many students, as a % of all students who have applied, have been accepted into the school. Note that you can include commas.", // % admitted
    "How many students, as a % of all students admitted, have decided to go to the school. Note that you can include commas.", // % enrolled
    "How good the school is for academics.", // academics scale
    "How good the school is for the social aspect.", // social scale
    "How good the school is for quality of life aspect.", // quality of life scale
    "Up to 5 areas of study you can enter in which the school excels."  // emphases
];

/**
 * if the inputs for the parameter should be longer than normal, for instance school name
 */
const longInput = [
    true, // school name
    false, // state
    true, // location
    true, // control
    false, // student count
    false, // % of students female
    false, // SAT verbal
    false, // SAT math
    false, // expenses
    false, // % financial aid
    false, // applicants count
    false, // % admitted
    false, // % enrolled
    false, // academics scale
    false, // social scale
    false, // quality of life scale
    true // emphases
];

// the three dots is the spread operator, which copies an array
let availableOptions = [...options];

// what parameters the user has added
let added = [];

/**
 * automatically add a parameter selection
 * have to add an event listener this way because just adding .onload would conflict with 
 * window.onload of loadnavbar.js
 */
let firstParameterListener = document.body.addEventListener("onload", addParameterSelection(true));

/**
 * note that everything added to containerRef, even if it is only a single element, is added first to a div, 
 * then the div is added to containerRef. This is to ensure that elements with different heights will still be 
 * spaced out evenly
 */

function addParameterSelection(first) {
    let divNode = document.createElement("div");

    let selectNode = document.createElement("select");
    selectNode.setAttribute("onclick", "addParameter()");

    // add the first option that is only there to let the user know that they should select an option
    let optionNode = document.createElement("option");
    optionNode.setAttribute("value", "instruction");
    // remove the dropdown instructions text from the possible options when dropdown opened
    optionNode.style.display = "none";
    if(first) {
        optionNode.innerHTML = "Select a Search Parameter";

        let spacingNode = document.createElement("div");
        spacingNode.style.height = "20px";
        containerRef.appendChild(spacingNode);

        document.body.removeEventListener("onload", addParameterSelection);
    }
    else {
        optionNode.innerHTML = "Add Another Search Parameter";
        optionNode.className = "addAnotherParameterSelect";
    }

    selectNode.appendChild(optionNode);

    // add the option to add all parameters
    optionNode = document.createElement("option");
    optionNode.setAttribute("value", "add all");
    optionNode.style.backgroundColor = "var(--fourthColor)";

    if(first) {
        optionNode.innerHTML = "Add All Parameters";
    }
    else {
        optionNode.innerHTML = "Add Remaining Parameters";
    }

    selectNode.appendChild(optionNode);

    // create each option element for the select element, basically the container]
    for(let i = 0; i < availableOptions.length; i++) {
        let optionNode = document.createElement("option");
        optionNode.setAttribute("value", availableOptions[i]);
        optionNode.innerHTML = availableOptions[i];

        selectNode.appendChild(optionNode);
    }

    divNode.appendChild(selectNode);
    containerRef.appendChild(divNode);
}

// add input for parameter
function addParameter() {
    // the div that contains the select, needed because this is what is actually removed
    let ref = containerRef.children[containerRef.children.length - 1];
    // the select in the div, needed to get the value of what the user selected
    let refChild = ref.children[0];

    let index = options.indexOf(refChild.value);

    if(refChild.value == "add all") {
        // first remove select
        containerRef.removeChild(ref);

        for(let i = 0; i < options.length; i++) {
            // call another function for code organization
            if(!(added.includes(options[i]))) {
                addParameterFromAddingAll(i);
            }
        }
    }
    // only add parameters if the option selected is an actual parameter and not the instruction option
    else if(refChild.value != "instruction") {
        /**
         * check to make sure that the selected parameter hasn't already been added
         * kind of pointless, but I mean, why not
         */
        if(!added.includes(refChild.value)) {
            let divNode = document.createElement("div");

            let leftSideNode = document.createElement("div");
            leftSideNode.className = "half";

            // info icon user can hover mouse over to see detailed explanation of parameter

            let tooltipContainer = document.createElement("div");
            tooltipContainer.className = "tooltipContainer";

            let infoNode = document.createElement("img");
            infoNode.className = "icon";
            infoNode.setAttribute("src", "Images/info.png");
            tooltipContainer.appendChild(infoNode)

            let tooltipText = document.createElement("span");
            tooltipText.className = "tooltipText";
            tooltipText.innerHTML = explanations[index];
            tooltipContainer.appendChild(tooltipText);

            leftSideNode.appendChild(tooltipContainer);

            // text to describe what the parameter is
            let descriptionNode = document.createElement("p");
            descriptionNode.innerHTML = refChild.value;
            divNode.appendChild(descriptionNode);

            leftSideNode.appendChild(descriptionNode);
            divNode.appendChild(leftSideNode);

            let rightSideNode = document.createElement("div");
            rightSideNode.className = "half";

            // if needed, add extra text at beggining
            if(extras[index][0]) {
                let descriptionNode = document.createElement("p");
                descriptionNode.innerHTML = extras[index][1];
                // at margin for spacing between input
                descriptionNode.style.marginRight = "10px";

                rightSideNode.appendChild(descriptionNode);
            }

            let longInputLength = "135px";

            /**
             * actual input or inputs, depending on if a range.
             * Note that any step is added even though integers are only accepted,
             * but this is so that formHander.js is the only place that form 
             * validation is handled, which allows consistent error highlighting
             */
            if(range[options.indexOf(refChild.value)]) {
                let descriptionNode = document.createElement("p");
                descriptionNode.innerHTML = "Between";
                // for some reason these get pushed to the right a little bit more than others
                descriptionNode.style.marginLeft = "-10px";
                rightSideNode.appendChild(descriptionNode);

                let inputNode = document.createElement("input");
                inputNode.className = "rangeInputs";
                inputNode.setAttribute("type", "text");
                inputNode.noValidate;
                
                rightSideNode.appendChild(inputNode);

                descriptionNode = document.createElement("p");
                descriptionNode.innerHTML = "and";
                rightSideNode.appendChild(descriptionNode);

                inputNode = document.createElement("input");
                inputNode.className = "rangeInputs";
                inputNode.setAttribute("type", "text");
                inputNode.noValidate;
                
                rightSideNode.appendChild(inputNode);
            }
            else {
                let inputNode = document.createElement("input");
                inputNode.setAttribute("type", "text");
                inputNode.noValidate;

                // the only inputs that are longer are not range ones (emphasis is not set as a range)
                
                // emphasese is a special case
                if(index == options.length - 1) {
                    inputNode.style.width = "40%";
                }
                else if(longInput[index]) {
                    inputNode.style.width = longInputLength;
                }

                rightSideNode.appendChild(inputNode);
            }

            // if needed, add extra text at end
            if(!extras[index][0]) {
                let descriptionNode = document.createElement("p");
                descriptionNode.innerHTML = extras[index][1];
                // at margin for spacing between input
                descriptionNode.style.marginLeft = "10px";
                descriptionNode.style.fontSize = "14px";

                rightSideNode.appendChild(descriptionNode);
            }

            // emphases parameter is a special case
            if(index == options.length - 1) {
                divNode.id = "emphasesParameter";
                // make the height large enough for all of the inputs
                let newHeight = ((30 * 6) + 12) + "px";
                divNode.style.height = newHeight;
                // for some reason the bottom margin of the element above emphases is double what it's supposed to be
                divNode.style.marginTop = "-20px";
                divNode.style.marginBottom = "40px";

                rightSideNode.children[rightSideNode.children.length - 2].style.marginBottom = "5px";

                // border is to high for emphasis, so have to change it
                leftSideNode.style.border = "none";
                rightSideNode.style.border = "none";
                divNode.style.borderBottom = "1px solid var(--thirdColor)";

                divNode.style.alignItems = "flex-start";
                rightSideNode.style.flexDirection = "column";
                rightSideNode.style.alignItems = "flex-start";

                for(let i = 1; i < 5; i++) {
                    let inputNode = document.createElement("input");
                    inputNode.setAttribute("type", "text");

                    inputNode.style.width = "40%";
                    inputNode.style.marginTop = "5px";

                    rightSideNode.appendChild(inputNode);
                }

                // add remove button
                let removeNode = document.createElement("img");
                removeNode.setAttribute("src", "Images/delete.png");
                removeNode.setAttribute("onclick", "removeParameter(this)");
                removeNode.classList.add("icon", "hoverEffect", "removeButton");
                removeNode.style.position = "absolute";
                removeNode.style.marginLeft = "215px";
                removeNode.style.marginTop = "-5px";
                rightSideNode.appendChild(removeNode);
            }
            else {
                // add remove button
                let removeNode = document.createElement("img");
                removeNode.setAttribute("src", "Images/delete.png");
                removeNode.setAttribute("onclick", "removeParameter(this)");
                removeNode.classList.add("icon", "hoverEffect", "removeButton");
                rightSideNode.appendChild(removeNode);
            }


            // add selected parameter to the list of parameters the user has chosen
            added.push(refChild.value);
            
            // remove selected parameter from availables
            let removeIndex = availableOptions.indexOf(refChild.value);
            availableOptions.splice(removeIndex, 1);

            // remove select
            containerRef.removeChild(ref);

            divNode.appendChild(rightSideNode);

            // actually add input stuff
            containerRef.appendChild(divNode);

            // option to add another parameter
            if(availableOptions.length > 0) {
                addParameterSelection(false);
            }

            // scroll to the bottom of the page
            window.scrollTo({
                top: window.innerHeight, 
                behavior: "smooth"
            });
        }
    }
}

function addParameterFromAddingAll(index) {
    let divNode = document.createElement("div");

    let leftSideNode = document.createElement("div");
    leftSideNode.className = "half";

    // info icon user can hover mouse over to see detailed explanation of parameter

    let tooltipContainer = document.createElement("div");
    tooltipContainer.className = "tooltipContainer";

    let infoNode = document.createElement("img");
    infoNode.className = "icon";
    infoNode.setAttribute("src", "Images/info.png");
    tooltipContainer.appendChild(infoNode)

    let tooltipText = document.createElement("span");
    tooltipText.className = "tooltipText";
    tooltipText.innerHTML = explanations[index];
    tooltipContainer.appendChild(tooltipText);

    leftSideNode.appendChild(tooltipContainer);

    // text to describe what the parameter is
    let descriptionNode = document.createElement("p");
    descriptionNode.innerHTML = options[index];
    divNode.appendChild(descriptionNode);

    leftSideNode.appendChild(descriptionNode);
    divNode.appendChild(leftSideNode);

    let rightSideNode = document.createElement("div");
    rightSideNode.className = "half";

    // if needed, add extra text at beggining
    if(extras[index][0]) {
        let descriptionNode = document.createElement("p");
        descriptionNode.innerHTML = extras[index][1];
        // at margin for spacing between input
        descriptionNode.style.marginRight = "10px";

        rightSideNode.appendChild(descriptionNode);
    }

    let longInputLength = "135px";

    /**
     * actual input or inputs, depending on if a range.
     * Note that any step is added even though integers are only accepted,
     * but this is so that formHander.js is the only place that form 
     * validation is handled, which allows consistent error highlighting
     */
    if(range[options.indexOf(options[index])]) {
        let descriptionNode = document.createElement("p");
        descriptionNode.innerHTML = "Between";
        // for some reason these get pushed to the right a little bit more than others
        descriptionNode.style.marginLeft = "-10px";
        rightSideNode.appendChild(descriptionNode);

        let inputNode = document.createElement("input");
        inputNode.className = "rangeInputs";
        inputNode.setAttribute("type", "text");
        inputNode.noValidate;
        
        rightSideNode.appendChild(inputNode);

        descriptionNode = document.createElement("p");
        descriptionNode.innerHTML = "and";
        rightSideNode.appendChild(descriptionNode);

        inputNode = document.createElement("input");
        inputNode.className = "rangeInputs";
        inputNode.setAttribute("type", "text");
        inputNode.noValidate;
        
        rightSideNode.appendChild(inputNode);
    }
    else {
        let inputNode = document.createElement("input");
        inputNode.setAttribute("type", "text");
        inputNode.noValidate;

        // the only inputs that are longer are not range ones (emphasis is not set as a range)
        
        // emphasese is a special case
        if(index == options.length - 1) {
            inputNode.style.width = "40%";
        }
        else if(longInput[index]) {
            inputNode.style.width = longInputLength;
        }

        rightSideNode.appendChild(inputNode);
    }

    // if needed, add extra text at end
    if(!extras[index][0]) {
        let descriptionNode = document.createElement("p");
        descriptionNode.innerHTML = extras[index][1];
        // at margin for spacing between input
        descriptionNode.style.marginLeft = "10px";
        descriptionNode.style.fontSize = "14px";

        rightSideNode.appendChild(descriptionNode);
    }

    // emphases parameter is a special case
    if(index == options.length - 1) {
        divNode.id = "emphasesParameter";
        // make the height large enough for all of the inputs
        let newHeight = ((30 * 6) + 12) + "px";
        divNode.style.height = newHeight;
        // for some reason the bottom margin of the element above emphases is double what it's supposed to be
        divNode.style.marginTop = "-20px";
        divNode.style.marginBottom = "40px";

        rightSideNode.children[rightSideNode.children.length - 2].style.marginBottom = "5px";

        // border is to high for emphasis, so have to change it
        leftSideNode.style.border = "none";
        rightSideNode.style.border = "none";
        divNode.style.borderBottom = "1px solid var(--thirdColor)";

        divNode.style.alignItems = "flex-start";
        rightSideNode.style.flexDirection = "column";
        rightSideNode.style.alignItems = "flex-start";
        
        for(let i = 1; i < 5; i++) {
            let inputNode = document.createElement("input");
            inputNode.setAttribute("type", "text");
            
            inputNode.style.width = "40%";
            inputNode.style.marginTop = "5px";
            
            rightSideNode.appendChild(inputNode);
        }
        
        // add remove button
        let removeNode = document.createElement("img");
        removeNode.setAttribute("src", "Images/delete.png");
        removeNode.setAttribute("onclick", "removeParameter(this)");
        removeNode.classList.add("icon", "hoverEffect", "removeButton");
        removeNode.style.position = "absolute";
        removeNode.style.marginLeft = "215px";
        removeNode.style.marginTop = "-5px";
        rightSideNode.appendChild(removeNode);
    }
    else {
        // add remove button
        let removeNode = document.createElement("img");
        removeNode.setAttribute("src", "Images/delete.png");
        removeNode.setAttribute("onclick", "removeParameter(this)");
        removeNode.classList.add("icon", "hoverEffect", "removeButton");
        rightSideNode.appendChild(removeNode);
    }


    // add selected parameter to the list of parameters the user has chosen
    added.push(options[index]);
    
    // remove selected parameter from availables
    let removeIndex = availableOptions.indexOf(options[index]);
    availableOptions.splice(removeIndex, 1);

    // // remove select
    // containerRef.removeChild(ref);

    divNode.appendChild(rightSideNode);

    // actually add input stuff
    containerRef.appendChild(divNode);

    // scroll to the bottom of the page
    window.scrollTo({
        top: window.innerHeight, 
        behavior: "smooth"
    });
}

function removeParameter(ref) {
    // the reference the div the button is in
    let parent = ref.parentElement.parentElement;
    // get the p element of div that is the name of the parameter
    let paramName = parent.children[0].children[1].innerHTML;

    // removing parameter from added
    for(let i = 0; i < added.length; i++) {
        if(added[i] == paramName) {
            added.splice(i, 1);
        }
    }

    // add parameter back into available
    availableOptions.push(paramName)

    // preserver original order of options
    let tempAvailableOptions = [];

    for(let i = 0; i < options.length; i++) {
        for(let j = 0; j < availableOptions.length; j++) {
            if(options[i].includes(availableOptions[j])) {
                tempAvailableOptions.push(options[i]);
            }
        }
    }

    availableOptions = [...tempAvailableOptions];

    // actually remove element
    containerRef.removeChild(parent);

    /**
     * add select element
     * This is done so that the select element can be updated with the new available option, 
     * while also preserving the original order, instead of just adding the new available option 
     * to the bottom
     * Additionally, by adding the select elemnt it adds it back in when all parameters have been 
     * added and the select goes away
     */
    // can just add select back in becasue it wasn't there from all parameters have been added
    if(added.length == options.length - 1) {
        addParameterSelection(false);
    }
    else {
        // remove current select
        let ref = containerRef.children[containerRef.children.length - 1];
        containerRef.removeChild(ref);

        // actually add select
        addParameterSelection(false);
    }
}