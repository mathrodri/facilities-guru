// função que requere as facilities
function getFacilities() {
    // instancia um novo objeto do ajax
    var xhttp = new XMLHttpRequest();
    // define a função de mudança de estado da requisição ajax
    xhttp.onreadystatechange = function() {
        // define o método caso a requisição tenha sido feita com sucesso
        if(this.status == 200 && this.readyState == 4) {
            // chama a função para montar a tabela de armazens
            mountFacilityTable(JSON.parse(this.response));
        }
    };
    // abre a conexão ajax
    xhttp.open('GET', 'http://localhost:3000/api/facility', true);
    // seta o header accept
    xhttp.setRequestHeader('accept', 'application/json');
    // envia a requisição
    xhttp.send();
}

// função para criar a tabela dos armazéns
function mountFacilityTable(resp) {
    // captura a tabela
    var table = document.querySelector('#storage-table-body');
    // faz um loop para adicionar cada armazém na tabela
    resp.data.forEach(function(elem) {
        // cria uma nova linha para o armazém
        var tr = document.createElement('tr');
        // seta as informações do armazém
        tr.innerHTML = '<td>' + elem.owner.name + '</td><td>' + elem.location.initials.toLowerCase() + '-facility-' + elem.number + '</td>'
        // adiciona a linha da tabela
        table.appendChild(tr);
    });
}

// verifica se está na página do armazem
if(window.location.pathname == '/armazem') {
    // chama a função para requerir as facilities
    getFacilities();
}