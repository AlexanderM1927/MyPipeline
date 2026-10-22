# MyPipeline

Create your own pipeline.

Local development uses `compose.yaml`. Production uses the separate
`docker-compose.prod.yml` and root `Dockerfile`, following the MyTurner deployment
pattern with versions and commands adapted to this Lumen 7 / Quasar 1 application.

Production runs PHP-FPM (`app`), Nginx with the compiled PWA (`web`), and the existing
minute-by-minute notification schedule (`scheduler`). Nginx serves frontend history
routes and sends `/v1/` requests to Lumen. Storage persists in the
`mypipeline_storage-data` Docker volume across deployments.

## Production setup

Run Jenkins on the production Docker host, with Docker Engine, BuildKit, and a
current Docker Compose plugin installed. The Jenkins user needs access to the Docker
daemon. Node, PHP, Composer, Quasar, and Icon Genie installations on the host are
no longer required; the PWA uses the icons already committed in `front/public`.
If Alpine CDN downloads are slow, set `ALPINE_MIRROR` to another official mirror
hostname, such as `dl-4.alpinelinux.org`, in the Jenkins job environment.

Keep these Jenkins secret file credentials:

- `envmypipeline`: backend configuration, copied to `back/.env`.
- `envmypipeline-front`: frontend build configuration, copied to `front/.env`.

In the backend credential, preserve the existing `APP_KEY` and `JWT_SECRET`, set
`APP_URL=https://mypipeline.alexanderm.co`, and keep the production database and mail settings.
For MySQL running on the Docker host, use `DB_HOST=host.docker.internal`, rather than
`localhost` or `127.0.0.1`; MySQL must accept connections from the Docker network.
This deployment uses `QUEUE_CONNECTION=sync`, matching the project's default. A
different queue connection requires its own worker and queue infrastructure.
Containers always set `APP_ENV=production` and `APP_DEBUG=false`.

In the frontend credential, set `API_URL` to the public API address, for example
`https://mypipeline.alexanderm.co/v1/`. This value is compiled into the PWA;
frontend configuration is public browser data and must not contain private secrets.
The environment file is supplied with a Docker build secret rather than copied
into an image layer ([Docker build secrets](https://docs.docker.com/build/building/secrets/)).
Jenkins hashes it to rebuild the frontend when configuration changes.

Configure the host's HTTPS reverse proxy to forward the entire site to
`http://127.0.0.1:8002`. Replace the existing HTTPS server block for
`mypipeline.alexanderm.co` with `docker/nginx/vps-mypipeline.conf`; the current
workspace roots, `/v1/` rewrites, and host PHP-FPM socket must be removed from that
block. Keep the shared HTTP redirect block for MyPipeline and MyGuardMoney, along
with all other projects' server blocks. Do not enable a second HTTPS server block
for the same domain. Validate with `sudo nginx -t` before `sudo systemctl reload nginx`.

Port 8002 is not assigned to any upstream in the supplied VPS Nginx configuration;
see [the project and port audit](docs/vps-nginx-audit.md). Before the first deployment,
check the live VPS with `sudo ss -ltnp 'sport = :8002'` and
`docker ps --format 'table {{.Names}}\t{{.Ports}}'`. A first deployment requires no
listener or other container publishing this port. On later deployments, only this
project's existing web container should own it. The Nginx file alone cannot show
listeners belonging to services outside that configuration.

Set `APP_PORT` in the Jenkins job environment to select a different unused host
port, and update `proxy_pass` in the VPS block to the same port. PHP-FPM has no
published host port. The database remains external to this Compose stack.

Before switching from the host deployment, preserve any existing files in
`back/storage`. After building the images and before running migrations, import
them once into the new volume from the existing production workspace:

```sh
docker compose -f docker-compose.prod.yml run --rm --no-deps \
  --entrypoint sh -v "$PWD/back/storage:/legacy-storage:ro" app \
  -c 'cp -a /legacy-storage/. storage/ && chown -R www-data:www-data storage'
```

Disable the previous host cron entry for `artisan schedule:run` when enabling the
container scheduler, so notifications are sent only once. Do not use
`docker compose down --volumes` on this stack unless you intend to delete its
persistent storage.

## Deployment

The Jenkins pipeline injects both environment files, builds production images,
runs `php artisan migrate --force` in a one-off container, then recreates the
services and waits for their health checks. A failed build or migration stops the
pipeline before the running services are replaced. Database migrations should be
compatible with the previous application version during this transition.

For a manual deployment, provide `back/.env` and `front/.env` as above, then run:

```sh
export COMPOSE_FILE=docker-compose.prod.yml
export FRONTEND_ENV_HASH="$(sha256sum front/.env | cut -d ' ' -f 1)"
docker compose config --quiet
docker compose build --pull app web
docker compose run --rm --no-deps app php artisan migrate --force --no-interaction
docker compose up -d --no-build --force-recreate --wait --wait-timeout 120 app web scheduler
docker compose ps
```

Check `http://127.0.0.1:8002/`, a frontend history route, and an authenticated
`/v1/` API request after deployment. `/healthz` checks Nginx; the app health check
checks the FPM listener. Database connectivity is checked by the migration step.
For service logs, run `docker compose -f docker-compose.prod.yml logs --tail=100`;
Lumen's file logs remain under `storage/logs` in the storage volume.
