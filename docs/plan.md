# InsightDesk — Plan

## Enfoque

Implementar el MVP como una página de Next.js App Router con un formulario cliente y una ruta de API servidor. Mantener la integración con Gemini en un módulo pequeño y usar Tailwind para estilos responsive.

## Secuencia

1. Preparar Next.js, TypeScript, Tailwind y variables de entorno.
2. Crear la función de servidor que consulta Gemini.
3. Implementar `POST /api/chat` con validación y respuestas de error claras.
4. Construir la página, navbar y formulario con estados de carga, respuesta y error.
5. Revisar los criterios de aceptación y el arranque local con una clave configurada.

## Decisiones

- La consulta se envía por `POST`; la clave permanece en el servidor.
- El MVP devuelve una respuesta completa, sin streaming ni historial.
- La interfaz y los mensajes se presentan en español.
