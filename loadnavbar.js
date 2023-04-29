/**
 * -Close icon from: https://www.flaticon.com/free-icon/cancel_1008968?term=close&page=1&position=96&origin=search&related_id=1008968
 */

const navbarContent = `
<div id="topLeft">
    <a class='hoverEffect' href="index.html">
        <img id="homeIcon" class="icon" src="Images/home.png">
        CMC
    </a>
</div>

<div id="topRight">
    <a class='hoverEffect' href="search.html">
        <img id="searchIcon" class="icon" src="Images/search.png">
    </a>
    
    <img class="icon hoverEffect" onclick="toggleAccountPopup()" src="Images/user.png">
</div>

<div id="accountPopup">
    <div class="closePopup">
        <img class="icon" onclick="closeAccountPopup()" src="Images/close.png">
    </div>
    <div id="accountPopupContent"></div>
</div>
`;

let popup = {
    ref: null, 
    userType: 2,// guest, regular user, admin 
    content: [
        // guest
        [
            {
                href: "login.html", 
                text: "Login"
            }, 

        ], 

        // regular user
        [
            {
                href: "manageProfile.html", 
                text: "Manage My Profile"
            }, 
            {
                href: "manageSavedSchools.html", 
                text: "Manage My Saved Schools"
            }, 
            {
                href: "index.html", 
                text: "Logout"
            }
        ], 

        // admin
        [
            {
                href: "manageUniversities.html", 
                text: "Manage Universities"
            }, 
            {
                href: "manageUsers.html", 
                text: "Manage Users"
            }, 
            {
                href: "index.html", 
                text: "Logout"
            }
        ]
    ]
}

let accRef;
let accContentRef;
let showPopup = false;

// actually load navbar into page
// have to make sure that HTML stuff has loaded first
document.body.onload = function () {
    let navbarElement = document.createElement("div");
    navbarElement.id = "navbar";
    navbarElement.innerHTML = navbarContent;
    navbarElement.style.height = "35px";

    document.body.prepend(navbarElement);

    accRef = document.getElementById("accountPopup");
    accContentRef = accRef.children[1];


    loadPopup();
}

function loadPopup() {
    // first remove existing content
    while (accContentRef.children.length > 0) {
        accContentRef.removeChild(accContentRef.children[0]);
    }

    // actually add content
    let contentRef = popup.content[popup.userType];

    for(let i = 0; i < contentRef.length; i++) {
        let element = document.createElement("a");
        element.setAttribute("href", contentRef[i].href);
        element.innerHTML = contentRef[i].text;

        accContentRef.appendChild(element);
    }
}

function toggleAccountPopup() {
    showPopup = !showPopup;

    if(showPopup) {
        loadPopup();
        accRef.style.animationName = "openAccountPopup";
    }
    else {
        accRef.style.animationName = "closeAccountPopup";
    }
}

function closeAccountPopup() {
    showPopup = false;
    accRef.style.animationName = "closeAccountPopup";
}

function login() {
    popup.userType = 1;

    // update the popup incase it is already open
    loadPopup();

    return false;
}