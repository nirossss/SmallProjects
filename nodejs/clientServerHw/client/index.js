const apiPath = 'http://localhost:3000/events';
const newGuestPath = 'http://localhost:3000/newGuest';

const getEventsFromApi = async (path) => {
    const response = await fetch(path, { credentials: 'include' });
    return await response.json();
}

const inputToDocElement = (id, input) => {
    document.getElementById(id).innerHTML = input;
}

const createEventsList = async () => {
    const data = await getEventsFromApi(apiPath);
    let inputStr = '';
    for (let i = 0; i < data.length; i++) {
        inputStr += `
            <li>${data[i].title} ${data[i].place} ${data[i].date} </li>
        `
    }
    return inputStr;
}

(async () => {
    let inputList = await createEventsList();
    let inputGuest = await getEventsFromApi(newGuestPath);
    inputToDocElement('guest-status', inputGuest);
    inputToDocElement('events-list', inputList);
})();

