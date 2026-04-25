# Automated CI/CD Pipeline & Microservice Architecture

[![CI/CD Pipeline](https://github.com/X4tra/CICD-Pipeline-App/actions/workflows/deploy.yml/badge.svg)](https://github.com/X4tra/CICD-Pipeline-App/actions)

Welcome! This repository demonstrates a production-grade **Continuous Integration and Continuous Deployment (CI/CD)** pipeline integrated with a multi-container microservice architecture. It is built to showcase robust DevOps practices, including automated testing, containerization, load balancing, and zero-downtime rolling deployments over SSH.

## Architecture Overview

The infrastructure relies on Docker Compose to orchestrate a distributed environment, routing traffic logically through an Nginx load balancer to a backend API and three redundant frontend instances.

- **Frontend (`app1`, `app2`, `app3`)**: Three container instances serving static HTML assets via Nginx. Redundancy at this level ensures high availability.
- **Backend API (`backend`)**: A robust Python 3.12 application using **FastAPI** to handle API requests efficiently.
- **Load Balancer (`load-balancer`)**: An Nginx alpine container positioned in front of the services. It balances incoming requests across the three frontend containers and the backend service, utilizing Docker's internal networking (`cicd_net`).

---

## DevOps & CI/CD Workflow

The backbone of this repository is an automated GitHub Actions pipeline designed to minimize manual intervention while safeguarding production integrity.

### 1. Continuous Integration (CI)
On every pull request or push to the `main` branch, the `test.yml` workflow guarantees code quality:
* Replicating the exact production Python 3.12 environment setup.
* Installing required dependencies via `pip` from `requirements.txt`.
* Executing the backend test suite using `pytest` to validate FastAPI endpoints.

### 2. Continuous Deployment (CD)
Upon a successful build and test run, `deploy.yml` orchestrates the target-server release over SSH using `appleboy/ssh-action`. 
To achieve **Zero-Downtime Deployments**, the script executes the following rolling release sequence:
* Integrates securely with the server via GitHub Secrets.
* Pulls the latest code cleanly using Git.
* Rebuilds the custom Docker images utilizing the modern Docker Compose.
* Loops through the individual containers (Frontend 1-3, Backend, and Load Balancer), replacing them one by one without taking down the full stack.
* **Deployment Verification:** Ensures all targeted microservice containers have properly initialized and are actively running prior to finalizing the pipeline success.

---

## Tech Stack Found Here
* **CI/CD Configuration:** GitHub Actions (YAML), Bash Scripting, SSH Automation
* **Containerization:** Docker, Docker Compose V2, Docker Networking
* **Web Server/Routing:** Nginx (Load Balancing & Static Serving)
* **Backend:** Python 3.12, FastAPI, Uvicorn, PyTest

---

## Local Development

If you're reviewing this for recruitment purposes and want to test it locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/X4tra/CICD-Pipeline-App.git
   cd CICD-Pipeline-App
   ```
2. Build and run the containers using Docker Compose:
   ```bash
   docker compose up -d --build
   ```
3. View the application locally on `http://localhost`. The Nginx Load Balancer will automatically cycle and route your HTTP traffic!
