# InsightDesk — Especificación

## Objetivo

MVP web para escribir una consulta y ver la respuesta generada por Google Gemini.

## Usuario y flujo

Una persona abre la página, escribe una pregunta, pulsa **Consultar** y ve la respuesta o un mensaje de error.

## Alcance

- Página de inicio responsive con el nombre InsightDesk.
- Formulario con área de texto y botón de envío.
- Indicador de carga y presentación legible de la respuesta.
- Validación de consulta vacía y manejo de errores básicos.
- API Route de Next.js que recibe la consulta y llama a Gemini en el servidor.
- Clave `GEMINI_API_KEY` configurada mediante `.env.local`, nunca expuesta al navegador.

## Fuera del MVP

Autenticación, historial persistente, base de datos, streaming, selección de modelos y conversaciones con contexto.

## Criterios de aceptación

- El usuario puede enviar una pregunta y ver la respuesta de Gemini.
- Durante la solicitud se indica que está procesándose y se evita el envío duplicado.
- Las entradas vacías, los fallos de API y la falta de configuración muestran un error entendible.
- La clave de Gemini solo se usa en el servidor.
- La aplicación se inicia con `npm install` y `npm run dev`, una vez configurada la clave.
