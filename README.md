# 📝 ToDo List App

Aplicación web full stack para gestión de tareas. Este proyecto fue desarrollado como trabajo final universitario utilizando tecnologías modernas como React, Node.js, Sequelize y PostgreSQL.

---

## ⚙️ Tecnologías utilizadas

### Frontend (📁 `Client/`)
- React     Para crear la interfaz web (botones, vistas, inputs)
- TypeScript 
- React Router DOM      Para manejar navegación entre vistas: /login, /home, etc

### Backend (📁 `Server/`)
- Node.js   	El motor que corre JavaScript en el backend
- Express       Framework en Node para crear tu servidor y definir rutas (/api/login, /api/tareas)
- Sequelize ORM     Traduce objetos de JS/TS a tablas de base de datos
- PostgreSQL        La base de datos relacional que guarda usuarios y tareas
- JWT y bcrypt para autenticación sin cookies y cifrado de contraseñas

---

## 🚀 Instalación rápida

### 1. Cloná el repositorio

```bash
git clone https://github.com/Wonback/ToDo-List-APP.git
cd ToDo-List-APP
```
```bash
cd ToDo-List-APP
```
### 2. Ejecutá el script de setup
```bash
/start.sh
```
### 2.1. Para actualizar los archivos locales a los actualizados del repo
```bash
git pull
```
### 2.2. Para subir cambios al repo
```bash
git add .
git commit -m "Descripción clara del cambio"
git push
```