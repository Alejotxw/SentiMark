# SentiMark Backend

API FastAPI que expone en Firestore los mismos datos que hoy vive hardcodeados en `Frontend/src/app/data/mockData.ts`. Sin autenticación ni análisis de sentimiento real todavía — es la capa de datos mínima.

## Setup

1. Crear un proyecto en [Firebase Console](https://console.firebase.google.com/) (o usar uno existente) y habilitar Firestore.
2. En Project Settings > Service accounts, generar una clave privada nueva y guardarla como `Backend/serviceAccountKey.json` (ya está en `.gitignore`, nunca se commitea).
3. Copiar `env.example` a `.env` y ajustar si hace falta.
4. Crear entorno virtual e instalar dependencias:

   ```
   python -m venv .venv
   .venv\Scripts\activate
   pip install -r requirements.txt
   ```

5. (Opcional) Poblar Firestore con los mismos datos que hoy tiene `mockData.ts`:

   ```
   python -m scripts.seed_firestore
   ```

6. Levantar el servidor:

   ```
   uvicorn app.main:app --reload
   ```

   Queda en `http://localhost:8000`. Docs interactivas (Swagger) en `http://localhost:8000/docs`.

## Endpoints

- `GET/POST /api/mentions`, `GET/PUT/DELETE /api/mentions/{id}` — CRUD de menciones (`user`, `avatar`, `content`, `sentiment`, `platform`, `created_at`).
- `GET/PUT /api/metrics/overview` — las 4 tarjetas de `overviewMetrics`.
- `GET/PUT /api/metrics/sentiment-trend` — serie de `sentimentTrendData`.
- `GET/PUT /api/metrics/sentiment-distribution` — `sentimentDistribution`.
- `GET/PUT /api/metrics/topics` — `topicAnalysisData`.
- `GET /health` — healthcheck.

## Pendiente (fuera de alcance de esta versión)

- Autenticación (Firebase Auth) para el login del sidebar.
- Cálculo real de sentimiento (hoy `sentiment` se manda ya calculado al crear una mención).
- Conectar `Frontend/src/app/data/mockData.ts` a estos endpoints — hoy el frontend sigue leyendo el mock local, no se tocó para no romper nada.
