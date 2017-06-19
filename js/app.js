const table = document.querySelector("table");
const DATA = {};
let cells;

function focus(e) {
    e.target.value = localStorage[e.target.id] || "";
}

function blur(e) {
    localStorage[e.target.id] = e.target.value;
    computeAll();
}

function computeAll() {
    cells.forEach((elm) => { 
        try { 
            elm.value = DATA[elm.id]; 
        } 
        catch(e) {
            console.log(e);
        } 
    });
}

function drawTable(table, rows, columns) {
    for (let i=0; i<rows; i++) {
        const row = table.insertRow(-1);
        for (let j=0; j<columns; j++) {
            const letter = String.fromCharCode("A".charCodeAt(0)+j-1);
            row.insertCell(-1).innerHTML = i&&j ? "<input id='"+ letter+i +"'/>" : i||letter;
        }
    }
}

function initCells(cells) {
    cells.forEach((cell) => {
        cell.onfocus = focus;
        cell.onblur = blur;
        let getter = function() {
            const value = localStorage[cell.id] || "";
            if (value.charAt(0) == "=") {
                with (DATA) return eval(value.substring(1));
            } else { return isNaN(parseFloat(value)) ? value : parseFloat(value); }
        };
        Object.defineProperty(DATA, cell.id, {get:getter});
        Object.defineProperty(DATA, cell.id.toLowerCase(), {get:getter});
    });
}

drawTable(table, 10, 10);
cells = document.querySelectorAll("input");
initCells(cells);
computeAll();