# VPS Nginx project and port audit

This inventory comes from the VPS Nginx configuration supplied for this deployment.
It records configured routes, not a live process or socket inspection. Commented
examples such as `127.0.0.1:9000` are excluded.

| Project / hostnames | Configured upstream or serving method |
| --- | --- |
| `alexanderm.co`, `www.alexanderm.co` | Static files: `/var/lib/jenkins/workspace/softcorp/dist/pwa` |
| `soundhub.alexanderm.co` | `127.0.0.1:8003` |
| `myguardmoney.alexanderm.co` | Workspace files and Unix socket `/var/run/php/php7.4-fpm.sock` |
| `mypipeline.alexanderm.co` | Currently workspace files and the PHP 7.4 Unix socket; replace with `127.0.0.1:8002` for Docker |
| `mandarastore.com`, `www.mandarastore.com` | `127.0.0.1:3000` |
| `back.mandarastore.com` | `127.0.0.1:1337`; `/uploads/` also serves host files |
| `hwc.alexanderm.co`, `homewithchrist.com`, `www.homewithchrist.com` | `127.0.0.1:8004` |
| `menuk.co`, `www.menuk.co` | `127.0.0.1:4000` |
| `admin.menuk.co` | `127.0.0.1:4001` |
| `api.menuk.co` | `127.0.0.1:3001` |
| `db.alexanderm.co` | Adminer files and Unix socket `/run/php/php8.3-fpm.sock` |
| `myturner.co`, `*.myturner.co` | `127.0.0.1:8005` |
| `payment-forwarding.alexanderm.co` | `127.0.0.1:8006` |
| `jenkins.alexanderm.co` | `127.0.0.1:8080` |

The configured TCP upstream ports are **1337, 3000, 3001, 4000, 4001, 8003, 8004,
8005, 8006, and 8080**. Host Nginx owns the shared HTTP/HTTPS ports 80 and 443.
MyPipeline's production Compose stack publishes only `127.0.0.1:8002`; its container
port 80 and PHP-FPM port 9000 remain inside Docker. The development stack also uses
host port 8002 and must not run on that port alongside production on the VPS.

Port **8002 has no configured upstream assignment** in the supplied file. Confirm
it is actually free on the VPS before the first deployment:

```sh
sudo ss -ltnp 'sport = :8002'
docker ps --format 'table {{.Names}}\t{{.Ports}}'
```

If a service already owns it, choose an unused port and change both `APP_PORT` for
Compose and the VPS block's `proxy_pass`. Do not stop another project to free a port.

Replace only MyPipeline's existing HTTPS block using
[`docker/nginx/vps-mypipeline.conf`](../docker/nginx/vps-mypipeline.conf). Its current
direct filesystem and host PHP-FPM configuration does not serve the Docker images.
The replacement preserves its existing TLS certificate paths and security headers,
and forwards the complete URI to the container, which handles the PWA and `/v1/` API.
The shared port-80 redirect for MyPipeline and MyGuardMoney already works for this
setup and should remain. After editing the VPS configuration, validate it before
reloading:

```sh
sudo nginx -t
sudo systemctl reload nginx
```

Use `APP_URL=https://mypipeline.alexanderm.co` in the backend Jenkins credential and
`API_URL=https://mypipeline.alexanderm.co/v1/` in the frontend Jenkins credential.
