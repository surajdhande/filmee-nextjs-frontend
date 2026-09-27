#!/usr/bin/env bash
# Deploy Filmee Next.js app to Google Cloud Run.
# Set NEXT_PUBLIC_API_URL to your deployed backend URL (no trailing slash).
set -euo pipefail

: "${GCP_PROJECT:?Set GCP_PROJECT to your Google Cloud project id}"
: "${GCP_REGION:=us-central1}"
: "${NEXT_PUBLIC_API_URL:?Set NEXT_PUBLIC_API_URL to your Cloud Run API URL}"

SERVICE_NAME="${SERVICE_NAME:-filmee-web}"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

gcloud config set project "$GCP_PROJECT"

gcloud services enable run.googleapis.com artifactregistry.googleapis.com cloudbuild.googleapis.com

if ! gcloud artifacts repositories describe filmee --location="$GCP_REGION" &>/dev/null; then
  gcloud artifacts repositories create filmee \
    --repository-format=docker \
    --location="$GCP_REGION" \
    --description="Filmee containers"
fi

IMAGE="${GCP_REGION}-docker.pkg.dev/${GCP_PROJECT}/filmee/${SERVICE_NAME}:latest"

gcloud builds submit \
  --tag "$IMAGE" \
  --build-arg "NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}"

gcloud run deploy "$SERVICE_NAME" \
  --image "$IMAGE" \
  --region "$GCP_REGION" \
  --platform managed \
  --allow-unauthenticated \
  --port 8080 \
  --memory 1Gi

echo ""
echo "Frontend URL:"
gcloud run services describe "$SERVICE_NAME" --region "$GCP_REGION" --format='value(status.url)'
