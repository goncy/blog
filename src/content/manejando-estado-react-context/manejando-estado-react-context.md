---
layout: post
title: Manejando el estado global de nuestra aplicación con React Context
image: assets/cover.jpg
author: goncy
permalink: manejando-estado-react-context
date: 2020-03-23T07:03:47.149Z
draft: false
tags: 
  - React
  - Context
  - Patterns
  - Español
---

Vamos a ver como usar context para evitar prop drilling, hacer separation of concerns y principalmente ahorrarnos dolores de cabeza a futuro.

## Que vamos a hacer?

Una aplicación que muestre imágenes de perritos, mostrando primero un disclaimer de que su lindura puede afectar a la salud.

<iframe
  src="https://codesandbox.io/embed/manejando-estado-en-aplicaciones-con-reactcontext-4z2cm?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="Manejando estado en aplicaciones con React context"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

### El flow sería:

 1. Ver el disclaimer

 2. Aceptar el disclaimer

 3. Fetchear perritos

 4. Ver un loading mientras se fetchean

 5. Ver perritos

 6. Ir al hospital

Capaz no la última *(si sos un ser frio e insensible).*

El detalle acá va a ser que **quien va a decidir si mostrar la aplicación o el disclaimer (basado en si se aceptó o no) lo va a hacer el context** y no nuestro componente index.js / App.js como sucede generalmente.

## Crear 👉 Wrappear 👉 Usar

Estos van a ser los 3 pasos a seguir cada vez que creemos un nuevo context para nuestra aplicación, podes tener (y te recomiendo tener) un context por cada “feature” de tu aplicación (session, user, etc). En este caso vamos a usar solo uno por cuestiones de simplicidad.

### 1. Crear

Creamos una carpeta store y dentro un archivo dog.js con el siguiente contenido (atento a los comentarios en el código):

<iframe
  src="https://codesandbox.io/embed/manejando-estado-en-aplicaciones-con-reactcontext-4z2cm?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="Manejando estado en aplicaciones con React context"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

### 2. Wrappear

Vamos a nuestro index.js y lo llenamos de la siguiente manera (atento a los comentarios en el código):

<iframe
  src="https://codesandbox.io/embed/manejando-estado-en-aplicaciones-con-reactcontext-4z2cm?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="Manejando estado en aplicaciones con React context"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

### 3. Usar

Si bien ya usamos nuestro context en el paso anterior, falta una parte donde lo usamos. Vamos a crear al mismo nivel que nuestro index.js un archivo TermsOfService.js con el siguiente contenido (atento a los comentarios en el código):

<iframe
  src="https://codesandbox.io/embed/manejando-estado-en-aplicaciones-con-reactcontext-4z2cm?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="Manejando estado en aplicaciones con React context"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

## Listo 🎉

**Ya estamos!**, vamos a hacer un pequeño recap:

 1. Creamos nuestro archivo dog.js donde definimos nuestro estado (initial state y context), como actualizarlo (reducer), que vamos a exponer a quienes lo usen (el componente que usa el Provider y pasa la prop value) y exportamos el context y el componente.

 2. Wrappeamos nuestra aplicación con el Provider que exportamos desde dog.js para poder acceder a esta data en todos lados.

 3. Usamos el state y actions que exportamos en dog.js en cualquier componente usando useContext

Cuando se muestra el disclaimer, nosotros clickeamos en Si y eso ejecuta la funcion acceptTerms que despacha la acción TERMS_ACCEPTED , lo cual pasa la propiedad termsAccepted a true y hace que nuestro context, en vez de mostrar el disclaimer muestre nuestra aplicación.

Podemos imaginar algo parecido con autenticación, mostrar el login siempre que el usuario no este autenticado, de esa manera no tenemos que preocuparnos por redirigir al usuario y siempre va a poder mantener la ruta en la que estaba.

## Por que haría esto?

![01](./assets/satan.png)

### Ventajas:
* Acceder a estados sin pasarlos por arboles de componentes
* Manejo de estados async fuera de los componentes
* Bloqueo / redirecciones fuera de los componentes
* Administrar data / handlers / redirecciones / bloqueos en un solo lugar

### Desventajas:
* Puede volverse complejo con referencias circulares si tenemos data que depende de data
* La llamada a handlers es imperativa (no necesariamente, pero por lo menos en este ejemplo)
* Tenemos un provider por cada context que creemos (depende como lo usemos es una desventaja o una ventaja)

## Lado B

Acá dejo otro ejemplo, un poco mas lindo visualmente, usando exactamente el mismo patrón

<iframe
  src="https://codesandbox.io/embed/manejando-estado-en-aplicaciones-con-reactcontext-g1esj?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="Manejando estado en aplicaciones con React context"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

### No hagas lo que digo ni lo que hago

**Felicitaciones**, aprendiste como yo creo que las cosas son mejores. Ahora olvidate que alguien lo hace así y usá esta información de la manera que más te sirva, **be creative** 💫
