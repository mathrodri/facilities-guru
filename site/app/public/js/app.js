function getOrders() {
    var xhttp = new XMLHttpRequest();
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
    var table = document.querySelector('#order-table-body');
    resp.data.forEach(function(elem) {
        var row = document.createElement('tr');
        row.innerHTML = '<td>' + elem.client + '</td><td>' + elem.storage + '</td><td>' + elem.product + '</td><td><button>X</button></td>';
        table.appendChild(row);
    });
}

function toggleModal() {
    var modal = document.querySelector('.add-order-modal');
    var bg = document.querySelector('.modal-bg');
    if(modal.className == 'add-order-modal') {
        modal.setAttribute('class', 'add-order-modal visible');
        bg.setAttribute('class', 'modal-bg visible');
    } else {
        modal.setAttribute('class', 'add-order-modal');
        bg.setAttribute('class', 'modal-bg');
    }
}

if(window.location.pathname == '/ordem') {
    getOrders();
}

if(document.querySelector('.btn-open-modal')) {
    document.querySelector('.btn-open-modal').addEventListener('click', toggleModal);
    document.querySelector('.btn-close-modal').addEventListener('click', toggleModal);
    document.querySelector('.modal-bg').addEventListener('click', toggleModal);
}