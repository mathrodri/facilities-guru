function getOrders() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.status == 200 && this.readyState == 4) {
            mountOrdersTable(JSON.parse(this.response));
        }
    };
    xhttp.open('GET', 'http://localhost:3000/api/order', true);
    xhttp.setRequestHeader('accept', 'application/json');
    xhttp.send();
}

function mountOrdersTable(resp) {
    const table = document.querySelector('#order-table-body');
    resp.data.forEach(function(elem) {
        const row = document.createElement('tr');
        row.innerHTML = '<td>' + elem.client + '</td><td>' + elem.storage + '</td><td>' + elem.product + '</td>';
        table.appendChild(row);
    });
}

if(window.location.pathname == '/ordem') {
    getOrders();
}