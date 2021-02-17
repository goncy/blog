---
layout: post
title: Aumentando la productividad en un plop
image: assets/banner.jpg
author: goncy
permalink: aumentando-productividad-plop
date: 2021-02-17T07:03:47.149Z
draft: false
tags:
  - JavaScript
  - Productividad
  - Español
---

Cuando trabajamos en un proyecto nos damos cuenta de que hay procesos que repetimos mucho, en una aplicación NodeJS con Express podría ser crear una carpeta para una ruta y un archivo para cada método. En una aplicación Vue o Angular, crear los archivos para los componentes, templates y estilos. En una aplicación con Redux deberíamos crear types, actions, reducers, etc.

Si bién podríamos tener algunos archivos dando vueltas que podamos copiar y pegar para agilizar esos procesos, hay partes que todavía deberíamos hacer a mano (o codear algo que lo haga por nosotros), como renombrar los archivos, variables, etc.

Hoy vamos a ver `plopjs`, una herramienta para generar archivos, construida sobre `inquirer` y `handlebars`.

## Pensando en el equipo
Si bien podemos configurar plop a nivel global, brilla más cuando lo configuramos a nivel proyecto. Esto nos permite usar las herramientas de versionado integradas en el proyecto para actualizar nuestros generadores al igual que cualquier otro código.

## Agregando plop
Para agregar plop a nuestro proyecto hacemos:
```bash
# NPM
npm install plop --save-dev

# Yarn
yarn add plop --dev
```

Y creamos un archivo `plopfile.js` en la raíz de nuestro proyecto con el siguiente contenido:
```js
module.exports = function (plop) {
    plop.setGenerator('component', {
        description: 'crea un componente de React',
        prompts: [],
        actions: []
    });
};
```

## Configurando plop
Vamos a dividir el código de arriba:

* `plop.setGenerator('nombre', ...)`: Nos permite crear un `generador` nombrado, es básicamente asignarle un nombre a un conjunto de instrucciones que van a crear archivos.
* description: Descripción del generador, deberíamos entender que hace solo con leerla.
* prompts: Preguntas que vamos a hacerle al usuario, después podemos usar esas respuestas en nuestros templates.
* actions: Acciónes de creacion, modificación o eliminación de archivos que deben ser ejecutadas.

## Prompts
Podemos hacerle [distintos tipos de preguntas](https://github.com/SBoudrias/Inquirer.js/#prompt-types) a los usuarios, como por ejemplo:

* `list`: ![list](./assets/list.svg)
* `input`: ![input](./assets/input.svg)
* `checkbox`: ![checkbox](./assets/checkbox.svg)

> Entre otros.

Veamos un ejemplo completo:
```js
module.exports = function (plop) {
    plop.setGenerator('component', {
        description: 'crea un componente de React',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'nombre del componente'
        }],
        actions: [{
            type: 'add',
            path: 'src/{{pascalCase name}}.js',
            templateFile: 'plop/component.js.hbs'
        }]
    });
};
```

## Helpers
En el ejemplo de arriba vemos que en el action -> path definimos `src/{{pascalCase name}}.js`. `pascalCase` es uno de los [helpers integrados](https://plopjs.com/documentation/#built-in-helpers) dentro de plop. Que nos permiten modificar las variables obtenidas desde los prompts, tanto en los campos de nuestras actions como en nuestros templates.

También podemos definir nuestros propios helpers usando la función [setHelper](https://plopjs.com/documentation/#sethelper).

## Templates
Son los archivos que referenciamos desde nuestros actions y van a ser copiados a los directorios definidos, se escriben en formato handlebars y tienen acceso a todos los helpers que definamos en nuestro plopfile.

Vamos a crear un archivo en `plop/component.js.hbs` con el siguiente contenido:
```hbs
import React from "react";

const {{pascalCase name}} = () => <div>{`<{{pascalCase name}} />`}</div>;

export default {{pascalCase name}};
```

Si tenemos una variable `name` con el valor de `list`, el resultado sería:
```jsx
import React from "react";

const List = () => <div>{`<List />`}</div>;

export default List;
```

## Usando nuestros generadores
Para usar nuestros generadores, basta con correr el siguiente comando en la consola, mientras estamos parados en la carpeta de nuestro proyecto:
```bash
# npx plop <nombre del generador> [...respuestas]

# Base
npx plop

# Especificando el generador
npx plop component

# Especificando generador y respuesta en orden
npx plop component List

# Especificando generador y respuesta explicita
npx plop component --name List
```

## Listo ✨
Felicitaciones, ya agregaste, usaste y aprendiste algunas cosas de TypeScript, en un tiempo ya no va a haber vuelta atrás y lo vas a amar.

Si querés podés ver el código de la aplicación migrada [acá](https://codesandbox.io/s/migrate-to-typescript-completed-tzqes?file=/src/App.tsx).

---

Si te gustan estos posts, no te olvides de seguirme en:
* [Twitter](https://twitter.com/goncy)
* [Twitch](https://twitch.tv/goncypozzo)
* Sumarte al [discord](https://discord.gg/rAmPWU6eHg)
