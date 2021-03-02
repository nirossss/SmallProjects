                                        /* form control */

/* reviling the form switch */
function show_form(btn ,fdiv) {
    let add_new_note_btn = document.getElementById('open_hidden_div');
    let note_form_div = document.getElementById('hidden_div');
    add_new_note_btn.style.display = btn;
    note_form_div.style.display = fdiv;
};

/*
 give a YES NO alert before clearing the form inputs.
 IF INPUTS HAVE VALUE(any text is value, BUT need full time and date picks for value)
*/
function alert_function(){
    let textarea_input = document.getElementById('note_text').value;
    let date_input = document.getElementById('note_date').value;
    let time_input = document.getElementById('note_time').value;
        if (textarea_input != '' || date_input != '' || time_input != ''){
            let confirm_clear = window.confirm('Are you sure you want to clear the form?');
            if (confirm_clear) {
                document.getElementsByTagName('form')[0].reset();
                closeForm('inline-block');
            };
        }
        else {
            document.getElementsByTagName('form')[0].reset();
            closeForm('inline-block');
        }
};

/* hide X icon in form after typing in text area SWITCH */
function closeForm(sd){
    document.getElementById('closeForm').style.display = sd;
};

                                    /* editing new notes */

var new_notes_array = [];

/* create old notes that client didnt deleted when back to page*/
old_notes();

/* create and show new note from form inputs + old notes*/
function draw_new_note() {
    local_storage_function();
    str = '';
    for (let i=0; i<(new_notes_array.length); i++){
        str += '<div class="col-3" id="new_note"><div class="row" id="inside_new_note"><div class="col-10" id="new_note_inputs" onkeypress="dontType();">'; 
        str += '<textarea id="new_note_text" rows="7" disabled>' + new_notes_array[i].text + '</textarea>';
        str += '<div id="new_note_date">' + new_notes_array[i].date + '</div>';
        str += '<div id="new_note_time">' + new_notes_array[i].time + '</div></div>';
        str += '<div class="col-2" id="delete_new_note" onClick="delete_note(' + i + ');"><i class="fa fa-times" id="delete_icon"></i></div>';
        str += '</div></div>';
        };

    document.querySelector('#all_notes').innerHTML = str;
                        // for fade-in animation on the new note ONLY
        if (new_notes_array.length > 0){
            document.querySelectorAll('#new_note')[new_notes_array.length-1].classList.add("last_note");
        };
};

/* push new note object to the main array in local storage */
function creat_new_note() {
    let textarea_input = document.getElementById('note_text').value;
    let date_input = document.getElementById('note_date').value;
    let time_input = document.getElementById('note_time').value;
    if (textarea_input == ''){
        alert('Your note is empty.');
    };
        var new_note_obj = {
            text : textarea_input,
            date : date_input,
            time : time_input,
        };
                            // push input object to main array and save array in local storage
        new_notes_array.push(new_note_obj);
        local_storage_setitems();
                            // hide the form div and create the new note
        show_form('block','none');
        closeForm('inline-block');
        draw_new_note();
                            // reset form values
        document.getElementsByTagName('form')[0].reset();
};

/* delete the note from page and local storage */
function delete_note(key) {
    let delete_confirm = window.confirm('Are you sure you want to delete the note?');
    if (delete_confirm){
    new_notes_array.splice(key,1);
    local_storage_setitems();
                        // call old notes, disabling fade-in animation for last note
    old_notes();
    };
};

/* save main array as string in local storage */
function local_storage_setitems() {
    localStorage.setItem('saved_notes' , JSON.stringify(new_notes_array));
};

/* make the string array from local storage back to JSON format and save him as main array */
function local_storage_function(){
    if (localStorage.getItem('saved_notes') != null){
        let notes_from_local_storage = JSON.parse(localStorage.getItem('saved_notes'));
        new_notes_array = notes_from_local_storage;
    };
};

/* create notes from local storage array, DID IT FOR ANIMATION CONTROL */
function old_notes(){
    local_storage_function();
    str = '';
    for (let i=0; i<(new_notes_array.length); i++){
        str += '<div class="col-3" id="new_note"><div class="row" id="inside_new_note"><div class="col-10" id="new_note_inputs" onkeypress="dontType();">'; 
        str += '<textarea id="new_note_text" rows="7" disabled>' + new_notes_array[i].text + '</textarea>';
        str += '<div id="new_note_date">' + new_notes_array[i].date + '</div>';
        str += '<div id="new_note_time">' + new_notes_array[i].time + '</div></div>';
        str += '<div class="col-2" id="delete_new_note" onClick="delete_note(' + i + ');"><i class="fa fa-times" id="delete_icon"></i></div>';
        str += '</div></div>';
        };

    document.querySelector('#all_notes').innerHTML = str;
};