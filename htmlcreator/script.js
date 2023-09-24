let draggedElement;
let elementsOrder = [];

function dragStart(event) {
    draggedElement = event.target;
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    if (!draggedElement) return;
    
    const elementType = draggedElement.getAttribute('data-content');
    let newElement;

    if (elementType === "variable") {
        newElement = document.createElement('span');
        newElement.innerText = `<variable>${draggedElement.getAttribute('data-name')}</variable>`;
    } else {
        const hasInnerButton = ["div", "array"].includes(elementType);
        newElement = createTagElement(elementType, hasInnerButton);
    }

    if (elementType === "function") {
        newElement = createFunctionElement();
    }

    // Record the addition in the JSON structure
    elementsOrder.push(elementType);
    console.log(JSON.stringify(elementsOrder));

    if (newElement) {
        event.target.replaceWith(newElement);
    }
}


function createTagElement(tagName, hasInnerButton = false) {
    const container = document.createElement('div');
    container.style.display = 'inline-block';
    container.style.marginRight = '5px';

    const startTag = document.createElement('span');
    startTag.innerText = `<${tagName}>`;

    let innerAddButton;
    if (hasInnerButton) {
        innerAddButton = document.createElement('button');
        innerAddButton.innerText = "+";
        innerAddButton.onclick = function () {
            addDropAreaInsideElement(container);
            innerAddButton.remove(); // Remove the inner "+" button after it's clicked
            elementsOrder.push('dropArea');
            console.log(JSON.stringify(elementsOrder));
        };
    }

    const endTag = document.createElement('span');
    endTag.innerText = `</${tagName}>`;

    const outerAddButton = document.createElement('button');
    outerAddButton.innerText = "+";
    outerAddButton.onclick = function () {
        addDropAreaAfterElement(container);
        elementsOrder.push('dropArea');
        console.log(JSON.stringify(elementsOrder));
    };

    container.appendChild(startTag);
    if (innerAddButton) container.appendChild(innerAddButton);
    container.appendChild(endTag);
    container.appendChild(outerAddButton);

    return container;
}

function addDropAreaInsideElement(referenceElement) {
    const dropArea = document.createElement('div');
    dropArea.classList.add('dropArea');
    dropArea.setAttribute('style', 'height: 100px; width: 300px; border: 1px solid black; display: inline-block; margin-right: 5px;');
    dropArea.setAttribute('ondrop', 'drop(event)');
    dropArea.setAttribute('ondragover', 'allowDrop(event)');
    dropArea.innerText = 'Drop here';
    referenceElement.insertBefore(dropArea, referenceElement.children[1]); // Add it before the end tag.
}

function addDropAreaAfterElement(referenceElement) {
    const dropArea = document.createElement('div');
    dropArea.classList.add('dropArea');
    dropArea.setAttribute('style', 'height: 100px; width: 300px; border: 1px solid black; display: inline-block; margin-right: 5px;');
    dropArea.setAttribute('ondrop', 'drop(event)');
    dropArea.setAttribute('ondragover', 'allowDrop(event)');
    dropArea.innerText = 'Drop here';
    referenceElement.parentNode.insertBefore(dropArea, referenceElement.nextSibling);
}


function createFunctionElement() {
    const container = document.createElement('div');
    container.style.display = 'block';
    container.style.marginBottom = '5px';

    const functionDeclaration = document.createElement('span');
    functionDeclaration.innerText = 'public function ';

    const functionNameInput = document.createElement('input');
    functionNameInput.placeholder = "Function Name";
    functionNameInput.style.marginRight = '5px';

    const openParenthesis = document.createTextNode('(');

    const outerAddButton = document.createElement('button');
    outerAddButton.innerText = "+";
    outerAddButton.onclick = function () {
        addDropAreaInPlaceOfButton(outerAddButton);
        elementsOrder.push('dropArea');
        console.log(JSON.stringify(elementsOrder));
    };

    const closeParenthesis = document.createTextNode(')');

    const openBrace = document.createElement('span');
    openBrace.innerText = '{';

    const innerAddButton = document.createElement('button');
    innerAddButton.innerText = "+";
    innerAddButton.onclick = function () {
        addDropAreaInPlaceOfButton(innerAddButton);
        elementsOrder.push('dropArea');
        console.log(JSON.stringify(elementsOrder));
    };

    const closeBrace = document.createElement('span');
    closeBrace.innerText = '}';

    container.appendChild(functionDeclaration);
    container.appendChild(functionNameInput);
    container.appendChild(openParenthesis);
    container.appendChild(outerAddButton);
    container.appendChild(closeParenthesis);
    container.appendChild(document.createElement('br'));
    container.appendChild(openBrace);
    container.appendChild(document.createElement('br'));
    container.appendChild(innerAddButton);
    container.appendChild(document.createElement('br'));
    container.appendChild(closeBrace);

    return container;
}

function createTagElement(tag, withAddButton = false) {
    const container = document.createElement('div');
    container.style.display = 'block';
    container.style.marginBottom = '5px';

    const openTag = document.createElement('span');
    openTag.innerText = `<${tag}>`;
    openTag.style.display = 'block';  // Adjust for vertical layout

    container.appendChild(openTag);

    if (withAddButton) {
        const addButton = document.createElement('button');
        addButton.innerText = "+";
        addButton.onclick = function() {
            addDropAreaInsideElement(container);
            elementsOrder.push('dropArea');
            console.log(JSON.stringify(elementsOrder));
        };
        addButton.style.display = 'block';  // Adjust for vertical layout

        container.appendChild(addButton);
    }

    const closeTag = document.createElement('span');
    closeTag.innerText = `</${tag}>`;
    closeTag.style.display = 'block';  // Adjust for vertical layout

    container.appendChild(closeTag);

    return container;
}

function addDropAreaInPlaceOfButton(clickedButton) {
    const dropArea = document.createElement('div');
    dropArea.classList.add('dropArea');
    dropArea.setAttribute('style', 'height: 100px; width: 300px; border: 1px solid black; display: inline-block; margin-right: 5px;');
    dropArea.setAttribute('ondrop', 'drop(event)');
    dropArea.setAttribute('ondragover', 'allowDrop(event)');
    dropArea.innerText = 'Drop here';

    clickedButton.parentNode.replaceChild(dropArea, clickedButton);
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('customChipInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const chipValue = this.value.trim();
            if (chipValue) {
                const chip = document.createElement('div');
                chip.setAttribute('data-content', 'variable');
                chip.setAttribute('data-name', chipValue);
                chip.setAttribute('draggable', 'true');
                chip.setAttribute('ondragstart', 'dragStart(event)');
                chip.innerText = chipValue;
                document.querySelector('.sidebar').appendChild(chip);
                this.value = '';  // Clear the input
            }
        }
    });
});


