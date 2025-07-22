# 🚀 Deploy SlideBot to Render in 5 Minutes (FREE)

Follow these simple steps to get your SlideBot app live on the web!

## Prerequisites
- A GitHub account
- Your Azure OpenAI credentials ready

## Step 1: Push to GitHub

1. Create a new repository on GitHub
2. Push your slidebot code:
   ```bash
   cd slidebot
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/slidebot.git
   git push -u origin main
   ```

## Step 2: Deploy Backend to Render

### Deploy Backend API:
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Blueprint"
3. Connect your GitHub repo (`ctrevinoi1/slidebot`)
4. Render will detect `render.yaml` and create the backend service
5. Add your environment variables when prompted:
   - `AZURE_OPENAI_ENDPOINT`: Your Azure endpoint
   - `AZURE_OPENAI_API_KEY`: Your API key
   - `AZURE_OPENAI_DEPLOYMENT`: Your deployment name
   - `APP_PASSWORD`: Your chosen password for app access
6. Click "Apply" and wait for deployment (~5 minutes)

## Step 3: Deploy Frontend to Render

### Deploy Frontend as Static Site:
1. After backend is deployed, copy its URL (e.g., `https://slidebot-api.onrender.com`)
2. In Render Dashboard, click "New +" → "Static Site"
3. Connect to the same GitHub repo
4. Configure:
   - **Name**: `slidebot-frontend`
   - **Branch**: `main`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
5. Add Environment Variable:
   - Click "Advanced" to show environment variables
   - Add `VITE_API_URL` = `https://slidebot-api.onrender.com` (your backend URL)
6. Click "Create Static Site"

## Step 4: You're Live! 🎉

Your app will be available at:
- Frontend: `https://slidebot-frontend.onrender.com`
- Backend API: `https://slidebot-api.onrender.com`

Note: Free tier services sleep after 15 minutes of inactivity, so first load might be slow.

## Troubleshooting

- **"Failed to generate quiz"**: Check your Azure credentials in Render environment variables
- **"Server configuration error" on login**: Make sure `APP_PASSWORD` is set in backend environment variables
- **Frontend can't reach backend**: Ensure `VITE_API_URL` is set correctly
- **Build failures**: Check the Render logs for specific errors
- **"Not Found" on frontend**: Make sure Root Directory is set to `client` and Publish Directory is `dist`

That's it! Your SlideBot is now live and accessible from anywhere! 🚀 