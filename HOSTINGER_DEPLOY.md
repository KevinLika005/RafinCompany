# Hostinger Auto-Deploy

This repository now includes a GitHub Actions workflow at `.github/workflows/deploy-hostinger.yml`.

## What it does

Every push to `main` triggers a deployment to your Hostinger website root. You can also run it manually from the **Actions** tab with `workflow_dispatch`.

The workflow uploads this repository to Hostinger using FTP and targets `public_html/` by default.

## GitHub secrets required

Add these repository secrets in GitHub:

- `HOSTINGER_FTP_HOST`
  Your Hostinger FTP host or FTP IP. Use only the hostname or IP, not `ftp://` or `https://`.
- `HOSTINGER_FTP_USERNAME`
  Your Hostinger FTP username.
- `HOSTINGER_FTP_PASSWORD`
  Your Hostinger FTP password.
- `HOSTINGER_FTP_PORT`
  Optional. Defaults to `21`.
- `HOSTINGER_FTP_SERVER_DIR`
  Optional. Defaults to `public_html/`.
- `HOSTINGER_FTP_PROTOCOL`
  Optional. Defaults to `ftp`. Set to `ftps` only if Hostinger explicitly gave you FTPS settings.

## Recommended Hostinger setup

1. In Hostinger hPanel, open the website's FTP details.
2. Confirm the host/IP, FTP username, and password.
3. If your site should upload somewhere other than the default root, set `HOSTINGER_FTP_SERVER_DIR`.

If the workflow shows `getaddrinfo ENOTFOUND`, the FTP host secret is wrong. On Hostinger this should usually be the FTP IP or FTP hostname from hPanel, with no `ftp://` prefix.

## Before your first push

The workflow excludes repo-only files such as `.github`, `.vscode`, `.vendor`, logs, and markdown files from production upload.

## After setup

1. Commit this workflow.
2. Push to `main`.
3. Open the GitHub **Actions** tab and watch the `Deploy to Hostinger` run.
