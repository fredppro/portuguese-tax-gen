FROM mcr.microsoft.com/devcontainers/typescript-node:dev-22-bookworm

RUN apt-get update && \
    apt-get install -y postgresql-client && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
