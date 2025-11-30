# 🚀 Brandly - Setup Guide

## 📋 Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database (WAJIB - Sekali Saja)

**Via Supabase Dashboard:**
1. Buka: https://app.supabase.com/project/leiqtoewuntbzjjxbemq
2. Klik **SQL Editor**
3. Copy semua isi file `supabase-schema.sql`
4. Paste dan klik **Run**

**Via psql (Alternative):**
```bash
psql "postgresql://postgres:branly123@db.leiqtoewuntbzjjxbemq.supabase.co:5432/postgres" -f supabase-schema.sql
```

### 3. Run Development Server
```bash
npm run dev
```

Buka: http://localhost:3000

---

## 🔑 Admin Credentials

**Login URL**: 
- http://localhost:3000/admin/login
- http://localhost:3000/admin (auto redirect)
- http://localhost:3000/login (auto redirect)

**Credentials:**
- Username: `brandly`
- Password: `brandly123`

---

## 📊 Database Info

**Supabase URL**: https://leiqtoewuntbzjjxbemq.supabase.co

**PostgreSQL Connection**:
```
postgresql://postgres:branly123@db.leiqtoewuntbzjjxbemq.supabase.co:5432/postgres
```

**Tables:**
- `orders` - Customer orders
- `admins` - Admin users

---

## ✅ Features

### Customer Side:
- 📝 Order Form (`/order`)
- 🏠 Homepage (`/`)

### Admin Side:
- 🔐 Login (`/admin/login`)
- 📊 Dashboard (`/admin/dashboard`)
  - View all orders
  - Update order status
  - Delete orders
  - Export to CSV
  - Real-time updates
  - WhatsApp integration

---

## 🧪 Testing

1. **Submit Order**: http://localhost:3000/order
2. **Login Admin**: http://localhost:3000/admin
3. **View Dashboard**: Orders should appear
4. **Test Real-time**: Open dashboard in 2 tabs, submit order, see it appear instantly

---

## 🐛 Troubleshooting

### "Username atau password salah"
→ Jalankan SQL schema di Supabase

### Dashboard tidak load orders
→ Cek RLS policies di Supabase
→ Pastikan SQL schema sudah dijalankan

### Real-time tidak working
→ Enable Replication di Supabase Dashboard → Database → Replication

---

## 📁 Project Structure

```
app/
├── admin/
│   ├── login/page.tsx      # Admin login
│   ├── dashboard/page.tsx  # Admin dashboard
│   └── page.tsx            # Redirect to login
├── order/page.tsx          # Order form
├── login/page.tsx          # Redirect to admin login
└── page.tsx                # Homepage

components/
├── order-form.tsx          # Order submission form
└── ui/                     # UI components

lib/
└── supabase.ts             # Supabase client config

supabase-schema.sql         # Database schema
```

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://leiqtoewuntbzjjxbemq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key-here
```

---

## 📝 Notes

- Password disimpan plain text (untuk demo)
- Untuk production, gunakan bcrypt atau Supabase Auth
- RLS policies sudah di-set untuk public access (demo purpose)

---

**Status**: ✅ Ready to use!