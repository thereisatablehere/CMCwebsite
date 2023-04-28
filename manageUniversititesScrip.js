let inputValues = [];
let inputValuesOnFocus = [];

function init() {
    let ref = document.getElementsByClassName("universitiesContainer")[0];
    
    let textareas = ref.getElementsByTagName("textarea");
    for(let i = 0; i < textareas.length; i++) {
        textareas[i].addEventListener("input", function() {
            getInput(this.value ,i);
        });

        textareas[i].addEventListener("keydown", clearFocus);

        textareas[i].addEventListener("focusout", function() {
            checkIfUpdate(this.value ,i);
        });

        textareas[i].addEventListener("focus", function() {
            setOnFocusValue(this.value ,i);
        });
        
        inputValues.push(textareas[i].innerHTML);
        inputValuesOnFocus.push(textareas[i].innerHTML);
    }
    
}

let lastIndex = -1;

function getInput(value, index) {
    if(value.length > 0) {
        inputValues[index] = value;
    }
}

function checkIfUpdate(value, index) {
    if(value.length < 1) {
        document.getElementsByClassName("universitiesContainer")[0].getElementsByTagName("textarea")[index].value = inputValues[index];
    }
}

function clearFocus(e) {
    if(e.code == "Enter" || e.code == "Escape") {
        let element = document.activeElement;

        element.blur();

        if(e.code == "Escape") {
            element.value = inputValuesOnFocus[lastIndex];
        }

    }
}

function setOnFocusValue(value, index) {
    inputValuesOnFocus[index] = value;

    lastIndex = index;
}

document.body.addEventListener("onload", init());