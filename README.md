# Restaurant Control Plane – Bootstrap API

## Base URL
http://localhost:3000/

## Bootstrap API

### 1. Default Bootstrap (WEB client)
```bash
curl http://localhost:3000/bootstrap
```

### 2. Bootstrap for POS Client
```bash
curl -H "X-Client-Type: POS" http://localhost:3000/bootstrap
```

### 3. Bootstrap for KIOSK Client
```bash
curl -H "X-Client-Type: KIOSK" http://localhost:3000/bootstrap
```

### 4. Bootstrap for DELIVERY Client
```bash
curl -H "X-Client-Type: DELIVERY" http://localhost:3000/bootstrap
```

###  Any other client
Defaults to WEB
