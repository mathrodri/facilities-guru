# Facilities Guru
O sistema foi divido em duas partes, uma api que fornece o serviço, e um site que consome esse serviço.

## API
A api foi feita utilizando o mongodb, um banco de dados não relacional extremamente rápido.
A escolha do banco foi feita devido a velocidade, e pelo fato de alguns campos serem bem dinâmicos
e sem padrão de quantidade

## Site
O site foi feito apenas com a view engine "ejs", utilizando sass como pré-compilador do css

## Instalação
Para instalar o sistema é necessário possuir o mongoDB versão 4.0.1 e node versão 8.12.0 ou maior, após ter os dois instalado, baixe ou clone esse repositório, então instale os pacotes com "npm install" ou
"npm install --production" para não instalar as dependências de desenvolvimento, para usar o sistema
é necessário iniciar os dois servidores, entre na pasta site pelo cmd e digite "npm start", e faça a mesma coisa na pasta da api, o site está setado para abrir no localhost:4000, e a api no localhost:3000

Informações sobre as funções e códigos estão nos próprios arquivos do sistema