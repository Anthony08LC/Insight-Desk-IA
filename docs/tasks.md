# InsightDesk AI - Backlog

Leyenda: `- [ ]` Pendiente, `- [ ] [~]` En progreso, `- [x]` Completada.

## Fundamentos

- [x] Crear especificacion del producto.
- [x] Crear plan de ejecucion.
- [x] Crear diseno de arquitectura.
- [x] Inicializar proyecto Next.js TypeScript.
  - Prioridad: P0
  - Dependencias: ninguna
- [ ] Configurar ESLint, scripts y variables de entorno.
  - Prioridad: P0
  - Dependencias: proyecto inicializado
- [ ] Configurar Prisma y esquema inicial.
  - Prioridad: P0
  - Dependencias: proyecto inicializado

## Dominio

- [ ] Implementar entidades User, Ticket y Comment.
  - Prioridad: P0
  - Dependencias: proyecto inicializado
- [ ] Implementar casos de uso de tickets.
  - Prioridad: P0
  - Dependencias: entidades
- [ ] Implementar interfaces de repositorios e IA.
  - Prioridad: P0
  - Dependencias: dominio

## Persistencia y API

- [ ] Implementar adaptadores Prisma.
  - Prioridad: P0
  - Dependencias: esquema Prisma y interfaces
- [ ] Implementar autenticacion y sesiones.
  - Prioridad: P0
  - Dependencias: adaptadores
- [ ] Crear endpoints de usuarios y tickets.
  - Prioridad: P0
  - Dependencias: casos de uso
- [ ] Crear endpoints de comentarios.
  - Prioridad: P1
  - Dependencias: casos de uso y autenticacion
- [ ] Integrar Gemini con timeout y fallback.
  - Prioridad: P0
  - Dependencias: interfaces IA

## Frontend

- [ ] Crear layout y navegacion.
  - Prioridad: P1
  - Dependencias: proyecto inicializado
- [ ] Crear paginas de autenticacion.
  - Prioridad: P1
  - Dependencias: API de autenticacion
- [ ] Crear listado y filtros de tickets.
  - Prioridad: P1
  - Dependencias: API de tickets
- [ ] Crear detalle y flujo de resolucion.
  - Prioridad: P1
  - Dependencias: API de tickets y comentarios
- [ ] Crear panel con metricas basicas.
  - Prioridad: P2
  - Dependencias: API de tickets

## Calidad

- [ ] Agregar pruebas unitarias de dominio.
  - Prioridad: P0
  - Dependencias: dominio
- [ ] Agregar pruebas de casos de uso.
  - Prioridad: P0
  - Dependencias: casos de uso
- [ ] Agregar pruebas de API criticas.
  - Prioridad: P1
  - Dependencias: endpoints
- [ ] Agregar pruebas end-to-end del MVP.
  - Prioridad: P1
  - Dependencias: frontend y API
- [ ] Ejecutar lint, typecheck y pruebas.
  - Prioridad: P0
  - Dependencias: implementacion

## Seguridad y despliegue

- [ ] Configurar validaciones y control de acceso.
  - Prioridad: P0
  - Dependencias: API
- [ ] Configurar auditoria.
  - Prioridad: P2
  - Dependencias: persistencia
- [ ] Agregar Docker o instrucciones locales.
  - Prioridad: P2
  - Dependencias: proyecto
- [ ] Preparar despliegue y health check.
  - Prioridad: P2
  - Dependencias: MVP completo
