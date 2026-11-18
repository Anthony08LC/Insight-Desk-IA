# InsightDesk AI - Arquitectura

## Principios

La solucion aplica Clean Architecture, SOLID, DRY, KISS y Separation of Concerns. Las reglas de negocio no dependen de Next.js, Prisma ni Gemini. Las interfaces de salida permiten sustituir persistencia y proveedor IA mediante Dependency Injection.

## Clean Architecture

```text
src/
  app/
    (public)/
    dashboard/
    api/
  core/
    domain/
      entities/
      value-objects/
      errors/
    application/
      ports/
      use-cases/
      dtos/
  infrastructure/
    database/
    auth/
    ai/
    logging/
  interface/
    components/
    hooks/
    presenters/
  shared/
```

### Dependencias permitidas

- `domain` no importa capas externas.
- `application` importa solo `domain` y sus propios puertos.
- `infrastructure` implementa puertos de application.
- `app` e `interface` conectan casos de uso con UI y HTTP.

## Diagrama de componentes

```mermaid
flowchart TD
  Browser[Usuario navegador] --> UI[Next.js UI]
  UI --> API[Route Handlers]
  API --> UC[Casos de uso]
  UC --> RepoPort[Port TicketRepository]
  UC --> AIPort[Port AIProvider]
  RepoPort --> Prisma[Adaptador Prisma]
  AIPort --> Gemini[Adaptador Gemini]
  Prisma --> DB[(PostgreSQL)]
  Gemini --> External[Gemini API]
```

## Flujo frontend-backend

```mermaid
sequenceDiagram
  actor Agent
  participant UI
  participant API
  participant UseCase
  participant AI
  participant DB

  Agent->>UI: Crea ticket
  UI->>API: POST /api/tickets
  API->>UseCase: CreateTicketCommand
  UseCase->>DB: Guarda ticket
  UseCase->>AI: Analiza ticket
  AI-->>UseCase: Analisis o fallback
  UseCase->>DB: Guarda analysis
  UseCase-->>API: TicketDTO
  API-->>UI: 201 Created
  UI-->>Agent: Muestra ticket y propuesta
```

## Modelo de datos

```mermaid
erDiagram
  USER ||--o{ TICKET : requests
  USER ||--o{ TICKET : assigned
  USER ||--o{ COMMENT : writes
  TICKET ||--o{ COMMENT : contains
  TICKET ||--o{ TICKET_EVENT : records

  USER {
    uuid id PK
    string email UK
    string passwordHash
    string role
    boolean active
  }
  TICKET {
    uuid id PK
    uuid requesterId FK
    uuid assigneeId FK
    string title
    text description
    string status
    string priority
    string category
    string analysisSource
  }
  COMMENT {
    uuid id PK
    uuid ticketId FK
    uuid authorId FK
    text content
    boolean internal
  }
  TICKET_EVENT {
    uuid id PK
    uuid ticketId FK
    uuid actorId FK
    string action
    json metadata
  }
```

## Dise単o de APIs

| Metodo | Ruta | Descripcion |
|---|---|---|
| POST | `/api/auth/register` | Crear cuenta |
| POST | `/api/auth/login` | Iniciar sesion |
| POST | `/api/auth/logout` | Cerrar sesion |
| GET | `/api/tickets` | Listar tickets paginados |
| POST | `/api/tickets` | Crear ticket |
| GET | `/api/tickets/:id` | Obtener detalle |
| PATCH | `/api/tickets/:id` | Cambiar estado, asignacion o datos |
| GET | `/api/tickets/:id/comments` | Listar comentarios |
| POST | `/api/tickets/:id/comments` | Crear comentario |
| GET | `/api/dashboard/metrics` | Obtener metricas |

Las respuestas usan un envelope consistente:

```json
{
  "data": {},
  "error": null
}
```

Los errores usan codigo, mensaje y detalles opcionales.

## Integracion con Gemini

Gemini se implementa tras `AIProvider`. El prompt recibe solo titulo y descripcion necesarios, pide JSON estricto y valida la salida con Zod. Limites:

- Timeout configurable.
- Dos reintentos como maximo.
- Sin reintento ante validacion de clave.
- Fallback con categoria `GENERAL`, prioridad `MEDIUM`, resumen disponible y respuesta neutral.
- `source = gemini | fallback`.
- Ninguna clave se envia al navegador.

```mermaid
flowchart LR
  Request[CreateTicket] --> Prompt[Constructor seguro]
  Prompt --> Provider[GeminiProvider]
  Provider --> Validate[Zod validation]
  Validate -->|Valido| Analysis[Analysis]
  Provider -->|Timeout/Error| Fallback[FallbackProvider]
  Validate -->|JSON invalido| Fallback
  Analysis --> Ticket[Persistencia]
  Fallback --> Ticket
```

## Autenticacion

El MVP usa usuarios locales y sesiones JWT almacenadas en cookies HttpOnly. Las rutas API verifican:

- Sesion valida.
- Rol permitido.
- Propiedad o asignacion para recursos clientes/agentes.
- Token activo.

Roles:

- `CUSTOMER`: crea y consulta sus tickets.
- `AGENT`: gestiona tickets asignados y todos los tickets segun alcance.
- `SUPERVISOR`: consulta metricas.
- `ADMIN`: administra usuarios y configuracion.

## Patrones de diseño utilizados

- Repository: abstrae Prisma.
- Adapter: integra Gemini y autenticacion.
- Factory: crea casos de uso con dependencias.
- DTO: limita datos entre API y UI.
- Strategy: permite cambiar proveedor IA.
- Result/Use Case: comunica errores sin depender de HTTP.
- Dependency Injection: conecta puertos e implementaciones.
- State: gobierna transiciones validas de tickets.

## Estados de ticket

```mermaid
stateDiagram-v2
  [*] --> OPEN
  OPEN --> IN_PROGRESS
  IN_PROGRESS --> WAITING_CUSTOMER
  WAITING_CUSTOMER --> IN_PROGRESS
  IN_PROGRESS --> RESOLVED
  RESOLVED --> CLOSED
  RESOLVED --> IN_PROGRESS
  CLOSED --> [*]
```
