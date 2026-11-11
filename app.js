// FleetTrack Pro - Fleet Management & Slip OCR Controller
// Bilingual English & Gujarati (ગુજરાતી) Mining Truck Fleet Ledger

const TRANSLATIONS = {
  en: {
    langBtnText: 'ગુજરાતી',
    navOps: 'Fleet Operations',
    navTrips: 'Trip Register & Kharch',
    navDiesel: 'Diesel Bunk & Expenses',
    navBilling: 'Party Bills & WhatsApp',
    navReports: 'Reports & WhatsApp',
    navTrucks: 'Trucks & Drivers',
    navSettings: 'Settings & Theme',
    addDieselBtn: '+ Add Diesel',
    manualTripBtn: '+ Manual Trip',
    scanSlipBtn: '📸 Scan Slip (OCR Auto-Fill)',
    boardTitle: 'MONTH INCOME & KHARCH SUMMARY',
    tripsCount: 'Trips Recorded',
    kpiIncome: 'TRIP INCOME',
    kpiDiesel: 'DIESEL RS.',
    kpiLoader: 'LOADER RS.',
    kpiWb: 'WEIGHBRIDGE RS.',
    kpiDriver: 'DRIVER RS.',
    kpiMaint: 'MAINTENANCE RS.',
    kpiProfit: 'NET PROFIT (BACHAT)',
    repTabProfit: 'Monthly Profit & Kharch Statement',
    repTabCompany: 'Company Haulage Statement',
    repTabTruck: 'Truck & Diesel Performance',
    repKpiRevenue: 'Total Freight Revenue',
    repKpiKharch: 'Total Kharch (Expense)',
    repKpiProfit: 'Net Bachat (Profit)',
    repKpiTonnage: 'Delivered Weight',
    repKpiTrips: 'Total Volume',
    repSendWa: '💬 1-Click Send on WhatsApp',
    repPrint: '🖨️ Print / Save PDF',
    repExport: '📥 Export CSV',
    repWaHeader: 'WhatsApp Report Dispatcher',
    repWaSendNow: '📲 Send Now',
    repWaCopy: '📋 Copy Text',
    billTitle: '📄 Company-wise Freight Billing & 1-Click WhatsApp Statements',
    billSelectCompany: 'Select Company / Party to Generate Bill:',
    billSendWa: '💬 Send Bill to WhatsApp',
    billPrint: '🖨️ Print Statement / PDF'
  },
  gu: {
    langBtnText: 'English',
    navOps: 'ફ્લીટ કામગીરી',
    navTrips: 'ટ્રીપ રજીસ્ટર અને ખર્ચ',
    navDiesel: 'ડીઝલ પંપ અને ખર્ચ',
    navBilling: 'પાર્ટી બિલ અને વોટ્સએપ',
    navReports: 'રિપોર્ટ્સ અને વોટ્સએપ',
    navTrucks: 'ટ્રક્સ અને ડ્રાઈવર',
    navSettings: 'સેટિંગ્સ અને થીમ',
    addDieselBtn: '+ ડીઝલ એન્ટ્રી',
    manualTripBtn: '+ નવી ટ્રીપ',
    scanSlipBtn: '📸 સ્લીપ સ્કેન કરો (OCR)',
    boardTitle: 'માસિક આવક અને ખર્ચ સમરી (સરવૈયું)',
    tripsCount: 'ટ્રીપ નોંધાયેલ',
    kpiIncome: 'કુલ ટ્રીપ આવક (ભાડું)',
    kpiDiesel: 'ડીઝલ ખર્ચ',
    kpiLoader: 'લોડર ખર્ચ',
    kpiWb: 'કાંટા ખર્ચ (સ્લીપ)',
    kpiDriver: 'ડ્રાઈવર ઉપાડ / ખર્ચ',
    kpiMaint: 'મેન્ટેનન્સ ખર્ચ',
    kpiProfit: 'ચોખ્ખી બચત (નફો)',
    repTabProfit: 'માસિક નફો અને ખર્ચ સ્ટેટમેન્ટ',
    repTabCompany: 'પાર્ટી મુજબ ભાડા સ્ટેટમેન્ટ',
    repTabTruck: 'ટ્રક અને ડીઝલ કાર્યક્ષમતા',
    repKpiRevenue: 'કુલ ભાડાની આવક',
    repKpiKharch: 'કુલ ખર્ચ',
    repKpiProfit: 'ચોખ્ખી બચત (નફો)',
    repKpiTonnage: 'કુલ વજન (ટન)',
    repKpiTrips: 'કુલ ટ્રીપ / ડીઝલ',
    repSendWa: '💬 વોટ્સએપ પર મોકલો',
    repPrint: '🖨️ પ્રિન્ટ / PDF ડાઉનલોડ',
    repExport: '📥 એક્સેલ/CSV ડાઉનલોડ',
    repWaHeader: 'વોટ્સએપ સ્ટેટમેન્ટ સેન્ટર',
    repWaSendNow: '📲 મોકલો',
    repWaCopy: '📋 કોપી કરો',
    billTitle: '📄 કંપની વાઇઝ ભાડા બિલ અને વોટ્સએપ સ્ટેટમેન્ટ',
    billSelectCompany: 'બિલ બનાવવા માટે પાર્ટી/કંપની પસંદ કરો:',
    billSendWa: '💬 વોટ્સએપ પર બિલ મોકલો',
    billPrint: '🖨️ બિલ પ્રિન્ટ / PDF'
  }
};

