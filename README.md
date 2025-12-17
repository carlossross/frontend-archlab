# ArchLab -Angular Advanced Architecture

A focused laboratory project to explore **modern frontend architecture patterns** using Angular.

## 🎯 Purpose

This project is not UI-driven.
Its main goal is to demonstrate **how to structure, scale, and reason about a frontend application** as complexity grows.

The focus is on:
- Architectural decisions
- Separation of concerns
- Predictable state management
- Long-term maintainability

## 🧱 Architecture Overview

The application follows a **feature-based architecture**, with clear boundaries between:

- Core infrastructure (app-wide concerns)
- Feature domains
- UI state vs domain state
- Smart and dumb components

State management is handled using **Angular Signals**, avoiding unnecessary global stores when local state is sufficient.

## 🛠 Tech Stack

- Angular (Standalone APIs)
- TypeScript
- Angular Signals
- RxJS (where async streams are required)

## 🧠 Key Concepts Demonstrated

- Feature-based folder structure
- Smart vs Dumb component separation
- Local stores using signals
- Clear ownership of state
- Dependency injection boundaries
- Scalable routing setup
