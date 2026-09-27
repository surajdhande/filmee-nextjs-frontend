# Deploy Filmee frontend on Google Cloud Run

Deploy the **backend first** and set `NEXT_PUBLIC_API_URL` to that Cloud Run URL. See `../filmee-python-backend/DEPLOY_GOOGLE.md` (or the backend repo’s copy) for the full flow.

```bash
export GCP_PROJECT="your-project-id"
export GCP_REGION="us-central1"
export NEXT_PUBLIC_API_URL="https://your-filmee-api-xxxxx.run.app"

chmod +x scripts/deploy-cloud-run.sh
./scripts/deploy-cloud-run.sh
```

`NEXT_PUBLIC_API_URL` is baked in at **image build** time. If you change the API URL, rebuild and redeploy the frontend.
