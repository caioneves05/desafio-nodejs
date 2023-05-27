# Documentação da API

Esta documentação descreve os endpoints e as funcionalidades da API que você criou. A API possui recursos para registro de usuários, login de usuários e busca de usuários.

## Base URL
A base URL da API é: `https://localhost:PORTA`

## Registro de Usuário (Sign up)
Este endpoint permite o registro de um novo usuário.

Requisição
- Método: `POST`
- URL: `/user`
- Header: `Content-Type: application/json`
O corpo da requisição deve ser um objeto com o seguinte modelo:

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "telephones": [
    {
      "number": "number",
      "area_code": "number"
    }
  ]
}
```
Resposta de Sucesso
- Código de status: `200 OK`
- Corpo da resposta:
```json
{
  "id": "string",
  "created_at": "date",
  "modified_at": "date"
}
```

Resposta de Erro

Em caso de erro, a API retornará um código de status correspondente e uma mensagem de erro apropriada.

## Login de Usuário (Sign in)

Este endpoint permite o login de um usuário registrado.

Requisição
- Método: `POST`
- URL: `/user/login`
- Header: `Content-Type: application/json`
O corpo da requisição deve ser um objeto com as seguintes propriedades:
```json
{
  "email": "string",
  "password": "string"
}
```
Resposta de Sucesso

- Código de status: `200 OK`
- Corpo da resposta:
```json 
{
  "token": "string"
}
```

## Buscar Usuário
Este endpoint permite buscar as informações de um usuário autenticado.

Requisição

- Método: `GET`
- URL: `/user/search`
- Header: `Authorization: Bearer <token>`

Onde `<token>` é o token JWT obtido no login.

Resposta de Sucesso

- Código de status: `200 OK`

Resposta de Erro

Em caso de token inválido, a API retornará:

- Código de status: `400 Unauthorized`
- Corpo da resposta:
```json
{
  "error": "Mensagem de erro apropriada"
}
```