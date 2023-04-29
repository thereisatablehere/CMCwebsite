function toggleBookmark(element) {
    let ref = element;
    let refSrc = (ref.src.split("Images/"))[1];
    let schoolName = element.parentNode.children[1].innerHTML;

    if(refSrc == "bookmark_open.png") {
        ref.src = "Images/bookmark_filled.png";

        // back end: add school to saved here
    }
    else {
        ref.src = "Images/bookmark_open.png";

        // back end: remove school from saved here
    }
}

function backToSearch() {
    // back end: do JSP stuff to let website know that when loading the search page, the previously entered in information should be loaded

    window.open("search.html", "_self");
}

function getValue(element, value) {
    return window.getComputedStyle(element).getPropertyValue(value);
}

const detailView = `
<div class="detailedSchoolView">
<div>
    <p>School</p>
    <div class="detailedSchoolViewData">
        <p>Yale</p>
    </div>
</div>

<div>
    <p>State</p>
    <div class="detailedSchoolViewData">
        <p>Connecticuta</p>
    </div>
</div>

<div>
    <p>Location</p>
    <div class="detailedSchoolViewData">
        <p>Small-City</p>
    </div>
</div>

<div>
    <p>Control</p>
    <div class="detailedSchoolViewData">
        <p>Private</p>
    </div>
</div>

<div>
    <p>Number of Students</p>
    <div class="detailedSchoolViewData">
        <p>10,000</p>
    </div>
</div>

<div>
    <p>% Female</p>
    <div class="detailedSchoolViewData">
        <p>45</p>
    </div>
</div>

<div>
    <p>SAT Verbal</p>
    <div class="detailedSchoolViewData">
        <p>675</p>
    </div>
</div>

<div>
    <p>SAT Math</p>
    <div class="detailedSchoolViewData">
        <p>675</p>
    </div>
</div>

<div>
    <p>Expenses</p>
    <div class="detailedSchoolViewData">
        <p>$33,014</p>
    </div>
</div>

<div>
    <p>% Financial Aid</p>
    <div class="detailedSchoolViewData">
        <p>40</p>
    </div>
</div>

<div>
    <p>Number of Applicants</p>
    <div class="detailedSchoolViewData">
        <p>11,500</p>
    </div>
</div>

<div>
    <p>% Admitted</p>
    <div class="detailedSchoolViewData">
        <p>20</p>
    </div>
</div>

<div>
    <p>% Enrolled</p>
    <div class="detailedSchoolViewData">
        <p>60</p>
    </div>
</div>

<div>
    <p>Academics Scale</p>
    <div class="detailedSchoolViewData">
        <p>5</p>
    </div>
</div>

<div>
    <p>Social Scale</p>
    <div class="detailedSchoolViewData">
        <p>3</p>
    </div>
</div>

<div>
    <p>Quality of Life Scale</p>
    <div class="detailedSchoolViewData">
        <p>4</p>
    </div>
</div>

<div>
    <p>Emphases</p>
    <div class="detailedSchoolViewData emphasesData">
        <p>Biology</p>
        <p>English</p>
        <p>History</p>
        <p>Liberal Arts</p>
        <p></p>
    </div>
</div>

</div>
`;

const similarSaveButton = `
<button class="similarSaveButton" onclick="toggleSimilarSave(this)">Save</button>
`;

const closeMoreSchools = `
<img class="icon hoverEffect closeMoreSchool" src="Images/close.png">
`;

