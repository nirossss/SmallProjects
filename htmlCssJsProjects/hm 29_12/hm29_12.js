student1 = {
	firstName : "David",
	lastName : "a",
    score : "100",
    notes : ""
};
student2 = {
	firstName : "Nir",
	lastName : "b",
    score : "90",
    notes : ""
};
student3 = {
	firstName : "Shimi",
	lastName : "c",
    score : "80",
    notes : ""
};

var students = [student1, student2, student3];
drawTable();

function drawTable(){
    str = '';
    for (i=0; i<students.length; i++){
        str += '<tr>';
        str += '<td>' + students[i].firstName + '</td>';
        str += '<td>' + students[i].lastName + '</td>';
        str += '<td>' + students[i].score + '</td>';
        str += '<td id="notekey' + i + '">' + students[i].notes + '</td>';
        str += '</tr>';
    };

    document.getElementById('tBody').innerHTML = str;
};

function creatNote(){
    toNotes = document.getElementById('noteText').value;
    key = document.getElementById('chooseStudent').value;
        if (key == 'none'){
            alert('Choose student');
            return false;
        };
    document.getElementById('notekey' + key).innerText = toNotes;
};

function resetTextArea(){
    let confirmReset = window.confirm('Are you sure you want to clear the form?')
    if (confirmReset) {
        document.getElementsByTagName('form')[0].reset()
    };
};