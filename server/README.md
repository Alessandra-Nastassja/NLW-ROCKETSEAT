# Olá, você esta no back-end!

******

## *Como instalar e rodar ?* 🚀

*Back-end*

Já para instalar será necessário ter em sua máquina o Node js, junstamente com a NPM. Assim ao baixar o repositório basta dar o seguindo comando: 

```
npm install
```

> Obs.: Este comando pode ser abreviado para *npm i*, este "i" significa install. Como esta presentado a cima.

Em um terminal digite o seguinte comando abaixo para **rodar**:

```
npm run dev
```

> Obs.: Rode o comando dentro da pasta /server/src. E antes que eu esqueça, o projeto esta rodando no *http://localhost:3334/*.

******
*Banco de dados*

Como foi abordado este projeto vamos usar a tecnologia Knex. Ela é usada para o desenvolvimento de queries tanto para banco de dados SQL e NOSQL. Para facilitar neste projeto foi criado alguns comandos para rodar *migrations* e *seeds*, abaixo tem tudo sobre este. 😉

Para a rodar as **migrations** basta dar o comando abaixo:

```
knex:migrate
```

E também para rodar as **seeds**, segue o comando:

```
knex:seed
```

Obs.: Para mais detalhes, estes comandos também estão presentes no arquivo *package.json*.

******
## Dicas: 📌

* Deploy

Olá existe vários lugares para realizar deploy da sua aplicação, como por exemplo:

* Heroku
* Digital Ocean
* AWS/Google Cloud/ Microsoft Azure
