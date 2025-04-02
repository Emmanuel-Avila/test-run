# Ejercicio: Aplicación de Publicaciones con Nuxt 3, Vuetify y BEM

Este ejercicio consiste en desarrollar una aplicación web que muestre una lista de publicaciones y sus respectivos autores. La aplicación incorpora paginación, filtros en tiempo real, manejo de favoritos con persistencia local y un dialog para el detalle de cada publicación. Además, se implementa un control global de errores y se muestra un indicador de carga durante las peticiones HTTP.

## Objetivos

- **Mostrar publicaciones**: Listar publicaciones con paginación (10 publicaciones por página) y filtros por título y autor.
- **Detalle de la publicación**: Abrir un dialog que muestre el detalle completo de la publicación y la información del autor, obtenida mediante una segunda llamada a la API.
- **Favoritos**: Permitir marcar publicaciones como favoritas y almacenar este estado en `localStorage` para mantenerlo tras la recarga del navegador.
- **Control global**: Implementar un manejador global de errores para las consultas HTTP y mostrar un spinner mientras se cargan los datos.
- **Estilos**: Utilizar SCSS con un enfoque modular, aplicando la metodología BEM para la organización y nomenclatura de estilos.

## Tecnologías y Herramientas

- **Framework**: [Nuxt 3](https://nuxt.com/)
- **Librería de Componentes**: [Vuetify](https://vuetifyjs.com/)
- **Lenguaje**: TypeScript
- **HTTP**: Axios (o fetch, según preferencia)
- **Linting**: ESLint
- **Estilos**: SCSS con enfoque modular y metodología BEM
- **Persistencia**: localStorage para guardar el estado de las publicaciones favoritas

## APIs a Utilizar

- **Publicaciones**: `https://jsonplaceholder.typicode.com/posts`
- **Usuarios**: `https://jsonplaceholder.typicode.com/users`

## Funcionalidades y Flujo de Trabajo

### 1. Lista de Publicaciones

- **Paginación**: Mostrar 10 publicaciones por página sin recargar la página.
- **Filtrado**: Permitir filtrar en tiempo real por título y autor.
- **Carga**: Mostrar un spinner o indicador de carga mientras se obtienen los datos.
- **Error**: Si ocurre un error, se mostrará un mensaje global mediante un manejador de errores.

### 2. Detalle de la Publicación

- Al seleccionar una publicación, se abre un dialog.
- Se realiza una segunda llamada a la API para obtener la información del autor.
- El dialog muestra tanto los detalles de la publicación como los datos del autor.

### 3. Favoritos

- Permitir marcar o desmarcar publicaciones como "favoritas".
- Al marcar una publicación, su identificador se guarda en `localStorage`.
- Al iniciar la aplicación, se recupera el estado de los favoritos para mantener la persistencia.

### 4. Gestión Global de Errores y Carga

- **HTTP**: Utiliza Axios (o fetch) para las peticiones.
- **Interceptor**: Configura un interceptor global en Axios para capturar y manejar errores.
- **Notificación**: El interceptor puede emitir eventos o actualizar un store global para mostrar mensajes de error en la UI.
- **Spinner**: Muestra un spinner mientras se realizan las peticiones.

## Consideraciones Técnicas y Metodologías

### Nuxt 3 y TypeScript

- Inicializa el proyecto con Nuxt 3.

### Integración de Vuetify

- Instala y configura Vuetify en el proyecto.
- Utiliza componentes de Vuetify como `v-data-table`, `v-dialog`, `v-pagination`, etc., para una interfaz consistente y responsiva.

### Estilos con SCSS y BEM

- **SCSS modular**: Organiza los estilos en módulos SCSS que sean encapsulados.
- **BEM**: Utiliza la metodología BEM (Block, Element, Modifier) para estructurar y nombrar las clases de CSS.
- Asegúrate de que el diseño sea **responsive**.

### HTTP y Manejador de Errores

- **Axios/fetch**: Realiza las peticiones HTTP con Axios o fetch.
- **Interceptor global**: Crea un plugin (por ejemplo, `plugins/axios.ts`) que implemente un interceptor para capturar errores y gestionar mensajes globales.

### ESLint

- Instala ESLint y configura las reglas apropiadas para TypeScript y Nuxt 3.
- Asegúrate de seguir las buenas prácticas de codificación y mantener el código limpio y consistente.
 