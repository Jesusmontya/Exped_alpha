# Exped — Software de gestión de expedientes médicos

## Stack
- Frontend: HTML + CSS + JS vanilla → Netlify
- Backend: Python + FastAPI → Render
- Base de datos: PostgreSQL → Supabase
- Storage (fotos/archivos): Supabase Storage
- Auth: Supabase Auth
- Repo: GitHub (privado)

## Contexto del producto
Software para médicos de consultorio privado, personalizable por especialidad.
Usuario principal: especialistas quirúrgicos (otorrino, cirugía plástica, oftalmología, ortopedia).
Usuarios secundarios: especialidades de consulta continua y médicos generales.
Mercado inicial: Mexicali y alrededores, expansión posterior.

## Entidades principales
- medicos
- pacientes
- consultas
- archivos (fotos, labs, radiografías vinculadas a consulta o paciente)
- recetas
- ordenes_estudio
- usuarios (roles: medico, asistente)

## Decisiones tomadas
- Fotos y archivos se guardan en Supabase Storage, no en la BD
- Roles: médico ve todo / asistente solo datos generales del paciente (sin notas)
- Sistema web, responsive — funciona en celular, tablet y desktop
- Módulos activables por especialidad (no todos los campos son obligatorios)
- Exportación de expediente completo en PDF por paciente
- Recetas se generan dentro del sistema (hoy los médicos las hacen en Word)
- Precio objetivo: entre $3,000 y $8,000 MXN/año por médico
- Hojas membretadas físicas como producto adicional. El sistema genera recetas
  y órdenes con márgenes calibrados para imprimir sobre las hojas del médico.
- Arrancar con especialidades quirúrgicas — mayor dolor, mayor disposición a
  pagar, diferenciador único en fotos
- Backend en FastAPI + Python (razón: integración futura con IA)
- Almacenamiento: plan gratuito Supabase para desarrollo, Pro cuando haya
  primer médico de pago. Compresión de fotos en frontend antes de subir.

## Grupos de especialidades identificados
- **Grupo 1 quirúrgicas** (prioridad): cirugía plástica, otorrino, oftalmología,
  ortopedia — fotos, consentimientos, seguimiento largo
- **Grupo 2 consulta continua**: endocrinología, cardiología, neurología
- **Grupo 3 medicina general**: flujo rápido, notas cortas, volumen alto
- **Grupo 4 salud mental**: ya cubierto con otro software

## Competidores identificados
- Cinamedic (actual de la Dra. Alma Lorena, falla mucho, $1,500/año)
- Juli (bien posicionado, aval COFEPRIS/NOM)
- Doctoralia (~$20,000/año, plataforma de directorio)

## Diferenciadores clave de Exped
1. Gestión fotográfica vinculada al expediente (pre/post quirúrgico)
2. Disponibilidad 24/7 sin caídas
3. Exportación legal del expediente completo en PDF
4. Personalizable por especialidad (módulos activables)
5. Migración de datos desde otros sistemas
6. Hojas membretadas físicas + impresión calibrada desde el sistema

## Early adopter confirmado
- Dra. Alma Lorena Gutiérrez — Otorrinolaringóloga, Mexicali
- Contactar en 1-2 meses con prototipo funcional

## Estado actual del proyecto

### Backend — COMPLETO (MVP)
- POST /auth/registro — crea usuario Auth + perfil + médico
- POST /auth/login — regresa JWT
- GET/POST/GET{id}/PUT{id} /pacientes — CRUD completo
- GET/POST/GET{id}/PUT{id} /consultas — CRUD completo
- POST /archivos — subida de fotos/archivos a Storage
- GET /archivos — listar archivos por paciente
- GET /archivos/{id}/url — URL firmada por 1 hora
- DELETE /archivos/{id} — eliminar archivo

### Estructura backend
backend/
├── app/
│   ├── main.py
│   ├── database.py
│   ├── middleware/
│   │   └── auth.py
│   └── routes/
│       ├── auth.py
│       ├── pacientes.py
│       ├── consultas.py
│       └── archivos.py
├── .env
├── .env.example
└── requirements.txt

### Base de datos — 10 tablas en Supabase
perfiles, medicos, configuracion_medico, asistentes_medico,
pacientes, consultas, archivos, recetas, receta_medicamentos, ordenes_estudio
RLS activado en todas las tablas. Índices de performance aplicados.

### Pendiente backend (no bloqueante para MVP)
- Recetas
- Órdenes de estudio
- PDF del expediente
- Optimización: guardar medico_id en JWT para evitar query extra por request

## Siguiente paso
Construir el frontend mínimo en HTML/CSS/JS:
1. Pantalla de login
2. Lista de pacientes
3. Crear paciente
4. Detalle de paciente + historial de consultas
5. Crear consulta + subir foto


