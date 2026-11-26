# Industrialisation du cycle de vie d’un Portfolio Next.js

## Technical Documentation and Validation Guide

**Project:** Industrialisation du cycle de vie d’un Portfolio Next.js  
**Platform:** Backstage Developer Portal  
**Application:** Next.js Portfolio  
**CI/CD:** GitHub Actions  
**Containerization:** Docker and Docker Compose  
**Image Registry:** Docker Hub  
**Deployment:** Windows self-hosted GitHub Actions runner

---

## 1. Project Overview

This project implements an automated lifecycle for generating, building, publishing, and deploying a personal portfolio application using Backstage and DevOps technologies.

The objective is to provide a self-service developer experience in which a user can generate a Next.js portfolio from Backstage, publish its source code to GitHub, build and publish a Docker image, and deploy the application locally.

The solution also provides a unified release workflow that automates the build, publication, and deployment stages.

## 2. Project Objectives

The main objectives are:

- Create a Backstage Software Template for generating a Next.js portfolio.
- Automatically create and publish a GitHub repository.
- Register the generated application in the Backstage Software Catalog.
- Generate Docker configuration files.
- Automate Docker image building and publishing.
- Store Docker images in Docker Hub.
- Automate local deployment using Docker Compose.
- Validate deployments using container health checks and HTTP requests.
- Provide a unified workflow for releasing new portfolio versions.

## 3. Technology Stack

| Technology | Purpose |
|---|---|
| Backstage | Internal Developer Portal and Software Templates |
| Next.js | Portfolio frontend application |
| TypeScript | Application development |
| React | User interface |
| Git and GitHub | Source code management |
| GitHub Actions | CI/CD automation |
| Docker | Application containerization |
| Docker Compose | Container deployment |
| Docker Hub | Container image registry |
| PowerShell | Local administration |
| Windows self-hosted runner | Local deployment automation |
| PostgreSQL | Backstage database |

## 4. System Architecture

The solution is organized into four main stages.

### 4.1 Architecture Diagram

```text
                   DEVELOPER
                       |
                       v
             BACKSTAGE DEVELOPER PORTAL
                http://localhost:7007
                       |
                       v
              SOFTWARE TEMPLATES
                       |
          +------------+------------+
          |            |            |
          v            v            v
      Generate      Publish       Register
      Next.js       to GitHub     Component
      Portfolio
          |
          v
             GITHUB REPOSITORY
          my-devops-portfolio
                       |
                       v
                GITHUB ACTIONS
                       |
                       v
                BUILD DOCKER IMAGE
                       |
                       v
                   DOCKER HUB
                       |
                       v
             WINDOWS SELF-HOSTED RUNNER
                       |
                       v
                DOCKER COMPOSE
                       |
                       v
              LOCAL PORTFOLIO
              http://localhost:3000
```

### 4.2 Component Responsibilities

**Backstage:** Provides the developer portal and self-service workflows.

**GitHub:** Stores application source code and workflow definitions.

**GitHub Actions:** Automates image building, publishing, and deployment.

**Docker Hub:** Stores versioned container images.

**Self-hosted runner:** Executes deployment operations on the local Windows machine.

**Docker Compose:** Starts and manages the portfolio container.

## 5. Backstage Developer Portal

Backstage is deployed locally and accessible at:

http://localhost:7007

The Backstage project includes:

- Authentication configuration.
- PostgreSQL integration.
- Organization entities.
- Software Catalog configuration.
- Software Template registration.
- Scaffolder actions.

The four custom templates are registered through `app-config.production.yaml`.

### 5.1 Software Template Registration

The following templates are registered:

```yaml
catalog:
  locations:
    - type: file
      target: ./examples/templates/portfolio-nextjs/template.yaml
      rules:
        - allow: [Template]

    - type: file
      target: ./examples/templates/portfolio-docker-publish/template.yaml
      rules:
        - allow: [Template]

    - type: file
      target: ./examples/templates/portfolio-deploy/template.yaml
      rules:
        - allow: [Template]

    - type: file
      target: ./examples/templates/portfolio-release/template.yaml
      rules:
        - allow: [Template]
```

These entries make the templates available through the Backstage Create interface.

## 6. Software Templates

Four custom Software Templates implement the portfolio lifecycle.

### 6.1 Portfolio Next.js Generator

Location:

`examples/templates/portfolio-nextjs/template.yaml`

Responsibilities:

- Collect portfolio configuration from the user.
- Generate the Next.js project.
- Generate the Dockerfile.
- Generate Docker Compose configuration.
- Generate README and catalog metadata.
- Publish the generated application to GitHub.
- Register the application in Backstage Catalog.

