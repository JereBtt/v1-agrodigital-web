# AgroDigital Web (MVP) — v1-agrodigital-web
El proyecto se encuentra desplegado en Firebase Hosting.
https://v1-agrodigital-firebase.web.app 

Aplicación web desarrollada en **React + Firebase** para gestión básica de usuarios dentro del sistema AgroDigital.
Proyecto académico – Analista de Sistemas de Computación  
Institución Cervantes

Autores:
- Bonetto Jeremias
- Santander Alejandro
- Miranda Facundo
- Foronte Sofia
- Lopez Guillermo

---

## Tecnologías
- React + Vite
- Bootstrap
- Firebase Authentication (Email/Password)
- Cloud Firestore
- Firebase Hosting (deploy)



## Estructura del proyecto
src/
  api/            # acceso a datos (Firestore)
  components/     # componentes reutilizables (Header, Footer, etc.)
  data/           # catálogos hardcodeados (roles, tipos doc)
  layouts/        # layouts compartidos (AppLayout, AuthLayout)
  pages/          # pantallas (Login, Dashboard, Users)
  firebase.js     # inicialización Firebase (auth, db)
  App.jsx         # control de sesión + carga de perfil
  main.jsx        # entrypoint + bootstrap



## Requisitos
- Node.js 20+
- Clonar el repositorio: https://github.com/JereBtt/v1-agrodigital-web.git

## Instalación
npm install

## Dependencias principales (npm)
  "bootstrap": "^5.3.8",
  "firebase": "^12.10.0",
  "react": "^19.2.0",
  "react-dom": "^19.2.0"


## Configuración (.env)
Este proyecto usa variables de entorno para Firebase.  
Cada integrante debe crear un archivo `.env` en la raíz.

1) Copiar la plantilla:
cp .env.example .env


## Seguridad
La autenticación se maneja mediante Firebase Authentication
y el acceso a datos mediante Firestore Rules.