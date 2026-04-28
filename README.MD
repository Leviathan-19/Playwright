# Nota: para el correcto funcionamiento del proyecto tome en cuenta 2 aspectos
 - El sistema requiere variables de entorno en un archivo .env,
 por favor cree un .env en la raiz del proyecto e ingrese sus credenciales:

 - El sistema usa las librerias que se encuentran en install.txt, por favor instalelas 
 con los comandos en la termianl del proyecto 

# Sistema de Web Scraping de Instagram con Playwright

## Descripción General

Este sistema tiene como objetivo automatizar la extracción de información pública de perfiles de Instagram utilizando Playwright con TypeScript. El proceso simula el comportamiento de un usuario real para evitar bloqueos y restricciones por parte de la plataforma.

El sistema permite:

- Gestionar sesiones autenticadas mediante almacenamiento de estado (cookies).
- Acceder a perfiles públicos específicos.
- Validar la existencia y disponibilidad del contenido.
- Extraer información de los últimos posts (likes, comentarios, etc.).
- Exportar los datos recolectados en formatos JSON y XLSX.

El enfoque evita logins repetitivos mediante el uso de sesiones persistentes, mejorando la eficiencia y reduciendo el riesgo de bloqueos.

---

## Flujo del Sistema

### 1. Acceso a Instagram
- Navegar a: https://www.instagram.com/

### 2. Gestión de Sesión 

#### 2.1 Verificación de sesión existente
- Comprobar si existe el archivo: state.json

#### 2.2 Carga de sesión
- Si existe, cargar el estado de sesión almacenado.

#### 2.3 Validación de sesión
- Verificar si el usuario está autenticado correctamente:
- Presencia del feed
- Acceso al perfil

#### 2.4 Proceso de login (si la sesión no es válida)
- Ingresar:
- Usuario o correo (desde variables de entorno)
- Contraseña (desde variables de entorno)
- Si se solicita verificación:
- Solicitar código por consola
- Ingresar código manualmente

#### 2.5 Almacenamiento de sesión
- Guardar sesión en: state.json

### 3. Acceso a Perfil de Usuario
- Navegar directamente a: https://www.instagram.com/{usuario}/

### 4. Validaciones del Perfil
- Verificar si el perfil existe
- Verificar si es público
- Verificar si contiene publicaciones

### 5. Simulación de Comportamiento Humano
Implementar acciones para evitar detección como bot:
- Scrolls aleatorios
- Movimientos de mouse
- Pausas variables entre acciones
- Interacciones no lineales (scroll arriba/abajo)

### 6. Obtención de Publicaciones
- Identificar y recolectar los últimos 10 posts del perfil

### 7. Procesamiento por Post
Para cada publicación:
- Abrir el post
- Esperar carga completa
- Extraer:
- Número de likes
- Número de comentarios
- Texto del post
- Fecha de publicación
- Realizar pausas aleatorias
- Cerrar el post

### 8. Manejo de Tiempos
- Esperas entre acciones: 3 a 8 segundos
- Esperas entre posts: 8 a 15 segundos
- Pausas largas ocasionales: 20 a 40 segundos

### 9. Almacenamiento de Resultados
Exportar los datos recolectados en:

- JSON
- XLSX

## Consideraciones Técnicas

### Manejo de errores

El sistema debe contemplar:

- Sesión expirada
- Captchas
- Perfil privado
- Usuario inexistente
- Fallos de carga
- Selectores no encontrados

### Limitaciones

- Instagram puede cambiar su estructura HTML
- Existe riesgo de bloqueo por automatización
- El scraping es limitado a contenido público
- No se recomienda ejecución masiva sin proxies

### Recomendaciones

- Usar siempre navegador en modo no headless
- Evitar patrones repetitivos
- Reutilizar sesiones guardadas
- Mantener selectores robustos
