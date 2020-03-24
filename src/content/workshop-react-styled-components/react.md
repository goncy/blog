---
layout: post
title: Armando una aplicación con React Y Styled Components (2 / 5) - Introducción a React
image: assets/cover.jpg
author: goncy
permalink: workshop-react-styled-components-2
date: 2020-03-23T07:03:47.149Z
draft: false
tags: 
  - Español
  - Lessons
  - React
  - Styled Components
---

### Esta es la primer parte de una serie de cuatro artículos sobre como crear una aplicación usando React y Styled Components
0. [Intro](./intro.md)
1. Herramientras
⋅⋅1. [React]("./react.md") 👈
..2. [Styled Components]("./styled-components.md")
2. Aplicación
⋅⋅1. [Armando la estructura con React]("./estructura.md")
⋅⋅2. [Estilos y animaciónes con Styled Components]("./estilos.md")

# `React`? Se fuma?
* `React` es una librería para crear interfaces de usuario
* Su sintaxis es parecida al `HTML` y se llama `JSX`
* `React` propone dividir nuestra aplicación en componentes que podamos reutilizar

## Que diferencia hay entre `HTML` y `JSX`?
Una de las principales diferencias que podemos encontrar es que `HTML` es un `lenguaje`. Solo describe la estructura de nuestra aplicación, una vez el cargada, el contenido de nuestra aplicación nunca va a cambiar.
Mientras tanto, `JSX`, es solo una sintaxis parecida a `HTML`, que los navegadores no puede ejecutar.
Antes de que nuestra aplicación sea renderizada, todo el código escrito en `JSX` es convertido a `Vanilla JavaScript` por herramientas conocidas como transpiladores, como `Babel` o `Traceur`, que nos permiten usar funcionalidades de `JavaScript` que todavía no son soportadas por todos los navegadores (entre otras cosas).

Algunas de las diferencias que podemos encontrar a la hora de escribir `JSX` son:
* Los atributos de los elementos se escriben en `camelCase` (`onClick` en vez de `onclick`)
* `class` se escribe `className` (ya que `class` es una palabra reservada de `JavaScript`)
* Todos los componentes deben escribirse en `PascalCase` (mayúscula al principio), ya que así se da cuenta `JSX` de que es un componente y no un elemento `HTML`
* Siempre que queramos escribir código `JavaScript` debemos hacerlo entre llaves `{}`

> Tip: Si querés ver como se ve `JSX` ya transpilado a `JavasScript` o como deberías escribir `React` sin `JSX`, podes usar [este](https://jsx-live.now.sh/) live editor de [Belen Curcio](https://twitter.com/okbel)

## Escribiendo un componente de `React`
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

## State
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

## Props
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

## Extras que no vamos a ver en este curso
* [Redux](https://redux.js.org/), una librería para manejar el estado de nuestra aplicación `React`, podés ver [este curso](https://egghead.io/courses/getting-started-with-redux) que lo da su creador, Dan Abramov

## Conclusión
Esto es todo lo que necesitamos de `React` para crear nuestro `ritmosustanciometro`!

[⏪ Inicio](./intro.md) | [Styled Components ⏩](./styled-components.md)
