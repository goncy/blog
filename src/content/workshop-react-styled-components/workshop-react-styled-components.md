---
layout: post
title: Armando una aplicación con React Y Styled Components
image: assets/cover.jpg
author: goncy
permalink: workshop-react-styled-components
date: 2020-03-23T07:03:47.149Z
draft: false
tags: 
  - Español
  - Lessons
  - React
  - Styled Components
---

## Qué vamos a hacer?
El ritmosustanciometro, una aplicación que obtiene el porcentaje de ritmo y sustancia de un individuo en tiempo real.

![01](./assets/ritmosustanciometro.gif)

## Qué vamos a usar?
* `React` es una librería para crear interfaces de usuario, la vamos a usar para manejar las vistas y lógica de nuestra aplicación.
* Usar solamente el `CSS` que soportan los navegadores hace que nuestros estilos sean verbosos, limitados o complicados de mantener en una aplicación grande.
Vamos a usar `Styled Components` para mejorar esa experiencia.

### 🎯 Requisitos
* Conocimiento básico de `HTML`, `CSS` y `JavaScript`

### 🍪 Recomendable
* Conocimiento básico de `React`
* Conocimiento básico de ES6 (arrow functions, destructuring, template literals, etc)

### 🛠 Materiales
* 🎟 [Proyecto inicial](https://codesandbox.io/s/cliente-ritmosustanciometro-n61hr)
* 🔗 [Endpoint obtener ritmo y sustancia](https://wt-3581e5a0e6c19bb4a0552203b2738a9d-0.run.webtask.io/obtener-ritmosustancia/)
* 🎬 [Slides](https://docs.google.com/presentation/d/1LtpsEyeeFJA-MUaAnACV1H_W9Dr0K6EXSgXF0i9xQyo/edit#slide=id.gc6fa3c898_0_0)

## React, se fuma?
* `React` es una librería para crear interfaces de usuario
* Su sintaxis es parecida al `HTML` y se llama `JSX`
* `React` propone dividir nuestra aplicación en componentes que podamos reutilizar

### Que diferencia hay entre HTML y JSX?
Una de las principales diferencias que podemos encontrar es que `HTML` es un `lenguaje`. Solo describe la estructura de nuestra aplicación, una vez el cargada, el contenido de nuestra aplicación nunca va a cambiar.
Mientras tanto, `JSX`, es solo una sintaxis parecida a `HTML`, que los navegadores no puede ejecutar.
Antes de que nuestra aplicación sea renderizada, todo el código escrito en `JSX` es convertido a `Vanilla JavaScript` por herramientas conocidas como transpiladores, como `Babel` o `Traceur`, que nos permiten usar funcionalidades de `JavaScript` que todavía no son soportadas por todos los navegadores (entre otras cosas).

Algunas de las diferencias que podemos encontrar a la hora de escribir `JSX` son:
* Los atributos de los elementos se escriben en `camelCase` (`onClick` en vez de `onclick`)
* `class` se escribe `className` (ya que `class` es una palabra reservada de `JavaScript`)
* Todos los componentes deben escribirse en `PascalCase` (mayúscula al principio), ya que así se da cuenta `JSX` de que es un componente y no un elemento `HTML`
* Siempre que queramos escribir código `JavaScript` debemos hacerlo entre llaves `{}`

> Tip: Si querés ver como se ve `JSX` ya transpilado a `JavasScript` o como deberías escribir `React` sin `JSX`, podes usar [este](https://jsx-live.now.sh/) live editor de [Belen Curcio](https://twitter.com/okbel)

### Escribiendo un componente de React
Este sería un componente contador con un botón de sumar y restar:
```jsx
import React from "react" // Importamos React siempre que necesitemos usar JSX

function ContadorDeSustancias() {
  return (
    <div>
      <h1>Kilos de sustancia: 0</h1>
      <button> - </button>
      <button> + </button>
    </div>
  )
}

export default ContadorDeSustancias // Exportamos el componente para poder importarlo desde otros componentes
```

### State
`React` trae un `hook` integrado, llamado `useState`, que nos permite agregar estado a nuestro componente, vamos a hacer andar los botones de sumar y restar de nuestro componente anterior y a mostrar el valor del contador en vez de 0:
```jsx
import React, {useState} from "react" // Importamos `useState` usando destructuring luego de importar React

function ContadorDeSustancias() {
  const [kilos, setKilos] = useState(0); // Usamos useState para definir un estado para nuestro componente, el primer valor dentro de los corchetes va a ser el `valor` de nuestro estado, el segundo valor va a ser una funcion `seter`, significa que va a actualizar el `valor` de nuestro estado con cualquier cosa que le pasemos, lo que pasemos entre los paréntesis de useState será el valor inicial

  return (
    <div>
      <h1>Kilos de sustancia: {kilos}</h1> {/* Usando llaves podemos meter código javascript dentro de nuestro JSX */}
      <button onClick={() => setKilos(kilos - 1)}> - </button> {/* Disminuimos nuestro estado al hacer click */}
      <button onClick={() => setKilos(kilos + 1)}> + </button> {/* Aumentamos nuestro estado al hacer click */}
    </div>
  )
}

export default ContadorDeSustancias
```

Si renderizamos este componente obtendríamos esto:

![01](./assets/react-counter.gif)

Ves como siempre vemos actualizado el valor de `kilos`? Esto pasa por que cada vez que actualizamos el estado de nuestro componente (con `setKilos`), todo el componente vuelve a renderizarse con el estado nuevo.

> Nota: Siempre que queramos actualizar el estado de nuestro componente debemos hacerlo con la funcion seter (`setKilos` en este caso) y no como `kilos = 2`, ya que si lo hacemos de la segunda manera, `React` no escucha el cambio y no vuelve a renderizar nuestro componente.

### Props
Las `props` son la manera de pasar parámetros a un componente, al igual que el `state`, si las `props` cambian, nuestro componente se vuelve a renderizar.
Dijimos que los componentes deberían ser reutilizables, bueno, si no podrían recibir información externa no siempre serían útiles.
Vamos a usar nuestro `ContadorDeSustancias` y modificarlo para que reciba una prop `sustancia`.

```jsx
import React, {useState} from "react"

function ContadorDeSustancias({sustancia = 'sustancia desconocida'}) { /* Hacemos destructuring de una prop `sustancia` y le asignamos un valor por defecto en caso de no estar definida */
  const [kilos, setKilos] = useState(0);

  return (
    <div>
      <h1>Kilos de sustancia: {kilos}</h1>
      <button onClick={() => setKilos(kilos - 1)}> - </button>
      <button onClick={() => setKilos(kilos + 1)}> + </button>
    </div>
  )
}

export default ContadorDeSustancias
```

Entonces ahora podríamos usar nuestro componente de la siguiente manera:
```jsx
<ContadorDeSustancias sustancia="pasto" />
<ContadorDeSustancias sustancia="azucar" />
```

Y se vería así:

![02](./assets/react-counter-prop.gif)

> Gotcha: La diferencia entre `state` y `props` puede no entenderse muy bien al principio, solo recordá. Un componente puede cambiar su `state` directamente, pero no sus `props`.

### Extras que no vamos a ver en este curso
* [Redux](https://redux.js.org/), una librería para manejar el estado de nuestra aplicación `React`, podés ver [este curso](https://egghead.io/courses/getting-started-with-redux) que lo da su creador, Dan Abramov

### Conclusión de React
Esto es todo lo que necesitamos de `React` para crear nuestro `ritmosustanciometro`!

## Styled Components, se Inyecta?
* `Styled Components` es una libreria de `CSS-in-JS` (Vamos a escribir JS que parece `CSS` y va a darle estilos a nuestros componentes)
* No tiene configuración
* Nos permite tener un `theme` (Vamos a poder tener nuestros colores, tamaños, etc. En un archivo solo y usarlos en toda la app, también vamos a poder cambiarlos en `runtime`)
* Nos da algunos beneficios out of the box que `CSS` no nos da (nesting de clases, usar `props` en nuestros estilos, etc)
* Permite tener componentes más descriptivos

### Como se usa `Styled Components`?
Al no tener configuración, es muy fácil de usar, lo primero que debemos hacer es importarlo:
```jsx
import styled from "styled-components"
```
Ahora que tenemos disponible la variable `styled`, podemos usar algunos de los componentes que vienen dentro de ella, por ejemplo:
```jsx
import styled from "styled-components"

// Usamos styled.p
export const Japisher = styled.p`
  font-size: 2rem;

  &:after {
    content: ' japish👋';
  }
`

// Usamos styled.button
export const BotonLoco = styled.button`
  padding: 12px;
  background: green;
  color: white;
`
```
Luego podríamos importar estos componentes donde necesitemos y usarlos asi:
```jsx
<Japisher>Mi parrafo</Japisher>
<BotonLoco>Soy reverde</BotonLoco>
```
![01](./assets/styled-1.jpg)

### Conviene usarlo como contenedor o crear componentes reutilizables siempre?
Podemos usar ambos, si el componente lo vamos a reutilizar lo creamos en un archivo aparte, sino dentro del componente:
```jsx
import styled from "styled-components"

const Tarjetilla = styled.div`
  padding: 12px;
  background: white;
  border: 1px solid whitesmoke;
  border-radius: 4px;
`

export default Tarjetilla
```
```jsx
import React from "react"
import styled from "styled-components"

const Contenedor = styled.div`
  padding: 12px;

  .titulo {
    font-size: 24px;
  }
`

function Inicio() {
  return (
    <Contenedor>
      <h1 className="titulo">Inicio</h1>
      <div>Contenido</div>
    </Contenedor>
  )
}

export default Inicio
```

### Cuales son los beneficios que nos da Styled Components frente a CSS?
Clases, pseudo-elementos, etc, nesteados:
`CSS`
```css
.articulo {
  font-size: 1rem;
}

.articulo .negrita {
  font-weight: bold;
}

.articulo.grande {
  font-size: 1.125rem;
}
```

`Styled Components`
```jsx
styled.div`
.articulo {
  font-size: 1rem;

  .negrita {
    font-weight: bold;
  }

  &.grande {
    font-size: 1.125rem;
  }
}`
```

Uso de props o javascript en los estilos:
```jsx
const Texto = styled.div`
  font-size: ${(props) => props.tamaño}px;
`

<Texto tamaño={32}>Mi texto</Texto>
```

> Tip: Usando `template strings` (los backticks), podés meter código `JavaScript` usando `${}`, por ejemplo:
```javascript
`El sentido de la vida es ${40 + 2}` // El sentido de la vida es 42
```

### Animaciones
Si queremos usar animaciones, `Styled Components` nos provee la función `keyframes`, la cual podemos usar de la siguiente manera:
```jsx
import styled, { keyframes } from 'styled-components'

const rotar360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Reloj = styled.img`
  animation: ${rotar360} infinite 10s linear;
  &:hover {
    animation: ${rotar360} infinite 1s linear;
  }
`

<Reloj src="https://placehold.it/64/64" />
```
Esto va a hacer que el elemento tarde 10 segundos en rotar 360 grados, pero al hacerle `hover` va a rotar en solo un segundo.

![02](./assets/styled-rotation.gif)

### Estilos globales
Si queremos agregar estilos globales podemos crear un componente usando la función `createGlobalStyles` de `Styled Components`:
```javascript
import { createGlobalStyles } from 'styled-components'

const EstilosGlobales = createGlobalStyles`
  body {
    padding: 0;
    margin: 0;
    font-family: sans-serif;
  }
`

export default EstilosGlobales
```
Cuando usemos este componente en algun lugar, los estilos se aplican en toda la aplicación.

## Que sería tener componentes mas descriptivos?
Imagina que creamos un componente de `Styled Components` por cada componente dentro de nuestro componente?, en cierto punto llegariamos a tener algo asi:
```html
<Articulo>
  <Titulo>Mi titulo</Titulo>
  <Contenido>Mi contenido</Contenido>
</Articulo>
```
Lo cual creo es bastante mas descriptivo que tener clases por todos lados. Imaginate si ademas reutilizas esos componentes en el resto de la aplicación. Al toque perro. *japish* 👋


### Extras que no vamos a ver en este curso
Hay muchas cosas copadas que todavía no vimos, pero ya vimos suficiente y no quiero marear a nadie.

* [ThemeProvider](https://www.styled-components.com/docs/advanced#theming) de `Styled Components` nos permite establecer variables que vamos a poder acceder desde cualquier `Styled Component`.
* [Media queries](https://www.styled-components.com/docs/advanced#media-templates) en `Styled Components` es muy fácil de hacer y nos permite armar diseños responsive.
* [Extender componentes](https://www.styled-components.com/docs/basics#extending-styles) de `Styled Components` nos permite tomar un componente que ya hayamos creado y tomarlo como base para crear otro.

### Conclusión de Styled Components
Todavía queda mucho por aprender de `Styled Components`, pero con esto ya estamos listos para darle estilos a nuestro ritmosustanciometro ⚗️

## Armando el ritmosustanciometro
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

### Crear un componente Ritmosustanciometro
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

### Agregar un state a App para guardar el nombre de la persona y otro para el listado de individuos
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

### Agregar un formulario con un campo de texto para el nombre y un botón de obtener ritmosustancia
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

### Conectar el campo de nombre al state nombre
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

### Iterar el listado de individuos y mostrar un Ritmosustanciometro por cada item
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

### Implementar la funcionalidad de obtener ritmosustancia
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

### Conclusión del armado
Felicitaciones!, ya tenés el `ritmosustanciometro` andando, tiene mucho `ritmo` pero le falta `sustancia`. Vamos a darsela con `Styled Components`

## Estilando el ritmosustanciometro
Para empezar a estilar nuestro `ritmosustanciometro` vamos a:

1. Crear un `Contenedor` de estilos para `index.js`
2. Crear un `Contenedor` de estilos para `Ritmosustanciometro.js`
3. Convertir a `Ritmosustanciometro.js` en una barra de carga
4. Crear animaciones de aparición y de carga
5. Aplicar las animaciones a `Ritmosustanciometro.js`

### Crear un Contenedor de estilos para index.js
Vamos a ir a `index.js`. Vamos a importar `Styled Components`, crear un `Contenedor` de `styled.div` con unos estilos básicos y vamos a usarlo como contenedor de nuestro componente `App`:

```jsx
// index.js
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from "styled-components" // Importamos `Styled Components`

import Ritmosustanciometro from './Ritmosustanciometro';

import "./styles.css";

// Creamos un container de `styled.div` con unos estilos básicos
const Contenedor = styled.div`
  width: 100%;
  max-width: 640px;
`

function App() {
  const [nombre, setNombre] = useState('');
  const [individuos, setIndividuos] = useState([
    {
      nombre: 'goncy',
      ritmosustancia: 100,
    },
  ]);

  function actualizarNombre(event) {
    setNombre(event.target.value);
  }

  async function obtenerRitmosustancia(event) {
    event.preventDefault();

    const ritmosustancia = await axios('https://wt-3581e5a0e6c19bb4a0552203b2738a9d-0.run.webtask.io/obtener-ritmosustancia/').then(res => res.data);

    setIndividuos(
      individuos.concat({
        nombre,
        ritmosustancia,
      })
    );
    setNombre('');
  }

  // Usamos `Contenedor` como contenedor de nuestra app
  return (
    <Contenedor>
      <h1>Ritmosustanciometro</h1>
      {individuos.map(individuo => (
        <Ritmosustanciometro
          nombre={individuo.nombre}
          ritmosustancia={individuo.ritmosustancia}
        />
      ))}
      <form onSubmit={obtenerRitmosustancia}>
        <input type="text" value={nombre} onChange={actualizarNombre} />
        <button type="submit">Obtener ritmosustancia</button>
      </form>
    </Contenedor>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

### Crear un Contenedor de estilos para Ritmosustanciometro.js
Vamos a hacer lo mismo que en nuestro componente `App`:

```jsx
// Ritmosustanciometro.js
import React from "react";
import styled from "styled-components"; // Importamos `Styled Components`

// Creamos un container de `styled.div` con unos estilos básicos, ancho, alto, margen, borde y alineamos el contenido al centro
const Contenedor = styled.div`
  width: 100%;
  height: 36px;
  margin: 6px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid gainsboro;
`

// Usamos `Contenedor` como contenedor de nuestro componente `Ritmosustanciometro`
function Ritmosustanciometro({nombre, ritmosustancia}) {
  return (
    <Contenedor>
      {nombre}: {ritmosustancia}
    </Contenedor>
  );
}

export default Ritmosustanciometro;
```

![01](./assets/estilos-1.jpg)

### Convertir a Ritmosustanciometro.js en una barra de carga
Vamos a cambiar un poco la estructura del `Ritmosustanciometro` para que parezca una barra de carga marcando el nivel de `ritmosustancia`:

```jsx
// Ritmosustanciometro.js
import React from "react";
import styled from "styled-components";

const Contenedor = styled.div`
  width: 100%;
  height: 36px;
  margin: 6px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 1px solid gainsboro;

  .barra {
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    background-color: hsl(${props => props.ritmosustancia}, 100%, 50%);
    width: ${props => props.ritmosustancia}%;
  }

  .cantidad {
    z-index: 1;
  }
`

// Le pasamos el valor de `ritmosustancia` a nuestro container para poder usarlo en nuestros estilos
function Ritmosustanciometro({nombre, ritmosustancia}) {
  return (
    <Contenedor ritmosustancia={ritmosustancia}>
      {/* Creamos un `div` para mostrar el `nombre` y el valor de `ritmosustancia` y otro para mostrar la barra de nivel de `ritmosustancia`, les asignamos las clases que definimos mas arriba */}
      <div className="cantidad">{nombre}: {ritmosustancia}</div>
      <div className="barra" />
    </Contenedor>
  );
}

export default Ritmosustanciometro;
```

![02](./assets/estilos-2.jpg)

Perfecto, `Styled Components` nos permitió usar el valor de `ritmosustancia` de `props` para cambiar el color y ancho de nuestra barra de nivel de `ritmosustancia`

### Crear animaciones de aparición y de carga
Vamos a crear un archivo `animaciones.js` dentro de `src`, al mismo nivel que el resto de nuestros componentes. Vamos a importar `keyframes` de `Styled Components` y vamos a crear dos animaciones, una `aparecerDeAbajo` y una `carga`, ambas las vamos a usar en `Ritmosustanciometro`:

```javascript
import {keyframes} from "styled-components";

// Inicia 20px mas abajo con `opacity` 0, luego se acomoda y aparece
export const aparecerDeAbajo = keyframes`
  0% {
    transform: translateY(20px);
    opacity: 0;
  }

  100% {
    transform: translateY(0px);
    opacity: 1;
  }
`

// Inicia con un ancho de 0 y color rojo y toma el ancho y color del argumento `valor` que le pasemos
export const carga = valor => keyframes`
  0% {
    width: 0;
    background-color: hsl(0, 100%, 50%);
  }

  100% {
    background-color: hsl(${valor}, 100%, 50%);
    width: ${valor}%;
  }
`
```

> Tip: `hsl` significa `hue saturation lightness`, por lo tanto `hsl(0, 100%, 50%)` sería rojo y `hsl(100, 100%, 50%)` sería verde

### Aplicar las animaciones a Ritmosustanciometro.js
Vamos a importar las animaciones que acabamos de crear a `Ritmosustanciometro.js` y vamos a aplicarlas:
```jsx
// Ritmosustanciometro.js
import React from "react";
import styled from "styled-components";

import {carga, aparecerDeAbajo} from "./animaciones" // Importamos las animaciones

const Contenedor = styled.div`
  width: 100%;
  height: 36px;
  margin: 6px 0;
  animation: ${aparecerDeAbajo} 1s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 1px solid gainsboro;

  .cantidad {
    z-index: 1;
  }

  .barra {
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    background-color: hsl(${props => props.ritmosustancia}, 100%, 50%);
    width: ${props => props.ritmosustancia}%;
    animation: ${(props) => carga(props.ritmosustancia)} 1s ease-in-out;
    animation-fill-mode: forwards;
  }
`

const Ritmosustanciometro = ({nombre, ritmosustancia}) => (
  <Contenedor ritmosustancia={ritmosustancia}>
    <div className="cantidad">{nombre}: {ritmosustancia}</div>
    <div className="barra" />
  </Contenedor>
);

export default Ritmosustanciometro;
```

![03](./assets/estilos-3.gif)

### Conclusión
Ya tenemos nuestro `ritmosustanciometro` con un poco mas de onda!

## 📝 Ejercicios
Ahora es tu turno, usa `React` y `Styled Components` para crear tu propio `ritmosustanciometro`! (o en vez de medir ritmosustancia podés medir otra cosa mas útil que encuentres (aunque no creo que haya nada mas útil), no te limites a copiar lo que hace el proyecto original, dale tu ritmo y sustancia para armar algo piola, sino *japish*👋

* Deshabilitar el boton de `obtener ritmosustancia` si el nombre esta vacío
* Deshabilitar el botón de `obtener ritmosustancia` mientras se está haciendo el pedido al servidor
* Estilar el `ritmosustanciometro`
* Agregar un botón para eliminar todos los resultados de `ritmosustancia`
* Pasar los estilos de `styles.css` a un componente con `createGlobalStyles` de `Styled Components`

## 🤷‍♂️ Y ahora que?
Ahora sabes un poco de muchas cosas, convertí lo poco en mucho y hace mucho con poco!, we, re filosofo el goncy, *Japish*👋. Tomá en cuenta algo, acabás de ver muchas cosas nuevas, cada una tiene su complejidad, no esperes saber todo ya ni te desmotives si no sale a la primera, después de todo, nadie nace sabiendo hacer un fernet, o codear en React.
