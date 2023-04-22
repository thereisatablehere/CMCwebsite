document.body.addEventListener("onload", init());

let detailsIsEmpty = true;

function init() {
    let ref = document.getElementById("container").children[2].children[1];

    for(let i = 1; i < ref.children.length; i++) {
        ref.children[i].style.display = "none";
    }
}

function view(name) {
    if(detailsIsEmpty) {
        let ref = document.getElementById("container").children[2].children[1];
            
        ref.children[0].style.display = "none";
        
        for(let i = 1; i < ref.children.length; i++) {
            ref.children[i].style.display = "flex";
        }
        
        detailsIsEmpty = false;
    }
}

function remove(element) {
    document.getElementsByClassName("savedSchoolsContainer")[0].removeChild(element);

    // if there are no saved schools, let the user know
    if(document.getElementsByClassName("savedSchoolsContainer")[0].children.length < 1) {
        notifyNoSaved();
    }
}

function notifyNoSaved() {
    let node = document.createElement("h4");
    node.innerHTML = "You currently have no saved schools";
    node.style.position = "absolute";
    node.style.marginTop = "150px";
    document.getElementById("container").appendChild(node);

    document.getElementsByClassName("detailedSchoolView")[0].style.visibility = "hidden";
}