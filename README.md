gcloud builds submit --tag gcr.io/csci571-hw8-amb/hw8
gcloud run deploy --image gcr.io/csci571-hw8-amb/csci571-hw8-amb --platform managed