let inputValue = "";
let inputValueOnFocus = "";
let ref;

function getValue(element, value) {
    return window.getComputedStyle(element).getPropertyValue(value);
}

function addTextareaEventListeners(element) {
    element.addEventListener("input", function() {
        getInput(this.value);
    });

    element.addEventListener("keydown", clearFocus);
    
    element.addEventListener("focusout", function() {
        checkIfUpdate(this);
    });

    element.addEventListener("focus", function() {
        setOnFocusValue(this.value);
    });
}

function init() {
    ref = document.getElementsByClassName("universitiesContainer")[0];

    let bodyWidth = parseFloat(getValue(document.body, "width").split("px")[0]);
    let bodyHeight = parseFloat(getValue(document.body, "height").split("px")[0]);

    if(ref.scrollWidth > bodyWidth) {
        ref.style.overflowX = "scroll";
    }
    if(ref.scrollHeight > bodyHeight) {
        ref.style.overflowY = "scroll";
    }
    
    let textareas = ref.getElementsByTagName("textarea");
    for(let i = 0; i < textareas.length; i++) {
        addTextareaEventListeners(textareas[i]);
    }
    
}

function getInput(value) {
    if(!(value === undefined) &&value.length > 0) {
        inputValue = value;
    }
}

function checkIfUpdate(element) {
    if(!(element.value === undefined) && element.value.length < 1) {
        element.value = inputValue;
    }
}

function clearFocus(e) {
    if(e.code == "Enter" || e.code == "Escape") {
        let element = document.activeElement;

        element.blur();

        if(e.code == "Escape") {
            element.value = inputValueOnFocus;
        }
    }
}

function checkIfSortNewUniversity(element) {
    let unique = false;

    // back end: check if school name or username is unique
    if(element.value.length > 0 && unique) {

        console.log("sorted");
    }
    else {
        element.addEventListener("focusout", function() {
            checkIfSortNewUniversity(this);
        }, {once: true});
    }
}

function setOnFocusValue(value) {
    if(!(value === undefined)) {
        inputValueOnFocus = value;
    }
}

const deactivateButtonContent = `
<img class="icon deactivateUser" src="Images/off.png" onclick="deactivateUser(this)"><textarea></textarea>
`;

function addUniversity(index) {
    for(let i = 0; i < ref.children.length; i++) {
        let element = document.createElement("div");
        let textarea = document.body;
        
        if(index == 2 && (i == 0 || i == 5)) {
            if(i === 0) {
                element.innerHTML = deactivateButtonContent;
            }
            else if(i == 5) {
                textarea = document.createElement("textarea");

                textarea.value = "Y";

                element.appendChild(textarea);
            }
        }
        else {
            textarea = document.createElement("textarea");

            element.appendChild(textarea);
        }

        
        ref.children[i].insertBefore(element, ref.children[i].children[1]);

        addTextareaEventListeners(textarea);


        if(i === index) {
            textarea.addEventListener("focusout", function() {
                checkIfSortNewUniversity(this);
            }, {once: true});
        }
    }
}

document.body.addEventListener("onload", init());