# Sistema de Web Scraping de Instagram con Playwright

## Descripción General

Este sistema permite automatizar la extracción de información pública de perfiles de Instagram utilizando Playwright con TypeScript.

El scraper simula el comportamiento de un usuario real, evitando en lo posible restricciones o bloqueos de la plataforma.

El sistema permite:

- Iniciar sesión en Instagram (una sola vez)
- Guardar sesión persistente (`state.json`)
- Acceder a perfiles públicos
- Obtener los últimos posts
- Extraer información relevante:
  - Likes
  - Comentarios
  - Descripción
  - Fecha
  - URL del post
- Exportar datos en:
  - JSON
  - XLSX
  - CSV

---

# Requisitos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- Node.js (versión recomendada: 18+)
- npm

---

# Instalación

Ejecuta los siguientes comandos en la raíz del proyecto:

```bash
npm install
npx playwright install
npm install dotenv
npm install xlsx
npm install uuid
```
# Se debe crear un archivo .env en la raíz del proyecto:

IG_USER=
IG_PASS=
IG_TARGET_USER=

HEADLESS=false
---------------
IG_USER: usuario o correo de Instagram
IG_PASS: contraseña
IG_TARGET_USER: usuario que quieres scrapear
HEADLESS:
false → ves el navegador (recomendado)
true → oculto

# Primera Ejecución (IMPORTANTE)
# Paso 1: Login Manual
En la primera ejecución:
```bash
npm run dev
```
El sistema abrirá el navegador
Te pedirá iniciar sesión manualmente
Ingresa:
Usuario
Contraseña
Si Instagram pide código de verificación:
Ingresa el código manualmente
# Paso 2: Guardado de Sesión

Después del login exitoso:
Se genera automáticamente el archivo:
state.json

Este archivo contiene:
Cookies
Sesión activa
# Paso 3: Ejecuciones posteriores

En futuras ejecuciones:

npm run dev

- NO necesitarás volver a iniciar sesión
- El sistema reutiliza state.json

Flujo del Sistema
1. Acceso a Instagram
Navega a la página principal
2. Verificación de sesión
Si existe state.json → usa sesión guardada
Si no → realiza login
3. Acceso al perfil
Navega a:
https://www.instagram.com/{usuario}/
4. Validaciones
Usuario existe
Perfil es público
Tiene publicaciones
5. Simulación de comportamiento humano
Scrolls
Pausas aleatorias
Interacciones controladas
6. Obtención de posts
Se obtienen los últimos 10 posts
7. Procesamiento de posts

Para cada post:

Accede al post
Espera carga completa
Extrae:
Likes (parseados: 121K → 121000)
Comentarios
Descripción limpia
Fecha formateada
URL del post
8. Exportación de datos

Los datos se guardan automáticamente en:

src/data/output/

Con formato:

metadata_usuario_fecha.json
metadata_usuario_fecha.xlsx
metadata_usuario_fecha.csv

Ejemplo:

metadata_leonardodicapriro_2026-04-28T21-40-10.json