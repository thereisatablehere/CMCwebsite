/**
 * -Close icon from: https://www.flaticon.com/free-icon/cancel_1008968?term=close&page=1&position=96&origin=search&related_id=1008968
 */

// localStorage.setItem("setFakeData", false);

let setFakeData = localStorage.getItem("setFakeData");
if(setFakeData != "true") {
    console.log("fake data init");

    let unames = ["regular", "admin"];
    let passwords = ["password", "password"];
    let firstNames = ["Hello", "General"];
    let lastNames = ["There", "Kenobi"];
    let utypes = [1, 2];

    // let savedSchoolNames = [
    //     "St. John's", 
    //     "other school", 
    //     "another one", 
    //     "school other"
    // ];
    // // year, month, day, hour, minute, second
    // let savedSchooolAdded = [
    //     "2021/2/1 2:1:1", 
    //     "2020/4/3 4:3:2", 
    //     "2019/6/5 6:5:3", 
    //     "2018/8/7 8:7:4", 
    // ];
    // localStorage.setItem("savedSchoolNames", savedSchoolNames);
    // localStorage.setItem("savedSchoolAdded", savedSchooolAdded);
    
    // localStorage.removeItem("savedSchoolNames");
    // localStorage.removeItem("savedSchoolAdded");

    let schools = [
        "St. John's_MN_Small-City_Private_10000_45_675_675_3314_1150_0_60_5_3_7_1_Biology|English|History|Liral Arts|Thing", 
        "other school_WI_Urban_Private_2000_55_67_675_3014_1150_2_0_1_3_4_1_Biolo|English|Hitory|Liberal Arts|Something", 
        "another one_TX_Urban-City_City_300_65_675_65_3304_1500_0_0_5_1_2_1_Biology|Enish|Hiory|Libal Arts|What", 
        "school other_FL_Suburban_State_50_75_65_75_3014_11500_20_60_5_3_4_1_Biogy|English|History|Libal Arts|How", 
    ]

    localStorage.setItem("unames", unames);
    localStorage.setItem("firstNames", firstNames);
    localStorage.setItem("lastNames", lastNames);
    localStorage.setItem("passwords", passwords);
    localStorage.setItem("utypes", utypes);
    
    localStorage.setItem("firstName", firstNames[0]);
    localStorage.setItem("lastName", lastNames[0]);
    localStorage.setItem("password", passwords[0]);


    localStorage.setItem("schools", schools);

    localStorage.setItem("setFakeData", true);
}

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
    userType: 0,// guest, regular user, admin 
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
                href: "logout.html", 
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
                href: "logout.html", 
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

    if(localStorage.getItem("userType") == "1" || localStorage.getItem("userType") == "2") {
        popup.userType = parseInt(localStorage.getItem("userType"));
    }
    else {
        popup.userType = 0;
    }


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
    let parent = document.getElementById("loginForm");
    let enteredUsername = parent.children[1].value;
    let enteredPassword = parent.children[3].value;

    let unames = localStorage.getItem("unames").split(",");
    let firstNames = localStorage.getItem("firstNames").split(",");
    let lastNames = localStorage.getItem("lastNames").split(",");
    let passwords = localStorage.getItem("passwords").split(",");
    let utypes = localStorage.getItem("utypes").split(",");
    
    for(let i = 0; i < unames.length; i++) {
        if(enteredUsername == unames[i] && enteredPassword == passwords[i]) {
            popup.userType = parseInt(utypes[i]);

            localStorage.setItem("userType", utypes[i]);

            localStorage.setItem("username", unames[i]);
            localStorage.setItem("firstName", firstNames[i]);
            localStorage.setItem("lastName", lastNames[i]);
            localStorage.setItem("password", passwords[i]);
        }
    }


    if(popup.userType != 0) {
        document.getElementById("loginForm").action = "index.html";
    }

    return true;
}