# InsightDesk AI - Plan de ejecucion

## Roadmap completo

### Fase 0 - Fundamentos

- Configurar workspace, TypeScript, linting y pruebas.
- Crear modelos de dominio y contratos.
- Provisionar la base de datos.

### Fase 1 - MVP funcional

- Autenticacion.
- CRUD de tickets.
- Comentarios.
- Integracion IA.
- Panel basico.

### Fase 2 - Operacion

- Auditoria y observabilidad.
- Mejora de filtros y metricas.
- Pruebas end-to-end.
- Preparacion de despliegue.

### Fase 3 - Evolucion

- Integraciones de correo y chat.
- Automatizacion de SLA.
- Analitica avanzada.
- Colas para procesamiento IA.

## Tecnologias seleccionadas

| Capa | Tecnologia | Justificacion |
|---|---|---|
| Aplicacion | Next.js 15 con App Router | Frontend y backend en un solo deploy, SSR y rutas API |
| Lenguaje | TypeScript estricto | Seguridad de tipos y mantenibilidad |
| Base de datos | PostgreSQL | Integridad relacional y consultas flexibles |
| ORM | Prisma | Migraciones tipadas y productividad |
| Autenticacion | JWT con cookies HttpOnly | Simplicidad para el MVP y proteccion frente a XSS |
| IA | Gemini API | Analisis de lenguaje y borradores |
| UI | Tailwind CSS | Desarrollo responsive consistente |
| Pruebas | Vitest y Testing Library | Feedback rapido y pruebas unitarias/componentes |
| Lint | ESLint | Calidad automatizada |

## Justificacion tecnica

Next.js permite entregar rapidamente una solucion full-stack sin introducir la complejidad temprana de microservicios. Clean Architecture se mantiene mediante modulos separados por dominio, casos de uso y adaptadores. PostgreSQL ofrece relaciones claras entre usuarios, tickets y comentarios. Gemini se encapsula detras de una interfaz para permitir mocks y cambiar proveedor sin afectar el dominio.

## Estructura de fases

1. Documentacion y contratos.
2. Configuracion de infraestructura local.
3. Dominio y casos de uso.
4. Persistencia y API.
5. Integracion IA.
6. Interfaz.
7. Seguridad y pruebas.
8. Despliegue.

## Estrategia de despliegue

- Entorno local con PostgreSQL y variables `.env.local`.
- Contenedor Docker opcional para base de datos.
- Build y migraciones antes de publicar.
- Variables secretas administradas por la plataforma de despliegue.
- Migraciones reproducibles y reversibles cuando sea posible.
- Health checks para aplicacion y base de datos.
- Despliegue inicial en una instancia y luego escalado horizontal.

## Estrategia de pruebas

- Pruebas unitarias de entidades y casos de uso.
- Pruebas de repositorios con base de datos o mocks controlados.
- Pruebas de componentes frontend.
- Pruebas de rutas API.
- Pruebas end-to-end para login y ciclo de ticket.
- Casos de Gemini exitoso, timeout y fallback.
- Cobertura enfocada en reglas de acceso y estados.

## Estrategia de seguridad

- Cookies HttpOnly, Secure en produccion y SameSite.
- Validacion con Zod en API.
- Hash bcrypt o Argon2 para contrasenas.
- Autorizacion por rol y propiedad del recurso.
- Rate limiting en endpoints sensibles.
- Sanitizacion/escape ante representacion.
- Secretos excluidos de Git.
- Auditoria sin registrar contrasenas ni contenido IA secreto.

## Estrategia de escalabilidad

- Stateless session validation.
- Indices sobre estado, prioridad, asignacion y fechas.
- Paginacion cursor o desplazada segun volumen.
- Procesamiento IA asincrono cuando el volumen crezca.
- Cola de trabajos para reintentos y limitacion de proveedor.
- Cache solo despues de medir cuellos de botella.

## Riesgos identificados

| Riesgo | Impacto | Mitigacion |
|---|---|---|
| Latencia o indisponibilidad de Gemini | Ticket bloqueado | Timeout, reintentos acotados y fallback |
| Respuestas IA incorrectas | Decisiones erroneas | Aprobacion humana y trazabilidad |
| Escalada de costos IA | Presupuesto | Limites, cache de borradores y control por solicitud |
| Credenciales filtradas | Compromiso de cuentas | HttpOnly, rotacion y secretos externos |
| Crecimiento de base de datos | Rendimiento | Indices, paginacion y archivado |
| Scope creep | Retrasos | Alcance MVP controlado por spec y tasks |
