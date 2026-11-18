# InsightDesk AI - Especificacion del producto

## Objetivo del producto

InsightDesk AI es una plataforma de mesa de ayuda inteligente para registrar, priorizar y resolver solicitudes de soporte. Un agente de Gemini analiza cada consulta y propone categoria, prioridad, resumen y una respuesta inicial, mientras mantiene a la persona responsable de la decision final.

## Problema que resuelve

Los equipos de soporte reciben solicitudes sin estructura, pierden tiempo clasificandolas y realizan respuestas repetitivas de forma manual. InsightDesk AI organiza el flujo de trabajo y reduce el tiempo hasta la primera respuesta sin eliminar la supervision humana.

## Usuarios objetivo

- Agentes de soporte que gestionan tickets.
- Supervisores que revisan volumen, prioridades y rendimiento.
- Clientes o colaboradores que crean solicitudes de soporte.
- Administradores que gestionan usuarios y configuracion.

## Alcance

### Incluido

- Registro y autenticacion de usuarios.
- Creacion, consulta, filtrado y actualizacion de tickets.
- Comentarios internos y respuestas visibles para el solicitante.
- Clasificacion IA y sugerencia de respuesta.
- Panel operativo con metricas basicas.
- Persistencia en PostgreSQL.
- Integracion Gemini con fallback controlado.

### Excluido del MVP

- Integracion con correo, Slack o telefonia.
- Canales web embebidos.
- SLA avanzado y escalamiento automatico.
- Entrenamiento o fine-tuning propio.
- Analitica predictiva.
- Aplicaciones moviles nativas.

## MVP

El MVP permite a un agente autenticado crear tickets, listar y filtrar incidencias, revisar una propuesta de IA y actualizar el estado. Un cliente puede enviar una solicitud y consultar su ticket. Si Gemini no esta disponible, la plataforma conserva el ticket y presenta una respuesta simulada claramente identificada.

## Funcionalidades

1. Gestion de cuentas y sesiones.
2. Gestion completa de tickets.
3. Clasificacion automatica por categoria y prioridad.
4. Resumen de solicitud.
5. Redaccion asistida de respuesta.
6. Comentarios internos y publicos.
7. Filtros por estado, prioridad y categoria.
8. Indicadores operativos basicos.
9. Auditoria de cambios sensibles.
10. Manejo seguro de claves y errores.

## Casos de uso

- Un solicitante crea un ticket con titulo y descripcion.
- El sistema solicita a Gemini categoria, prioridad, resumen y borrador.
- Un agente revisa la propuesta y puede aceptar o modificarla.
- Un agente asigna el ticket y cambia su estado.
- Un supervisor filtra tickets urgentes y revisa tiempos basicos.
- Un administrador deshabilita un usuario.

## Requisitos funcionales

- RF-01: Registrar y autenticar usuarios mediante credenciales.
- RF-02: Crear, leer, actualizar y cerrar tickets.
- RF-03: Filtrar y ordenar tickets.
- RF-04: Persistir comentarios internos y respuestas publicas.
- RF-05: Solicitar un analisis IA para cada ticket nuevo.
- RF-06: Permitir que el agente confirme o edite la sugerencia.
- RF-07: Mostrar indicadores de volumen y estado.
- RF-08: Registrar eventos relevantes de auditoria.
- RF-09: Exponer estados HTTP y mensajes de error consistentes.
- RF-10: Funcionar sin clave Gemini mediante un fallback seguro.

## Requisitos no funcionales

- RNF-01: TypeScript estricto en frontend y backend.
- RNF-02: Validacion de entrada en el servidor.
- RNF-03: Hash de contrasenas con algoritmo moderno.
- RNF-04: Respuestas API protegidas contra inyeccion y XSS.
- RNF-05: Logs estructurados sin datos sensibles.
- RNF-06: Pruebas unitarias e integracion para los casos criticos.
- RNF-07: Interfaz responsive y accesible.
- RNF-08: Diseno preparado para 100 usuarios concurrentes inicialmente.
- RNF-09: Variables secretas fuera del repositorio.
- RNF-10: Recuperacion ante fallos temporales de Gemini.

## Historias de usuario

- Como solicitante, quiero crear un ticket para recibir ayuda.
- Como solicitante, quiero ver el estado de mi ticket.
- Como agente, quiero ver tickets prioritarios para trabajar primero.
- Como agente, quiero una propuesta IA editable para responder mas rapido.
- Como agente, quiero comentar internamente sin exponer el comentario al solicitante.
- Como supervisor, quiero medir tickets abiertos y resueltos.
- Como administrador, quiero controlar el acceso de usuarios.

## Criterios de aceptacion

- Un usuario no autenticado no puede crear ni consultar tickets ajenos.
- Un ticket nuevo inicia en estado OPEN y contiene titulo, descripcion y solicitante.
- El analisis IA nunca reemplaza de forma silenciosa una decision humana.
- Ante error de Gemini, el ticket se crea con analisis `fallback`.
- Las operaciones modificadas devuelven errores reproducibles y registrados.
- Los comentarios internos no aparecen en respuestas publicas.
- Las pruebas criticas pasan antes de integrar una funcionalidad.
