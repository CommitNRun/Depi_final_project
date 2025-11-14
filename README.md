# 📌 Healthcare Web Application Deployment
### A functional healthcare web application that supports doctor appointment reservations, secured with authentication, fully containerized, monitored, and deployed locally using Kubernetes. This project also includes a complete CI/CD pipeline for continuous updates, ensuring reliability and scalability for healthcare-grade systems.

## 👥 Team Members
| Name                              | Responsibilities                                    |
| --------------------------------- | --------------------------------------------------- |
| Mohamed Ahmed Hassan Doma         | Kubernetes, microservices, Docker, CI/CD testing    |
| Ahmed Tamer Ahmed Elkady          | CI/CD pipeline creation, monitoring setup           |
| Ahmed Mohamed Ahmed Makram        | Dockerfiles for services                            |
| Ahmed Ibrahim Ahmed Abo shanab    | Dockerfiles & Docker Compose setup                  |
| Moaz Mohamed Adel ElGendy         | Dockerfiles, webserver configuration, CI/CD testing |
| Ahmed Hossam Abdelhamid Abdelatty | Docker images & Node.js configuration               |

## 📌 1. Project Overview

### 🎯 Project Idea
To build, containerize, and monitor a working healthcare webservice. The entire stack — app + monitoring — runs locally on Kubernetes.

### 🎯 Project Objective
The system allows users to reserve doctor appointments, authenticate securely, and interact with a simple GUI.
Custom metrics are exposed, collected with Prometheus, and visualized using Grafana dashboards.

### 🏥 Healthcare Requirement
The system is built with a daily update cycle, aligning with healthcare environments that continuously add features, doctors, and services.

## ⚙️ 2. Technology Stack

### Backend
Node.js
Express.js

### Frontend
React.js
JavaScript, CSS

### Database
MongoDB

### Containerization & Orchestration
Docker
Docker Compose
Kubernetes (via Docker Desktop + kubectl)
YAML manifests
Helm Charts (Prometheus + Grafana)

### CI/CD Pipeline
GitHub Actions
Docker Hub registry

### Monitoring
Prometheus
Grafana

## 📐 3. System Architecture & Design

### General Deployment Diagram
![General Deployment Diagram](./diagrams/general-diagram.png)

## 🔄 4. System Workflow

1. Developer pushes/merges code into GitHub

2. GitHub Actions triggers CI/CD pipeline

3. Pipeline builds Docker images

4. Runs tests

5. Pushes images to Docker Hub

6. Kubernetes cluster automatically pulls updated images

7. Local K8s cluster refreshes all deployments

8. Prometheus scrapes service metrics

9. Grafana visualizes performance, load, and error dashboards

## 📝 5. Functional Requirements

### Core Features

- User authentication (Sign in / Sign up)

- Appointment reservation service

- Fast and intuitive GUI interface

- Local secure deployment

## 🔒 6. Non-Functional Requirements
- Performance: Fast response and low latency

- Security: Enforced authentication + isolated environment

- Usability: Clean and simple UI

- Reliability: Daily automatic updates via CI/CD

- Monitoring: Full stack observability with Prometheus & Grafana


## 📊 7. Monitoring & Metrics
### Exposed Custom Metrics

- Pod health

- Performance metrics

- API load

- Error rates

### Grafana Dashboards

- Performance dashboard

- API load visualization

- Error rate tracking

## 🧪 8. Testing
### Testing Method

GitHub Actions runs automated tests on each commit.

###### Test File: login_page/src/App.test.js

## 🎬 9. Project Presentation
### 📽️ Prezi Presentation:
https://prezi.com/view/tUvrj0WhFkH95kzORWP2/?referral_token=P1aKXtlnB3FN

## 🚀 10. CI/CD Pipeline Summary
Developer → GitHub Repo → Github Actions (CI/CD) 
→ Build Docker Images → Run Unit Tests 
→ Push to Docker Hub → Kubernetes Pulls Updates 
→ Cluster Auto-Restarts Pods → Prometheus Scrapes Metrics → Grafana Visualizes

## 🎉 Final Notes
### This project showcases a complete deployment ecosystem covering:

- Microservices

- CI/CD automation

- Containerization

- Kubernetes orchestration

- Monitoring & observability

