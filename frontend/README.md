# Plataforma ICO - Encrypia

Una plataforma completa para lanzar y participar en ICOs (Initial Coin Offerings) con funcionalidades avanzadas como tokenomics, gobernanza DAO y distribución de tokens.

## Características principales

### Para inversores

- Participación en ICO con múltiples niveles y bonificaciones
- Dashboard personalizado con seguimiento de inversiones
- Visualización del calendario de vesting
- Interfaz para reclamar tokens según calendario de distribución
- Participación en gobernanza DAO (votaciones, propuestas)
- Staking de tokens para obtener recompensas

### Para creadores de tokens

- Herramientas para configuración y despliegue de tokens
- Panel de administración para gestionar la ICO
- Configuración de tokenomics y vesting
- Gestión de whitelist y KYC
- Configuración de parámetros de gobernanza
- Herramientas para distribución de tokens

## Tokenomics y distribución

La plataforma permite definir y visualizar:

- Distribución inicial de tokens (equipo, inversores, reservas, etc.)
- Cronograma de liberación (vesting)
- Suministro circulante vs. suministro total
- Utilidad del token dentro del ecosistema
- Mecanismos de quema/emisión

## Gobernanza DAO

Implementamos un sistema de gobernanza descentralizada:

- Creación de propuestas por parte de poseedores de tokens
- Sistema de votación ponderado por tenencia de tokens
- Delegación de votos
- Ejecución automática de propuestas aprobadas
- Tablero de seguimiento de propuestas activas/pasadas

## Tecnologías utilizadas

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Blockchain: Ethereum (Sepolia para desarrollo), Solidity
- Integraciones: ThirdWeb SDK, Ethers.js, Chart.js
- Autenticación: ThirdWeb Auth

## Instalación

```bash
# Instalar dependencias
pnpm install

# Ejecutar entorno de desarrollo
pnpm dev

# Construir para producción
pnpm build
```