The generated repository is:

https://github.com/sellami1/my-devops-portfolio

### 6.2 Build and Publish Docker Image

Location:

`examples/templates/portfolio-docker-publish/template.yaml`

This template dispatches the `docker-publish.yml` GitHub Actions workflow.

The user supplies an image version. Backstage triggers the GitHub workflow, which builds the application image and publishes it to Docker Hub.

### 6.3 Deploy Portfolio Locally

Location:

`examples/templates/portfolio-deploy/template.yaml`

This template dispatches the deployment workflow.

The workflow runs on the Windows self-hosted runner and uses Docker Compose to deploy the selected portfolio image locally.

### 6.4 Build, Publish and Deploy Portfolio

Location:

`examples/templates/portfolio-release/template.yaml`

This template combines the complete release process.

It triggers the unified release workflow, which:

1. Builds the Next.js application image.
2. Publishes the versioned image to Docker Hub.
3. Publishes the `latest` image tag.
4. Waits for the build-and-push job to complete.
5. Deploys the new image locally.
6. Checks container health.
7. Verifies HTTP availability.

This template provides a single entry point for releasing an updated portfolio version.

## 7. Generated Portfolio Application

The generated application uses Next.js and React with TypeScript.

The portfolio includes:

- Professional introduction.
- About and education sections.
- Technical skills.
- DevOps and Cloud projects.
- Certifications and continuous learning.
- Contact information.
- Dark and light theme support.

The professional title used in the portfolio is:

**Junior DevOps & Cloud Engineer | Software Developer**

The certifications section accurately reflects the current status of professional certifications and ongoing learning.

## 8. GitHub Repository Structure

The generated portfolio repository contains the application source code and deployment configuration.

Important files include:

```text
my-devops-portfolio/
├── .github/
│   └── workflows/
│       ├── docker-publish.yml
│       ├── deploy.yml
│       └── release.yml
├── public/
├── src/
│   └── app/
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
├── .dockerignore
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
├── README.md
└── tsconfig.json
```

## 9. Docker Configuration

### 9.1 Dockerfile

The Dockerfile defines the application image build process.

It uses a multi-stage build to separate dependency installation, application compilation, and runtime execution.

This approach reduces the size of the production image and avoids including unnecessary build dependencies in the final runtime environment.

### 9.2 Docker Compose

The generated Docker Compose configuration defines the portfolio service.

The deployed service uses the published Docker Hub image:

`kadhemsellami/my-devops-portfolio`

The container exposes port 3000.

The configuration includes:

- Container naming.
- Image selection.
- Port mapping.
- Restart policy.
- Production environment variables.
- Health check.

The local portfolio is accessible at:

http://localhost:3000

## 10. CI/CD Automation

Three GitHub Actions workflows implement the automation process.

### 10.1 Docker Image Publication

File:

`.github/workflows/docker-publish.yml`

Trigger:

`workflow_dispatch`

Main operations:

1. Checkout application source code.
2. Set up Docker Buildx.
3. Authenticate with Docker Hub.
4. Build the Docker image.
5. Publish the versioned image.
6. Publish the `latest` tag.

### 10.2 Local Deployment

File:

`.github/workflows/deploy.yml`

Trigger:

`workflow_dispatch`

Runner:

`[self-hosted, Windows, X64]`

Main operations:

1. Pull the requested Docker image.
2. Deploy the image using Docker Compose.
3. Wait for the container to become healthy.
4. Validate the application HTTP response.

### 10.3 Unified Release Workflow

File:

`.github/workflows/release.yml`

The unified workflow contains two jobs.

**Job 1: Build and Push**

Runs on `ubuntu-latest`.

It builds and publishes the versioned image and the `latest` tag.

**Job 2: Deploy**

Runs on the Windows self-hosted runner.

It depends on the successful completion of the build-and-push job.

It deploys the newly published version and performs health validation.

The dependency ensures that deployment does not begin before the image publication job succeeds.

## 11. Docker Hub Integration

The Docker Hub repository is:

https://hub.docker.com/r/kadhemsellami/my-devops-portfolio

GitHub Actions authenticates using repository secrets.

The following secrets are configured in the generated portfolio repository:

| Secret | Purpose |
|---|---|
| `DOCKERHUB_USERNAME` | Docker Hub account username |
| `DOCKERHUB_TOKEN` | Docker Hub access token |

The access token is configured with the required read and write permissions.

Credentials are not stored directly in workflow files.

## 12. Self-Hosted Runner

A Windows self-hosted GitHub Actions runner is configured on the local machine.

