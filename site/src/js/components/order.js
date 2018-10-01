// função para requerir as ordens
function getOrders() {
    // instancia um novo objeto ajax
    var xhttp = new XMLHttpRequest();
    // atribui uma função para mudança de estado da requisição
    xhttp.onreadystatechange = function() {
        // verifica o estado da requisição
        if(this.status == 200 && this.readyState == 4) {
            // captura o corpo da table das ordens
            var table = document.querySelector('#order-table-body');
            // remove todas as orden existentes
            while(table.firstChild){
                table.removeChild(table.firstChild);
            }
            // chama a função para montar a nova tabela de ordens
            mountOrdersTable(JSON.parse(this.response));
        }
    };
    // abre a requisição ajax
    xhttp.open('GET', 'http://localhost:3000/api/order', true);
    // seta o header para identificar que tipo de dado aceita
    xhttp.setRequestHeader('Accept', 'application/json');
    // envia a requisição
    xhttp.send();
}
// função para requerir os cliente
function getClients() {
    // instancia um novo objeto ajax
    var xhttp = new XMLHttpRequest();
    // atribui uma função para mudança de estado da requisição
    xhttp.onreadystatechange = function() {
        // verifica o estado da requisição
        if(this.status == 200 && this.readyState == 4) {
            // captura a resposta
            var resp = JSON.parse(this.response);
            // guarda os clientes no localstorage
            localStorage.setItem('clients', JSON.stringify(resp.data));
            // chama a função para monstar os selects
            mountOrdersSelect(resp);
        }
    };
    // abre a requisição ajax
    xhttp.open('GET', 'http://localhost:3000/api/client', true);
    // seta o header para identificar que tipo de dado aceita
    xhttp.setRequestHeader('Accept', 'application/json');
    // envia a requisição
    xhttp.send();
}
// função para montar a tabela das ordens
function mountOrdersTable(resp) {
    // captura o body da tabela
    var table = document.querySelector('#order-table-body');
    // insere as ordens na tabela
    resp.data.forEach(function(elem) {
        // cria uma nova linha para a ordem
        var row = document.createElement('tr');
        // seta or atributos da ordem
        row.setAttribute('data-client', elem.client._id);
        row.setAttribute('data-facility', elem.facility._id);
        row.innerHTML = '<td>' + elem.client.name + '</td><td>' + (elem.facility.location.initials.toLowerCase() + '-facility-' + elem.facility.number) + '</td><td>' + elem.product + '</td><td><button title="Excluir" class="btn-remove-order" data-order="' + elem._id + '">X</button></td>';
        // insere a ordem na tabela
        table.appendChild(row);
    });
    // captura os botões de remoção das ordens
    var btnsRemoveOrder = Array.prototype.slice.call(document.querySelectorAll('.btn-remove-order'));
    // adiciona o evento para excluir as ordens
    btnsRemoveOrder.forEach(function(elem) {
        elem.addEventListener('click', function() {
            removeOrder({id: this.dataset.order});
        });
    });
}
// função que monta os selects
function mountOrdersSelect(resp) {
    // captura todos os selects
    var clientSelect = document.querySelector('.client-select');
    var facilitySelect = document.querySelector('.facility-select');
    var clientsRows = document.querySelector('#order-table-body').children;
    var clientModalSelect = document.forms.newOrderForm.client;
    var facilityModalSelect = document.forms.newOrderForm.storage;
    // popula o select de cliente
    resp.data.forEach(function(elem) {
        // cria a opção do cliente
        var option = document.createElement('option');
        // inserer as informações da opção
        option.innerHTML = elem.name;
        option.setAttribute('value', elem._id);
        // insere a opção no select
        clientSelect.appendChild(option);
        // copia a opçao
        var optionModal = option.cloneNode(true);
        // insere a cópia no select do modal
        clientModalSelect.appendChild(optionModal);
    });
    // adiciona o evento de change do select do cliente
    clientSelect.addEventListener('change', function() {
        // verifica o valor da opçao
        if(this.value != 'all') {
            // chama a função para filtrar as facilities do cliente
            changeClientFilter(this.value, facilitySelect);
            // abilita o select das facilities
            facilitySelect.removeAttribute('disabled');
            // chama a função para filtrar a tabela dos cliente
            clientFilter(this.value, clientsRows);
        } else {
            // chama a função para filtrar as facilities do cliente
            changeClientFilter(this.value, facilitySelect);
            // chama a função para filtrar a tabela dos cliente
            clientFilter(this.value, clientsRows);
            // desablitia o select das facilities
            facilitySelect.setAttribute('disabled', 'disabled');
        }
    });
    // adiciona o evento de change no select das facilities
    facilitySelect.addEventListener('change', function() {
        changeFacilityFilter(this.value, clientSelect.value, clientsRows);
    });
    // adiciona o evento de change no select do modal
    clientModalSelect.addEventListener('change', function() {
        // chama a função que filtra as facilities do modal
        changeFacilityModalSelect(this.value, facilityModalSelect);
    });
    // chama a função que filtra as facilities do modal a primeira vez
    changeFacilityModalSelect(clientModalSelect.children[0].value, facilityModalSelect);
}
// função que filtra o select das facilities do cliente
function changeClientFilter(id, facilitySelect) {
    // captura a quantidade de opções que o select tem
    var facilitySelectLength = facilitySelect.children.length;
    // verifica o valor da opçao
    if(id != 'all') {
        // captura os clientes do localstorage
        var data = JSON.parse(localStorage.getItem('clients'));
        // acha o cliente definido
        var client = findClient(id, data);
        // remove as facilities do select atual
        for(var i = 1; i < facilitySelectLength; i++) {
            facilitySelect.removeChild(facilitySelect.children[1]);
        }
        // popula o select das facilities com as facilities do cliente selecionado
        client.facilities.forEach(function(elem) {
            // cria uma nova opção
            var option = document.createElement('option');
            // seta os atributos da opção
            option.setAttribute('value', elem._id);
            option.innerHTML = elem.location.initials.toLowerCase() + '-facility-' + elem.number;
            // insere a opção no select
            facilitySelect.appendChild(option);
        });
    } else {
        // remove todas as opções do select das facilities
        for(var i = 1; i < facilitySelectLength; i++) {
            facilitySelect.removeChild(facilitySelect.children[1]);
        }
    }
}
//função que filtra as ordens da tabela pelo cliente
function changeFacilityFilter(facilityId, clientId, clientsRows) {
    // captura as ordens do cliente definido
    var clientsRowsVisible = Array.prototype.slice.call(clientsRows).filter(function(elem) {
        return elem.dataset.client == clientId;
    });
    // verifica o valor da opçao da facility
    if(facilityId != 'all') {
        // filtra as ordens do cliente pela facility definida
        clientsRowsVisible.forEach(function(elem) {
            if(elem.dataset.facility != facilityId) {
                // esconde a ordem
                elem.style.display = 'none';
            } else {
                // mostra a ordem
                elem.removeAttribute('style');
            }
        });
    } else {
        // mostra todas as ordens do cliente definido
        clientsRowsVisible.forEach(function(elem) {
            elem.removeAttribute('style');
        });
    }
}
// função para achar o cliente definido
function findClient(id, data) {
    // procura o cliente no array de clientes
    for(var i = 0; i < data.length; i++) {
        if(data[i]._id == id) {
            return data[i];
        }
    }
}
//função filtrar as ordens pelo cliente
function clientFilter(clientId, clientsRows) {
    // verifica o valor do cliente
    if(clientId != 'all') {
        // filtra as ordens pelo cliente definido
        for(var i = 0; i < clientsRows.length; i++) {
            // verifica a ordem
            if(clientsRows[i].dataset.client != clientId) {
                // esconde a ordem
                clientsRows[i].style.display = 'none';
            } else {
                // mostra a ordem
                clientsRows[i].removeAttribute('style');
            }
        }
    } else {
        // mostra todas as ordens
        for(var i = 0; i < clientsRows.length; i++) {
            clientsRows[i].removeAttribute('style');
        }
    }
}
// função para salvar uma nova ordem
function saveNewOrder() {
    // verifica se já existe uma ordem sendo salva
    var orderSendProgress = localStorage.getItem('orderSendProgress');
    if(orderSendProgress == 'false') {
        // seta o progresso para true
        localStorage.setItem('orderSendProgress', 'true');
        // captura as informações da ordem
        var regexWS = /\S/;
        var order = {
            client: document.forms.newOrderForm.client.value,
            facility: document.forms.newOrderForm.storage.value,
            product: document.forms.newOrderForm.product.value
        };
        // captura o span de mensgame do form
        var span = document.querySelector('.form-message');
        // verifica se todos os campos foram preenchidos
        if(regexWS.test(order.client) && regexWS.test(order.facility) && regexWS.test(order.product)) {
            // chama a função para registrar a nova ordem
            sendNewOrder(this.action, order);
        } else {
            // pede pro usuário preencher todos os campos
            span.innerHTML = 'Preencha todos os campos';
            span.style.color = 'red';
            // seta o progresso pra false
            localStorage.setItem('orderSendProgress', 'false');
        }
    }
    // impede o formulário ser enviado normalmente
    return false;
}
// função que envia a nova ordem
function sendNewOrder(action, order) {
    // instancia o objeto ajax
    var xhttp = new XMLHttpRequest();
    // define a função de mudança de estado da requisição
    xhttp.onreadystatechange = function() {
        // verifica o status da requisição
        if(this.status == 200 && this.readyState == 4) {
            // captura o span de mensgame do form
            var span = document.querySelector('.form-message');
            // captura a resposta da requisição
            var resp = JSON.parse(this.response);
            // verifica se a ordem foi inserida com sucesso
            if(resp.success) {
                // inserer a mensagem pro usuário
                span.removeAttribute('style');
                span.innerHTML = resp.message;
                setTimeout(function(){
                    // tira o progresso da requisição
                    localStorage.setItem('orderSendProgress', 'false');
                    // atualiza as ordens
                    getOrders();
                    // fecha o modal da ordem
                    toggleModal();
                    span.innerHTML = '';
                }, 2000);
            }
        }
    };
    // abre a requisição ajax
    xhttp.open('POST', action, true);
    // seta os headers
    xhttp.setRequestHeader('Accept', 'application/json');
    xhttp.setRequestHeader("Content-type", "application/json");
    // envia as informações da ordem
    xhttp.send(JSON.stringify(order));
}
// função que atualiza o select das facilities de acordo com o cliente do modal
function changeFacilityModalSelect(id, facilitySelect) {
    // pega os clientes do localstorage
    var data = JSON.parse(localStorage.getItem('clients'));
    // acha as informações do cliente
    var client = findClient(id, data);
    // define a quantidade de facilities que aquele cliente possui
    var facilitySelectLength = facilitySelect.children.length;
    // remove as facilities atuais do select
    for(var i = 0; i < facilitySelectLength; i++) {
        facilitySelect.removeChild(facilitySelect.children[0]);
    }
    // insere as novas facilities do cliente
    client.facilities.forEach(function(elem) {
        var option = document.createElement('option');
        option.innerHTML = elem.location.initials.toLowerCase() + '-facility-' + elem.number;
        option.setAttribute('value', elem._id);
        facilitySelect.appendChild(option);
    });
}
// função para remover uma facility
function removeOrder(orderId) {
    // instancia um novo objeto ajax
    var xhttp = new XMLHttpRequest();
    // define a função de mudança de estado da requisição
    xhttp.onreadystatechange = function() {
        // verifica o status da requisição
        if(this.status == 200 && this.readyState == 4) {
            // atualiza as ordens
            getOrders();
        }
    };
    // abre a requisição ajax
    xhttp.open('DELETE', 'http://localhost:3000/api/order', true);
    // seta os headers
    xhttp.setRequestHeader('Accept', 'application/json');
    xhttp.setRequestHeader("Content-type", "application/json");
    // envia a requisição
    xhttp.send(JSON.stringify(orderId));
}
// função de toggle do modal
function toggleModal() {
    // captura o modal
    var modal = document.querySelector('.add-order-modal');
    // captura o fundo escuro
    var bg = document.querySelector('.modal-bg');
    // verifica o estado do modal
    if(modal.className == 'add-order-modal') {
        // abre o modal
        modal.setAttribute('class', 'add-order-modal visible');
        bg.setAttribute('class', 'modal-bg visible');
    } else {
        // fecha o modal
        modal.setAttribute('class', 'add-order-modal');
        bg.setAttribute('class', 'modal-bg');
    }
}

// verifica se o usuário está na página /ordem
if(window.location.pathname == '/ordem') {
    // requere as ordens
    getOrders();
    // requere os clientes
    getClients();
    // armazena os cliente no localstorage
    localStorage.setItem('orderSendProgress', 'false');
}
// adiciona o evento ao modal e ao form de nova ordem
if(document.querySelector('.btn-open-modal')) {
    document.querySelector('.btn-open-modal').addEventListener('click', toggleModal);
    document.querySelector('.btn-close-modal').addEventListener('click', toggleModal);
    document.querySelector('.modal-bg').addEventListener('click', toggleModal);
    document.forms.newOrderForm.onsubmit = saveNewOrder;
}