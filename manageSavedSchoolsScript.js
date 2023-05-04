let detailsIsEmpty = true;

const schoolElement = `
<div class="top">
    <img class="icon hoverEffect" src="Images/delete.png" onclick="remove(this.parentNode.parentNode)">
    <h3>Yale</h3>
    <button onclick="view(this)">View</button>
</div>

<div class="bottom">
    <p class="addOnText">added on 2019/01/11 14:57:45</p>
</div>
`;

let schools = [];

function init() {
    let ref = document.getElementsByClassName("detailedSchoolView")[0];

    for(let i = 1; i < ref.children.length; i++) {
        ref.children[i].style.display = "none";
    }

    let names = [];
    let added = [];

    ref = document.getElementsByClassName("savedSchoolsContainer")[0];
    if(localStorage.getItem("savedSchoolNames") != null) {
        names = localStorage.getItem("savedSchoolNames").split(",");
    }
    if(localStorage.getItem("savedSchoolAdded") != null) {
        added = localStorage.getItem("savedSchoolAdded").split(",");
    }
    schools = localStorage.getItem("schools").split(",");

    for(let i = 0; i < names.length; i++) {
        let element = document.createElement("div");
        element.classList.add("schoolSavedContainer");
        element.innerHTML = schoolElement;

        element.children[0].children[1].innerHTML = names[i];
        element.children[1].children[0].innerHTML = "added on " + added[i];

        ref.appendChild(element);
    }

    if(document.getElementsByClassName("savedSchoolsContainer")[0].children.length < 1) {
        notifyNoSaved();
    }
}

function view(element) {
    let ref = document.getElementsByClassName("detailedSchoolView")[0];
    let index = -1;
    let parent = element.parentNode.parentNode.parentNode;
    for(let i = 0; i < parent.children.length; i++) {
        if(parent.children[i].children[0].children[2] == element) {
            index = i;
        }
    }
    for(let j = 0; j < schools.length; j++) {
        if(parent.children[index].children[0].children[1].innerHTML == schools[j].split("_")[0]) {
            schoolIndex = j;
        }
    }

    let data = schools[schoolIndex].split("_");
    
    ref.children[0].style.display = "none";
    
    for(let i = 1; i < ref.children.length; i++) {
        ref.children[i].style.display = "flex";
        
        if(ref.children[i].children[0].innerHTML != "Emphases") {
            ref.children[i].children[1].children[0].innerHTML = data[i - 1];
        }
        else {
            let emphases = data[i - 1].split("|");

            for(let j = 0; j < ref.children[i].children[1].children.length; j++) {
                ref.children[i].children[1].children[j].innerHTML = emphases[j];
            }
        }
    }

    window.scrollTo({
        top: 0, 
        behavior: "smooth"
    });
}

function remove(element) {
    let names = localStorage.getItem("savedSchoolNames").split(",");
    let added = localStorage.getItem("savedSchoolAdded").split(",");
    let index = -1;

    for(let i = 0; i < names.length; i++) {
        if(names[i] == element.children[0].children[1].innerHTML) {
            index = i;

            break;
        }
    }

    names.splice(index, 1);
    added.splice(index, 1);

    localStorage.setItem("savedSchoolNames", names);
    localStorage.setItem("savedSchoolAdded", added);


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

document.body.addEventListener("onload", init());