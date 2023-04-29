function deactivateUser(element) {
    let parent = element.parentNode.parentNode.parentNode.children[0];
    let childs = Array.from(parent.children);
    let index = -1;

    for(let i = 0; i < childs.length; i++) {
        if(childs[i].children[0] === element) {
            index = i;

            break;
        }
    }

    element.parentNode.parentNode.parentNode.children[5].children[index].children[0].children[0].children[0].checked = false;
    element.parentNode.parentNode.parentNode.children[5].children[index].children[0].children[1].children[0].checked = true;

    // back end: update user status in database
}

/**
 * this essentially turns the user type checkbox into a radio
 */
function onlyCheckOne(element) {
    let parent = element.parentNode.parentNode;
    // get index position of element in container
    let index = (parent.firstElementChild == element.parentNode) ? 0 : 1;

    // deselect all other checkboxes if current is selected
    if(element.checked) {
        for(let i = 0; i < parent.children.length; i++) {
            if(i != index) {
                parent.children[i].children[0].checked = false;
            }
        }
    }
    // don't allow no checks to be selected
    else {
        element.checked = true;
    }
}