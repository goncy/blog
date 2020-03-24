---
layout: post
title: Armando una aplicación con React Y Styled Components (4 / 5) - Armando el ritmosustanciometro
image: assets/cover.jpg
author: goncy
permalink: workshop-react-styled-components-4
date: 2020-03-23T07:03:47.149Z
draft: false
tags: 
  - Español
  - Lessons
  - React
  - Styled Components
---

### Esta es la tercer parte de una serie de cuatro artículos sobre como crear una aplicación usando React y Styled Components
0. [Intro](./intro.md)
1. Herramientras
⋅⋅1. [React]("./react.md")
..2. [Styled Components]("./styled-components.md")
2. Aplicación
⋅⋅1. [Armando la estructura con React]("./estructura.md") 👈
⋅⋅2. [Estilos y animaciónes con Styled Components]("./estilos.md")

# Armando el `ritmosustanciometro`
Vamos a abrir el [proyecto inicial](https://codesandbox.io/s/cliente-ritmosustanciometro-n61hr) y vamos a tocar en `Fork` (arriba a la derecha).
Si no tenemos cuenta de `codesandbox` nos hacemos una, esto nos va a permitir poder guardar nuestro proyecto online y editarlo o ejecutarlo desde cualquier lado.
Este proyecto inicial es una aplicación base creada usando el template de `create-react-app` y tiene instaladas las dependencias que vamos a usar a lo largo del workshop.

Ahora que ya tenemos nuestra aplicación funcionando vamos a:

1. Crear un componente `Ritmosustanciometro`
2. Agregar un `state` a `App` para guardar el `nombre` de la persona y otro para el listado de `individuos`
4. Agregar un formulario con un campo de texto para el `nombre` y un botón de `obtener ritmosustancia`
5. Conectar el campo de `nombre` a su respectivo `state`
6. Iterar el listado de `individuos` y mostrar un `Ritmosustanciometro` por cada uno
7. Implementar la funcionalidad de `obtener ritmosustancia`

### Crear un componente `Ritmosustanciometro`
Vamos a crear un nuevo archivo `Ritmosustanciometro.js` dentro de `src` (al mismo nivel que `index.js`).
Adentro vamos a crear un componente llamado `Ritmosustanciometro` que va a recibir dos props, `nombre` y `ritmosustancia`, las cuales va a mostrar dentro de un `div`. Nos quedaría algo así:

```jsx
// Ritmosustanciometro.js
import React from "react";

function Ritmosustanciometro({nombre, ritmosustancia}) {
  return (
    <div>
      {nombre}: {ritmosustancia}
    </div>
  )
};

export default Ritmosustanciometro;
```

### Agregar un `state` a `App` para guardar el `nombre` de la persona y otro para el listado de `individuos`
Vamos a ir a `index.js` y vamos a agregar dos `state`, uno para el `nombre` de la persona, que va a empezar como un `string` vacío y otro para `individuos`, que va a iniciar como un `array` vacío:

```jsx
// index.js
import React, { useState } from 'react'; // Importamos `useState`
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  const [nombre, setNombre] = useState('');
  const [individuos, setIndividuos] = useState([]);

  return (
    <div>
      <h1>Ritmosustanciometro</h1>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

### Agregar un formulario con un campo de texto para el `nombre` y un botón de `obtener ritmosustancia`
Agregamos un nuevo `form` debajo de nuestro `h1` para meter nuestro campo de texto `nombre` y nuestro botón de `obtener ritmosustancia`:

```jsx
// index.js
import React, { useState } from 'react';
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  const [nombre, setNombre] = useState('');
  const [individuos, setIndividuos] = useState([]);

  return (
    <div>
      <h1>Ritmosustanciometro</h1>
      <form>
        <input type="text" />
        <button type="submit">Obtener ritmosustancia</button>
      </form>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

Nos va a quedar algo así:

![01](./assets/ritmosustanciometro-base.jpg)

### Conectar el campo de `nombre` al state `nombre`
Para eso vamos a crear una función en `App` llamada `actualizarNombre` que va a tomar un `evento` de `change` y va a usar el valor del campo en el que se llamó para actualizar el valor del `state` `nombre`. Vamos a ejecutarla en el `onChange` de nuestro campo `nombre` y a su vez, vamos a tomar el valor del `state` `nombre` y vamos a asignarlo al `value` del campo `nombre`:

```jsx
// index.js
import React, { useState } from 'react';
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  const [nombre, setNombre] = useState('');
  const [individuos, setIndividuos] = useState([]);

  // Creamos una función `actualizarNombre`
  function actualizarNombre(event) {
    // Guardamos en `nombre` lo que escribimos en el campo, lo obtenemos de `event.target.value`
    setNombre(event.target.value)
  }

  return (
    <div>
      <h1>Ritmosustanciometro</h1>
      <form>
        <input type="text" onChange={actualizarNombre} value={nombre} />
        <button type="submit">Obtener ritmosustancia</button>
      </form>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

### Iterar el listado de `individuos` y mostrar un `Ritmosustanciometro` por cada item
Vamos a importar nuestro componente `Ritmosustanciometro` y vamos a iterar usando el método `map` de `Array` para mostrar un `Ritmosustanciometro` por cada item dentro de `individuos`, pasando `nombre` y `ritmosustancia` por `props`, para asegurarnos de que anda, vamos a agregar un `individuo` inicial a nuestro `state`:

```jsx
// index.js
import React, { useState } from 'react';
import ReactDOM from "react-dom";

import Ritmosustanciometro from './Ritmosustanciometro';

import "./styles.css";

function App() {
  const [nombre, setNombre] = useState('');
  const [individuos, setIndividuos] = useState([{
    nombre: 'goncy',
    ritmosustancia: 100
  }]);

  // Creamos una función `actualizarNombre`
  function actualizarNombre(event) {
    // Guardamos en `nombre` lo que escribimos en el campo, lo obtenemos de `event.target.value`
    setNombre(event.target.value)
  }

  return (
    <div>
      <h1>Ritmosustanciometro</h1>
      {/* Usamos `map` para iterar sobre cada individuo de nuestra lista de individuos y creamos un `Ritmosustanciometro por cada individuo, pasando el `nombre` y el valor de `ritmosustancia` por `props` */}
      {individuos.map((individuo) =>
        <Ritmosustanciometro
          nombre={individuo.nombre}
          ritmosustancia={individuo.ritmosustancia}
        />
      )}
      <form>
        <input type="text" onChange={actualizarNombre} value={nombre} />
        <button type="submit">Obtener ritmosustancia</button>
      </form>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

### Implementar la funcionalidad de `obtener ritmosustancia`
Para implementar nuestra función `obtenerRitmosustancia` vamos a hacer un request a un servidor, para eso, vamos a usar una libreria llamada `axios`. Vamos a instalar `axios` yendo a la consola, asegurandonos de que estemos parados en la carpeta del proyecto y ejecutando `npm install axios --save`.

Ahora si, vamos a agregar una función `obtenerRitmosustancia` al componente `App` que al hacer `submit` del `form`, obtenga la `ritmosustancia` del servidor, la agregue a la lista de `individuos` y reinicie el valor `nombre` del `state`:

```jsx
// index.js
import React, { useState } from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';  // Importamos Axios

import Ritmosustanciometro from './Ritmosustanciometro';

import "./styles.css";

function App() {
  const [nombre, setNombre] = useState('');
  const [individuos, setIndividuos] = useState([{
    nombre: 'goncy',
    ritmosustancia: 100
  }]);

  // Creamos una función `actualizarNombre`
  function actualizarNombre(event) {
    // Guardamos en `nombre` lo que escribimos en el campo, lo obtenemos de `event.target.value`
    setNombre(event.target.value)
  }

  // Creamos una función `async` `obtenerRitmosustancia`
  async function obtenerRitmosustancia(event) {
    event.preventDefault(); // Evitamos que la aplicación se recargue por el `submit` del `form`

    // Hacemos un fetch a nuestro `endpoint` para obtener un valor de `ritmosustancia`
    const ritmosustancia = await axios("https://wt-3581e5a0e6c19bb4a0552203b2738a9d-0.run.webtask.io/obtener-ritmosustancia/").then(res => res.data)

    // Usando `concat` agregamos un nuevo individuo al `array` de `individuos` que ya tenemos en nuestro `state`, pasando el `nombre` de nuestro `state` y el valor de `ritmosustancia` que nos devolvió el servidor
    setIndividuos(
      individuos.concat({
        nombre,
        ritmosustancia
      })
    )
    setNombre(''); // Reiniciamos el valor de nombre
  }

  return (
    <div>
      <h1>Ritmosustanciometro</h1>
      {/* Usamos `map` para iterar sobre cada individuo de nuestra lista de individuos y creamos un `Ritmosustanciometro por cada individuo, pasando el `nombre` y el valor de `ritmosustancia` por `props` */}
      {individuos.map((individuo) =>
        <Ritmosustanciometro
          nombre={individuo.nombre}
          ritmosustancia={individuo.ritmosustancia}
        />
      )}
      {/* Ejecutamos la funcion de `obtenerRitmosustancia` cuando hacemos submit del form */}
      <form onSubmit={obtenerRitmosustancia}>
        <input type="text" onChange={actualizarNombre} value={nombre} />
        <button type="submit">Obtener ritmosustancia</button>
      </form>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

## Conclusión
Felicitaciones!, ya tenés el `ritmosustanciometro` andando, tiene mucho `ritmo` pero le falta `sustancia`. Vamos a darsela con `Styled Components`

[⏪ Styled Components](./styled-components.md) | [Estilando el `ritmosustanciometro` ⏩](./estilos.md)
