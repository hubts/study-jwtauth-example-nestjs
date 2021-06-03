# NestJS JWT Authentication

## Description

- __Passport__ is a library for authentication in Nodejs.
- __Passport__ recognizes __Strategy__ to validate a given information.
- After the successful authentication, __Passport__ attaches the additional user information to the request.
- __Passport-local__ is a strategy of __Passport__ and it uses __{ username, password }__ to authenticate the users.
- By default, variable names must be same to be readable by __PassportStrategy__.
- If you want to modify the above fields, use the options { usernameField, passwordField }.

> __Database is needed to maintain the user information for authentication.__

## Main Dependency

### Passport

~~~bash
$ npm install --save @nestjs/passport passport passport-local
$ npm install --save-dev @types/passport-local
~~~

### JWT

~~~bash
$ npm install --save @nestjs/jwt
~~~

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Swagger

Follow below link after running to understand codes in Swagger playground.

[http://localhost:9000/api](http://localhost:9000/api)

## Reference

[1] [Base Repository](https://github.com/HyoeunKong/nest_jwt_test)

[2] [NestJS JWT Authentication](https://www.learmoreseekmore.com/2020/10/part-1-nestjs-jwt-authentication-accesstoken.html)

[3] [NestJS 노트 (2) : Guards](https://velog.io/@junguksim/NestJS-%EB%85%B8%ED%8A%B8-2-Guards)

[4] [NestJS 노트 (3) : Authentication](https://velog.io/@junguksim/NestJS-%EB%85%B8%ED%8A%B8-3-Authentication)

[5] [Nestjs 프로젝트에 Swagger 도입하기](https://velog.io/@mhj6380/Nestjs-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90-Swagger-%EB%8F%84%EC%9E%85%ED%95%98%EA%B8%B0)

