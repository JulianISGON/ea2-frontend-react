# EA2 Frontend React - CineAdmin

Aplicación frontend construida con React para administrar un catálogo multimedia (géneros, directores, productoras, tipos y media) consumiendo la API REST de la EA1.

Proyecto académico de Ingeniería Web II.

## 1. Objetivo

Este proyecto implementa una interfaz administrativa completa para:

- Gestionar catálogos base: Géneros, Directores, Productoras y Tipos.
- Gestionar el módulo principal de Media con relaciones entre catálogos.
- Consumir y visualizar datos provenientes de una API REST en Node.js + MySQL.
- Aplicar una UI moderna en tema oscuro azul (CineAdmin) con Bootstrap 5 y CSS personalizado.

## 2. Stack tecnológico

- React 19
- Vite 7
- React Router DOM 7
- Axios
- Bootstrap 5
- SweetAlert2
- Lucide React (iconografía)

## 3. Estructura funcional

Rutas principales del frontend:

- / -> Dashboard
- /generos -> CRUD de géneros
- /directores -> CRUD de directores
- /productoras -> CRUD de productoras
- /tipos -> CRUD de tipos
- /media -> CRUD de media (módulo principal)

Componentes clave:

- src/components/AppLayout.jsx: Layout global, navbar, menú móvil y footer.
- src/components/CatalogCrudPage.jsx: Componente CRUD genérico reutilizable para catálogos.
- src/components/MediaCrudPage.jsx: CRUD especializado para media con relaciones.

Capa de API:

- src/api/apiClient.js: Cliente Axios con baseURL de la API.
- src/api/catalogApi.js: Funciones genéricas para listar, crear, actualizar y eliminar.

## 4. Requisitos

- Node.js 18 o superior
- npm
- API EA1 ejecutándose en http://localhost:3000

## 5. Instalación y ejecución

1) Instalar dependencias:

```bash
npm install
```

2) Ejecutar en modo desarrollo:

```bash
npm run dev
```

3) Compilar para producción:

```bash
npm run build
```

4) Vista previa de build:

```bash
npm run preview
```

## 6. Integración con backend (EA1)

Este frontend consume la API usando variable de entorno:

VITE_API_BASE_URL

Ejemplo en local (archivo .env):

VITE_API_BASE_URL=http://localhost:3000/api

En despliegue (Netlify, Vercel, etc.) configura la variable con la URL pública de tu backend, por ejemplo:

VITE_API_BASE_URL=https://tu-backend.onrender.com/api

## 7. Flujo de datos (resumen)

1) El usuario interactúa con formularios y tablas.
2) El componente llama funciones de src/api/catalogApi.js.
3) catalogApi usa Axios (apiClient) para consumir endpoints REST.
4) La respuesta se normaliza y actualiza estado React.
5) SweetAlert2 muestra feedback de éxito/error.

## 8. Guía de estudio sugerida

Orden recomendado para estudiar el proyecto:

1) Entrada de la app
- Revisar src/main.jsx y src/App.jsx para entender bootstrap, router y rutas.

2) Layout y navegación
- Revisar src/components/AppLayout.jsx para navbar, navegación activa y diseño base.

3) Capa de consumo API
- Revisar src/api/apiClient.js y src/api/catalogApi.js.
- Entender manejo de errores centralizado y funciones CRUD genéricas.

4) CRUD genérico
- Revisar src/components/CatalogCrudPage.jsx.
- Identificar patrón reusable: loadRecords, handleSubmit, startEdit, handleDelete.

5) CRUD especializado
- Revisar src/components/MediaCrudPage.jsx.
- Entender carga de catálogos relacionados y construcción del payload relacional.

6) Páginas por módulo
- Revisar src/pages/*.jsx para entender cómo cada módulo configura campos y columnas.

7) Estilos y tema
- Revisar src/styles/app.css para variables, tokens de diseño y overrides de Bootstrap.

8) Integración completa
- Ejecutar backend + frontend y probar un flujo completo:
	crear género -> crear director -> crear productora -> crear tipo -> crear media.

## 9. Buenas prácticas aplicadas

- Reutilización de lógica CRUD para minimizar duplicación.
- Manejo unificado de errores de API.
- Validaciones requeridas en frontend antes de enviar datos.
- Separación clara por capas: UI, páginas, servicios de API y estilos.

## 10. Autor

Julián Isaza  
Ingeniería Web II - Institución Universitaria Digital de Antioquia
