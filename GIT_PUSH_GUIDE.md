# 📦 Git Push Guide - Private Repo

## ⚠️ IMPORTANT: Private Repo Only!

File `.env` sudah di-include dalam repo ini karena ini adalah **private repository**.

**JANGAN** push ke public repo dengan `.env` yang berisi credentials!

---

## 🔑 Credentials yang Ada di .env

```env
NEXT_PUBLIC_SUPABASE_URL=https://leiqtoewuntbzjjxbemq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL=postgresql://postgres:branly123@db.leiqtoewuntbzjjxbemq.supabase.co:5432/postgres
```

**Admin Login:**
- Username: `brandly`
- Password: `brandly123`

---

## 📤 Push ke Private Repo

### First Time Setup:
```bash
git init
git add .
git commit -m "Initial commit - Brandly with Supabase integration"
git branch -M main
git remote add origin <your-private-repo-url>
git push -u origin main
```

### Subsequent Pushes:
```bash
git add .
git commit -m "Your commit message"
git push
```

---

## 📋 Files yang Di-commit

✅ **Included** (akan di-push):
- `.env` - Environment variables dengan credentials
- `.env.example` - Template untuk reference
- `supabase-schema.sql` - Database schema
- All source code
- `README.md` - Setup guide

❌ **Excluded** (di-gitignore):
- `node_modules/`
- `.next/`
- `*.log`
- `.DS_Store`
- `.vscode/` (kecuali settings)

---

## 🔒 Security Notes

### Current Setup (Private Repo):
- ✅ `.env` included for easy deployment
- ✅ All credentials in one place
- ✅ Team members can clone and run immediately

### If Going Public:
1. Remove `.env` from repo:
   ```bash
   git rm --cached .env
   ```

2. Update `.gitignore`:
   ```gitignore
   # Uncomment these lines:
   .env
   .env*.local
   ```

3. Use environment variables in deployment platform:
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Build & Deploy → Environment
   - Railway: Project → Variables

---

## 🚀 Deployment

### Vercel (Recommended):
```bash
npm install -g vercel
vercel
```

Environment variables akan otomatis terdeteksi dari `.env`

### Manual Deployment:
1. Clone repo
2. `npm install`
3. Setup database: Run `supabase-schema.sql`
4. `npm run build`
5. `npm start`

---

## 📝 Checklist Before Push

- [ ] `.env` file ada dan lengkap
- [ ] `supabase-schema.sql` updated
- [ ] `README.md` updated
- [ ] All features tested locally
- [ ] Build successful (`npm run build`)
- [ ] Repo is **PRIVATE** ⚠️

---

## 🔄 Clone & Setup (for team members)

```bash
# 1. Clone repo
git clone <your-private-repo-url>
cd brandy

# 2. Install dependencies
npm install

# 3. Setup database (one time)
# Run supabase-schema.sql in Supabase Dashboard

# 4. Run dev server
npm run dev
```

`.env` sudah included, jadi tidak perlu setup environment variables!

---

## 🎯 Quick Commands

```bash
# Check git status
git status

# Add all changes
git add .

# Commit
git commit -m "Your message"

# Push
git push

# Pull latest
git pull

# View .env
cat .env  # Linux/Mac
type .env  # Windows
```

---

**Status**: ✅ Ready to push to private repo!
