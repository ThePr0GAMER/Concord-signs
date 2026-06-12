# 🚀 How to Publish Concord Signs & Graphics Website

This guide walks you through deploying the site on **Netlify** (free) and connecting your **GoDaddy** domain.

---

## Step 1 — Prepare Your Files

Everything is already in the `concord-signs-website.zip` file. Just unzip it somewhere on your computer.

---

## Step 2 — Deploy to Netlify (Free)

1. Go to **[https://app.netlify.com](https://app.netlify.com)** and click **"Sign up"** (GitHub, GitLab, or email — all free).
2. Once logged in, click the **"Sites"** tab, then click **"Add new site" → "Deploy manually"** (drag & drop).
3. **Drag and drop** the unzipped `concord-signs-website` folder onto the dashed drop zone.
4. Netlify uploads it. After a few seconds you'll see a random Netlify URL like `https://bright-scone-abc123.netlify.app`.
5. Click that URL — your site is live!

> **To update later:** just drag & drop the whole folder again — Netlify replaces the old version.

---

## Step 3 — Connect Your GoDaddy Domain

### 3a. Tell Netlify about your domain

1. In Netlify, go to **"Site settings"** → **"Domain management"** → **"Add custom domain"**.
2. Type your domain (e.g. `concordsigns.com`) and click **"Verify"** then **"Add domain"**.
3. Netlify will tell you the domain needs DNS changes — **keep this tab open**.

### 3b. Update DNS in GoDaddy

1. Log into your **GoDaddy account** → **"My Products"** → **DNS** (next to your domain).
2. **Delete** any existing `A` records and `CNAME` records (unless you need them for email — keep those).
3. Add these **three `A` records** (Netlify's load balancers):

   | Type | Name | Value |
   |------|------|-------|
   | A    | @    | `75.2.60.5` |
   | A    | @    | `99.83.190.102` |

4. Add this **`CNAME` record**:

   | Type  | Name | Value |
   |-------|------|-------|
   | CNAME | www  | `your-site-name.netlify.app` |

   > Replace `your-site-name.netlify.app` with the actual Netlify URL from Step 2 (e.g. `bright-scone-abc123.netlify.app`).

5. Click **"Save"**. DNS changes can take **15 minutes to 48 hours** to propagate.

### 3c. SSL Certificate

Netlify automatically provisions a free SSL certificate (HTTPS) for your custom domain. It usually appears within 15 minutes of DNS propagating.

---

## Step 4 — Done!

Once DNS propagates:
- **`https://concordsigns.com`** → your site
- **`https://www.concordsigns.com`** → redirects to the main domain

Netlify handles HTTPS automatically.

---

## Quick Reference

| Task | Where |
|------|-------|
| Upload site | [app.netlify.com](https://app.netlify.com) → Deploy manually |
| Connect domain | Netlify site settings → Domain management |
| DNS records | GoDaddy → My Products → DNS |
| Update site | Re-drag-drop the folder on Netlify |

---

## Need Help?

- **Netlify Docs:** [docs.netlify.com](https://docs.netlify.com)
- **GoDaddy DNS Help:** [godaddy.com/help](https://godaddy.com/help)
- **Concord Signs Business Phone:** (313) 366-5566