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
