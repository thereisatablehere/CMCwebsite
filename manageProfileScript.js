let load = document.body.addEventListener("onload", init());

let showPassword = false;
function togglePasswordVisibility() {
    showPassword = !showPassword;
    
    if(showPassword) {
        document.getElementById("password").type = "text";
    }
    else {
        document.getElementById("password").type = "password";
    }
}

function validateType(e) {
    if(e.key == "u" || e.key == "a") {
        document.getElementById("type").value = e.key;
    }
}

let originalValue = "";

function getOriginalValue(element) {
    if(!element.readOnly) {
        // show type instructions
        if(element.id == "type") {
            document.getElementById("typeInstructions").style.visibility = "visible";
        }
        
        if(element.value.length > 0) {
            originalValue = element.value;
        }
    }
    // don't add border if not editable
    else {
        element.style.border = "none";
    }
}

// if an input is empty set it to the previous value, but only when the user leaves the input
function ensureMinLength(element) {
    if(element.value.length < 1) {
        element.value = originalValue;
    }
}

function hideTypeInstructions() {
    document.getElementById("typeInstructions").style.visibility = "hidden";
}

function init() {
    let values = [];
    values.push(localStorage.getItem("firstName"));
    values.push(localStorage.getItem("lastName"));
    values.push(localStorage.getItem("username"));
    values.push(localStorage.getItem("password"));
    if(localStorage.getItem("userType") == "1") {
        values.push("u");
    }
    else {
        values.push("a");
    }

    let ref = document.getElementById("container");

    for(let i = 2; i < ref.children.length; i++) {
        if(ref.children[i].children[0].innerHTML == "Password") {
            ref.children[i].children[1].children[0].setAttribute("value", values[i - 2]);
        }
        else {
            ref.children[i].children[1].setAttribute("value", values[i - 2]);
        }
    }

    // set what inputs are editable
    const editable = [
        0, 1, 3
    ];

    let containerRef = document.getElementById("container");

    for(let i = 2; i < containerRef.children.length; i++) {
        if(editable.includes(i - 2)) {
            let ref;

            // password and type have a div that other inputs don't
            if(containerRef.children[i].children[1].children.length > 0) {
                ref = containerRef.children[i].children[1].children[0];
            }
            else {
                ref = containerRef.children[i].children[1];
            }

            ref.readOnly = false;
            ref.style.backgroundColor = "white";

            ref.addEventListener("input", function() {
                getInput(this);
            });
        
            ref.addEventListener("keydown", clearFocus);
            
            ref.addEventListener("focusout", function() {
                checkIfUpdate(this);
            });
        
            ref.addEventListener("focus", function() {
                setOnFocusValue(this.value);
            });
        }
    }
}

let inputValue = "";
let inputValueOnFocus = "";

function getInput(element) {
    if(!(element.value === undefined) && element.value.length > 0) {
        let a = element.parentNode.children[0].innerHTML.toLowerCase();
        if(element.parentNode.parentNode.className == "profileInfoContainer") {
            a = element.parentNode.parentNode.children[0].innerHTML.toLowerCase();
        }

        if(a.includes(" ")) {
            let b = a.split(" ");
            a = "";
            for(let i = 0; i < b.length; i++) {
                if(i > 0) {
                    a += b[i].charAt(0).toUpperCase() + b[i].slice(1);
                }
                else {
                    a += b[i];
                }
            }
        }

        let temp = localStorage.getItem(a + "s");
        b = temp.split(",");
        for(let i = 0; i < b.length; i++) {
            if(localStorage.getItem(a) == b[i]) {
                b[i] = element.value;
            }
        }

        localStorage.setItem((a + "s"), b);

        localStorage.setItem(a, element.value);

        inputValue = element.value;
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

function setOnFocusValue(value) {
    if(!(value === undefined)) {
        inputValueOnFocus = value;
    }
}