const URL = 'https://docs.google.com/spreadsheets/u/4/d/1pzLOYCr3BvCYfuB7zIyuTvi_aOcAG7R7AAxAYpbnEA8/export?format=tsv&id=1pzLOYCr3BvCYfuB7zIyuTvi_aOcAG7R7AAxAYpbnEA8&gid=0';
const SEP_LINE = '\r\n';
const SEP_CELL = '\t';
const DOM_TABLE = document.querySelector('.mvc'); // Зміна DOM елемента

function loadData() {
    fetch(URL)
        .then(response => response.text())
        .then(body => parseData(body))
        .then(data => render(data));
}

function parseData(body) {
    const table = body
        .split(SEP_LINE)
        .map(element => element.split(SEP_CELL));
    const headers = table.shift();

    return {
        headers: headers,
        mvc: table.map(element => {
                const item = {};
                headers.forEach((header, i) => item[header] = element[i]);
                return item;
            }
        )
    };
}

function render(data) {
    DOM_TABLE.innerHTML = `
    ${header(data.headers)}
    <tbody>
        ${body(data.mvc)}
    </tbody>`;
}

function header(headers) {
    return `
    <thead>
    <tr>
        <th scope="col">Предмет</th>
        <th scope="col">Початок</th>
        <th scope="col">Кінець</th>
    </tr>
    </thead>`;
}

function body(mvc) {
    return `
    <tbody>
        ${mvc.map(it => row(it)).join("")}
    </tbody>`;
}

function row(item) {
    return `
    <tr>
        <td>${item['subject']}</td>
        <td>${item['start']}</td>
        <td>${item['finish']}</td>
    </tr>`;
}

loadData();
