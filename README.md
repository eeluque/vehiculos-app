# Vehículos App – Sistema de Entrada/Salida de Vehículos

Aplicación front-end en Next.js (App Router) para gestionar vehículos y movimientos de entrada/salida. Se conecta a la API REST **vehiculos-api**.

## Requisitos

- Node.js 18+
- La API **vehiculos-api** en ejecución (por ejemplo en `http://localhost:3001`).

## Configuración de la API

Para conectar esta app con tu API:

1. Crea o edita el archivo **`.env.local`** en la raíz del proyecto.
2. Define la URL base de la API:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Sustituye `http://localhost:3001` por la URL donde esté corriendo tu **vehiculos-api** (puerto y host que uses). Reinicia el servidor de desarrollo (`npm run dev`) después de cambiar variables de entorno.

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

## Scripts

- `npm run dev` – Servidor de desarrollo
- `npm run build` – Compilación para producción
- `npm run start` – Servidor de producción
- `npm run lint` – Linter

## Estructura

- **`src/app`** – Rutas y páginas (App Router)
- **`src/components`** – Componentes reutilizables y UI
- **`src/services`** – Cliente API y funciones de datos
- **`src/types`** – Tipos TypeScript
- **`src/lib`** – Utilidades (ej. Shadcn)
- **`src/utils`** – Validaciones y helpers

## Más información

- [Next.js Documentation](https://nextjs.org/docs)
- [Shadcn UI](https://ui.shadcn.com/)
