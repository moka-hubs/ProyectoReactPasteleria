# Pastelería Mil Sabores (frontend)

Tienda web de pastelería construida con React + Vite. Incluye catálogo de productos con filtros por categoría, ficha de producto, carrito persistente, autenticación con JWT, perfil de usuario y un panel de administración de demostración.

> **Nota:** este repositorio contiene solo el frontend. Las operaciones de autenticación y perfil consumen una API REST externa (por defecto `http://localhost:8080`). El catálogo y el carrito funcionan con datos locales, por lo que la tienda puede explorarse sin el backend.

## Tecnologías

- React 19 + Vite 8
- React Router 7 (enrutamiento con `createBrowserRouter`)
- Bootstrap 5, React Bootstrap y Bootstrap Icons
- Context API para el estado global (carrito, sesión, modales y categoría)
- Vitest + Testing Library + jsdom para pruebas unitarias
- ESLint para análisis estático

## Requisitos previos

- Node.js 20.19+ o 22.12+ (se recomienda una versión LTS reciente)
- npm
- Opcional: backend de la API en `http://localhost:8080` para probar login, registro y perfil

## Instalación y ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Crea un archivo .env en la raíz con VITE_API_URL (ver sección Configuración)

# 3. Iniciar el servidor de desarrollo
npm run dev
```

La aplicación queda disponible en la URL que indica Vite (normalmente `http://localhost:5173`).

### Configuración

El archivo `.env` (ignorado por Git) define la URL base de la API:

```env
VITE_API_URL=http://localhost:8080
```

Si la variable no está definida, las peticiones se hacen contra la misma ruta raíz del frontend. El token JWT se guarda en `localStorage` bajo la clave `token_pasteleria` y se envía como cabecera `Authorization: Bearer <token>` en las peticiones autenticadas.

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia Vite en modo desarrollo con recarga en caliente. |
| `npm run build` | Genera la versión de producción en `dist/`. |
| `npm run preview` | Sirve localmente la versión compilada. |
| `npm run lint` | Ejecuta ESLint sobre el proyecto. |
| `npm test` | Ejecuta Vitest en modo interactivo (*watch*). |
| `npm run test:run` | Ejecuta la suite de pruebas una sola vez. |

## Funcionalidades

- **Catálogo e filtros:** 33 productos locales en `src/data/productos.js`, agrupados en 10 categorías (tortas cuadradas/circulares, postres individuales, sin azúcar, sin gluten, veganos, tradicionales, especiales y más vendidos). El menú de navegación filtra el catálogo por categoría.
- **Detalle de producto:** ruta `/producto/:codigo` con imagen, descripción, precio, productos sugeridos de la misma categoría y botón para agregar al carrito.
- **Carrito:** agregar, cambiar cantidades, eliminar ítems, vaciar y calcular total. Se persiste en `localStorage` (`carrito`). El botón "Finalizar compra" muestra una confirmación de demostración; no genera pedidos en la API.
- **Autenticación:** modales de inicio de sesión y registro. El token devuelto por el backend se almacena en `localStorage` y, al recargar, la sesión se hidrata consultando `/api/v1/perfil`. El claim `rol` del JWT habilita la vista de administrador en la interfaz.
- **Perfil:** ruta `/perfil` protegida; permite editar nombre, apellido y fecha de nacimiento mediante `PUT /api/v1/perfil`.
- **Panel de administración:** ruta `/dashboard` protegida por `RutaAdmin` (solo usuarios con rol `ADMIN`). Muestra KPIs, ventas por categoría, productos más vendidos y pedidos recientes con **datos ilustrativos**.
- **Recuperación de contraseña:** modal de demostración que consulta registros legacy en `localStorage` (`pasteleria_mil_sabores`); no está conectado al backend.
- **Cupón de bienvenida:** el registro acepta el cupón `FELICES50` (opcional), validado en el modal y enviado al backend.
- **Interfaz responsive** basada en Bootstrap, con icons, alertas, offcanvas y modales propios.

## Rutas

| Ruta | Contenido | Acceso |
| --- | --- | --- |
| `/` | Inicio: hero, ofertas, sección "Nosotros", catálogo y reseñas. | Público |
| `/producto/:codigo` | Detalle de un producto. | Público |
| `/perfil` | Edición de datos personales. | Usuario autenticado |
| `/dashboard` | Panel de administración (datos de ejemplo). | Rol `ADMIN` |

## Estructura del proyecto

```text
src/
├── api/           # Cliente fetch y servicios REST (auth, perfil, productos, categorías, usuarios)
├── auth/          # Manejo del token JWT en localStorage
├── components/    # Navbar, Layout, catálogo, tarjetas, carrito, alertas y modales
├── context/       # Contexto global (Contexto.jsx) y hook useApp.js
├── data/          # Catálogo local de productos y categorías
├── pages/         # Home, DetalleProducto, Perfil y Dashboard
├── test/          # Pruebas con Vitest + Testing Library y setup.jsx
├── utils/         # Utilidades (resolución de URLs de imágenes)
├── App.jsx        # Proveedor del contexto + RouterProvider
├── main.jsx       # Punto de entrada; estilos de Bootstrap y CSS propio
├── routes.jsx     # Definición de rutas
└── style.css      # Estilos personalizados
public/img/        # Imágenes de productos y logo
```

## API REST esperada

Base: `VITE_API_URL` (por defecto `http://localhost:8080`).

| Método | Endpoint | Uso |
| --- | --- | --- |
| `POST` | `/api/v1/auth/login` | Iniciar sesión |
| `POST` | `/api/v1/auth/registro` | Registrar cliente |
| `GET` / `PUT` | `/api/v1/perfil` | Consultar / actualizar perfil |
| `GET` | `/api/v1/productos` | Listar productos |
| `GET` / `PUT` / `DELETE` | `/api/v1/productos/{id}` | Detalle, edición y eliminación |
| `GET` | `/api/v1/categorias` | Listar categorías |
| `GET` / `PUT` / `DELETE` | `/api/v1/categorias/{id}` | Detalle, edición y eliminación |
| `GET` | `/api/v1/usuarios` | Listar usuarios (administración) |

Las respuestas `401` cierran la sesión local y redirigen al inicio. En `solicitudes.rest` hay ejemplos de peticiones para probar el backend (login de administrador `admin@pasteleria.com` / `Admin123` y registro con cupón).

## Pruebas

Las pruebas cubren carrito, login, registro, recuperación, categorías y tarjetas de producto:

```bash
npm run test:run
```

Los archivos de pruebas están en `src/test/` y usan `jsdom` y `@testing-library/react`, con `setup.jsx` como archivo de configuración global.

## Archivos adicionales

- `solicitudes.rest`: colección de peticiones HTTP de ejemplo para la API (formato REST Client).
- `Imagenes Pastelerias.xlsx`: referencia de imágenes/catálogo de productos.
- `Registro_Pruebas_Unitarias.xlsx`: registro de las pruebas unitarias realizadas.

## Estado conocido

- El catálogo se carga desde `src/data/productos.js`; los módulos `productosApi.js`, `categoriaApi.js` y `usuariosApi.js` están preparados para conectar CRUD de backend, pero las vistas aún no los consumen.
- El panel `/dashboard` usa datos hardcodeados con fines de demostración.
- La autorización visual por rol se obtiene del JWT; la autorización real debe ser validada por el backend.
