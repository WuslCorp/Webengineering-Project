let data = [];

function saveEntry() {
    const frontInput = document.getElementById("frontInput").value;
    const backInput = document.getElementById("backInput").value;

    if (frontInput && backInput) {
        data.push({ front: frontInput, back: backInput });
        renderTable();
        document.getElementById("frontInput").value = "";
        document.getElementById("backInput").value = "";
    }
}

function deleteEntry(front, back) {
    const index = data.findIndex(item => item.front === front && item.back === back);
    if (index !== -1) {
        data.splice(index, 1);
        renderTable();
    }
}

function renderTable() {
    const tableContainer = document.getElementById("dataTable");
    tableContainer.innerHTML = ""; // Tabelle leeren

    // Erstelle die Header-Zeile
    const headerRow = document.createElement("div");
    headerRow.classList.add("table-row", "table-header");

    // Titelzelle Front
    const frontHeaderCell = document.createElement("div");
    frontHeaderCell.classList.add("table-cell");
    frontHeaderCell.textContent = "Front";
    frontHeaderCell.addEventListener("click", () => sortTable("front"));

    // Titelzelle Back
    const backHeaderCell = document.createElement("div");
    backHeaderCell.classList.add("table-cell");
    backHeaderCell.textContent = "Back";
    backHeaderCell.addEventListener("click", () => sortTable("back"));

    // Titelzelle für "Actions"
    const actionsHeaderCell = document.createElement("div");
    actionsHeaderCell.classList.add("table-cell");


    // Zellen zur Header-Zeile hinzufügen
    headerRow.appendChild(frontHeaderCell);
    headerRow.appendChild(backHeaderCell);
    headerRow.appendChild(actionsHeaderCell);

    // Header-Zeile zur Tabelle hinzufügen
    tableContainer.appendChild(headerRow);

    // Erstelle Zeilen für jeden Eintrag
    data.forEach(item => {
        const row = document.createElement("div");
        row.classList.add("table-row");

        const frontCell = document.createElement("div");
        frontCell.classList.add("table-cell");
        frontCell.textContent = item.front;

        const backCell = document.createElement("div");
        backCell.classList.add("table-cell");
        backCell.textContent = item.back;

        const deleteButtonCell = document.createElement("div");
        deleteButtonCell.classList.add("table-cell");

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteEntry(item.front, item.back));

        deleteButtonCell.appendChild(deleteButton);

        row.appendChild(frontCell);
        row.appendChild(backCell);
        row.appendChild(deleteButtonCell);

        tableContainer.appendChild(row);
    });
}

let sortState = true; // Variable, um den Sortierstatus zu speichern

function sortTable(column) {
    // Sortiere die Daten basierend auf der ausgewählten Spalte und dem Sortierstatus

    // data.reverse();

    data.sort((a, b) => {
        const valueA = a[column].toLowerCase();
        const valueB = b[column].toLowerCase();

        if (valueA < valueB) {
            return sortState ? -1 : 1; // Aufsteigende oder absteigende Sortierreihenfolge
        }
        if (valueA > valueB) {
            return sortState ? 1 : -1; // Aufsteigende oder absteigende Sortierreihenfolge
        }
        return 0; // Gleichwertige Werte
    });

    // Ändere den Sortierstatus für den nächsten Klick
    sortState = !sortState;

    // Rufe die Funktion zum Rendern der Tabelle auf
    renderTable();
}


function filterTable() {
    const filterCheckbox = document.getElementById("filterCheckbox");
    const dataTable = document.getElementById("dataTable");
    const noDataText = "No Data";

    if (filterCheckbox.checked) {
        const frontFilter = document.getElementById("frontInput").value.toLowerCase();
        const backFilter = document.getElementById("backInput").value.toLowerCase();

        const filteredData = data.filter(item =>
            item.front.toLowerCase().includes(frontFilter) && item.back.toLowerCase().includes(backFilter)
        );

        if (filteredData.length > 0) {
            dataTable.innerHTML = "";
            filteredData.forEach(item => {
                const row = document.createElement("div");
                row.className = "table-row";
                row.innerHTML = `<div>${item.front}</div><div>${item.back}</div>`;
                dataTable.appendChild(row);
            });
        } else {
            dataTable.innerHTML = `<div class="table-row">${noDataText}</div>`;
        }
    } else {
        renderTable();
    }
}

renderTable();
