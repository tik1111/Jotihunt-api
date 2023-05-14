
# Jotihunt API

De API laag van de jotihunt fontend app.


## API Routes

#### Authentication


```http
  POST /auth/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**.  |
| `password` | `string` | **Required**.  |

```http
  POST /auth/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**.  |
| `password` | `string` | **Required**.  |
| `name` | `string` | **Required**. Friendly name  |

#### Refresh access token

```http
  POST /refresh/atoken
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `x-refresh-token`      | `string` | **Required**. Refresh token generated by login or register function |

#
#### Authorization
```http
  GET /welcome/user
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `x-access-token`      | `string` | **Required**. User has to have User role (default assigned to all users) |

```http
  GET /welcome/tenantadmin
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `x-access-token`      | `string` | **Required**. User has to have tenant-admin role defined by an other tenant admin |

```http
  GET /welcome/platformadmin
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `x-access-token`      | `string` | **Required**. User has to have platform-admin role defined by an other platform admin |

## Tech Stack

**Client:** Flutter see [Front-end repository](https://github.com/tik1111/jotihunt)

**Server:** Node, Express


