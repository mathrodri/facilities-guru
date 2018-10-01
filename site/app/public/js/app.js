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

function getClients() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.status == 200 && this.readyState == 4) {
            var resp = JSON.parse(this.response);
            localStorage.setItem('data', JSON.stringify(resp.data));
            mountOrdersSelect(resp);
        }
    };
    xhttp.open('GET', 'http://localhost:3000/api/client', true);
    xhttp.setRequestHeader('accept', 'application/json');
    xhttp.send();
}

function mountOrdersTable(resp) {
    var table = document.querySelector('#order-table-body');
    resp.data.forEach(function(elem) {
        var row = document.createElement('tr');
        row.setAttribute('data-client', elem.client._id);
        row.setAttribute('data-facility', elem.facility._id);
        row.innerHTML = '<td>' + elem.client.name + '</td><td>' + (elem.facility.location.initials.toLowerCase() + '-facility-' + elem.facility.number) + '</td><td>' + elem.product + '</td><td><button>X</button></td>';
        table.appendChild(row);
    });
}

function mountOrdersSelect(resp) {
    var clientSelect = document.querySelector('.client-select');
    var facilitySelect = document.querySelector('.facility-select');
    var clientsRows = document.querySelector('#order-table-body').children;
    resp.data.forEach(function(elem) {
        var option = document.createElement('option');
        option.innerHTML = elem.name;
        option.setAttribute('value', elem._id);
        clientSelect.appendChild(option);
    });
    clientSelect.addEventListener('change', function() {
        if(this.value != 'all') {
            changeClientFilter(this.value, facilitySelect);
            facilitySelect.removeAttribute('disabled');
            clientFilter(this.value, clientsRows);
        } else {
            changeClientFilter(this.value, facilitySelect);
            clientFilter(this.value, clientsRows);
            facilitySelect.setAttribute('disabled', 'disabled');
        }
    });
    facilitySelect.addEventListener('change', function() {
        changeFacilityFilter(this.value, clientSelect.value, clientsRows);
    });
}

function changeClientFilter(id, facilitySelect) {
    var facilitySelectLength = facilitySelect.children.length;
    if(id != 'all') {
        var data = JSON.parse(localStorage.getItem('data'));
        var client = findClientFacilities(id, data);
        for(var i = 1; i < facilitySelectLength; i++) {
            facilitySelect.removeChild(facilitySelect.children[1]);
        }
        client.facilities.forEach(function(elem) {
            var option = document.createElement('option');
            option.setAttribute('value', elem._id);
            option.innerHTML = elem.location.initials.toLowerCase() + '-facility-' + elem.number;
            facilitySelect.appendChild(option);
        });
    } else {
        for(var i = 1; i < facilitySelectLength; i++) {
            facilitySelect.removeChild(facilitySelect.children[1]);
        }
    }
}

function changeFacilityFilter(facilityId, clientId, clientsRows) {
    var clientsRowsVisible = Array.prototype.slice.call(clientsRows).filter(function(elem) {
        return elem.dataset.client == clientId;
    });
    clientsRowsVisible.forEach(function(elem) {
        if(elem.dataset.facility != facilityId) {
            elem.style.display = 'none';
        } else {
            elem.removeAttribute('style');
        }
    });
}

function findClientFacilities(id, data) {
    for(var i = 0; i < data.length; i++) {
        if(data[i]._id == id) {
            return data[i];
        }
    }
}

function clientFilter(clientId, clientsRows) {
    if(clientId != 'all') {
        for(var i = 0; i < clientsRows.length; i++) {
            if(clientsRows[i].dataset.client != clientId) {
                clientsRows[i].style.display = 'none';
            } else {
                clientsRows[i].removeAttribute('style');
            }
        }
    } else {
        for(var i = 0; i < clientsRows.length; i++) {
            clientsRows[i].removeAttribute('style');
        }
    }
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
    getClients();
}

if(document.querySelector('.btn-open-modal')) {
    document.querySelector('.btn-open-modal').addEventListener('click', toggleModal);
    document.querySelector('.btn-close-modal').addEventListener('click', toggleModal);
    document.querySelector('.modal-bg').addEventListener('click', toggleModal);
}