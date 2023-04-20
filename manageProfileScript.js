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
    // set what inputs are editable
    const editable = [
        "u", 
        [0, 1, 3], 
        "a", 
        [0, 1, 2, 3, 4]
    ];

    document.getElementById("type").addEventListener("keydown", validateType);

    let containerRef = document.getElementById("container");
    let userTypeIndex = editable.indexOf(document.getElementById("type").value) + 1;

    if(userTypeIndex == 1) {
        document.getElementsByClassName("topInfo")[0].innerHTML += " Because you are only a regular user, you can only edit some of your inormation."
    }


    for(let i = 2; i < containerRef.children.length; i++) {
        if(editable[userTypeIndex].includes(i - 2)) {
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
        }
    }
}