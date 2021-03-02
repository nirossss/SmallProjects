//Data Example 
const data = [
    {
        name: "RAMI RAMTI",
        age: 21,
        grade: 80
        //status: "Active"
    },
    {
        name: "Dani Shovevani",
        age: 28,
        grade: 60,
        status: "active"
    },
    {
        name: "Yossi yesu",
        age: 18,
        status: 'quit',
        notes: 'Quit'
    }
]


const createTable = function (data) {

    //01) Crete Root Table Element
    //Create Table Node
    const table = document.createElement("table");
    //Create row for headers 
    const header = document.createElement("tr");
    //Get Initial Keys of first item

    //02) Get All Keys Available rom all array objects
    let keys = [];
    for (const currentRow of data) {
        for (const key of Object.keys(currentRow)) {
            if (keys.indexOf(key) < 0) {
                keys.push(key);
            }

        }
    }
    //All Keys as columns
    console.log(keys)

    //03)Create Header for table
    for (const key of keys) {
        const th = document.createElement("th");
        th.appendChild(document.createTextNode(key));
        header.appendChild(th);
    }
    table.appendChild(header);

    //04) Create All Rows
    for (var d = 0; d < data.length; d++) {
        const tr = document.createElement("tr");
        var obj = data[d];
        //Keys of current Obects
        var currentKeys = Object.keys(obj);
        for (var k = 0; k < keys.length; k++) {
            var currentKey = keys[k];
            const td = document.createElement("td");
            const content = obj[currentKey] || ''
            td.appendChild(document.createTextNode(content));
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    return table;
}