let move = {
    ref: document.body, 
    secondRef: document.body, 
    startMargin: 0, 
    secondStartMargin: 0, 
    margin: 0, 
    secondMargin: 0,
    fps: Math.floor(1000 / 60), 
    speed: 100, 
    init: function() {
        this.ref = document.getElementsByClassName("leftRightContainer")[0];
        this.startMargin = parseFloat(getValue(this.ref, "margin-left").split("px")[0]);
        this.margin = this.startMargin;

        this.secondRef = document.getElementsByClassName("detailedSchoolView")[0];
        this.secondStartMargin = parseFloat(getValue(this.secondRef, "margin-left").split("px")[0]);
        this.secondMargin = parseFloat(getValue(this.secondRef, "margin-left").split("px")[0]);
    }, 
    play: function() {
        if(move.margin == move.startMargin) {
            move.init();
            
            let ref = document.getElementsByClassName("moreSchools")[0];

            ref.classList.remove("moreSchoolsGreenBackground");
            ref.classList.add("moreSchoolsGreyBackground");
        }

        
        
        move.ref.style.marginLeft = move.margin + "px";
        move.margin -= move.speed;
        
        if(move.secondMargin > 10) {
            move.secondRef.style.marginLeft = move.secondMargin + "px";
            move.secondMargin -= 10;
        }

        if(move.margin >= 0 - (move.startMargin / 8)) {
            window.setTimeout(move.play, move.fps)
        }
        else {
            let elements = document.getElementsByClassName("top");
            for(let i = 0; i < elements.length; i++) {
                elements[i].style.justifyContent = "flex-end";

                elements[i].children[0].style.order = 2;
                elements[i].children[1].style.order = 1;
                elements[i].children[2].style.order = 3;
            }

            move.swing();
        }
    }, 
    swing: function() {
        this.ref = document.getElementsByClassName("moreSchools")[0];
        let ref = this.ref;

        ref.removeAttribute("onclick");
        ref.classList.remove("moreSchoolsHover");
        ref.classList.add("moreSchoolsSecondForm");
        // ref.innerHTML = "<p style='border-bottom: 1px solid var(--mainColor)'><strong>Similar Schools</strong></p>";
        ref.innerHTML = "<p><strong>Similar Schools</strong></p>";

        let duration = 0.25;
        ref.style.animationDuration = duration + "s";
        ref.style.animationName = "moreSchoolsTransition"

        window.setTimeout(this.addContent, (duration * 1000));
    }, 
    addContent: function() {
        for(let i = 0; i < 5; i++) {
            move.ref.innerHTML += similarSaveButton;

            if(similarSaves.length < 5) {
                move.ref.children[move.ref.children.length - 1]
                similarSaves.push(move.ref.children[move.ref.children.length - 1]);
                move.ref.children[move.ref.children.length - 1].classList.add("save");
            }
            else {
                let element = similarSaves[i];
                let ref = move.ref.children[move.ref.children.length - 1];
 
                if(element.innerHTML.toLowerCase() == "save") {
                    ref.classList.add("save");
                }
                else {
                    ref.innerHTML = "unsave";
                    ref.classList.add("unsave");
                }
            }
            
            // back end: get and add the similar schools here
            move.ref.innerHTML += detailView;
        }

        let element = document.createElement("img");
        element.setAttribute("src", "Images/close.png");
        element.classList.add("icon");
        element.classList.add("hoverEffect");
        element.classList.add("closeMoreSchools");
        element.setAttribute("onclick", "move.reversePlay()");
        
        let before = move.ref.children[0];

        move.ref.insertBefore(element, before);
    }, 
    reversePlay: function() {
        this.ref = document.getElementsByClassName("moreSchools")[0];
        let ref = this.ref;
        
        move.ref.innerHTML = "you might also like <em>(click me)</em>";
        ref.classList.remove("moreSchoolsSecondForm");
        ref.classList.add("moreSchools");

        let duration = 0.25;
        ref.style.animationDuration = duration + "s";
        ref.style.animationName = "moreSchoolsReverseTransition";
        
        move.ref = document.getElementsByClassName("leftRightContainer")[0];
        
        window.setTimeout(this.reversePlay2, (duration * 1000));
    }, 
    reversePlay2: function() {
        move.ref.style.marginLeft = move.margin + "px";
        move.margin += move.speed;
        
        if(move.secondMargin < move.secondStartMargin) {
            move.secondRef.style.marginLeft = move.secondMargin + "px";
            move.secondMargin += 10;
        }

        let goal = 0.25 * window.innerWidth;
        if(move.margin < move.startMargin) {
            window.setTimeout(move.reversePlay2, move.fps);
        }
        else {
            move.ref.style.marginLeft = "25%";
            move.secondRef.style.marginLeft = "75px";

            let ref = document.getElementsByClassName("moreSchools")[0];

            ref.classList.remove("moreSchoolsGreyBackground");
            ref.classList.add("moreSchoolsGreenBackground");

            let elements = document.getElementsByClassName("top");
            
            for(let i = 0; i < elements.length; i++) {
                elements[i].style.justifyContent = "flex-start";

                elements[i].children[1].style.order = 2;
                elements[i].children[0].style.order = 1;
                elements[i].children[2].style.order = 3;
            }

            ref.classList.remove("moreSchools");
            ref.classList.add("moreSchools");
            ref.classList.add("moreSchoolsHover");
            ref.setAttribute("onclick", "showMoreSchools()");
        }
    }
}

function showMoreSchools() {
    move.play();
}

let similarSaves = [];

function toggleSimilarSave(element) {
    let ref = document.getElementsByClassName("moreSchools")[0];
    let refChildren = Array.from(ref.children);
    let i = (refChildren.indexOf(element) / 2) - 1;

    if(element.innerHTML.toLowerCase() == "save") {
        // back end: save school

        element.classList.remove("save");
        element.classList.add("unsave");

        element.innerHTML = "unsave";
    }
    else {
        // back end: remove saved school

        element.classList.add("save");
        element.classList.remove("unsave");

        element.innerHTML = "save";
    }
    
    similarSaves[i] = element;
}