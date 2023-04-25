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