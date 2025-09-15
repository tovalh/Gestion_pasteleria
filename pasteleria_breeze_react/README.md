# 🧁 Dolci Mimi - Sistema de Gestión de Pastelería

![Laravel](https://img.shields.io/badge/Laravel-v11.46-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-v18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Inertia.js](https://img.shields.io/badge/Inertia.js-v2.0-9553E9?style=for-the-badge&logo=inertia&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v16-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Un sistema completo de gestión para pastelerías desarrollado con tecnologías modernas. Permite la administración integral de productos, inventario, ventas y clientes con una interfaz intuitiva y responsive.

## ✨ Características Principales

### 🏪 **Gestión de Productos**
- ✅ CRUD completo de productos por categorías
- ✅ Sistema de imágenes y descripciones detalladas
- ✅ Gestión de precios con formato chileno
- ✅ Organización por secciones (Tortas, Cupcakes, Galletas, etc.)

### 📦 **Control de Inventario**
- ✅ Gestión completa de ingredientes
- ✅ Control de stock en tiempo real
- ✅ Alertas de stock mínimo
- ✅ Unidades de medida personalizables
- ✅ Sistema de recetas (ingredientes por producto)

### 🛒 **Sistema de Ventas**
- ✅ Carrito de compras intuitivo
- ✅ Integración con WebPay (Transbank)
- ✅ Múltiples métodos de pago (WebPay, Efectivo)
- ✅ Estados de pedido (En Proceso, Disponible, Entregado, Cancelado)
- ✅ Seguimiento de transacciones

### 👥 **Gestión de Usuarios**
- ✅ Autenticación completa (Laravel Breeze)
- ✅ Sistema de roles (Cliente/Administrador)
- ✅ Perfiles de usuario personalizables
- ✅ Historial de pedidos por cliente

### 📊 **Panel Administrativo**
- ✅ Dashboard con pestañas organizadas
- ✅ Gestión de productos, ingredientes y secciones
- ✅ Reportes de ventas con filtros por fecha
- ✅ Creación de ventas directas
- ✅ Gestión completa de clientes

### 🎨 **Experiencia de Usuario**
- ✅ Diseño responsive (Tailwind CSS)
- ✅ Interfaz moderna e intuitiva
- ✅ Navegación fluida (SPA con Inertia.js)
- ✅ Feedback visual en todas las acciones

## 🛠️ Tecnologías Utilizadas

### **Backend**
- **Laravel 11.46** - Framework PHP moderno
- **PostgreSQL** - Base de datos relacional robusta
- **Laravel Breeze** - Autenticación y autorización
- **Eloquent ORM** - Gestión de base de datos

### **Frontend**
- **React 18** - Biblioteca de interfaz de usuario
- **Inertia.js** - Puente entre Laravel y React
- **Tailwind CSS** - Framework de estilos utilitarios
- **Vite** - Herramienta de construcción rápida

### **Integraciónes**
- **WebPay (Transbank)** - Procesamiento de pagos
- **Factories & Seeders** - Datos de prueba realistas

## 🚀 Instalación y Configuración

### Prerrequisitos
- PHP 8.2+
- Node.js 18+
- PostgreSQL 12+
- Composer
- NPM

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tuusuario/dolci-mimi-pasteleroia.git
   cd dolci-mimi-pasteleria
   ```

2. **Instalar dependencias de PHP**
   ```bash
   composer install
   ```

3. **Instalar dependencias de Node.js**
   ```bash
   npm install
   ```

4. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Configurar base de datos en `.env`**
   ```env
   DB_CONNECTION=pgsql
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_DATABASE=pasteleria_breeze_react
   DB_USERNAME=tu_usuario
   DB_PASSWORD=tu_contraseña
   ```

6. **Crear base de datos**
   ```bash
   createdb pasteleria_breeze_react
   ```

7. **Ejecutar migraciones y seeders**
   ```bash
   php artisan migrate:fresh --seed
   ```

8. **Compilar assets**
   ```bash
   npm run build
   ```

9. **Iniciar servidores de desarrollo**
   ```bash
   # Terminal 1: Laravel
   php artisan serve
   
   # Terminal 2: Vite
   npm run dev
   ```

## 🎯 Uso del Sistema

### **Credenciales de Prueba**
- **Administrador**: admin@dolcimimi.com / admin123
- **Cliente**: juan@test.com / password

### **Flujo de Usuario Cliente**
1. Navegar por el catálogo de productos
2. Agregar productos al carrito
3. Proceder al checkout
4. Seleccionar método de pago
5. Completar la compra
6. Seguimiento del pedido

### **Flujo de Usuario Administrador**
1. Acceder al panel de administración
2. Gestionar productos e inventario
3. Procesar pedidos
4. Generar reportes de ventas
5. Administrar clientes

## 📊 Base de Datos

El sistema incluye datos de prueba realistas:
- **37 productos** variados con precios chilenos
- **42 ingredientes** completos para pastelería
- **10 secciones** de productos organizadas
- **5 clientes** con datos completos
- **7 ventas** con diferentes estados
- **Relaciones complejas** entre productos, ingredientes y ventas

## 🔧 Comandos Útiles

```bash
# Repoblar base de datos
php artisan migrate:fresh --seed

# Limpiar caché
php artisan cache:clear
php artisan config:clear

# Generar nuevos datos de prueba
php artisan db:seed

# Ver estado de migraciones
php artisan migrate:status
```

## 📱 Características Destacadas

### **🏗️ Arquitectura Sólida**
- Separación clara entre frontend y backend
- Modelos con relaciones bien definidas
- Controllers organizados por funcionalidad
- Middleware de autenticación y autorización

### **💼 Funcionalidades de Negocio**
- Cálculo automático de totales
- Gestión de stock con alertas
- Sistema de recetas y costos
- Reportes de ventas detallados

### **🎨 Experiencia Visual**
- Diseño responsive en todos los dispositivos
- Componentes reutilizables
- Feedback visual en todas las acciones
- Interfaz intuitiva y profesional

## 🤝 Contribución

Este proyecto fue desarrollado como parte de un portafolio profesional, demostrando competencias en desarrollo full-stack con tecnologías modernas.

### **Habilidades Demostradas**
- ✅ Desarrollo Backend con Laravel
- ✅ Desarrollo Frontend con React
- ✅ Diseño de Base de Datos Relacionales
- ✅ Integración de Sistemas de Pago
- ✅ Arquitectura de Aplicaciones Web
- ✅ UI/UX con Tailwind CSS

## 📞 Contacto

**Desarrollador**: Tovalh
- 📧 Email: crisvalladares98@gmail.com
- 💼 LinkedIn: https://www.linkedin.com/in/cristobal-valladares/
- 🐙 GitHub: Tovalh

---

⭐ **¡No olvides darle una estrella al proyecto si te gustó!** ⭐

*Desarrollado con ❤️ para demostrar habilidades en desarrollo full-stack moderno.*
