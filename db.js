// FleetTrack Pro - Mining Truck Fleet & Diesel Expense Engine
// Clean Dummy / Demo Dataset for Public Demo and GitHub Pages

const DB_KEY = 'FLEET_BILLING_SYSTEM_DATA_DUMMY_V1';

// Demo slip image
const USER_SLIP_IMAGE = 'sample_weighment_slip.jpg';

const DEFAULT_FLEET_DATA = {
  config: {
    transporterName: 'Apex Mining & Logistics Services',
    ownerName: 'Demo Fleet Admin',
    headOffice: 'Plot No. 104, Industrial Mining Zone, Sector 4, Gandhidham, Gujarat - 370201',
    phone: '+91 98765 43210 / +91 98765 00000',
    gstin: '24AABCA1234F1Z5',
    defaultTruckNo: 'GJ12XY9081',
    defaultWeighbridgeRate: 100, // Standard ₹100 per slip
    dieselRate: 92.50,
    currencySymbol: '₹',
    themeMode: 'dark',
    themeAccent: 'amber'
  },

  // Fleet Trucks
  trucks: [
    { truckNo: 'GJ12XY9081', model: 'Mining Haulage Tipper (12-Wheeler)', tareWeight: 15.20, capacityMT: 42, driverName: 'Rajesh Kumar', driverPhone: '9876500001', status: 'Active' },
    { truckNo: 'GJ12AB4052', model: 'Heavy Duty Dumper (10-Wheeler)', tareWeight: 14.50, capacityMT: 38, driverName: 'Vikram Singh', driverPhone: '9876500002', status: 'Active' },
    { truckNo: 'GJ12CD1199', model: 'Multi-Axle Mining Tipper (14-Wheeler)', tareWeight: 16.00, capacityMT: 45, driverName: 'Mahesh Sharma', driverPhone: '9876500003', status: 'Active' }
  ],

  // Frequent Companies / Clients
  companies: [
    'ALPHA MINERALS CORP',
    'BLUE PEAK CERAMICS',
    'CREST CEMENT LTD',
    'DELTA BENTOCLAY',
    'EVEREST INDUSTRIAL',
    'HORIZON MINING CORP'
  ],

  // Common Loading & Unloading addresses
  loadingAddresses: [
    'PITHEAD SECTOR-A',
    'MINE QUARRY-4',
    'STOCKYARD NORTH',
    'EXTRACTION ZONE-B',
    'CENTRAL CRUSHER'
  ],

  unloadingAddresses: [
    'PROCESSING PLANT-1',
    'CEMENT GRINDING MILL',
    'PORT CARGO TERMINAL',
    'EXPORT REFINERY',
    'INDUSTRIAL SILO'
  ],

  // Known Weighbridges
  weighbridges: [
    { name: 'APEX ELECTRONIC WEIGHBRIDGE (100T)', shortName: 'APEX', charge: 100 },
    { name: 'DELTA SCALES', shortName: 'DELTA', charge: 100 },
    { name: 'PRIME WEIGHBRIDGE', shortName: 'PRIME', charge: 100 },
    { name: 'METRO WEIGHBRIDGE', shortName: 'METRO', charge: 100 }
  ],

  // Dummy Fleet Trips
  trips: [
    // --- NOVEMBER 2026 (MATCHING DUMMY WEIGHMENT SLIP) ---
    {
      id: 'TRP-50101',
      serialNo: '50101',
      date: '2026-11-05',
      time: '18:40',
      truckNo: 'GJ12XY9081',
      companyName: 'ALPHA MINERALS CORP',
      loadingAddress: 'PITHEAD SECTOR-A',
      unloadingAddress: 'PROCESSING PLANT-1',
      material: 'BENTONITE',
      grossWeightKg: 56200,
      tareWeightKg: 15200,
      netWeightKg: 41000,
      truckTon: 41.00,
      tonRate: 240,
      totalAmount: 9840.00,
      loaderName: 'APEX LOADER',
      loaderRs: 0,
      weighbridgeName: 'APEX',
      weighbridgeRs: 100,
      dieselLtrs: 35.0,
      dieselRate: 92.50,
      dieselTotal: 3237.50,
      driverRs: 400,
      maintenanceRs: 0,
      slipPhoto: USER_SLIP_IMAGE,
      ocrVerified: true,
      remarks: 'Demo Weighment Slip Auto-Extracted #50101'
    },
    {
      id: 'TRP-50102',
      serialNo: '50102',
      date: '2026-11-05',
      time: '22:15',
      truckNo: 'GJ12XY9081',
      companyName: 'BLUE PEAK CERAMICS',
      loadingAddress: 'MINE QUARRY-4',
      unloadingAddress: 'CEMENT GRINDING MILL',
      material: 'LIMESTONE',
      grossWeightKg: 55400,
      tareWeightKg: 15200,
      netWeightKg: 40200,
      truckTon: 40.20,
      tonRate: 250,
      totalAmount: 10050.00,
      loaderName: 'APEX LOADER',
      loaderRs: 0,
      weighbridgeName: 'APEX',
      weighbridgeRs: 100,
      dieselLtrs: 38.0,
      dieselRate: 92.50,
      dieselTotal: 3515.00,
      driverRs: 400,
      maintenanceRs: 0,
      slipPhoto: USER_SLIP_IMAGE,
      ocrVerified: true,
      remarks: 'Demo Slip #50102'
    },
    {
      id: 'TRP-50103',
      serialNo: '50103',
      date: '2026-11-04',
      time: '14:30',
      truckNo: 'GJ12XY9081',
      companyName: 'CREST CEMENT LTD',
      loadingAddress: 'STOCKYARD NORTH',
      unloadingAddress: 'PORT CARGO TERMINAL',
      material: 'CLAY',
      grossWeightKg: 57500,
      tareWeightKg: 15200,
      netWeightKg: 42300,
      truckTon: 42.30,
      tonRate: 220,
      totalAmount: 9306.00,
      loaderName: 'PRIME',
      loaderRs: 0,
      weighbridgeName: 'PRIME',
      weighbridgeRs: 100,
      dieselLtrs: 40.0,
      dieselRate: 92.50,
      dieselTotal: 3700.00,
      driverRs: 400,
      maintenanceRs: 0,
      ocrVerified: true,
      remarks: 'Verified receiving slip'
    },
    {
      id: 'TRP-50104',
      serialNo: '50104',
      date: '2026-11-03',
      time: '10:20',
      truckNo: 'GJ12AB4052',
      companyName: 'DELTA BENTOCLAY',
      loadingAddress: 'EXTRACTION ZONE-B',
      unloadingAddress: 'EXPORT REFINERY',
      material: 'BENTONITE',
      grossWeightKg: 52100,
      tareWeightKg: 14500,
      netWeightKg: 37600,
      truckTon: 37.60,
      tonRate: 260,
      totalAmount: 9776.00,
      loaderName: 'DELTA',
      loaderRs: 300,
      weighbridgeName: 'DELTA',
      weighbridgeRs: 100,
      dieselLtrs: 36.0,
      dieselRate: 92.50,
      dieselTotal: 3330.00,
      driverRs: 400,
      maintenanceRs: 0,
      ocrVerified: true,
      remarks: 'Normal delivery'
    },

    // --- OCTOBER 2026 DUMMY SAMPLES ---
    { id: 'OCT-01', serialNo: '49821', date: '2026-10-28', truckNo: 'GJ12XY9081', companyName: 'ALPHA MINERALS CORP', loadingAddress: 'PITHEAD SECTOR-A', unloadingAddress: 'PROCESSING PLANT-1', truckTon: 41.50, tonRate: 240, totalAmount: 9960.00, loaderName: '', loaderRs: 0, weighbridgeName: 'APEX', weighbridgeRs: 100, dieselLtrs: 35.0, dieselRate: 92.50, dieselTotal: 3237.50, driverRs: 400, maintenanceRs: 0 },
    { id: 'OCT-02', serialNo: '49822', date: '2026-10-25', truckNo: 'GJ12XY9081', companyName: 'EVEREST INDUSTRIAL', loadingAddress: 'CENTRAL CRUSHER', unloadingAddress: 'INDUSTRIAL SILO', truckTon: 40.80, tonRate: 230, totalAmount: 9384.00, loaderName: '', loaderRs: 0, weighbridgeName: 'METRO', weighbridgeRs: 100, dieselLtrs: 34.0, dieselRate: 92.50, dieselTotal: 3145.00, driverRs: 400, maintenanceRs: 0 },
    { id: 'OCT-03', serialNo: '49823', date: '2026-10-20', truckNo: 'GJ12AB4052', companyName: 'BLUE PEAK CERAMICS', loadingAddress: 'MINE QUARRY-4', unloadingAddress: 'CEMENT GRINDING MILL', truckTon: 36.90, tonRate: 250, totalAmount: 9225.00, loaderName: '', loaderRs: 0, weighbridgeName: 'APEX', weighbridgeRs: 100, dieselLtrs: 32.0, dieselRate: 92.50, dieselTotal: 2960.00, driverRs: 400, maintenanceRs: 0 },
    { id: 'OCT-04', serialNo: '49824', date: '2026-10-15', truckNo: 'GJ12XY9081', companyName: 'HORIZON MINING CORP', loadingAddress: 'STOCKYARD NORTH', unloadingAddress: 'PORT CARGO TERMINAL', truckTon: 42.10, tonRate: 220, totalAmount: 9262.00, loaderName: '', loaderRs: 0, weighbridgeName: 'PRIME', weighbridgeRs: 100, dieselLtrs: 38.0, dieselRate: 92.50, dieselTotal: 3515.00, driverRs: 400, maintenanceRs: 0 },

    // --- JUNE 2026 DUMMY SAMPLES ---
    { id: 'JUN-01', serialNo: '48201', date: '2026-06-12', truckNo: 'GJ12XY9081', companyName: 'ALPHA MINERALS CORP', loadingAddress: 'PITHEAD SECTOR-A', unloadingAddress: 'PROCESSING PLANT-1', truckTon: 41.20, tonRate: 240, totalAmount: 9888.00, loaderName: '', loaderRs: 0, weighbridgeName: 'APEX', weighbridgeRs: 100, dieselLtrs: 35.0, dieselRate: 92.50, dieselTotal: 3237.50, driverRs: 400, maintenanceRs: 0 },
    { id: 'JUN-02', serialNo: '48202', date: '2026-06-18', truckNo: 'GJ12XY9081', companyName: 'CREST CEMENT LTD', loadingAddress: 'STOCKYARD NORTH', unloadingAddress: 'PORT CARGO TERMINAL', truckTon: 42.00, tonRate: 220, totalAmount: 9240.00, loaderName: '', loaderRs: 0, weighbridgeName: 'PRIME', weighbridgeRs: 100, dieselLtrs: 39.0, dieselRate: 92.50, dieselTotal: 3607.50, driverRs: 400, maintenanceRs: 0 },

    // --- MAY 2026 DUMMY SAMPLES ---
    { id: 'MAY-01', serialNo: '46110', date: '2026-05-10', truckNo: 'GJ12XY9081', companyName: 'DELTA BENTOCLAY', loadingAddress: 'EXTRACTION ZONE-B', unloadingAddress: 'EXPORT REFINERY', truckTon: 40.50, tonRate: 260, totalAmount: 10530.00, loaderName: '', loaderRs: 0, weighbridgeName: 'APEX', weighbridgeRs: 100, dieselLtrs: 37.0, dieselRate: 92.50, dieselTotal: 3422.50, driverRs: 400, maintenanceRs: 0 },
    { id: 'MAY-02', serialNo: '46111', date: '2026-05-22', truckNo: 'GJ12AB4052', companyName: 'BLUE PEAK CERAMICS', loadingAddress: 'MINE QUARRY-4', unloadingAddress: 'CEMENT GRINDING MILL', truckTon: 37.20, tonRate: 250, totalAmount: 9300.00, loaderName: '', loaderRs: 0, weighbridgeName: 'DELTA', weighbridgeRs: 100, dieselLtrs: 33.0, dieselRate: 92.50, dieselTotal: 3052.50, driverRs: 400, maintenanceRs: 0 },

    // --- FEBRUARY 2026 DUMMY SAMPLES ---
    { id: 'FEB-01', serialNo: '44010', date: '2026-02-14', truckNo: 'GJ12XY9081', companyName: 'ALPHA MINERALS CORP', loadingAddress: 'PITHEAD SECTOR-A', unloadingAddress: 'PROCESSING PLANT-1', truckTon: 41.80, tonRate: 240, totalAmount: 10032.00, loaderName: '', loaderRs: 0, weighbridgeName: 'APEX', weighbridgeRs: 100, dieselLtrs: 35.0, dieselRate: 92.50, dieselTotal: 3237.50, driverRs: 400, maintenanceRs: 0 },
    { id: 'FEB-02', serialNo: '44011', date: '2026-02-25', truckNo: 'GJ12XY9081', companyName: 'EVEREST INDUSTRIAL', loadingAddress: 'CENTRAL CRUSHER', unloadingAddress: 'INDUSTRIAL SILO', truckTon: 40.10, tonRate: 230, totalAmount: 9223.00, loaderName: '', loaderRs: 0, weighbridgeName: 'METRO', weighbridgeRs: 100, dieselLtrs: 36.0, dieselRate: 92.50, dieselTotal: 3330.00, driverRs: 400, maintenanceRs: 0 },

    // --- JANUARY 2026 DUMMY SAMPLES ---
    { id: 'JAN-01', serialNo: '42001', date: '2026-01-08', truckNo: 'GJ12XY9081', companyName: 'CREST CEMENT LTD', loadingAddress: 'STOCKYARD NORTH', unloadingAddress: 'PORT CARGO TERMINAL', truckTon: 42.50, tonRate: 220, totalAmount: 9350.00, loaderName: '', loaderRs: 0, weighbridgeName: 'APEX', weighbridgeRs: 100, dieselLtrs: 40.0, dieselRate: 92.50, dieselTotal: 3700.00, driverRs: 400, maintenanceRs: 0 },
    { id: 'JAN-02', serialNo: 'MAINT-01', date: '2026-01-18', truckNo: 'GJ12XY9081', companyName: 'FLEET MAINTENANCE', loadingAddress: 'CENTRAL WORKSHOP', unloadingAddress: 'PERIODIC SERVICE & FILTER CHANGE', truckTon: 0, tonRate: 0, totalAmount: 0, loaderName: '', loaderRs: 0, weighbridgeName: '', weighbridgeRs: 0, dieselLtrs: 0, dieselRate: 0, dieselTotal: 0, driverRs: 0, maintenanceRs: 4500, remarks: 'Scheduled 50,000 KM Mobil oil and air filter replacement' }
  ]
};

