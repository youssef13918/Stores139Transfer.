Venta de Worldcoins (WLD) con Next.js y Worldcoin MiniKit
Este proyecto es una plataforma web para vender tokens Worldcoin (WLD) de forma segura y sencilla, utilizando Next.js en el frontend y backend, con integración de la Worldcoin MiniKit para gestionar pagos con World App Wallet.

Descripción
La aplicación permite a usuarios autenticados vender WLD mediante transferencia bancaria o PayPal. El proceso de pago se realiza con MiniKit, que facilita la interacción con World App Wallet para enviar tokens de manera segura. El backend valida las transacciones usando la API de Worldcoin.

Tecnologías
Next.js 13 con App Router y React Server Components

TypeScript para tipado estático

Worldcoin MiniKit para pagos con World App Wallet

React Hooks y Context API para manejo de estado y autenticación

UI basada en componentes reutilizables (Card, Tabs, Input, etc.)

Fetch API para comunicación backend-frontend

Simulación de base de datos para referencias y órdenes

Características principales
Autenticación de usuarios (login / registro)

Selección de cantidad WLD a vender (entre 1 y 500)

Elección de método de pago (Transferencia Bancaria o PayPal)

Integración con Worldcoin MiniKit para pagos en World App Wallet

Validación backend de transacciones Worldcoin con API oficial

Creación y almacenamiento de órdenes de venta

Mensajes y notificaciones con toasts para estados y errores

Diseño responsive y accesible

