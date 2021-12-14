# Vue-Rack-Admin
## Vue 3 + Typescript + Vite + ElementPlus

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Highlights
- **Passport**
  - login
  - register
  - reset password
- **Permission Authentication**
  - Page permission
  - menu item permission
- **Error Page**
  - 403
  - 404
  - 500
- **Async Request(axios)**
  - retry
  - refresh token 
  - feedback message
- **Element-plus**
- **Router**
- **Vuex**
  - namespacing
  - data persistence
- **Mock**
  - dynamic data
## Contents
```
.
├── mock                                    // virtual data file
│   └── index.js
├── public                                  
│   └── favicon.ico
├── src
│   ├── App.vue                             // entry template
│   ├── main.ts                             // entry file
│   ├── shims-vue.d.ts                      // ts declaration file
│   ├── assets                              // extra files
│   ├── components                          // common components
│   │   ├── HelloWorld.vue
│   │   └── editable-text
│   │       └── index.vue
│   ├── config                              // common config
│   │   └── index.ts
│   ├── layouts                             // business component
│   │   ├── app-aside                       // page aside
│   │   │   ├── index.vue
│   │   │   └── item.vue
│   │   ├── app-footer                      // page footer
│   │   │   └── index.vue
│   │   ├── app-header                      // page heaer
│   │   │   └── index.vue
│   │   └── basic-layout.vue                // basis of nested routing
│   ├── router                              // route
│   │   ├── index.ts
│   │   └── modules
│   │       ├── auth.ts                     // auth route
│   │       ├── common.ts                   // common route
│   │       └── index.ts                    // business route
│   ├── store                               // shared repository
│   │   ├── admin
│   │   │   ├── common.ts
│   │   │   ├── data.d.ts
│   │   │   └── user.ts
│   │   ├── data.d.ts
│   │   ├── index.ts
│   │   └── modules                          // business store
│   │       ├── basic-table.ts
│   │       └── data.d.ts
│   ├── utils                                // tool
│   │   ├── data.d.ts
│   │   ├── request.ts                       // axios instance object
│   │   └── token.ts
│   └── views
│       ├── account                          
│       │   ├── authorzation.vue             // role page
│       │   └── index.vue                    // myself page
│       ├── auth                              
│       │   ├── assets
│       │   ├── login.vue                    // login page
│       │   ├── register.vue                 // register page
│       │   └── reset-password.vue           // reset password page
│       ├── error                            // error page
│       │   ├── 403.vue
│       │   ├── 404.vue
│       │   └── 500.vue
│       ├── home                             // home page
│       │   └── index.vue
│       ├── table                            // table page
│       │   ├── components                   
│       │   ├── composables                  
│       │   └── basic-table.vue              // basic-table page
│       ├── data.d.ts
│       └── service.ts                       // entry file of async request
├── index.html
├── .env.development
├── .env.mock
├── .env.production
├── .gitignore
├── package.json
├── README.md
├── tsconfig.json
└── vite.config.ts
```