// Database API
const FleetDB = {
  get: function() {
    try {
      const stored = localStorage.getItem(DB_KEY);
      if (!stored) {
        this.save(DEFAULT_FLEET_DATA);
        return JSON.parse(JSON.stringify(DEFAULT_FLEET_DATA));
      }
      return JSON.parse(stored);
    } catch (e) {
      console.warn('Error reading from storage:', e);
      return JSON.parse(JSON.stringify(DEFAULT_FLEET_DATA));
    }
  },

  save: function(data) {
    try {
      localStorage.setItem(DB_KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Storage save failed:', e);
      return false;
    }
  },

  resetToDefault: function() {
    this.save(DEFAULT_FLEET_DATA);
    return JSON.parse(JSON.stringify(DEFAULT_FLEET_DATA));
  },

  addTrip: function(trip) {
    const data = this.get();
    data.trips.unshift(trip);
    this.save(data);
    return trip;
  },

  updateTrip: function(id, updatedFields) {
    const data = this.get();
    const idx = data.trips.findIndex(t => t.id === id);
    if (idx !== -1) {
      data.trips[idx] = { ...data.trips[idx], ...updatedFields };
      this.save(data);
      return data.trips[idx];
    }
    return null;
  },

  deleteTrip: function(id) {
    const data = this.get();
    data.trips = data.trips.filter(t => t.id !== id);
    this.save(data);
  },

  exportJSON: function() {
    return JSON.stringify(this.get(), null, 2);
  },

  importJSON: function(jsonStr) {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.trips && parsed.config) {
        this.save(parsed);
        return { success: true };
      }
      return { success: false, error: 'Invalid file format' };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
};