## Módulo de agenda
- Médico puede bloquear horarios con motivo privado
- Asistente puede agendar citas pero no ve el motivo de los bloqueos
- Ambos ven disponibilidad del médico
- Requiere agregar tabla `agenda` al schema cuando lleguemos a este módulo
- Pendiente de desarrollar (no bloqueante para MVP)


  ### Checkpoint 7 — sesión 3

### Lo que se hizo
- Frontend completo rehecho con layout profesional:
  - Sidebar izquierda con navegación por secciones
  - Dark mode automático según OS
  - Iconos Tabler
  - Login limpio
  - Dashboard con stats y últimos pacientes
  - Lista de pacientes con buscador
  - Modal de nuevo paciente funcionando end-to-end
- Tabler Icons integrados via CDN

### Flujo funcional completo
Login → Dashboard → Pacientes → Nuevo paciente → Lista actualizada

### Secciones pendientes de construir
- Detalle de paciente
- Nueva consulta
- Recetas
- Órdenes de estudio
- Agenda
- Configuración

### Siguiente paso
- Pantalla de detalle del paciente con historial de consultas

### Checkpoint 8 — sesión 3

### Lo que se hizo
- Pantalla detalle de paciente completa:
  - Header con avatar, nombre, edad, teléfono, email
  - Cards de alergias y antecedentes
  - Tabs: Consultas / Archivos
  - Historial de consultas con fecha, tipo y diagnóstico
- Modal de nueva consulta funcionando:
  - Tipo, motivo, exploración, diagnóstico, plan
  - Se guarda y actualiza el historial en tiempo real

### Flujo completo funcional
Login → Dashboard → Pacientes → Detalle → Nueva consulta → Historial

### Siguiente paso
- Subida de fotos desde el frontend (tab Archivos)
- O recetas — decidir con la Dra. Alma Lorena qué es más importante

### Checkpoint 9 — sesión 3

### Lo que se hizo
- Tab "Archivos" en detalle de paciente funcionando completo:
  - Subir archivo (foto, lab, radiografía, consentimiento, otro)
  - Listar archivos por paciente
  - Ver/abrir archivo en pestaña nueva (URL firmada)
- Endpoint GET /archivos/{id}/url corregido con REST directo
  (mismo fix que el upload, bypass del bug RLS de Storage)

### Flujo completo funcional end-to-end
Login → Dashboard → Pacientes → Nuevo paciente → Detalle →
  → Nueva consulta → Tab Archivos → Subir foto → Ver foto

### Estado del MVP
✅ Auth, Pacientes, Consultas, Archivos — funcionando
⏳ Pendiente: Recetas, Órdenes, Agenda, PDF expediente

### Siguiente paso
Decidir: ¿Recetas o mostrarle esto a la Dra. Alma Lorena para feedback
antes de seguir construyendo?

### Checkpoint 10 — sesión 3

### Lo que se hizo
- Tabla `agenda` creada en Supabase (cita / bloqueo, RLS aplicado)
- Backend completo: GET/POST/PUT/DELETE /agenda
- Frontend: vista semanal de agenda
  - Navegación entre semanas (anterior/hoy/siguiente)
  - Eventos posicionados por hora y duración real (no solo 1hr fija)
  - Tipo "cita" (vinculada a paciente) vs "bloqueo" (con motivo)
  - Modal para crear evento, clic en celda preselecciona fecha/hora
  - Eliminar evento con confirmación
- Fix de zona horaria: horarios se guardan con offset -07:00 (Mexicali)

### Estado del MVP
✅ Auth, Pacientes, Consultas, Archivos, Agenda — funcionando end-to-end
⏳ Pendiente: Recetas, Órdenes de estudio, PDF expediente

### Pendiente técnico (no bloqueante)
- Asistente no debe ver motivo de bloqueos (lógica de roles aún no diferenciada)
- Vista de agenda no diferencia entre médico y asistente todavía

### Siguiente paso
Recetas — último módulo grande antes de mostrarle el prototipo
a la Dra. Alma Lorena

### Checkpoint 11 — sesión 3

### Lo que se hizo
- Backend completo de recetas:
  - GET/POST/DELETE /recetas
  - Tabla receta_medicamentos con RLS corregido
- Frontend tab "Recetas" en detalle de paciente:
  - Modal para crear receta con múltiples medicamentos dinámicos
  - Cada medicamento: nombre, dosis, frecuencia, duración, indicación específica
  - Indicaciones generales de la receta
  - Listado de recetas con fecha y medicamentos
  - Eliminar receta
  - Botón "Imprimir" placeholder (pendiente: hojas membretadas)

### Estado del MVP — CASI COMPLETO
✅ Auth, Pacientes, Consultas, Archivos, Agenda, Recetas
⏳ Pendiente: Órdenes de estudio, PDF expediente, impresión hojas membretadas

### Siguiente paso
Decidir: ¿Órdenes de estudio (similar a recetas) o ya mostrarle
el prototipo a la Dra. Alma Lorena para feedback real?