Runner directory:

`C:\actions-runner`

Labels:

- `self-hosted`
- `Windows`
- `X64`

The runner executes deployment jobs locally.

The runner is started interactively using:

```powershell
cd C:\actions-runner
.\run.cmd
```

The runner terminal must remain open while deployment jobs are expected to execute.

Docker Desktop must also be running.

## 13. Deployment Procedure

The release process is initiated through Backstage.

The user selects the Portfolio Release template and supplies an image version.

For the validated release, the version was:

`1.1.0`

The workflow builds and publishes the image before deploying it locally.

### 13.1 Verify the Container

Run:

```powershell
docker ps --filter "name=my-devops-portfolio"
```

The container should show an `Up` status and a healthy health-check state.

### 13.2 Verify Container Health

Run:

```powershell
docker inspect --format '{{.State.Health.Status}}' my-devops-portfolio
```

Expected result:

```text
healthy
```

### 13.3 Verify HTTP Availability

Run:

```powershell
$response = Invoke-WebRequest `
    -Uri "http://localhost:3000" `
    -UseBasicParsing

$response.StatusCode
```

Expected result:

```text
200
```

### 13.4 Access the Application

Open:

http://localhost:3000

The updated portfolio should be visible in the browser.

## 14. Validation Results

The following validation checks were successfully completed.

| Validation | Result |
|---|---|
| Backstage portal availability | Successful |
| Four Software Templates registered | Successful |
| Next.js portfolio generation | Successful |
| GitHub repository publication | Successful |
| Docker image build | Successful |
| Docker Hub publication | Successful |
| Local deployment | Successful |
| Release workflow for version 1.1.0 | Successful |
| Container health check | Healthy |
| HTTP response | 200 |
| Updated portfolio visible in browser | Successful |

The validated Docker image was:

`kadhemsellami/my-devops-portfolio:1.1.0`

## 15. Security and Configuration

The implementation follows several basic security practices.

- Credentials are stored in environment variables or GitHub repository secrets.
- `.env` is excluded from Git using `.gitignore`.
- Docker Hub authentication uses an access token.
- The Docker Hub token is not embedded in the application source code.
- GitHub Actions workflows reference secrets rather than hardcoding credentials.
- Deployment operations are executed through the configured self-hosted runner.

The local Backstage configuration and environment file must be protected from accidental publication.

## 16. Troubleshooting

### 16.1 GitHub Workflow Does Not Start

Check:

- The workflow file is under `.github/workflows/`.
- The workflow supports `workflow_dispatch`.
- The repository and branch are correct.
- The GitHub token used by Backstage has the necessary permissions.

### 16.2 Docker Hub Authentication Fails

Check:

- `DOCKERHUB_USERNAME` is configured.
- `DOCKERHUB_TOKEN` is valid.
- The token has read and write permissions.
- The Docker Hub repository exists.

### 16.3 Deployment Job Remains Queued

Check:

- The self-hosted runner is online.
- The `run.cmd` process is active.
- The runner labels match the workflow.
- Docker Desktop is running.

### 16.4 Container Does Not Become Healthy

Check:

```powershell
docker ps -a
docker logs my-devops-portfolio
docker inspect my-devops-portfolio
```

Verify that the application starts correctly and that port 3000 is available.

## 17. Limitations and Future Improvements

Potential improvements include:

- Deploying the application to a cloud or Kubernetes environment.
- Adding automated unit and integration tests.
- Integrating code quality and security scanning.
- Adding vulnerability scanning for Docker images.
- Implementing image retention and cleanup policies.
- Adding automated rollback to a previous release.
- Integrating release notifications into Backstage.
- Improving monitoring and observability.
- Automating infrastructure provisioning.

## 18. Conclusion

This project demonstrates how Backstage can be used as an Internal Developer Portal to industrialize the lifecycle of a Next.js portfolio.

The implementation connects software generation, source code management, containerization, image publication, and deployment through automated workflows.

The unified release workflow provides a repeatable process for publishing and deploying new portfolio versions.

The successful deployment of version `1.1.0`, the healthy Docker container, and the HTTP 200 response demonstrate that the complete release process was operational.

## 19. Project Deliverables

### Backstage Developer Portal

https://github.com/sellami1/local.backstage

### Generated Next.js Portfolio

https://github.com/sellami1/my-devops-portfolio

### Docker Hub Repository

https://hub.docker.com/r/kadhemsellami/my-devops-portfolio

### Local Access URLs

- Backstage: http://localhost:7007
- Portfolio: http://localhost:3000

---

**End of Documentation**