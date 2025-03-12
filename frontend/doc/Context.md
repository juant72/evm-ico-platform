# Encrypia ICO Platform - AI Context Model

## Project Overview

{
"project_type": "Web3 Platform",
"primary_function": "ICO Launch and Management",
"technology_stack": {
"frontend": ["Next.js", "TypeScript", "Tailwind"],
"blockchain": ["Ethereum", "Solidity", "Foundry"],
"integrations": ["ThirdWeb", "Ethers.js"]
}
}

## Core Functionalities

{
"user_roles": [
{
"role": "Investor",
"capabilities": [
"Participate in ICO",
"Track investments",
"Claim tokens",
"Vote on proposals"
]
},
{
"role": "Creator",
"capabilities": [
"Configure ICO",
"Manage distribution",
"Set parameters",
"Monitor stats"
]
}
]
}

## System Components

{
"smart_contracts": {
"token": {
"standard": "ERC20",
"features": ["Vesting", "Staking", "Governance"]
},
"governance": {
"type": "DAO",
"mechanism": "Token-weighted voting"
},
"distribution": {
"methods": ["ICO", "Airdrop", "Vesting"]
}
}
}

## Data Models

{
"user": {
"address": "string",
"balance": "BigNumber",
"tier": "number",
"vestingSchedule": "VestingInfo[]"
},
"proposal": {
"id": "string",
"title": "string",
"votes": {
"for": "BigNumber",
"against": "BigNumber",
"abstain": "BigNumber"
}
}
}

## Integration Points

{
"blockchain_interactions": [
"Token transfers",
"Governance votes",
"Staking operations",
"Distribution claims"
],
"external_services": [
"Web3 wallet providers",
"Price oracles",
"KYC providers"
]
}

## Context Instructions

{
"development_approach": {
"component_creation": "Use TypeScript with React functional components",
"styling": "Apply Tailwind CSS using dark theme classes",
"state_management": "Implement Zustand stores for global state"
},
"code_generation": {
"components": "Follow atomic design principles",
"smart_contracts": "Include NATSPEC documentation",
"testing": "Write unit tests for all components"
}
}

## Response Guidelines

{
"code_formatting": {
"typescript": "Use strict type checking",
"solidity": "Follow latest style guide",
"components": "Include prop types and comments"
},
"documentation": {
"comments": "Provide clear function descriptions",
"examples": "Include usage examples",
"types": "Define all interfaces and types"
}
}

## Error Handling

{
"frontend": {
"user_feedback": "Show toast notifications",
"loading_states": "Display loading indicators",
"error_boundaries": "Implement React error boundaries"
},
"smart_contracts": {
"require_statements": "Use descriptive error messages",
"modifiers": "Implement access control checks",
"events": "Emit detailed event logs"
}
}

## Project Conventions

{
"naming": {
"components": "PascalCase",
"functions": "camelCase",
"constants": "UPPER_CASE",
"files": "kebab-case"
},
"folder_structure": {
"components": "Group by feature",
"hooks": "Prefix with 'use'",
"utils": "Group by functionality"
}
}
