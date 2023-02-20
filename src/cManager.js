const { clipboard } = require('electron');
const clipboardWatcher = require('electron-clipboard-watcher');


function getClipboard() {
    return clipboard.readText();
}

function updateTextList(text, curList) {
    if (text !== curList[0]) {
        curList.unshift(text);
    } else {
        return;
    }

    return curList;
}

function render(curList) {

    let cListElement = document.getElementById('histories');

    cListElement.innerHTML = '';

    curList.forEach(i => {
        const item = document.createElement('li');
        item.innerText = i;
        item.addEventListener('click', () => {
            clipboard.writeText(i)
        })
        cListElement.appendChild(item);
    });

}

function updateHistory() {
    const cHistories = [];

    clipboardWatcher({
        onTextChange: function () {
            let curText = getClipboard();
            let curList = updateTextList(curText, cHistories);
            render(curList);
        }
    })
}

window.addEventListener('DOMContentLoaded', () => {
    updateHistory();
})