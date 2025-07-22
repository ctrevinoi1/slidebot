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

## Step 2: Deploy to Render

### Option A: One-Click Deploy (Easiest!)

1. Edit the `render.yaml` file and replace `YOUR_USERNAME` with your GitHub username
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New +" → "Blueprint"
4. Connect your GitHub repo
5. Render will automatically detect `render.yaml` and create both services!

### Option B: Manual Deploy

If you prefer to deploy manually:

#### Deploy Backend:
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect GitHub and select your repo
4. Configure:
   - **Name**: `slidebot-api`
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node dist/index.js`
5. Add Environment Variables:
   - `AZURE_OPENAI_ENDPOINT`: Your Azure endpoint
   - `AZURE_OPENAI_API_KEY`: Your API key
   - `AZURE_OPENAI_DEPLOYMENT`: Your deployment name
6. Click "Create Web Service"

#### Deploy Frontend:
1. After backend is deployed, copy its URL (e.g., `https://slidebot-api.onrender.com`)
2. Click "New +" → "Static Site"
3. Connect to same repo
4. Configure:
   - **Name**: `slidebot-frontend`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
5. Add Environment Variable:
   - `VITE_API_URL`: Your backend URL from step 1
6. Click "Create Static Site"

## Step 3: You're Live! 🎉

Your app will be available at:
- Frontend: `https://slidebot-frontend.onrender.com`
- Backend API: `https://slidebot-api.onrender.com`

Note: Free tier services sleep after 15 minutes of inactivity, so first load might be slow.

## Troubleshooting

- **"Failed to generate quiz"**: Check your Azure credentials in Render environment variables
- **Frontend can't reach backend**: Ensure `VITE_API_URL` is set correctly
- **Build failures**: Check the Render logs for specific errors

That's it! Your SlideBot is now live and accessible from anywhere! 🚀 