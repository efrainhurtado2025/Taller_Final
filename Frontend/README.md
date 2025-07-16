# Aplicación de Gestión de Festivos

Esta es una aplicación Angular que permite consultar y verificar días festivos mediante una API backend.

## Características

- ✅ Verificar si una fecha específica es festivo
- ✅ Listar todos los festivos de un año determinado
- ✅ Interfaz moderna con Angular Material
- ✅ Tabla interactiva con ngx-datatable
- ✅ Formularios reactivos con validaciones
- ✅ Notificaciones con snackbars
- ✅ Diseño responsivo

## Estructura del Proyecto

```
src/
├── app/
│   ├── models/
│   │   └── festivo_model.ts          # Interfaces para los datos
│   ├── services/
│   │   └── festivo_services.ts       # Servicio para API calls
│   ├── app.component.ts              # Componente principal
│   ├── app.component.html            # Template principal
│   ├── app.component.css             # Estilos del componente
│   └── app.module.ts                 # Módulo principal
├── styles.css                        # Estilos globales
├── index.html                        # Página principal
└── main.ts                          # Bootstrap de la aplicación
```

## Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 16 o superior)
- Angular CLI
- API Backend ejecutándose (por defecto en http://localhost:8080)

### Pasos para ejecutar

1. Instalar dependencias:
```bash
npm install
```

2. Configurar la URL del backend:
   - Editar `src/app/services/festivo_services.ts`
   - Cambiar `baseUrl` por la URL de tu API

3. Ejecutar la aplicación:
```bash
ng serve
```

4. Abrir el navegador en `http://localhost:4200`

## API Endpoints Utilizados

### Verificar Festivo
- **Endpoint:** `GET /festivos/verificar/{año}/{mes}/{dia}`
- **Respuesta:** `"Es festivo"` o `"No es festivo"`
- **Ejemplo:** `/festivos/verificar/2023/12/25`

### Obtener Festivos
- **Endpoint:** `GET /festivos/obtener/{año}`
- **Respuesta:** Array de objetos festivo
- **Ejemplo:** `/festivos/obtener/2023`

```json
[
  {
    "festivo": "Año Nuevo",
    "fecha": "2023-01-01T05:00:00.00+00:00"
  },
  {
    "festivo": "Santos Reyes",
    "fecha": "2023-01-09T05:00:00.00+00:00"
  }
]
```

## Tecnologías Utilizadas

- **Angular 17**: Framework principal
- **Angular Material**: Componentes de UI
- **ngx-datatable**: Tabla de datos interactiva
- **RxJS**: Programación reactiva
- **TypeScript**: Lenguaje de programación
- **CSS3**: Estilos y animaciones

## Funcionalidades

### Verificación de Festivos
1. Seleccionar una fecha usando el datepicker
2. Hacer clic en "Verificar"
3. Ver el resultado con indicador visual
4. Opción para limpiar y verificar otra fecha

### Lista de Festivos
1. Ingresar un año (1900-2100)
2. Hacer clic en "Buscar Festivos"
3. Ver la tabla con todos los festivos del año
4. Tabla ordenable y paginada

## Características de UI/UX

- **Diseño Responsivo**: Funciona en desktop, tablet y móvil
- **Tema Material Design**: Interfaz moderna y consistente
- **Indicadores de Carga**: Spinners durante las operaciones
- **Validaciones en Tiempo Real**: Feedback inmediato en formularios
- **Notificaciones**: Snackbars informativos para feedback
- **Animaciones Suaves**: Transiciones y efectos visuales

## Personalización

### Cambiar Colores del Tema
Editar `src/styles.css` y modificar los imports de Material:
```css
@import '~@angular/material/prebuilt-themes/purple-green.css';
```

### Modificar URL de la API
En `src/app/services/festivo_services.ts`:
```typescript
private readonly baseUrl = 'https://tu-dominio.com/api';
```

### Agregar Nuevos Campos
1. Actualizar `src/app/models/festivo_model.ts`
2. Modificar las columnas en `app.component.ts`
3. Actualizar el template si es necesario

## Solución de Problemas

### Error de CORS
Si tienes problemas de CORS, configura tu backend para permitir requests desde `http://localhost:4200`

### API No Disponible
La aplicación maneja errores de red y muestra notificaciones apropiadas

### Problemas de Dependencias
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

## Contribuir

1. Fork del proyecto
2. Crear rama para feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT.