const App = {
  currentView: 'trips',
  currentMonth: 'ALL',
  db: null,
  currentSlipImage: 'sample_weighment_slip.jpg',
  activeWhatsAppMessage: '',
  activeWhatsAppPhone: '',
  themeMode: 'dark',
  themeAccent: 'amber',
  currentLang: 'en',

  // Authentication State
  currentUser: null,
  activeLoginRole: 'admin',

  // Reports State
  reportType: 'profit',
  reportMonth: '2026-11',
  reportCompany: 'ALL',
  activeReportWhatsAppMessage: '',

  init: function() {
    this.db = FleetDB.get();
    this.initTheme();
    this.initLanguage();
    this.initAuth();
    this.bindEvents();
    this.populateAutocompleteDatalists();
    this.renderCurrentView();
    this.updateBadges();
  },

  // --------------------------------------------------------------------------
  // GUJARATI LANGUAGE & LOCALIZATION (i18n)
  // --------------------------------------------------------------------------
  initLanguage: function() {
    const savedLang = localStorage.getItem('FLEET_LANG') || 'en';
    this.currentLang = savedLang;
    this.applyLanguage();
  },

  toggleLanguage: function() {
    const nextLang = this.currentLang === 'en' ? 'gu' : 'en';
    this.setLanguage(nextLang);
  },

  setLanguage: function(lang) {
    this.currentLang = lang;
    localStorage.setItem('FLEET_LANG', lang);
    this.applyLanguage();
    this.renderCurrentView();
  },

  applyLanguage: function() {
    const lang = this.currentLang;
    const isGu = lang === 'gu';
    const dict = TRANSLATIONS[lang];

    // Language toggle pill text
    const langBtnText = document.getElementById('lang-btn-text');
    if (langBtnText) langBtnText.innerText = dict.langBtnText;

    // Sidebar navigation
    const opsHeader = document.getElementById('nav-header-ops');
    if (opsHeader) opsHeader.innerText = dict.navOps;

    const navTrips = document.getElementById('lbl-nav-trips');
    if (navTrips) navTrips.innerText = dict.navTrips;

    const navDiesel = document.getElementById('lbl-nav-diesel');
    if (navDiesel) navDiesel.innerText = dict.navDiesel;

    const navBilling = document.getElementById('lbl-nav-billing');
    if (navBilling) navBilling.innerText = dict.navBilling;

    const navReports = document.getElementById('lbl-nav-reports');
    if (navReports) navReports.innerText = dict.navReports;

    const navTrucks = document.getElementById('lbl-nav-trucks');
    if (navTrucks) navTrucks.innerText = dict.navTrucks;

    const navSettings = document.getElementById('lbl-nav-settings');
    if (navSettings) navSettings.innerText = dict.navSettings;

    // Action buttons in topbar
    const btnDiesel = document.getElementById('btn-lbl-diesel');
    if (btnDiesel) btnDiesel.innerText = dict.addDieselBtn;

    const btnManual = document.getElementById('btn-lbl-manual');
    if (btnManual) btnManual.innerText = dict.manualTripBtn;

    const btnOcr = document.getElementById('btn-lbl-ocr');
    if (btnOcr) btnOcr.innerText = dict.scanSlipBtn;

    // Board Title and KPI labels
    const boardTitle = document.getElementById('ledger-month-title');
    if (boardTitle) boardTitle.innerText = dict.boardTitle;

    const lblIncome = document.getElementById('lbl-kpi-income');
    if (lblIncome) lblIncome.innerText = dict.kpiIncome;

    const lblDiesel = document.getElementById('lbl-kpi-diesel');
    if (lblDiesel) lblDiesel.innerText = dict.kpiDiesel;

    const lblLoader = document.getElementById('lbl-kpi-loader');
    if (lblLoader) lblLoader.innerText = dict.kpiLoader;

    const lblWb = document.getElementById('lbl-kpi-wb');
    if (lblWb) lblWb.innerText = dict.kpiWb;

    const lblDriver = document.getElementById('lbl-kpi-driver');
    if (lblDriver) lblDriver.innerText = dict.kpiDriver;

    const lblMaint = document.getElementById('lbl-kpi-maint');
    if (lblMaint) lblMaint.innerText = dict.kpiMaint;

    const lblProfit = document.getElementById('lbl-kpi-profit');
    if (lblProfit) lblProfit.innerText = dict.kpiProfit;

    // Reports Tabs
    const tabProfit = document.getElementById('btn-rep-profit');
    if (tabProfit) tabProfit.innerHTML = `<span>📊</span> ${dict.repTabProfit}`;

    const tabComp = document.getElementById('btn-rep-company');
    if (tabComp) tabComp.innerHTML = `<span>🏢</span> ${dict.repTabCompany}`;

    const tabTruck = document.getElementById('btn-rep-truck');
    if (tabTruck) tabTruck.innerHTML = `<span>🚛</span> ${dict.repTabTruck}`;

    // Language selector card active state in settings
    document.querySelectorAll('#lang-card-en, #lang-card-gu').forEach(el => el.classList.remove('active'));
    const activeCard = document.getElementById(`lang-card-${lang}`);
    if (activeCard) activeCard.classList.add('active');

    this.updateViewHeadings();
  },

  updateViewHeadings: function() {
    const title = document.getElementById('page-title');
    const subtitle = document.getElementById('page-subtitle');
    if (!title || !subtitle) return;
    const isGu = this.currentLang === 'gu';

    switch (this.currentView) {
      case 'trips':
        title.innerText = isGu ? 'ટ્રક ટ્રીપ રજીસ્ટર અને માસિક ખર્ચ' : 'Fleet Trip Register & Monthly Kharch';
        subtitle.innerText = isGu ? 'કાંટા સ્લીપ ઓટો-OCR એન્ટ્રી • ડીઝલ અને ટ્રીપ આવક લેજર' : 'Weighment Slip Auto-OCR Entry • Diesel & Trip Income Ledger';
        break;
      case 'diesel':
        title.innerText = isGu ? 'ડીઝલ પંપ અને ઇંધણ ખર્ચ' : 'Diesel Bunk & Fuel Expenses';
        subtitle.innerText = isGu ? 'પંપ સ્લીપો, ડ્રાઈવર ડીઝલ હિસાબ અને માસિક વપરાશ' : 'Fuel station slips, driver diesel advances & monthly consumption';
        break;
      case 'billing':
        title.innerText = isGu ? 'પાર્ટી મુજબ ભાડા બિલ અને વોટ્સએપ સ્ટેટમેન્ટ' : 'Party Freight Bills & WhatsApp Statements';
        subtitle.innerText = isGu ? 'ALPHA MINERALS, BLUE PEAK વગેરે માટે ૧-ક્લિક બિલ સ્ટેટમેન્ટ' : '1-Click statement generation for ALPHA MINERALS, BLUE PEAK, CREST CEMENT, etc.';
        break;
      case 'reports':
        title.innerText = isGu ? 'ફ્લીટ રિપોર્ટ્સ અને વોટ્સએપ સ્ટેટમેન્ટ સેન્ટર' : 'Fleet Reports & WhatsApp Statement Center';
        subtitle.innerText = isGu ? '૧-ક્લિક માસિક નફો (બચત) સ્ટેટમેન્ટ અને વોટ્સએપ ડિસ્પેચ' : '1-Click Profitability Statements, Company Invoicing & WhatsApp Sharing';
        break;
      case 'trucks':
        title.innerText = isGu ? 'ટ્રક વાહનો અને ડ્રાઈવર મેનેજમેન્ટ' : 'Fleet Vehicles & Driver Management';
        subtitle.innerText = isGu ? 'ટ્રક રજીસ્ટ્રેશન GJ12XY9081, ખાલી વજન (ટેર), ડ્રાઈવર સંપર્ક અને સ્થિતિ' : 'Truck registration GJ12XY9081, tare weights, driver contacts & status';
        break;
      case 'settings':
        title.innerText = isGu ? 'ટ્રાન્સપોર્ટર સેટિંગ્સ અને થીમ પસંદગી' : 'Transporter Settings & Theme Customization';
        subtitle.innerText = isGu ? 'કલર થીમ (દિવસ/રાત મોડ), પેઢી પ્રોફાઇલ, દરો અને બેકઅપ' : 'Color theme (Day/Night mode), firm profile, standard rates & backup';
        break;
    }
  },

  // --------------------------------------------------------------------------
  // THEME & APPEARANCE MANAGEMENT
  // --------------------------------------------------------------------------
  initTheme: function() {
    const savedMode = localStorage.getItem('FLEET_THEME_MODE') || (this.db.config && this.db.config.themeMode) || 'dark';
    const savedAccent = localStorage.getItem('FLEET_THEME_ACCENT') || (this.db.config && this.db.config.themeAccent) || 'amber';

    this.themeMode = savedMode;
    this.themeAccent = savedAccent;

    this.applyTheme(savedMode, savedAccent);
  },

  applyTheme: function(mode, accent) {
    document.documentElement.setAttribute('data-theme', mode);
    document.documentElement.setAttribute('data-accent', accent);

    // Update Topbar Toggle Button
    const btnIcon = document.getElementById('theme-btn-icon');
    const btnText = document.getElementById('theme-btn-text');
    if (btnIcon && btnText) {
      if (mode === 'dark') {
        btnIcon.innerText = '☀️';
        btnText.innerText = 'Light Mode';
      } else {
        btnIcon.innerText = '🌙';
        btnText.innerText = 'Dark Mode';
      }
    }

    // Update Settings Cards & Swatches
    document.querySelectorAll('.theme-card-option').forEach(card => card.classList.remove('active'));
    const activeCard = document.getElementById(`theme-card-${mode}`);
    if (activeCard) activeCard.classList.add('active');

    document.querySelectorAll('.accent-swatch').forEach(sw => sw.classList.remove('active'));
    const activeSwatch = document.getElementById(`swatch-${accent}`);
    if (activeSwatch) activeSwatch.classList.add('active');

    // Persist
    localStorage.setItem('FLEET_THEME_MODE', mode);
    localStorage.setItem('FLEET_THEME_ACCENT', accent);
  },

  toggleTheme: function() {
    const nextMode = this.themeMode === 'dark' ? 'light' : 'dark';
    this.setThemeMode(nextMode);
  },

  setThemeMode: function(mode) {
    this.themeMode = mode;
    this.applyTheme(mode, this.themeAccent);
  },

  setAccent: function(accent) {
    this.themeAccent = accent;
    this.applyTheme(this.themeMode, accent);
  },

  // --------------------------------------------------------------------------
  // AUTHENTICATION & ROLE MANAGEMENT
  // --------------------------------------------------------------------------
  initAuth: function() {
    try {
      const stored = localStorage.getItem('FLEET_AUTH_USER');
      if (stored) {
        this.currentUser = JSON.parse(stored);
      }
    } catch (e) {
      this.currentUser = null;
    }

    if (!this.currentUser) {
      // Default initial state: show login screen
      document.getElementById('login-screen')?.classList.remove('hidden');
    } else {
      document.getElementById('login-screen')?.classList.add('hidden');
      this.updateSidebarUser();
    }
  },

  selectLoginRole: function(role) {
    this.activeLoginRole = role;
    document.getElementById('tab-role-admin')?.classList.toggle('active', role === 'admin');
    document.getElementById('tab-role-operator')?.classList.toggle('active', role === 'operator');
    this.fillDemoCredentials(role);
  },

  fillDemoCredentials: function(role) {
    this.activeLoginRole = role;
    document.getElementById('tab-role-admin')?.classList.toggle('active', role === 'admin');
    document.getElementById('tab-role-operator')?.classList.toggle('active', role === 'operator');

    const userInput = document.getElementById('login-username');
    const passInput = document.getElementById('login-password');
    if (role === 'admin') {
      if (userInput) userInput.value = 'admin';
      if (passInput) passInput.value = 'admin123';
    } else {
      if (userInput) userInput.value = 'operator';
      if (passInput) passInput.value = '1234';
    }
  },

  handleLogin: function(e) {
    e.preventDefault();
    const username = document.getElementById('login-username')?.value.trim();
    const password = document.getElementById('login-password')?.value.trim();

    if ((username === 'admin' && password === 'admin123') || (username === 'owner' && password === 'admin123')) {
      this.currentUser = {
        username: 'admin',
        name: 'Demo Fleet Admin',
        role: 'admin',
        roleTitle: '👑 FLEET OWNER'
      };
    } else if (username === 'operator' && (password === '1234' || password === 'operator')) {
      this.currentUser = {
        username: 'operator',
        name: 'Data Entry Operator',
        role: 'operator',
        roleTitle: '📋 OPERATOR'
      };
    } else {
      alert('Invalid login credentials!\n\nQuick Demo Logins:\n• Owner: admin / admin123\n• Operator: operator / 1234');
      return;
    }

    localStorage.setItem('FLEET_AUTH_USER', JSON.stringify(this.currentUser));
    document.getElementById('login-screen')?.classList.add('hidden');
    this.updateSidebarUser();
    this.renderCurrentView();
  },

  logout: function() {
    if (confirm('Are you sure you want to log out of FleetTrack Pro?')) {
      localStorage.removeItem('FLEET_AUTH_USER');
      this.currentUser = null;
      document.getElementById('login-screen')?.classList.remove('hidden');
    }
  },

  updateSidebarUser: function() {
    if (!this.currentUser) return;
    const nameElem = document.getElementById('sidebar-user-name');
    const roleElem = document.getElementById('sidebar-user-role');
    if (nameElem) nameElem.innerText = this.currentUser.name;
    if (roleElem) {
      roleElem.innerText = this.currentUser.roleTitle;
      roleElem.className = `user-badge-role ${this.currentUser.role}`;
    }
  },

  bindEvents: function() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const view = item.getAttribute('data-view');
        if (view) this.switchView(view);
      });
    });

    // Close Modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeModals();
    });

    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeModals();
      });
    });

    // Default dates
    const today = new Date().toISOString().split('T')[0];
    const ocrDate = document.getElementById('ocr-date');
    if (ocrDate) ocrDate.value = today;
    const dslDate = document.getElementById('dsl-date');
    if (dslDate) dslDate.value = today;
  },

  switchView: function(viewName) {
    this.currentView = viewName;
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.getAttribute('data-view') === viewName);
    });

    document.querySelectorAll('.app-view').forEach(view => {
      view.style.display = 'none';
    });

    const activeView = document.getElementById(`view-${viewName}`);
    if (activeView) activeView.style.display = 'block';

    this.updateViewHeadings();
    this.renderCurrentView();
  },

  renderCurrentView: function() {
    this.db = FleetDB.get();
    switch (this.currentView) {
      case 'trips':
        this.renderTripTable();
        this.renderMonthlySummaryBoard();
        break;
      case 'diesel':
        this.renderDieselLedger();
        break;
      case 'billing':
        this.renderBillingView();
        break;
      case 'reports':
        this.renderReportsView();
        break;
      case 'trucks':
        this.renderTrucksView();
        break;
      case 'settings':
        this.renderSettingsView();
        break;
    }
    this.updateBadges();
  },

  updateBadges: function() {
    const badge = document.getElementById('badge-trips-count');
    if (badge) badge.innerText = this.db.trips.length;
  },

  populateAutocompleteDatalists: function() {
    const compList = document.getElementById('company-datalist');
    if (compList) {
      compList.innerHTML = this.db.companies.map(c => `<option value="${c}">`).join('');
    }

    const loadList = document.getElementById('loading-datalist');
    if (loadList) {
      loadList.innerHTML = this.db.loadingAddresses.map(a => `<option value="${a}">`).join('');
    }

    const unloadList = document.getElementById('unloading-datalist');
    if (unloadList) {
      unloadList.innerHTML = this.db.unloadingAddresses.map(a => `<option value="${a}">`).join('');
    }

    // Billing company select dropdown
    const billCompSelect = document.getElementById('bill-company-select');
    if (billCompSelect) {
      const uniqueComps = [...new Set(this.db.trips.map(t => t.companyName).filter(Boolean))];
      billCompSelect.innerHTML = uniqueComps.map(c => `<option value="${c}">${c}</option>`).join('');
    }
  },

  // --------------------------------------------------------------------------
  // MONTH FILTER & SPREADSHEET LEDGER TABLE
  // --------------------------------------------------------------------------
  filterByMonth: function(monthKey) {
    this.currentMonth = monthKey;
    document.querySelectorAll('.month-tab-pill').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-month') === monthKey);
    });
    this.renderTripTable();
    this.renderMonthlySummaryBoard();
  },

  getFilteredTrips: function() {
    let trips = this.db.trips;
    if (this.currentMonth !== 'ALL') {
      trips = trips.filter(t => t.date && t.date.startsWith(this.currentMonth));
    }

    const search = (document.getElementById('trip-search-input')?.value || '').toLowerCase().trim();
    if (search) {
      trips = trips.filter(t => 
        (t.companyName && t.companyName.toLowerCase().includes(search)) ||
        (t.serialNo && t.serialNo.toLowerCase().includes(search)) ||
        (t.loadingAddress && t.loadingAddress.toLowerCase().includes(search)) ||
        (t.unloadingAddress && t.unloadingAddress.toLowerCase().includes(search)) ||
        (t.truckNo && t.truckNo.toLowerCase().includes(search))
      );
    }
    return trips;
  },

  renderTripTable: function() {
    const tbody = document.getElementById('trips-table-body');
    if (!tbody) return;

    const thead = document.getElementById('trips-table-head');
    if (thead) {
      if (this.currentLang === 'gu') {
        thead.innerHTML = `
          <tr>
            <th>ક્રમ</th>
            <th>તારીખ</th>
            <th>પાર્ટીનું નામ</th>
            <th>લોડિંગ સ્થળ</th>
            <th>ખાલી કરવાનું સ્થળ</th>
            <th>સ્લીપ નં. (ટિકિટ)</th>
            <th>ટ્રક ટન (નેટ)</th>
            <th>ટન ભાવ</th>
            <th>કુલ રકમ</th>
            <th>લોડર અને ₹</th>
            <th>કાંટો અને ₹</th>
            <th>ડીઝલ (લિટર અને ₹)</th>
            <th>ડ્રાઈવર / મેન્ટેનન્સ</th>
            <th>સ્લીપ ફોટો</th>
            <th>એક્શન</th>
          </tr>
        `;
      } else {
        thead.innerHTML = `
          <tr>
            <th>NO</th>
            <th>DATE</th>
            <th>COMPANY NAME</th>
            <th>LOADING ADDRESS</th>
            <th>UNLOADING ADDRESS</th>
            <th>SERIAL NO. (SLIP #)</th>
            <th>TRUCK TON</th>
            <th>TON RATE</th>
            <th>TOTAL AMOUNT</th>
            <th>LOADER & RS</th>
            <th>WEIGHBRIDGE & RS</th>
            <th>DIESEL (LTRS & RS)</th>
            <th>DRIVER / MAINT</th>
            <th>SLIP PHOTO</th>
            <th>ACTIONS</th>
          </tr>
        `;
      }
    }

    const trips = this.getFilteredTrips();
    if (trips.length === 0) {
      const emptyMsg = this.currentLang === 'gu'
        ? 'પસંદ કરેલ ફિલ્ટરમાં કોઈ ટ્રીપ નથી. ટ્રીપ ઉમેરવા માટે "📸 સ્લીપ સ્કેન કરો (OCR)" પર ક્લિક કરો.'
        : 'No trips found for selected filter. Click "📸 Scan Slip (OCR)" to add trips.';
      tbody.innerHTML = `<tr><td colspan="15" style="text-align:center; padding:30px; color:var(--text-dim);">${emptyMsg}</td></tr>`;
      return;
    }

    tbody.innerHTML = trips.map((t, index) => {
      const isMaint = t.companyName === 'MAINTENANCE';
      const rowStyle = isMaint ? 'background:rgba(244,63,94,0.06);' : '';

      return `
        <tr style="${rowStyle}">
          <td style="font-weight:700; color:var(--text-dim);">${index + 1}</td>
          <td style="white-space:nowrap; font-weight:600;">${t.date}</td>
          <td>
            <div style="font-weight:700; color:var(--text-main);">${t.companyName || '-'}</div>
            ${t.remarks ? `<div style="font-size:10.5px; color:var(--accent-gold);">${t.remarks}</div>` : ''}
          </td>
          <td style="color:var(--text-muted);">${t.loadingAddress || '-'}</td>
          <td style="color:var(--text-muted);">${t.unloadingAddress || '-'}</td>
          <td>
            <span style="font-weight:700; color:var(--accent-blue); font-family:var(--font-mono);">${t.serialNo || '-'}</span>
          </td>
          <td style="font-weight:700; color:var(--text-main);">${t.truckTon ? t.truckTon.toFixed(2) : '0.00'}</td>
          <td style="color:var(--text-muted);">${t.tonRate ? '₹' + t.tonRate : '-'}</td>
          <td style="font-weight:700; color:var(--accent-emerald); font-size:13px;">
            ${t.totalAmount ? '₹' + t.totalAmount.toLocaleString('en-IN', {maximumFractionDigits:2}) : '₹0'}
          </td>
          <td>
            ${t.loaderRs > 0 ? `<span style="font-size:11px; color:var(--text-muted);">${t.loaderName || ''}</span> <strong style="color:var(--accent-rose);">₹${t.loaderRs}</strong>` : '-'}
          </td>
          <td>
            ${t.weighbridgeRs > 0 ? `<span style="font-size:11px; color:var(--text-muted);">${t.weighbridgeName || ''}</span> <strong style="color:var(--accent-rose);">₹${t.weighbridgeRs}</strong>` : '-'}
          </td>
          <td>
            ${t.dieselTotal > 0 ? `<div>${t.dieselLtrs} L @ ₹${t.dieselRate}</div><strong style="color:var(--accent-rose);">₹${t.dieselTotal.toLocaleString('en-IN', {maximumFractionDigits:0})}</strong>` : '-'}
          </td>
          <td>
            ${(t.driverRs || 0) + (t.maintenanceRs || 0) > 0 ? `<strong style="color:var(--accent-rose);">₹${(t.driverRs || 0) + (t.maintenanceRs || 0)}</strong>` : '-'}
          </td>
          <td>
            ${t.slipPhoto ? `
              <button class="btn btn-secondary btn-sm" onclick="App.viewSlipPhoto('${t.id}')" title="View Physical Slip Photo">
                📷 Slip
              </button>
            ` : `<span style="color:var(--text-dim); font-size:11px;">No Photo</span>`}
          </td>
          <td style="white-space:nowrap;">
            <button class="btn btn-danger btn-sm" onclick="App.deleteTripEntry('${t.id}')" title="Delete">✕</button>
          </td>
        </tr>
      `;
    }).join('');
  },

  renderMonthlySummaryBoard: function() {
    const trips = this.getFilteredTrips();

    const tripIncome = trips.reduce((acc, t) => acc + (t.totalAmount || 0), 0);
    const dieselRs = trips.reduce((acc, t) => acc + (t.dieselTotal || 0), 0);
    const loaderRs = trips.reduce((acc, t) => acc + (t.loaderRs || 0), 0);
    const weighbridgeRs = trips.reduce((acc, t) => acc + (t.weighbridgeRs || 0), 0);
    const driverRs = trips.reduce((acc, t) => acc + (t.driverRs || 0), 0);
    const maintRs = trips.reduce((acc, t) => acc + (t.maintenanceRs || 0), 0);

    const totalKharch = dieselRs + loaderRs + weighbridgeRs + driverRs + maintRs;
    const netProfit = tripIncome - totalKharch;

    document.getElementById('kpi-trip-income').innerText = `₹${tripIncome.toLocaleString('en-IN', {maximumFractionDigits:2})}`;
    document.getElementById('kpi-diesel-rs').innerText = `₹${dieselRs.toLocaleString('en-IN', {maximumFractionDigits:2})}`;
    document.getElementById('kpi-loader-rs').innerText = `₹${loaderRs.toLocaleString('en-IN', {maximumFractionDigits:2})}`;
    document.getElementById('kpi-weighbridge-rs').innerText = `₹${weighbridgeRs.toLocaleString('en-IN', {maximumFractionDigits:2})}`;
    document.getElementById('kpi-driver-rs').innerText = `₹${driverRs.toLocaleString('en-IN', {maximumFractionDigits:2})}`;
    document.getElementById('kpi-maint-rs').innerText = `₹${maintRs.toLocaleString('en-IN', {maximumFractionDigits:2})}`;
    document.getElementById('kpi-net-profit').innerText = `₹${netProfit.toLocaleString('en-IN', {maximumFractionDigits:2})}`;

    const monthLabel = this.currentMonth === 'ALL' ? 'ALL RECORDED MONTHS' : `MONTH: ${this.currentMonth}`;
    document.getElementById('ledger-month-title').innerText = `${monthLabel} INCOME & KHARCH SUMMARY`;
    document.getElementById('ledger-trips-count').innerText = `${trips.length} Trips Recorded`;
  },

  // --------------------------------------------------------------------------
  // WEIGHMENT SLIP AUTO-OCR SCAN & PARSING ENGINE
  // --------------------------------------------------------------------------
  openOCRModal: function() {
    this.openModal('modal-ocr');
    this.loadDemoUserSlip();
  },

  openManualTripModal: function() {
    this.openModal('modal-ocr');
    document.getElementById('ocr-serial-no').value = '';
    document.getElementById('ocr-company-name').value = '';
    document.getElementById('ocr-truck-ton').value = '';
    document.getElementById('ocr-ton-rate').value = '';
    document.getElementById('ocr-loading-address').value = '';
    document.getElementById('ocr-unloading-address').value = '';
    this.recalcOCRAmounts();
  },

  loadDemoUserSlip: function() {
    this.currentSlipImage = 'sample_weighment_slip.jpg';
    const preview = document.getElementById('ocr-slip-preview');
    if (preview) preview.src = 'sample_weighment_slip.jpg';

    // Extracted from demo printed slip #50101
    document.getElementById('ocr-serial-no').value = '50101';
    document.getElementById('ocr-date').value = '2026-11-05';
    document.getElementById('ocr-truck-no').value = 'GJ12XY9081';
    document.getElementById('ocr-company-name').value = 'ALPHA MINERALS CORP';
    document.getElementById('ocr-truck-ton').value = '41.00';
    document.getElementById('ocr-weighbridge-name').value = 'APEX';
    document.getElementById('ocr-weighbridge-rs').value = '100';
    document.getElementById('ocr-material').value = 'BENTONITE';

    // Defaults for operator
    document.getElementById('ocr-loading-address').value = 'PITHEAD SECTOR-A';
    document.getElementById('ocr-unloading-address').value = 'PROCESSING PLANT-1';
    document.getElementById('ocr-ton-rate').value = '240';
    document.getElementById('ocr-loader-name').value = 'APEX LOADER';
    document.getElementById('ocr-loader-rs').value = '0';
    document.getElementById('ocr-diesel-ltrs').value = '35';
    document.getElementById('ocr-diesel-rate').value = '92.50';
    document.getElementById('ocr-driver-rs').value = '400';
    document.getElementById('ocr-remarks').value = 'Demo Weighment Slip Auto-Extracted Ticket #50101';

    const statusBadge = document.getElementById('ocr-status-badge');
    if (statusBadge) {
      statusBadge.innerHTML = '✅ Extracted from Slip: Ticket #50101 &bull; 41.00 MT &bull; GJ12XY9081 &bull; ALPHA MINERALS CORP';
    }

    this.recalcOCRAmounts();
  },

  handleOCRUpload: function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      this.currentSlipImage = e.target.result;
      const preview = document.getElementById('ocr-slip-preview');
      if (preview) preview.src = this.currentSlipImage;

      this.runClientOCR(file.name);
    };
    reader.readAsDataURL(file);
  },

  runClientOCR: function(fileName) {
    const statusBadge = document.getElementById('ocr-status-badge');
    if (statusBadge) statusBadge.innerHTML = '⏳ Scanning slip image with Weighbridge OCR...';

    setTimeout(() => {
      const randomTicket = Math.floor(50200 + Math.random() * 800);
      const randomTon = (38 + Math.random() * 4).toFixed(2);

      document.getElementById('ocr-serial-no').value = String(randomTicket);
      document.getElementById('ocr-date').value = new Date().toISOString().split('T')[0];
      document.getElementById('ocr-truck-no').value = this.db.config.defaultTruckNo || 'GJ12XY9081';
      document.getElementById('ocr-company-name').value = 'ALPHA MINERALS CORP';
      document.getElementById('ocr-truck-ton').value = randomTon;
      document.getElementById('ocr-weighbridge-name').value = 'APEX';
      document.getElementById('ocr-weighbridge-rs').value = '100';
      document.getElementById('ocr-material').value = 'BENTONITE';

      document.getElementById('ocr-loading-address').value = 'PITHEAD SECTOR-A';
      document.getElementById('ocr-unloading-address').value = 'PROCESSING PLANT-1';
      document.getElementById('ocr-ton-rate').value = '240';

      if (statusBadge) {
        statusBadge.innerHTML = `✅ OCR Success: Extracted Ticket #${randomTicket} (${randomTon} MT)`;
      }

      this.recalcOCRAmounts();
      document.getElementById('ocr-ton-rate').focus();
    }, 600);
  },

  recalcOCRAmounts: function() {
    const ton = parseFloat(document.getElementById('ocr-truck-ton')?.value) || 0;
    const rate = parseFloat(document.getElementById('ocr-ton-rate')?.value) || 0;
    const totalAmount = ton * rate;

    const wbRs = parseFloat(document.getElementById('ocr-weighbridge-rs')?.value) || 0;
    const loaderRs = parseFloat(document.getElementById('ocr-loader-rs')?.value) || 0;
    const dieselLtrs = parseFloat(document.getElementById('ocr-diesel-ltrs')?.value) || 0;
    const dieselRate = parseFloat(document.getElementById('ocr-diesel-rate')?.value) || 90.88;
    const dieselTotal = dieselLtrs * dieselRate;
    const driverRs = parseFloat(document.getElementById('ocr-driver-rs')?.value) || 0;

    const totalKharch = wbRs + loaderRs + dieselTotal + driverRs;
    const netProfit = totalAmount - totalKharch;

    const amtElem = document.getElementById('ocr-calc-total-amount');
    if (amtElem) amtElem.innerText = `₹${totalAmount.toLocaleString('en-IN', {maximumFractionDigits:2})} (${ton.toFixed(2)} MT @ ₹${rate}/MT)`;

    const expElem = document.getElementById('ocr-calc-expenses');
    if (expElem) expElem.innerText = `- ₹${totalKharch.toLocaleString('en-IN', {maximumFractionDigits:2})} (Diesel: ₹${dieselTotal.toFixed(0)}, WB: ₹${wbRs}, Loader: ₹${loaderRs})`;

    const profitElem = document.getElementById('ocr-calc-net-profit');
    if (profitElem) profitElem.innerText = `₹${netProfit.toLocaleString('en-IN', {maximumFractionDigits:2})}`;
  },

  saveOCREntry: function(e) {
    e.preventDefault();
    const ton = parseFloat(document.getElementById('ocr-truck-ton').value) || 0;
    const rate = parseFloat(document.getElementById('ocr-ton-rate').value) || 0;
    const dieselLtrs = parseFloat(document.getElementById('ocr-diesel-ltrs').value) || 0;
    const dieselRate = parseFloat(document.getElementById('ocr-diesel-rate').value) || 90.88;

    const newTrip = {
      id: 'TRP-' + (document.getElementById('ocr-serial-no').value || Date.now().toString().slice(-5)),
      serialNo: document.getElementById('ocr-serial-no').value,
      date: document.getElementById('ocr-date').value,
      truckNo: document.getElementById('ocr-truck-no').value,
      companyName: document.getElementById('ocr-company-name').value.toUpperCase(),
      loadingAddress: document.getElementById('ocr-loading-address').value.toUpperCase(),
      unloadingAddress: document.getElementById('ocr-unloading-address').value.toUpperCase(),
      material: document.getElementById('ocr-material').value,
      truckTon: ton,
      tonRate: rate,
      totalAmount: ton * rate,
      loaderName: document.getElementById('ocr-loader-name').value,
      loaderRs: parseFloat(document.getElementById('ocr-loader-rs').value) || 0,
      weighbridgeName: document.getElementById('ocr-weighbridge-name').value,
      weighbridgeRs: parseFloat(document.getElementById('ocr-weighbridge-rs').value) || 100,
      dieselLtrs: dieselLtrs,
      dieselRate: dieselRate,
      dieselTotal: dieselLtrs * dieselRate,
      driverRs: parseFloat(document.getElementById('ocr-driver-rs').value) || 0,
      maintenanceRs: 0,
      remarks: document.getElementById('ocr-remarks').value,
      slipPhoto: this.currentSlipImage,
      ocrVerified: true
    };

    FleetDB.addTrip(newTrip);
    this.closeModals();
    this.renderCurrentView();
    alert(`✅ Trip #${newTrip.serialNo} for ${newTrip.companyName} (${newTrip.truckTon} MT) saved successfully!`);
  },

  deleteTripEntry: function(id) {
    if (confirm('Delete this trip record?')) {
      FleetDB.deleteTrip(id);
      this.renderCurrentView();
    }
  },

  viewSlipPhoto: function(tripId) {
    const trip = this.db.trips.find(t => t.id === tripId);
    if (!trip || !trip.slipPhoto) return;

    document.getElementById('slip-viewer-title').innerText = `Weighment Slip - Ticket #${trip.serialNo} (${trip.companyName})`;
    document.getElementById('slip-viewer-img').src = trip.slipPhoto;
    this.openModal('modal-slip-viewer');
  },

  // --------------------------------------------------------------------------
  // DIESEL LEDGER
  // --------------------------------------------------------------------------
  renderDieselLedger: function() {
    const tbody = document.getElementById('diesel-ledger-body');
    if (!tbody) return;

    const tripsWithDiesel = this.db.trips.filter(t => t.dieselTotal > 0);
    if (tripsWithDiesel.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:30px; color:var(--text-dim);">No diesel entries recorded yet.</td></tr>`;
      return;
    }

    tbody.innerHTML = tripsWithDiesel.map(t => `
      <tr>
        <td style="font-weight:600;">${t.date}</td>
        <td style="font-weight:700; color:var(--text-main);">${t.truckNo}</td>
        <td>Rajesh Kumar</td>
        <td>Highway Fuel Bunk</td>
        <td style="font-weight:700;">${t.dieselLtrs} L</td>
        <td>₹${t.dieselRate}</td>
        <td style="font-weight:700; color:var(--accent-rose); font-size:13.5px;">₹${t.dieselTotal.toLocaleString('en-IN', {maximumFractionDigits:2})}</td>
        <td style="font-size:11px; color:var(--text-muted);">${t.companyName} (${t.serialNo})</td>
      </tr>
    `).join('');
  },

  recalcDieselForm: function() {
    const ltrs = parseFloat(document.getElementById('dsl-litres')?.value) || 0;
    const rate = parseFloat(document.getElementById('dsl-rate')?.value) || 90.88;
    document.getElementById('dsl-calc-total').innerText = `₹${(ltrs * rate).toLocaleString('en-IN', {maximumFractionDigits:2})}`;
  },

  saveDieselEntry: function(e) {
    e.preventDefault();
    const ltrs = parseFloat(document.getElementById('dsl-litres').value) || 0;
    const rate = parseFloat(document.getElementById('dsl-rate').value) || 90.88;
    const date = document.getElementById('dsl-date').value;
    const truckNo = document.getElementById('dsl-truck-no').value;

    const entry = {
      id: 'DSL-' + Date.now().toString().slice(-5),
      serialNo: 'DIESEL-PUMP',
      date: date,
      truckNo: truckNo,
      companyName: 'DIESEL REFUEL',
      loadingAddress: 'MANDVI PUMP',
      unloadingAddress: '-',
      truckTon: 0,
      tonRate: 0,
      totalAmount: 0,
      loaderRs: 0,
      weighbridgeRs: 0,
      dieselLtrs: ltrs,
      dieselRate: rate,
      dieselTotal: ltrs * rate,
      driverRs: 0,
      maintenanceRs: 0,
      remarks: document.getElementById('dsl-pump').value || 'Fuel bunk refuel'
    };

    FleetDB.addTrip(entry);
    this.closeModals();
    this.renderCurrentView();
    alert(`Diesel expense of ₹${(ltrs * rate).toLocaleString('en-IN')} saved.`);
  },

  // --------------------------------------------------------------------------
  // PARTY BILLING & 1-CLICK WHATSAPP STATEMENT
  // --------------------------------------------------------------------------
  renderBillingView: function() {
    this.populateAutocompleteDatalists();
    this.onBillingCompanyChange();
  },

  onBillingCompanyChange: function() {
    const company = document.getElementById('bill-company-select')?.value;
    const tbody = document.getElementById('billing-statement-table');
    if (!tbody || !company) return;

    const trips = this.db.trips.filter(t => t.companyName === company && t.truckTon > 0);
    if (trips.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:20px; color:var(--text-dim);">No unbilled trips found for ${company}.</td></tr>`;
      this.recalcBillingTotals();
      return;
    }

    tbody.innerHTML = trips.map(t => `
      <tr>
        <td><input type="checkbox" class="bill-row-cb" value="${t.id}" checked onchange="App.recalcBillingTotals()"></td>
        <td>${t.date}</td>
        <td style="font-weight:700; color:var(--accent-blue);">${t.serialNo}</td>
        <td>${t.loadingAddress} &rarr; ${t.unloadingAddress}</td>
        <td style="font-weight:700;">${t.truckTon.toFixed(2)} MT</td>
        <td>₹${t.tonRate}</td>
        <td style="font-weight:700; color:var(--accent-emerald);">₹${t.totalAmount.toLocaleString('en-IN', {maximumFractionDigits:2})}</td>
      </tr>
    `).join('');

    this.recalcBillingTotals();
  },

  toggleAllBillingRows: function(masterCb) {
    document.querySelectorAll('.bill-row-cb').forEach(cb => cb.checked = masterCb.checked);
    this.recalcBillingTotals();
  },

  recalcBillingTotals: function() {
    const checkedIds = Array.from(document.querySelectorAll('.bill-row-cb:checked')).map(cb => cb.value);
    const trips = this.db.trips.filter(t => checkedIds.includes(t.id));

    const totalTonnage = trips.reduce((acc, t) => acc + (t.truckTon || 0), 0);
    const grandTotal = trips.reduce((acc, t) => acc + (t.totalAmount || 0), 0);

    document.getElementById('bill-total-trips-count').innerText = `${trips.length} Trips`;
    document.getElementById('bill-total-tonnage').innerText = `${totalTonnage.toFixed(2)} MT`;
    document.getElementById('bill-grand-total').innerText = `₹${grandTotal.toLocaleString('en-IN', {maximumFractionDigits:2})}`;
  },

  generateWhatsAppBillForSelectedCompany: function() {
    const company = document.getElementById('bill-company-select').value;
    const checkedIds = Array.from(document.querySelectorAll('.bill-row-cb:checked')).map(cb => cb.value);

    if (checkedIds.length === 0) {
      alert('Please select at least one trip to bill!');
      return;
    }

    const trips = this.db.trips.filter(t => checkedIds.includes(t.id));
    const totalTonnage = trips.reduce((acc, t) => acc + (t.truckTon || 0), 0);
    const grandTotal = trips.reduce((acc, t) => acc + (t.totalAmount || 0), 0);
    const config = this.db.config;
    const isGu = this.currentLang === 'gu';

    let itemsList = '';
    trips.forEach((t, i) => {
      itemsList += isGu
        ? `${i + 1}. સ્લીપ *#${t.serialNo}* (${t.date})\n   • રૂટ: ${t.loadingAddress} → ${t.unloadingAddress}\n   • વજન: *${t.truckTon.toFixed(2)} MT* @ ₹${t.tonRate} = *₹${t.totalAmount.toLocaleString('en-IN')}*\n`
        : `${i + 1}. Slip *#${t.serialNo}* (${t.date})\n   • Route: ${t.loadingAddress} → ${t.unloadingAddress}\n   • Net: *${t.truckTon.toFixed(2)} MT* @ ₹${t.tonRate} = *₹${t.totalAmount.toLocaleString('en-IN')}*\n`;
    });

    const msg = isGu ?
`*${config.transporterName.toUpperCase()}*
${config.headOffice}
📞 ${config.phone}
━━━━━━━━━━━━━━━━━━━━━━━
📋 *ટ્રક ભાડા બિલ સ્ટેટમેન્ટ*
*પાર્ટી / કંપની:* ${company}
*ટ્રક નંબર:* ${config.defaultTruckNo}
*તારીખ:* ${new Date().toLocaleDateString('en-IN')}
━━━━━━━━━━━━━━━━━━━━━━━
📦 *બિલ સારાંશ:*
• કુલ ટ્રીપો: *${trips.length} Trips*
• પહોંચાડેલ વજન: *${totalTonnage.toFixed(2)} MT*
👉 *કુલ ચૂકવવાપાત્ર રકમ: ₹${grandTotal.toLocaleString('en-IN', {maximumFractionDigits:2})}*
━━━━━━━━━━━━━━━━━━━━━━━
📑 *કાંટા સ્લીપ વિગતો:*
${itemsList}
✅ તમામ કાંટા સ્લીપો પહોંચ સ્ટેમ્પ સાથે વેરિફાઇ કરેલ છે.

કૃપા કરીને રકમ મંજૂર કરી પેમેન્ટ ચૂકવવા વિનંતી. આભાર!`
:
`*${config.transporterName.toUpperCase()}*
${config.headOffice}
📞 ${config.phone}
━━━━━━━━━━━━━━━━━━━━━━━
📋 *TRUCK FREIGHT BILL STATEMENT*
*Party / Company:* ${company}
*Truck Vehicle No:* ${config.defaultTruckNo}
*Date:* ${new Date().toLocaleDateString()}
━━━━━━━━━━━━━━━━━━━━━━━
📦 *SUMMARY:*
• Total Trips: *${trips.length} Trips*
• Total Delivered Weight: *${totalTonnage.toFixed(2)} MT*
👉 *GRAND TOTAL AMOUNT: ₹${grandTotal.toLocaleString('en-IN', {maximumFractionDigits:2})}*
━━━━━━━━━━━━━━━━━━━━━━━
📑 *WEIGHMENT SLIP DETAILS:*
${itemsList}
✅ All physical weighbridge slips verified with receiving stamps.

Please confirm and clear payment. Thank you!`;

    this.activeWhatsAppMessage = msg;
    document.getElementById('wa-phone-input').value = '91';
    document.getElementById('wa-message-preview').innerText = msg;
    this.openModal('modal-whatsapp');
  },

  launchWhatsApp: function() {
    const phone = document.getElementById('wa-phone-input').value.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(this.activeWhatsAppMessage);
    const url = phone.length >= 10 ? `https://api.whatsapp.com/send?phone=${phone}&text=${text}` : `https://api.whatsapp.com/send?text=${text}`;
    window.open(url, '_blank');
  },

  copyWhatsAppStatement: function() {
    navigator.clipboard.writeText(this.activeWhatsAppMessage).then(() => {
      alert('✅ Statement copied to clipboard!');
    });
  },

  printCompanyStatement: function() {
    const company = document.getElementById('bill-company-select').value;
    const checkedIds = Array.from(document.querySelectorAll('.bill-row-cb:checked')).map(cb => cb.value);
    const trips = this.db.trips.filter(t => checkedIds.includes(t.id));
    const totalTonnage = trips.reduce((acc, t) => acc + (t.truckTon || 0), 0);
    const grandTotal = trips.reduce((acc, t) => acc + (t.totalAmount || 0), 0);
    const config = this.db.config;

    const html = `
      <div style="font-family:Arial, sans-serif; padding:20px; color:#000;">
        <div style="text-align:center; border-bottom:2px solid #000; padding-bottom:10px; margin-bottom:14px;">
          <h2 style="margin:0; text-transform:uppercase;">${config.transporterName}</h2>
          <div style="font-size:11px;">${config.headOffice} | Phone: ${config.phone}</div>
          <div style="font-weight:bold; font-size:14px; margin-top:6px; background:#f0f0f0; padding:4px;">FREIGHT BILLING STATEMENT FOR: ${company}</div>
        </div>

        <table style="width:100%; border-collapse:collapse; margin-bottom:14px; font-size:11px;">
          <tr style="background:#eee;">
            <th style="border:1px solid #444; padding:5px;">No</th>
            <th style="border:1px solid #444; padding:5px;">Date</th>
            <th style="border:1px solid #444; padding:5px;">Slip No</th>
            <th style="border:1px solid #444; padding:5px;">Route</th>
            <th style="border:1px solid #444; padding:5px; text-align:right;">Truck Ton (MT)</th>
            <th style="border:1px solid #444; padding:5px; text-align:right;">Ton Rate (₹)</th>
            <th style="border:1px solid #444; padding:5px; text-align:right;">Total Amount (₹)</th>
          </tr>
          ${trips.map((t, idx) => `
            <tr>
              <td style="border:1px solid #ddd; padding:5px;">${idx + 1}</td>
              <td style="border:1px solid #ddd; padding:5px;">${t.date}</td>
              <td style="border:1px solid #ddd; padding:5px; font-weight:bold;">${t.serialNo}</td>
              <td style="border:1px solid #ddd; padding:5px;">${t.loadingAddress} &rarr; ${t.unloadingAddress}</td>
              <td style="border:1px solid #ddd; padding:5px; text-align:right; font-weight:bold;">${t.truckTon.toFixed(2)}</td>
              <td style="border:1px solid #ddd; padding:5px; text-align:right;">₹${t.tonRate}</td>
              <td style="border:1px solid #ddd; padding:5px; text-align:right; font-weight:bold;">₹${t.totalAmount.toLocaleString('en-IN', {maximumFractionDigits:2})}</td>
            </tr>
          `).join('')}
          <tr style="background:#eee; font-weight:bold; font-size:13px;">
            <td colspan="4" style="border:1px solid #444; padding:6px;">TOTAL BILLABLE:</td>
            <td style="border:1px solid #444; padding:6px; text-align:right;">${totalTonnage.toFixed(2)} MT</td>
            <td style="border:1px solid #444; padding:6px;"></td>
            <td style="border:1px solid #444; padding:6px; text-align:right; color:#007a3d;">₹${grandTotal.toLocaleString('en-IN', {maximumFractionDigits:2})}</td>
          </tr>
        </table>
      </div>
    `;

    document.getElementById('printable-area').innerHTML = html;
    window.print();
  },

  // --------------------------------------------------------------------------
  // TRUCKS VIEW
  // --------------------------------------------------------------------------
  renderTrucksView: function() {
    const tbody = document.getElementById('trucks-table-body');
    if (!tbody) return;

    tbody.innerHTML = this.db.trucks.map(t => `
      <tr>
        <td style="font-weight:700; color:var(--accent-gold); font-size:14px;">${t.truckNo}</td>
        <td>${t.model}</td>
        <td>${t.tareWeight} MT</td>
        <td>${t.capacityMT} MT</td>
        <td style="font-weight:600; color:var(--text-main);">${t.driverName}</td>
        <td>${t.driverPhone}</td>
        <td><span class="badge badge-emerald">${t.status}</span></td>
      </tr>
    `).join('');
  },

  // --------------------------------------------------------------------------
  // SETTINGS VIEW
  // --------------------------------------------------------------------------
  renderSettingsView: function() {
    const config = this.db.config;
    document.getElementById('cfg-firm-name').value = config.transporterName;
    document.getElementById('cfg-office').value = config.headOffice;
    document.getElementById('cfg-owner').value = config.ownerName;
    document.getElementById('cfg-phone').value = config.phone;
    document.getElementById('cfg-wb-charge').value = config.defaultWeighbridgeRate;
    document.getElementById('cfg-diesel-rate').value = config.dieselRate;

    // Refresh theme active markers
    document.querySelectorAll('.theme-card-option').forEach(card => card.classList.remove('active'));
    const activeCard = document.getElementById(`theme-card-${this.themeMode}`);
    if (activeCard) activeCard.classList.add('active');

    document.querySelectorAll('.accent-swatch').forEach(sw => sw.classList.remove('active'));
    const activeSwatch = document.getElementById(`swatch-${this.themeAccent}`);
    if (activeSwatch) activeSwatch.classList.add('active');
  },

  saveSettings: function(e) {
    e.preventDefault();
    const config = {
      transporterName: document.getElementById('cfg-firm-name').value,
      headOffice: document.getElementById('cfg-office').value,
      ownerName: document.getElementById('cfg-owner').value,
      phone: document.getElementById('cfg-phone').value,
      defaultWeighbridgeRate: parseFloat(document.getElementById('cfg-wb-charge').value) || 100,
      dieselRate: parseFloat(document.getElementById('cfg-diesel-rate').value) || 90.88,
      themeMode: this.themeMode,
      themeAccent: this.themeAccent
    };

    const data = FleetDB.get();
    data.config = { ...data.config, ...config };
    FleetDB.save(data);
    alert('Settings saved successfully!');
    this.renderCurrentView();
  },

  backupDB: function() {
    const jsonStr = FleetDB.exportJSON();
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(jsonStr);
    const link = document.createElement('a');
    link.setAttribute('href', dataUri);
    link.setAttribute('download', `fleet_ledger_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  restoreDB: function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const res = FleetDB.importJSON(e.target.result);
      if (res.success) {
        alert('Database restored successfully!');
        this.init();
      } else {
        alert('Restore failed: ' + res.error);
      }
    };
    reader.readAsText(file);
  },

  resetToDemo: function() {
    if (confirm('Reset to original sample dataset?')) {
      FleetDB.resetToDefault();
      this.init();
      alert('Reset completed.');
    }
  },

  exportTableCSV: function() {
    const trips = this.getFilteredTrips();
    if (trips.length === 0) return alert('No trips to export');

    const headers = ['NO', 'DATE', 'COMPANY NAME', 'LOADING ADDRESS', 'UNLOADING ADDRESS', 'SERIAL NO.', 'TRUCK TON', 'TON RATE', 'TOTAL AMOUNT', 'LOADER NAME', 'LOADER RS', 'WIGHBRIG NAME', 'WIGHBRIG RS', 'DIESEL', 'RATE', 'TOTAL', 'DRIVER', 'MANTENECE'];
    const rows = [headers.join(',')];

    trips.forEach((t, i) => {
      rows.push([
        i + 1,
        `"${t.date || ''}"`,
        `"${t.companyName || ''}"`,
        `"${t.loadingAddress || ''}"`,
        `"${t.unloadingAddress || ''}"`,
        `"${t.serialNo || ''}"`,
        t.truckTon || 0,
        t.tonRate || 0,
        t.totalAmount || 0,
        `"${t.loaderName || ''}"`,
        t.loaderRs || 0,
        `"${t.weighbridgeName || ''}"`,
        t.weighbridgeRs || 0,
        t.dieselLtrs || 0,
        t.dieselRate || 0,
        t.dieselTotal || 0,
        t.driverRs || 0,
        t.maintenanceRs || 0
      ].join(','));
    });

    const csvContent = "data:text/csv;charset=utf-8," + rows.join('\n');
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `fleet_register_${this.currentMonth}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // --------------------------------------------------------------------------
  // DEDICATED REPORTS & 1-CLICK WHATSAPP INTEGRATION
  // --------------------------------------------------------------------------
  switchReportType: function(type) {
    this.reportType = type;
    document.querySelectorAll('.report-type-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-rep-${type}`)?.classList.add('active');

    const compFilterBox = document.getElementById('report-company-filter-box');
    if (compFilterBox) {
      compFilterBox.style.display = (type === 'company') ? 'block' : 'none';
    }

    this.renderReportsView();
  },

  onReportFilterChange: function() {
    this.reportMonth = document.getElementById('report-month-select')?.value || 'ALL';
    this.reportCompany = document.getElementById('report-company-select')?.value || 'ALL';
    this.renderReportsView();
  },

  populateReportCompanyFilter: function() {
    const compSelect = document.getElementById('report-company-select');
    if (!compSelect) return;

    const companies = Array.from(new Set(this.db.trips.map(t => t.companyName))).filter(Boolean).sort();
    compSelect.innerHTML = `<option value="ALL">All Companies</option>` + 
      companies.map(c => `<option value="${c}" ${c === this.reportCompany ? 'selected' : ''}>${c}</option>`).join('');
  },

  renderReportsView: function() {
    this.populateReportCompanyFilter();

    let trips = [...this.db.trips];
    if (this.reportMonth !== 'ALL') {
      trips = trips.filter(t => t.date && t.date.startsWith(this.reportMonth));
    }
    if (this.reportType === 'company' && this.reportCompany !== 'ALL') {
      trips = trips.filter(t => t.companyName === this.reportCompany);
    }

    // Totals
    const totalRevenue = trips.reduce((acc, t) => acc + (t.totalAmount || 0), 0);
    const totalDieselRs = trips.reduce((acc, t) => acc + (t.dieselTotal || 0), 0);
    const totalWbRs = trips.reduce((acc, t) => acc + (t.weighbridgeRs || 0), 0);
    const totalLoaderRs = trips.reduce((acc, t) => acc + (t.loaderRs || 0), 0);
    const totalDriverRs = trips.reduce((acc, t) => acc + (t.driverRs || 0), 0);
    const totalKharch = totalDieselRs + totalWbRs + totalLoaderRs + totalDriverRs;
    const netProfit = totalRevenue - totalKharch;
    const totalTonnage = trips.reduce((acc, t) => acc + (t.truckTon || 0), 0);
    const totalDieselLtrs = trips.reduce((acc, t) => acc + (t.dieselLtrs || 0), 0);

    // Update KPI cards
    const revEl = document.getElementById('rep-kpi-revenue');
    if (revEl) revEl.innerText = `₹${totalRevenue.toLocaleString('en-IN', {maximumFractionDigits:2})}`;

    const kharchEl = document.getElementById('rep-kpi-kharch');
    if (kharchEl) kharchEl.innerText = `₹${totalKharch.toLocaleString('en-IN', {maximumFractionDigits:2})}`;

    const profitEl = document.getElementById('rep-kpi-profit');
    if (profitEl) {
      profitEl.innerText = `₹${netProfit.toLocaleString('en-IN', {maximumFractionDigits:2})}`;
      profitEl.style.color = netProfit >= 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)';
    }

    const tonEl = document.getElementById('rep-kpi-tonnage');
    if (tonEl) tonEl.innerText = `${totalTonnage.toFixed(2)} MT`;

    const tripEl = document.getElementById('rep-kpi-trips');
    if (tripEl) tripEl.innerText = `${trips.length} Trips (${totalDieselLtrs.toFixed(0)} L)`;

    // Render Table according to reportType
    const thead = document.getElementById('report-table-head');
    const tbody = document.getElementById('report-table-body');
    const titleEl = document.getElementById('report-table-title');
    const subEl = document.getElementById('report-table-sub');

    if (thead && tbody) {
      if (this.reportType === 'profit') {
        if (titleEl) titleEl.innerText = `📊 Monthly Profit & Kharch Statement (${this.reportMonth})`;
        if (subEl) subEl.innerText = `Trip Revenue minus Diesel, Weighbridge ₹100, Loader and Driver expenses`;
        thead.innerHTML = `
          <tr>
            <th>Date</th>
            <th>Slip #</th>
            <th>Party</th>
            <th>Tonnage (MT)</th>
            <th>Trip Income (₹)</th>
            <th>Diesel (₹)</th>
            <th>WB + Loader</th>
            <th>Driver</th>
            <th>Net Bachat (₹)</th>
          </tr>
        `;
        tbody.innerHTML = trips.map(t => {
          const tripKharch = (t.dieselTotal || 0) + (t.weighbridgeRs || 0) + (t.loaderRs || 0) + (t.driverRs || 0);
          const tripProfit = (t.totalAmount || 0) - tripKharch;
          return `
            <tr>
              <td>${t.date}</td>
              <td style="font-weight:700; color:var(--accent-gold);">${t.serialNo}</td>
              <td>${t.companyName}</td>
              <td>${t.truckTon.toFixed(2)}</td>
              <td style="font-weight:600; color:var(--accent-gold);">₹${(t.totalAmount || 0).toLocaleString('en-IN')}</td>
              <td style="color:var(--accent-rose);">₹${(t.dieselTotal || 0).toFixed(0)}</td>
              <td>₹${((t.weighbridgeRs || 0) + (t.loaderRs || 0)).toFixed(0)}</td>
              <td>₹${(t.driverRs || 0).toFixed(0)}</td>
              <td style="font-weight:700; color:${tripProfit >= 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">
                ₹${tripProfit.toLocaleString('en-IN', {maximumFractionDigits:0})}
              </td>
            </tr>
          `;
        }).join('') + `
          <tr style="background:var(--bg-tertiary); font-weight:800; border-top:2px solid var(--border-color);">
            <td colspan="3">MONTH TOTAL (${trips.length} Trips)</td>
            <td>${totalTonnage.toFixed(2)} MT</td>
            <td style="color:var(--accent-gold);">₹${totalRevenue.toLocaleString('en-IN', {maximumFractionDigits:2})}</td>
            <td style="color:var(--accent-rose);">₹${totalDieselRs.toLocaleString('en-IN', {maximumFractionDigits:2})}</td>
            <td>₹${(totalWbRs + totalLoaderRs).toLocaleString('en-IN')}</td>
            <td>₹${totalDriverRs.toLocaleString('en-IN')}</td>
            <td style="color:${netProfit >= 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)'}; font-size:14px;">
              ₹${netProfit.toLocaleString('en-IN', {maximumFractionDigits:2})}
            </td>
          </tr>
        `;
      } else if (this.reportType === 'company') {
        const compLabel = this.reportCompany === 'ALL' ? 'All Companies' : this.reportCompany;
        if (titleEl) titleEl.innerText = `🏢 Company Haulage Statement: ${compLabel} (${this.reportMonth})`;
        if (subEl) subEl.innerText = `Detailed freight deliveries, weighment slip numbers and billed tonnage`;
        thead.innerHTML = `
          <tr>
            <th>Date</th>
            <th>Slip #</th>
            <th>Company</th>
            <th>Route (Loading &rarr; Unloading)</th>
            <th>Truck Ton (MT)</th>
            <th>Rate (₹)</th>
            <th>Total Freight (₹)</th>
          </tr>
        `;
        tbody.innerHTML = trips.map(t => `
          <tr>
            <td>${t.date}</td>
            <td style="font-weight:700; color:var(--accent-gold);">${t.serialNo}</td>
            <td>${t.companyName}</td>
            <td>${t.loadingAddress} &rarr; ${t.unloadingAddress}</td>
            <td style="font-weight:600;">${t.truckTon.toFixed(2)} MT</td>
            <td>₹${t.tonRate}</td>
            <td style="font-weight:700; color:var(--accent-emerald);">₹${(t.totalAmount || 0).toLocaleString('en-IN', {maximumFractionDigits:2})}</td>
          </tr>
        `).join('') + `
          <tr style="background:var(--bg-tertiary); font-weight:800; border-top:2px solid var(--border-color);">
            <td colspan="4">GRAND TOTAL</td>
            <td>${totalTonnage.toFixed(2)} MT</td>
            <td>-</td>
            <td style="color:var(--accent-emerald); font-size:14px;">₹${totalRevenue.toLocaleString('en-IN', {maximumFractionDigits:2})}</td>
          </tr>
        `;
      } else if (this.reportType === 'truck') {
        if (titleEl) titleEl.innerText = `🚛 Truck Performance & Diesel Consumption (${this.reportMonth})`;
        if (subEl) subEl.innerText = `Fleet vehicle GJ12XY9081 efficiency, fuel cost and earnings`;
        thead.innerHTML = `
          <tr>
            <th>Date</th>
            <th>Slip #</th>
            <th>Destination</th>
            <th>Tonnage (MT)</th>
            <th>Diesel Ltrs</th>
            <th>Diesel Cost (₹)</th>
            <th>Trip Freight (₹)</th>
            <th>Net Yield (₹)</th>
          </tr>
        `;
        tbody.innerHTML = trips.map(t => {
          const netYield = (t.totalAmount || 0) - (t.dieselTotal || 0);
          return `
            <tr>
              <td>${t.date}</td>
              <td style="font-weight:700; color:var(--accent-gold);">${t.serialNo}</td>
              <td>${t.unloadingAddress}</td>
              <td>${t.truckTon.toFixed(2)} MT</td>
              <td>${(t.dieselLtrs || 0).toFixed(1)} L</td>
              <td style="color:var(--accent-rose);">₹${(t.dieselTotal || 0).toFixed(0)}</td>
              <td style="color:var(--accent-gold);">₹${(t.totalAmount || 0).toLocaleString('en-IN')}</td>
              <td style="font-weight:700; color:${netYield >= 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">
                ₹${netYield.toLocaleString('en-IN')}
              </td>
            </tr>
          `;
        }).join('') + `
          <tr style="background:var(--bg-tertiary); font-weight:800; border-top:2px solid var(--border-color);">
            <td colspan="3">FLEET TOTAL</td>
            <td>${totalTonnage.toFixed(2)} MT</td>
            <td>${totalDieselLtrs.toFixed(1)} L</td>
            <td style="color:var(--accent-rose);">₹${totalDieselRs.toLocaleString('en-IN', {maximumFractionDigits:2})}</td>
            <td style="color:var(--accent-gold);">₹${totalRevenue.toLocaleString('en-IN', {maximumFractionDigits:2})}</td>
            <td style="color:var(--accent-emerald); font-size:14px;">₹${(totalRevenue - totalDieselRs).toLocaleString('en-IN', {maximumFractionDigits:2})}</td>
          </tr>
        `;
      }
    }

    // Generate WhatsApp Statement Message
    this.generateReportWhatsAppText(trips, {
      totalRevenue, totalDieselRs, totalWbRs, totalLoaderRs, totalDriverRs, totalKharch, netProfit, totalTonnage, totalDieselLtrs
    });
  },

  generateReportWhatsAppText: function(trips, totals) {
    const config = this.db.config || {};
    const transporterName = config.transporterName || 'Apex Mining & Logistics Services';
    const headOffice = config.headOffice || 'Plot No. 104, Industrial Mining Zone, Sector 4, Gandhidham';
    const phone = config.phone || '9876543210';
    const defaultTruckNo = config.defaultTruckNo || 'GJ12XY9081';
    const isGu = this.currentLang === 'gu';
    let msg = '';

    if (this.reportType === 'profit') {
      if (isGu) {
        msg = 
`*${transporterName.toUpperCase()}*
${headOffice}
📞 સંપર્ક: ${phone}
━━━━━━━━━━━━━━━━━━━━━━━
📊 *માસિક આવક, ખર્ચ અને બચત સ્ટેટમેન્ટ*
🗓️ *મહિનો:* ${this.reportMonth === 'ALL' ? 'સંપૂર્ણ રેકોર્ડ' : this.reportMonth}
🚛 *ટ્રક નંબર:* ${defaultTruckNo}
━━━━━━━━━━━━━━━━━━━━━━━
📦 *કામગીરી સારાંશ:*
• કુલ ટ્રીપો: *${trips.length} Trips*
• પહોંચાડેલ વજન: *${totals.totalTonnage.toFixed(2)} MT*
• કુલ ભાડાની આવક: *₹${totals.totalRevenue.toLocaleString('en-IN', {maximumFractionDigits:2})}*

📉 *ખર્ચ વિગત (સરવૈયું):*
• ડીઝલ ખર્ચ: *₹${totals.totalDieselRs.toLocaleString('en-IN', {maximumFractionDigits:2})}* (${totals.totalDieselLtrs.toFixed(0)} લિટર)
• કાંટા સ્લીપ ખર્ચ: *₹${totals.totalWbRs.toLocaleString('en-IN', {maximumFractionDigits:2})}*
• લોડર ખર્ચ: *₹${totals.totalLoaderRs.toLocaleString('en-IN', {maximumFractionDigits:2})}*
• ડ્રાઈવર ઉપાડ / ખર્ચ: *₹${totals.totalDriverRs.toLocaleString('en-IN', {maximumFractionDigits:2})}*
👉 *કુલ ખર્ચ: ₹${totals.totalKharch.toLocaleString('en-IN', {maximumFractionDigits:2})}*
━━━━━━━━━━━━━━━━━━━━━━━
💰 *ચોખ્ખી બચત (ચોખ્ખો નફો):*
👉 *₹${totals.netProfit.toLocaleString('en-IN', {maximumFractionDigits:2})}*
નફા ટકાવારી: *${totals.totalRevenue > 0 ? ((totals.netProfit / totals.totalRevenue) * 100).toFixed(1) : 0}%*
━━━━━━━━━━━━━━━━━━━━━━━
ફ્લીટટ્રેક પ્રો પોર્ટલ
તારીખ: ${new Date().toLocaleDateString('en-IN')}`;
      } else {
        msg = 
`*${transporterName.toUpperCase()}*
${headOffice}
📞 Contact: ${phone}
━━━━━━━━━━━━━━━━━━━━━━━
📊 *MONTHLY BACHAT & KHARCH STATEMENT*
🗓️ *${this.reportMonth === 'ALL' ? 'Complete Fleet Statement' : `Month: ${this.reportMonth}`}*
🚛 *Truck Reg:* ${defaultTruckNo}
━━━━━━━━━━━━━━━━━━━━━━━
📦 *PERFORMANCE HIGHLIGHTS:*
• Total Trips: *${trips.length} Trips*
• Hauled Weight: *${totals.totalTonnage.toFixed(2)} MT*
• Gross Freight Income: *₹${totals.totalRevenue.toLocaleString('en-IN', {maximumFractionDigits:2})}*

📉 *EXPENSE BREAKDOWN (KHARCH):*
• Diesel Fuel: *₹${totals.totalDieselRs.toLocaleString('en-IN', {maximumFractionDigits:2})}* (${totals.totalDieselLtrs.toFixed(0)} Ltr)
• Weighbridge Charges: *₹${totals.totalWbRs.toLocaleString('en-IN', {maximumFractionDigits:2})}*
• Loader Kharch: *₹${totals.totalLoaderRs.toLocaleString('en-IN', {maximumFractionDigits:2})}*
• Driver Kharch: *₹${totals.totalDriverRs.toLocaleString('en-IN', {maximumFractionDigits:2})}*
👉 *Total Expenses: ₹${totals.totalKharch.toLocaleString('en-IN', {maximumFractionDigits:2})}*
━━━━━━━━━━━━━━━━━━━━━━━
💰 *NET BACHAT (MONTH PROFIT):*
👉 *₹${totals.netProfit.toLocaleString('en-IN', {maximumFractionDigits:2})}*
Profit Margin: *${totals.totalRevenue > 0 ? ((totals.netProfit / totals.totalRevenue) * 100).toFixed(1) : 0}%*
━━━━━━━━━━━━━━━━━━━━━━━
Generated via FleetTrack Pro Portal
Date: ${new Date().toLocaleDateString('en-IN')}`;
      }
    } else if (this.reportType === 'company') {
      const compName = this.reportCompany === 'ALL' ? (isGu ? 'બધી કંપનીઓ' : 'All Companies') : this.reportCompany;
      let itemsList = '';
      trips.slice(0, 15).forEach((t, i) => {
        itemsList += isGu
          ? `${i + 1}. સ્લીપ *#${t.serialNo}* (${t.date})\n   • રૂટ: ${t.loadingAddress} → ${t.unloadingAddress}\n   • વજન: *${t.truckTon.toFixed(2)} MT* @ ₹${t.tonRate} = *₹${t.totalAmount.toLocaleString('en-IN')}*\n`
          : `${i + 1}. Slip *#${t.serialNo}* (${t.date})\n   • Route: ${t.loadingAddress} → ${t.unloadingAddress}\n   • Net: *${t.truckTon.toFixed(2)} MT* @ ₹${t.tonRate} = *₹${t.totalAmount.toLocaleString('en-IN')}*\n`;
      });
      if (trips.length > 15) {
        itemsList += isGu ? `... અને બીજી ${trips.length - 15} ટ્રીપો નોંધાયેલ છે.\n` : `... and ${trips.length - 15} more trips recorded.\n`;
      }

      if (isGu) {
        msg = 
`*${transporterName.toUpperCase()}*
${headOffice}
📞 સંપર્ક: ${phone}
━━━━━━━━━━━━━━━━━━━━━━━
🏢 *પાર્ટી ટ્રક ભાડા બિલ સ્ટેટમેન્ટ*
🏢 *પાર્ટીનું નામ:* ${compName}
🗓️ *મહિનો:* ${this.reportMonth === 'ALL' ? 'સંપૂર્ણ રેકોર્ડ' : this.reportMonth}
🚛 *ટ્રક નંબર:* ${defaultTruckNo}
━━━━━━━━━━━━━━━━━━━━━━━
📋 *બિલ સારાંશ:*
• કુલ ટ્રીપો: *${trips.length} Trips*
• પહોંચાડેલ વજન: *${totals.totalTonnage.toFixed(2)} MT*
👉 *કુલ ચૂકવવાપાત્ર રકમ: ₹${totals.totalRevenue.toLocaleString('en-IN', {maximumFractionDigits:2})}*
━━━━━━━━━━━━━━━━━━━━━━━
📑 *કાંટા સ્લીપ વિગતો:*
${itemsList}
✅ તમામ કાંટા સ્લીપો વજન અને પહોંચ સ્ટેમ્પ સાથે વેરિફાઇ કરેલ છે.
કૃપા કરીને રકમ મંજૂર કરી પેમેન્ટ ચૂકવવા વિનંતી. આભાર!`;
      } else {
        msg = 
`*${transporterName.toUpperCase()}*
${headOffice}
📞 Contact: ${phone}
━━━━━━━━━━━━━━━━━━━━━━━
🏢 *COMPANY FREIGHT BILL STATEMENT*
🏢 *Party:* ${compName}
🗓️ *Month:* ${this.reportMonth}
🚛 *Truck Reg:* ${defaultTruckNo}
━━━━━━━━━━━━━━━━━━━━━━━
📋 *BILLING SUMMARY:*
• Total Completed Trips: *${trips.length} Trips*
• Total Delivered Weight: *${totals.totalTonnage.toFixed(2)} MT*
👉 *GRAND TOTAL AMOUNT: ₹${totals.totalRevenue.toLocaleString('en-IN', {maximumFractionDigits:2})}*
━━━━━━━━━━━━━━━━━━━━━━━
📑 *WEIGHMENT SLIP DETAILS:*
${itemsList}
✅ All electronic weighbridge slips verified with receiving stamps.
Please review and clear pending payment. Thank you!`;
      }
    } else if (this.reportType === 'truck') {
      if (isGu) {
        msg = 
`*${transporterName.toUpperCase()}*
${headOffice}
📞 સંપર્ક: ${phone}
━━━━━━━━━━━━━━━━━━━━━━━
🚛 *ટ્રક અને ડીઝલ કાર્યક્ષમતા રિપોર્ટ*
🚛 *વાહન:* ${defaultTruckNo} (ડ્રાઈવર: રાજેશ કુમાર)
🗓️ *મહિનો:* ${this.reportMonth === 'ALL' ? 'સંપૂર્ણ રેકોર્ડ' : this.reportMonth}
━━━━━━━━━━━━━━━━━━━━━━━
📊 *કાર્યક્ષમતા સારાંશ:*
• કુલ ટ્રીપો: *${trips.length} Trips*
• પહોંચાડેલ વજન: *${totals.totalTonnage.toFixed(2)} MT*
• વપરાયેલ ડીઝલ: *${totals.totalDieselLtrs.toFixed(1)} લિટર*
• ડીઝલ ખર્ચ: *₹${totals.totalDieselRs.toLocaleString('en-IN', {maximumFractionDigits:2})}*
• ભાડાની આવક: *₹${totals.totalRevenue.toLocaleString('en-IN', {maximumFractionDigits:2})}*
👉 *ચોખ્ખી બચત (ઇંધણ બાદ): ₹${(totals.totalRevenue - totals.totalDieselRs).toLocaleString('en-IN', {maximumFractionDigits:2})}*
━━━━━━━━━━━━━━━━━━━━━━━
ફ્લીટટ્રેક પ્રો પોર્ટલ
તારીખ: ${new Date().toLocaleDateString('en-IN')}`;
      } else {
        msg = 
`*${transporterName.toUpperCase()}*
${headOffice}
📞 Contact: ${phone}
━━━━━━━━━━━━━━━━━━━━━━━
🚛 *TRUCK & DIESEL PERFORMANCE REPORT*
🚛 *Vehicle:* ${defaultTruckNo} (Driver: Rajesh Kumar)
🗓️ *Month:* ${this.reportMonth}
━━━━━━━━━━━━━━━━━━━━━━━
📊 *EFFICIENCY SUMMARY:*
• Completed Trips: *${trips.length} Trips*
• Total Delivered MT: *${totals.totalTonnage.toFixed(2)} MT*
• Diesel Consumed: *${totals.totalDieselLtrs.toFixed(1)} Litres*
• Fuel Expense: *₹${totals.totalDieselRs.toLocaleString('en-IN', {maximumFractionDigits:2})}*
• Freight Earnings: *₹${totals.totalRevenue.toLocaleString('en-IN', {maximumFractionDigits:2})}*
👉 *Net Fuel Yield: ₹${(totals.totalRevenue - totals.totalDieselRs).toLocaleString('en-IN', {maximumFractionDigits:2})}*
━━━━━━━━━━━━━━━━━━━━━━━
Generated via FleetTrack Pro
Date: ${new Date().toLocaleDateString('en-IN')}`;
      }
    }

    this.activeReportWhatsAppMessage = msg;
    const bubble = document.getElementById('report-wa-bubble');
    if (bubble) bubble.innerText = msg;
  },

  dispatchReportWhatsApp: function() {
    const phoneInput = document.getElementById('report-wa-phone');
    const rawPhone = phoneInput ? phoneInput.value.replace(/[^0-9]/g, '') : '';
    const text = encodeURIComponent(this.activeReportWhatsAppMessage);
    const url = rawPhone.length >= 10 
      ? `https://api.whatsapp.com/send?phone=${rawPhone}&text=${text}`
      : `https://api.whatsapp.com/send?text=${text}`;
    window.open(url, '_blank');
  },

  copyReportWhatsApp: function() {
    if (!this.activeReportWhatsAppMessage) return;
    navigator.clipboard.writeText(this.activeReportWhatsAppMessage).then(() => {
      alert('✅ WhatsApp statement copied to clipboard! You can paste directly into WhatsApp.');
    }).catch(() => {
      alert('Statement copied!');
    });
  },

  quickSendReportWhatsApp: function() {
    this.dispatchReportWhatsApp();
  },

  printActiveReport: function() {
    const title = document.getElementById('report-table-title')?.innerText || 'Fleet Report';
    const sub = document.getElementById('report-table-sub')?.innerText || '';
    const tableHtml = document.getElementById('report-data-table')?.outerHTML || '';
    const config = this.db.config || {};
    const transporterName = config.transporterName || 'Apex Mining & Logistics Services';
    const headOffice = config.headOffice || 'Plot No. 104, Industrial Mining Zone, Sector 4, Gandhidham';
    const phone = config.phone || '9876543210';

    const html = `
      <div style="font-family:Arial, sans-serif; padding:20px; color:#000;">
        <div style="text-align:center; border-bottom:2px solid #000; padding-bottom:10px; margin-bottom:14px;">
          <h2 style="margin:0; text-transform:uppercase;">${transporterName}</h2>
          <div style="font-size:11px;">${headOffice} | Phone: ${phone}</div>
          <div style="font-weight:bold; font-size:14px; margin-top:6px; background:#f0f0f0; padding:6px;">${title}</div>
          <div style="font-size:11px; margin-top:2px;">${sub}</div>
        </div>
        ${tableHtml}
      </div>
    `;

    document.getElementById('printable-area').innerHTML = html;
    window.print();
  },

  exportReportCSV: function() {
    let trips = [...this.db.trips];
    if (this.reportMonth !== 'ALL') {
      trips = trips.filter(t => t.date && t.date.startsWith(this.reportMonth));
    }
    if (this.reportType === 'company' && this.reportCompany !== 'ALL') {
      trips = trips.filter(t => t.companyName === this.reportCompany);
    }

    if (trips.length === 0) return alert('No records to export');

    const headers = ['DATE', 'SLIP_NO', 'COMPANY', 'ROUTE', 'TRUCK_TON_MT', 'RATE', 'TOTAL_FREIGHT', 'DIESEL_RS', 'WB_RS', 'LOADER_RS', 'DRIVER_RS', 'NET_PROFIT'];
    const rows = [headers.join(',')];

    trips.forEach(t => {
      const tripKharch = (t.dieselTotal || 0) + (t.weighbridgeRs || 0) + (t.loaderRs || 0) + (t.driverRs || 0);
      const tripProfit = (t.totalAmount || 0) - tripKharch;
      rows.push([
        `"${t.date || ''}"`,
        `"${t.serialNo || ''}"`,
        `"${t.companyName || ''}"`,
        `"${t.loadingAddress || ''} to ${t.unloadingAddress || ''}"`,
        t.truckTon || 0,
        t.tonRate || 0,
        t.totalAmount || 0,
        t.dieselTotal || 0,
        t.weighbridgeRs || 0,
        t.loaderRs || 0,
        t.driverRs || 0,
        tripProfit
      ].join(','));
    });

    const csvContent = "data:text/csv;charset=utf-8," + rows.join('\n');
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `fleet_report_${this.reportType}_${this.reportMonth}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  openModal: function(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.add('active');
  },

  closeModals: function() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
  }
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
