define({ "api": [
  {
    "type": "get",
    "url": "/",
    "title": "Get an Api Key",
    "name": "ApiKey",
    "group": "Api_Key",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Your Api Key</p>"
          }
        ]
      }
    },
    "description": "<p>You have to create an account at this adress to get an Api Key : http://localhost:3000</p> <p>Use it in your request header as below.</p>",
    "version": "0.0.0",
    "filename": "./index.js",
    "groupTitle": "Api_Key"
  },
  {
    "type": "delete",
    "url": "/messages/:id",
    "title": "3. Delete Message by id",
    "name": "DeleteMessageById",
    "group": "Messages",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Message unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "success",
            "description": "<p>Message delete</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error",
            "description": "<p>Message not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"MessageNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Url parameter.</p>",
    "version": "0.0.0",
    "filename": "./messages.js",
    "groupTitle": "Messages"
  },
  {
    "type": "get",
    "url": "/messages/:idUser",
    "title": "1. Request Messages from Users by User ID",
    "name": "GetMessageByUser",
    "group": "Messages",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "user_id",
            "description": "<p>unique user ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "user_id",
            "description": "<p>User ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "message",
            "description": "<p>Message description.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"user_id\": 1,\n  \"message\": \"Ceci est un message\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Url parameter</p>",
    "version": "0.0.0",
    "filename": "./messages.js",
    "groupTitle": "Messages"
  },
  {
    "type": "post",
    "url": "/messages",
    "title": "2. Post Message",
    "name": "PostMessage",
    "group": "Messages",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "success",
            "description": "<p>Message saved</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error",
            "description": "<p>Error description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"User does not exist\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Parameters in an encoded form.</p>",
    "version": "0.0.0",
    "filename": "./messages.js",
    "groupTitle": "Messages"
  },
  {
    "type": "delete",
    "url": "/user/:id",
    "title": "4. Delete user by Id",
    "name": "DeleteUserById",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "success",
            "description": "<p>User saved</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": \"User delete\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error",
            "description": "<p>Error description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"This user doesn't exist\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Url parameter</p>",
    "version": "0.0.0",
    "filename": "./users.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users/",
    "title": "2. Request All Users",
    "name": "GetAllUsers",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User Email.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"email\": \"test@test.fr\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Url parameter</p>",
    "version": "0.0.0",
    "filename": "./users.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/user/:id",
    "title": "3. Request user by Id",
    "name": "GetUserById",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "success",
            "description": "<p>User saved</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"email\": \"test@test.fr\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error",
            "description": "<p>Error description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"This user already exist\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Url parameter</p>",
    "version": "0.0.0",
    "filename": "./users.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "1. Request Add User",
    "name": "PostUser",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "confpassword",
            "description": "<p>User password confirmation.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "success",
            "description": "<p>User saved</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"email\": \"test@test.fr\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error",
            "description": "<p>Error description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"This user already exist\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Url parameter</p>",
    "version": "0.0.0",
    "filename": "./users.js",
    "groupTitle": "Users"
  },
  {
    "type": "put",
    "url": "/user/:id",
    "title": "5. Update user by Id",
    "name": "UpdateUserById",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "success",
            "description": "<p>User saved</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": \"User update\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error",
            "description": "<p>Error description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"This user doesn't exist\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Url parameter</p>",
    "version": "0.0.0",
    "filename": "./users.js",
    "groupTitle": "Users"
  }
] });
