# 🚛 FleetTrack Pro - Mining Truck Fleet & Diesel Expense Ledger

**FleetTrack Pro** is a zero-dependency, pure frontend mining haulage and fleet billing portal with automated Weighment Slip OCR data entry, diesel tracking, and 1-click WhatsApp statements.

## 🌟 Key Features

1. **Role-Based Authentication**:
   - **👑 Fleet Owner / Admin** (`admin` / `admin123`): Full access to net profit (Bachat), expenses, financial reports, and settings.
   - **📋 Data Entry Operator** (`operator` / `1234`): Fast weighment slip OCR entry and diesel expense logging.
2. **Weighment Slip Auto-OCR Entry**:
   - Auto-extracts Serial/Ticket #, Truck Plate, Net Metric Tonnes (MT), Material, and Weighbridge Fee (₹100).
   - Allows operator to complete Ton Rate, Diesel, and Driver advance.
3. **Monthly Income & Kharch Ledger**:
   - Trip Income = $\sum (\text{Truck Ton} \times \text{Ton Rate})$.
   - Net Bachat (Profit) = $\text{Trip Income} - (\text{Diesel} + \text{Weighbridge} + \text{Loader} + \text{Driver})$.
4. **Dedicated Reports & 1-Click WhatsApp Statement**:
   - Instant WhatsApp formatted statements with bold figures, emojis, and itemized calculations.
   - Send directly to client or partner WhatsApp in one click.
5. **Day / Night Theme Modes & Color Accents**:
   - High-contrast Light Mode for bright daylight cabin use; Low-glare Dark Mode for night shifts.
6. **100% Client-Side & Zero-Setup**:
   - Runs directly in any web browser without Node.js, Python, or external servers.
   - Fully compatible with GitHub Pages hosting.

## 🚀 Running the App

Double-click `start-app.bat` or open `index.html` in your browser.

## 📦 Deploying to GitHub Pages

1. Create a public repository on GitHub (e.g. `mining-fleet-ledger`).
2. Upload `index.html`, `styles.css`, `app.js`, `db.js`, `sample_weighment_slip.jpg`, and `README.md`.
3. Enable GitHub Pages in **Settings &rarr; Pages** (Branch: `main`, `/root`).
4. Live demo URL: `https://<username>.github.io/mining-fleet-ledger/`
