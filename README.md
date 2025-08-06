<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Redberry](https://redberry.international/laravel-development)**
- **[Active Logic](https://activelogic.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).


# 🛠️ Sistema de Gestión de Tickets

Este proyecto es un sistema web que permite a los usuarios de una organización generar, dar seguimiento y resolver tickets de soporte técnico. El sistema incluye tres roles principales: **Usuario**, **Soporte** y **Director**.

---

## 📌 Tecnologías utilizadas

- **Backend:** Laravel 12 (PHP 8.2+)
- **Frontend:** React + TypeScript con Inertia.js
- **Base de Datos:** MySQL o PostgreSQL
- **ORM:** Eloquent
- **Servidor local:** Laravel Artisan (opcional: XAMPP, Laragon, Valet)

---

## ⚙️ Requisitos previos

Asegúrate de tener instalado:

| Herramienta   | Requerido   |
|---------------|-------------|
| PHP           | >= 8.2      |
| Composer      | ✅          |
| Node.js       | >= 18       |
| NPM o Yarn    | ✅          |
| MySQL/PostgreSQL | ✅      |
| Laravel CLI   | ✅          |
| Git           | ✅          |
| Navegador moderno | ✅      |

---

## 🚀 Instalación paso a paso

### 1. Clonar el repositorio

```bash
git clone https://github.com/Daniel-1992/ticketsystem.git

```

---

### 2. Instalar dependencias de Laravel (backend)

```bash
composer install
```

---

### 3. Instalar dependencias de React (frontend)

```bash
npm install
# o si prefieres Yarn
yarn install
```

---

### 4. Crear y configurar archivo `.env`

```bash
cp .env.example .env
```

Modifica el archivo `.env` con tus variables de entorno. Ejemplo para MySQL:

```env
APP_NAME=SistemaTickets
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=ticketsystem
DB_USERNAME=postgres
DB_PASSWORD=


MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=vazquezdaniel1992@gmail.com
MAIL_PASSWORD=
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="vazquezdaniel1992@gmail.com"
MAIL_FROM_NAME="Sistema de Tickets"


FILESYSTEM_DISK=public
```

Luego ejecuta:

```bash
php artisan key:generate
```

---

### 5. Crear base de datos

Crea una base de datos en tu gestor (MySQL, phpMyAdmin o CLI):

```sql
CREATE DATABASE sistematickets;
```

---

### 6. Ejecutar migraciones y seeders (datos de prueba)

```bash
php artisan migrate --seed
```

Este comando creará las tablas necesarias y, si existen seeders, cargará datos iniciales como usuarios, procesos y áreas.

---

### 7. Compilar assets de React

```bash
npm run dev
# o en modo producción
npm run build
```

---

### 8. Iniciar servidor de desarrollo

```bash
php artisan serve
```

Visita en tu navegador:

```
http://localhost:8000
```

---

## 👥 Accesos de prueba

Se ejecutaron los seeders, puedes probar con los siguientes usuarios (verifica en `DatabaseSeeder.php`):

```text
📧 usuario@empresa.com | 🔐   12345678
📧 soporte@empresa.com | 🔐 12345678
📧 director@empresa.com | 🔐 12345678
```

Si no se crearon, puedes generar uno manualmente desde Tinker:

```bash
php artisan tinker
```

```php
App\Models\User::create([
    'name' => 'Soporte',
    'email' => 'soporte@empresa.com',
    'password' => bcrypt('password'),
    'role' => 'soporte',
]);
```

---

## 🧠 Estructura del sistema

```
├── app/                   # Lógica del backend
│   ├── Http/Controllers/  # Controladores Laravel
│   └── Models/            # Modelos Eloquent
├── resources/
│   ├── js/                # Código React + Inertia
│   └── views/             # Vistas Inertia
├── routes/
│   └── web.php            # Rutas de la aplicación
├── database/
│   ├── migrations/        # Estructura de BD
│   └── seeders/           # Datos iniciales
├── public/                # Recursos públicos
├── .env                   # Variables de entorno
├── package.json           # Dependencias frontend
└── README.md              # Este archivo
```

---

## 🛠️ Comandos útiles

| Acción                              | Comando                          |
|-------------------------------------|----------------------------------|
| Migrar base de datos                | `php artisan migrate`           |
| Revertir última migración          | `php artisan migrate:rollback`  |
| Limpiar cachés                     | `php artisan optimize:clear`    |
| Ver rutas definidas                 | `php artisan route:list`        |
| Compilar assets para producción     | `npm run build`                 |

---

## 🧩 Posibles errores comunes

- **Permisos en directorio `storage` o `bootstrap/cache`:**
  ```bash
  chmod -R 775 storage bootstrap/cache
  ```

- **APP_KEY vacío:** Ejecuta `php artisan key:generate`

- **Error 500 tras instalar:** Verifica configuración `.env` y base de datos.

- **Archivos no se cargan:** Asegúrate de ejecutar `php artisan storage:link`

---

## 📬 Contacto y soporte

Para soporte técnico o dudas:

- 👤 Desarrollador: Daniel Vázquez   
- 📧 Email: vazquezdaniel1992@hotmail.com.com 

---
