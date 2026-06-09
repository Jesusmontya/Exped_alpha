
# Exped — Software de gestión de expedientes médicos

## Stack
- Frontend: HTML + CSS + JS vanilla → Netlify
- Backend: Node.js + Express → Render
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
- Hojas membretadas físicas como producto adicional. El sistema genera recetas y órdenes con márgenes calibrados para imprimir sobre las hojas del médico. Plantilla estándar, datos variables por médico (nombre, especialidad, cédula, logo, contacto)
- Arrancar con especialidades quirúrgicas — mayor dolor, mayor disposición a pagar, diferenciador único en fotos

## Grupos de especialidades identificados
- **Grupo 1 quirúrgicas** (prioridad): cirugía plástica, otorrino, oftalmología, ortopedia — fotos, consentimientos, seguimiento largo
- **Grupo 2 consulta continua**: endocrinología, cardiología, neurología — indicadores en tendencia, labs frecuentes
- **Grupo 3 medicina general**: flujo rápido, notas cortas, volumen alto, ticket bajo
- **Grupo 4 salud mental**: ya cubierto con software de psicólogos existente

## Competidores identificados
- Cinamedic (actual de la Dra. Alma Lorena, falla mucho, $1,500/año)
- Juli (bien posicionado, aval COFEPRIS/NOM)
- Doctoralia (cara ~$20,000/año, plataforma de directorio)
- Clinic 5 (software español gratuito, obsoleto, ya no existe)

## Diferenciadores clave de Exped
1. Gestión fotográfica vinculada al expediente (pre/post quirúrgico)
2. Disponibilidad 24/7 sin caídas
3. Exportación legal del expediente completo en PDF
4. Personalizable por especialidad (módulos activables)
5. Migración de datos desde otros sistemas
6. Hojas membretadas físicas + impresión calibrada desde el sistema

## Early adopter confirmado
- Dra. Alma Lorena Gutiérrez — Otorrinolaringóloga, Mexicali
- Contacto guardado, aceptó probar prototipo y dar feedback
- Contactar en 1-2 meses con algo para mostrar

## Lo que está construido
- [ ] Repositorio inicializado
- [ ] Estructura de carpetas base
- [ ] Conexión a Supabase
- [ ] Schema de base de datos

## Siguiente paso
Definir y aplicar el schema completo en Supabase, enfocado en especialidades quirúrgicas.

---

## Historial de checkpoints

### Checkpoint 0 — sesión 1
- Research con 4 médicos completado (2 especialistas, 2 generales)
- Stack decidido: HTML/CSS/JS + Node/Express + Supabase + Netlify + Render
- Nombre definido: Exped
- Repo creado en GitHub
- Archivos CONTEXT.md y PROMPT.md creados
- Rutina de checkpoints definida

### Checkpoint 1 — sesión 2
- Guía de entrevistas completa definida (Vía A y Vía B)
- Estrategia de especialidades definida: núcleo universal + módulos por especialidad
- Decisión: arrancar con especialidades quirúrgicas
- Grupos de especialidades mapeados
- Early adopter identificado: Dra. Alma Lorena
- Idea de hojas membretadas como producto adicional incorporada
- Mañana: más entrevistas de campo buscando Grupo 1 (quirúrgicas)


## Checkpoint 2 — sesión 3

### Lo que se hizo
- Schema de base de datos diseñado y aplicado en Supabase
  - 10 tablas: perfiles, medicos, configuracion_medico, asistentes_medico,
    pacientes, consultas, archivos, recetas, receta_medicamentos, ordenes_estudio
  - RLS activado en todas las tablas
  - Índices de performance aplicados
- Proyecto creado en Supabase (us-east-1)
- Estructura de carpetas del repo definida (backend + frontend)
- Backend Node.js + Express inicializado y corriendo en localhost:3000
- Supabase conectado y verificado desde el backend

### Stack confirmado corriendo
- Node.js + Express → localhost:3000
- Supabase (PostgreSQL + Auth + Storage) → conectado
- /health endpoint respondiendo

### Siguiente paso
- Limpiar index.js (quitar bloque de prueba)
- Primera ruta real: GET /pacientes
- Después: POST /pacientes, y así construir el CRUD base

  ### Checkpoint 3 — sesión 3

### Lo que se hizo
- Decisión: cambiar backend de Node.js/Express a FastAPI + Python
  (razón: integración futura con IA)
- Backend FastAPI inicializado y corriendo en localhost:8000
- Conexión a Supabase verificada desde FastAPI
- Endpoint POST /auth/registro funcionando end-to-end:
  crea usuario en Supabase Auth → perfil → médico
- Primer médico de prueba creado: alma.lorena@exped.com

### Estructura backend actual
backend/
├── app/
│   ├── main.py
│   ├── database.py
│   └── routes/
│       └── auth.py
├── .env
├── .env.example
└── requirements.txt

### Siguiente paso
- POST /auth/login
- Middleware de autenticación (proteger rutas)
- GET/POST /pacientes


  ### Checkpoint 4 — sesión 3

### Lo que se hizo
- Middleware de autenticación con JWT (get_current_user)
- GET /pacientes — lista pacientes del médico autenticado
- POST /pacientes — crea paciente vinculado al médico
- Primer paciente de prueba creado y verificado en Supabase

### Estructura backend actual
backend/
├── app/
│   ├── main.py
│   ├── database.py
│   ├── middleware/
│   │   └── auth.py
│   └── routes/
│       ├── auth.py
│       └── pacientes.py
├── .env
├── .env.example
└── requirements.txt

### Checkpoint 5 — sesión 3

### Lo que se hizo
- CRUD completo de pacientes funcionando:
  - GET /pacientes
  - POST /pacientes
  - GET /pacientes/{id}
  - PUT /pacientes/{id}
- CRUD de consultas funcionando:
  - GET /consultas?paciente_id=
  - POST /consultas
  - GET /consultas/{id}
  - PUT /consultas/{id}
- Nota: cada request hace 2 queries a Supabase (optimizar después
  guardando medico_id en token)

### Estructura backend actual
backend/
├── app/
│   ├── main.py
│   ├── database.py
│   ├── middleware/
│   │   └── auth.py
│   └── routes/
│       ├── auth.py
│       ├── pacientes.py
│       └── consultas.py
├── .env
├── .env.example
└── requirements.txt

### Pendiente de optimización
- Guardar medico_id en JWT para evitar query extra por request

### Siguiente paso
- Subida de archivos/fotos vinculadas a consulta (Supabase Storage)
- O recetas — decidir orden

### Siguiente paso
- GET /pacientes/{id} — detalle de un paciente
- POST /consultas — crear consulta vinculada a paciente
- GET /consultas/{paciente_id} — historial de consultas
