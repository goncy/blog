---
layout: post
title: Acelerando el desarrollo con Chakra UI
image: assets/banner.jpg
author: goncy
permalink: acelerando-desarrollo-chakra
date: 2021-03-01T07:03:47.149Z
draft: false
tags:
  - React
  - UI
  - Español
---

Vamos a ver que es Chakra UI y que diferencias encontré con soluciones similares dentro del ecosistema de React.

## Que es Chakra UI?
[Chakra UI](https://chakra-ui.com/) es una librería de componentes simple, modular y accesible (a11y) que te da las bases para construir tus aplicaciónes React.
> Descripción de [la landing de Chakra UI](https://chakra-ui.com/)

## Que hace a Chakra UI tan interesante?
Teniendo tantas librerías de componentes dando vueltas es difícil pensar que una tenga algo especial que destaque entre el resto, estas son algunas de las cosas que me gustan.

### Style props
Algo que me pasó con la mayoría de las soluciones de estilos es lo siguiente, vamos a suponer que tenemos un formulario, con un botón de submit debajo:

```jsx
const ContactForm = () => (
  <Form>
    <Fields />
    <Button type="submit">Submit</Button>
  </Form>
);
```

El botón es un componente separado del formulario pero en la UI no hay espacio entre ambos, basado en la librería que implementemos la solución sería algo así:

#### CSS o similares
```jsx
import './styles.css';

const ContactForm = () => (
  <Form>
    <Fields />
    <Button className="submit" type="submit">Submit</Button>
  </Form>
);
```

#### CSS / SCSS modules
```jsx
import styles from './styles.css';

const ContactForm = () => (
  <Form>
    <Fields />
    <Button className={styles.submit} type="submit">Submit</Button>
  </Form>
);
```

#### Styled components / Emotion
```jsx
import styled from 'styled-components';

const StyledButton = styled(Button)`
  margin-top: 12px;
`

const ContactForm = () => (
  <Form>
    <Fields />
    <Button className={styles.submit} type="submit">Submit</Button>
  </Form>
);
```

#### Chakra UI
```jsx
const ContactForm = () => (
  <Form>
    <Fields />
    <Button marginTop={6} type="submit">Submit</Button>
  </Form>
);
```

Todos los componentes de Chakra UI pueden recibir style props, las cuales tienen los mismos nombres que las propiedades de CSS (y sus abreviaciones, marginTop también es mt). Extender los estilos de nuestros componentes para hacerlos mas flexibles, no romper la reusabilidad y evitar crear componentes de más, es super fácil con Chakra UI.

### Responsive styles
Este es probablemente uno de los mejores features de Chakra UI. Hoy en día es poco probable que creemos una aplicación web que `NO` sea responsive. Personalmente, escribir media queries nunca fue mi fuerte y tener que escribir una para cambiar el `direction` de un div con display `flex` me da una fiaca terrible.

Más arriba vimos las `Style props`. Todas las Style props además de recibir un valor, pueden recibir un objeto (u array) con distintos valores dependiendo el tamaño del viewport:

```jsx
import {Text} from "@chakra-ui/react"

<Text fontSize={{base: 'xl', sm: '2xl', md: '3xl'}}>
  Soy un título
</Text>
```

Ahora, en mobile vamos a tener un texto tamaño `xl`, en dispositivos chicos `2xl` y en los medianos `3xl`.

### Theming
El theming en Chakra UI sigue la [Styled System Theme Specification](https://system-ui.com/theme/), por lo que la manera de definir espacios, colores, etc, es bastante estandar.

En nuestro theme podemos definir muchas cosas, como las `fonts`, `font sizes`, `font weights`, `line heights`, `colors` y mucho más.

Es más, se acuerdan de las `Style props`? Depende del tipo de prop que sea, en vez de tomar el valor literal, va a mapear el valor que le pasemos al valor que corresponda, por ejemplo, en vez de:

```jsx
<Text color="#FFF5F7">Mi texto es rosa</Text>
```

Podríamos hacer:

```jsx
<Text color="pink.50">Mi texto es rosa</Text>
```

Obviamente podemos crear nuestros propios colores, como `brand`, `primary` o lo que queramos y usar esos colores en nuestros componentes. Así que actualizar el color de la identidad de una marca sería cambiar una linea de código.

### Componentes simples
Probé muchísimas librerías que tenian infinidad de componentes incluidos, como [Antd](https://ant.design/), probé librerías en las que vos tenés que hacer todo, como [Tailwind](https://tailwindcss.com/). Chakra UI trae varios componentes, muy flexibles, simples y útiles. Por lo que no terminás instalando dependencias extras o agregando librerías innecesarias. Algunos de los componentes que mas me gustan son:

* [Stack](https://chakra-ui.com/docs/layout/stack): Un div con display flex que deja separación entre todos los elementos hijos.

```jsx
<Stack direction={{base: "column", sm: "row"}} spacing="24px">
  <Box w="40px" h="40px" bg="yellow.200">
    1
  </Box>
  <Box w="40px" h="40px" bg="tomato">
    2
  </Box>
  <Box w="40px" h="40px" bg="pink.100">
    3
  </Box>
</Stack>
```
> Vertical en mobile, horizontal en el resto.

* [Button](https://chakra-ui.com/docs/form/button): Botón simple con varios modificadores como `size`, `colorScheme`, `variant`, `isLoading`, `icon`, etc.

* [Skeleton](https://chakra-ui.com/docs/feedback/skeleton): Componente de carga que permite disminuir la transición entre un estado de carga y el estado de cargado.

## Como se compara a <inserte solución de estilos aquí>:
Si bien cada librería es un mundo, voy a intentar de marcar algunos puntos muy breves para las librerías que use.

* [Tailwind](https://tailwindcss.com/): Me parece excelente y creo que al usar CSS por debajo es una gran solución si tenés un equipo que desarrolle el style system y tiempo para llevarlo a cabo. Creo que Chakra UI da muy buenos estandares sin tanto trabajo, mientras mantiene una filosofía bastante parecida a los estilos atómicos que plantea Tailwind.

* [CSS / SCSS modules](https://github.com/css-modules/css-modules): Un poco lo mismo que cualquier solución que implique no tener bases, necesitas desarrollar todo por tu cuenta, incluyendo estilos, contrastes, estandares, a11y, etc. Con la ventaja de performance que puede implicar usar una solución CSS contra una CSS-in-JS.

* [Antd](https://ant.design/) / [MaterialUI](https://material-ui.com/es/): Son soluciones muy completas que también traen un costo muy alto, no solo en su peso sino en la flexibilidad de la UI, si bien son extensibles su diseño es bastante reconocido y estandar, lo que puede hacer complejo intentar despegarse de lo que proponen.

* [Styled components](https://styled-components.com/) / [Emotion](https://emotion.sh/docs/introduction): En realidad Chakra UI esta construido sobre emotion (cuya api es casi idéntica a la de styled components), por lo que podemos extender todos los componentes de Chakra UI usando emotion.

```jsx
import styled from "@emotion/react";
import {Text} from "@chakra-ui/react";

const GreenText = styled(Text)`
  color: green;
`
```

Podemos pensar a Chakra UI como una capa de simplicidad puesta sobre emotion / styled components.

## Aun hay más
Recién estamos rascando la superficie de las cosas que realmente tiene Chakra UI, otras cosas interesantes para leer pueden ser [la prop `sx`](https://chakra-ui.com/docs/features/the-sx-prop), el [color mode](https://chakra-ui.com/docs/features/color-mode), [transitions](https://chakra-ui.com/docs/components/transitions) y más.

---

Si te gustan estos posts, no te olvides de seguirme en:
* [Twitter](https://twitter.com/goncy)
* [Twitch](https://twitch.tv/goncypozzo)
* Sumarte al [discord](https://discord.gg/rAmPWU6eHg)
