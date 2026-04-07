-- FleetOps Seed Data — migrated from src/data/mockData.js
-- Run AFTER schema.sql: psql -U postgres -d fleetops -f server/db/seed.sql

-- ─── VEHICLES ────────────────────────────────────────────────────────────────
INSERT INTO vehicles (id, name, type, plate, year, status, driver_id, fuel_level, fuel_capacity, odometer, location, last_ping, speed, engine_temp, next_service, color) VALUES
('VH-001', 'Hino 700 Series',               'Heavy Truck',  'WTR 4821', 2021, 'active',      'DRV-001', 78,  300, 142530, 'PLUS Expressway (E1) KM 312, Rawang, Selangor',            '2026-03-05T08:42:00Z', 90, 91, '2026-03-20', '#f59e0b'),
('VH-002', 'Scania R 500',                  'Heavy Truck',  'JHA 7734', 2022, 'enroute',     'DRV-002', 45,  280,  89210, 'E2 (KL-Seremban) KM 48, Nilai, Negeri Sembilan',           '2026-03-05T08:44:00Z', 85, 94, '2026-04-10', '#06b6d4'),
('VH-003', 'Mitsubishi Fuso Super Great',   'Heavy Truck',  'BDW 2290', 2020, 'idle',        'DRV-003', 92,  300, 221004, 'Depot - Bay 3, Pelabuhan Klang, Selangor',                 '2026-03-05T07:15:00Z',  0, 38, '2026-03-08', '#eab308'),
('VH-004', 'Toyota Hiace Panel Van',        'Cargo Van',    'WPK 5512', 2023, 'active',      'DRV-004', 61,   70,  33780, 'LDP (Lebuhraya Damansara-Puchong) KM 22, Subang Jaya',     '2026-03-05T08:43:00Z', 80, 87, '2026-05-01', '#f59e0b'),
('VH-005', 'Isuzu NPR 75',                  'Medium Truck', 'PBM 8801', 2021, 'maintenance', NULL,       30,  150,  78430, 'Pusat Servis Kenderaan - Bay 1, Shah Alam, Selangor',      '2026-03-04T16:00:00Z',  0, 32, '2026-03-05', '#f97316'),
('VH-006', 'Mercedes-Benz Sprinter 519',    'Cargo Van',    'WMC 3340', 2022, 'active',      'DRV-005', 55,   95,  51220, 'KESAS (E10) KM 15, Shah Alam, Selangor',                   '2026-03-05T08:41:00Z', 95, 89, '2026-06-15', '#f59e0b'),
('VH-007', 'Volvo FH16',                    'Heavy Truck',  'KBF 9920', 2023, 'offline',     'DRV-006', 12,  320,  64800, 'Tidak Diketahui - Isyarat Hilang',                         '2026-03-05T03:18:00Z',  0, 30, '2026-07-22', '#ef4444'),
('VH-008', 'Ford Transit Custom',           'Cargo Van',    'WGT 6631', 2023, 'idle',        'DRV-007', 84,   80,  21450, 'Depot - Bay 7, Petaling Jaya, Selangor',                   '2026-03-05T06:00:00Z',  0, 34, '2026-08-30', '#eab308'),
('VH-009', 'MAN TGX 18.440',               'Heavy Truck',  'AAK 4477', 2020, 'enroute',     'DRV-008', 38,  300, 197660, 'PLUS Expressway (E1) KM 168, Ipoh, Perak',                 '2026-03-05T08:44:00Z', 88, 93, '2026-03-15', '#06b6d4'),
('VH-010', 'Hino 500 Series FC',            'Medium Truck', 'WNR 2201', 2021, 'active',      'DRV-001', 67,  200, 110330, 'MEX (Maju Expressway) KM 8, Putrajaya',                    '2026-03-05T08:40:00Z', 92, 90, '2026-04-28', '#f59e0b');

-- ─── DRIVERS ─────────────────────────────────────────────────────────────────
INSERT INTO drivers (id, name, avatar, phone, email, license, license_expiry, status, vehicle_id, total_trips, total_miles, rating, violations, hire_date) VALUES
('DRV-001', 'Ahmad Farid bin Kamaruddin', 'AF', '+60 12-384 7291', 'ahmad.farid@fleetops.com.my',  'GDL-A', '2027-08-14', 'on-duty',  'VH-001', 312, 148220, 4.8, 0, '2019-03-12'),
('DRV-002', 'Lim Wei Kiat',               'LW', '+60 16-721 0483', 'lim.weikiat@fleetops.com.my',  'GDL-A', '2026-05-30', 'on-duty',  'VH-002', 215,  98400, 4.9, 0, '2020-07-22'),
('DRV-003', 'Mohd Hafizi bin Azman',      'MH', '+60 13-558 3740', 'mohd.hafizi@fleetops.com.my',  'GDL-B', '2025-12-01', 'off-duty', 'VH-003', 441, 203100, 4.6, 1, '2017-11-05'),
('DRV-004', 'Nurul Ain binti Yusof',      'NA', '+60 11-2095 1940','nurul.ain@fleetops.com.my',    'GDL-B', '2028-02-18', 'on-duty',  'VH-004', 180,  44300, 4.7, 0, '2022-01-10'),
('DRV-005', 'Rajesh a/l Subramaniam',     'RS', '+60 17-443 6610', 'rajesh.subra@fleetops.com.my', 'GDL-A', '2027-09-22', 'on-duty',  'VH-006', 267, 122800, 4.5, 2, '2020-04-15'),
('DRV-006', 'Tan Boon Huat',              'TB', '+60 12-966 7880', 'tan.boonhuat@fleetops.com.my', 'GDL-A', '2026-11-09', 'off-duty', 'VH-007', 199,  87600, 4.9, 0, '2021-08-30'),
('DRV-007', 'Selvakumar a/l Muthu',       'SM', '+60 16-310 9240', 'selva.muthu@fleetops.com.my',  'GDL-B', '2027-03-15', 'standby',  'VH-008', 158,  38900, 4.4, 1, '2022-09-01'),
('DRV-008', 'Wong Chee Keong',            'WC', '+60 13-774 1037', 'wong.ckeong@fleetops.com.my',  'GDL-A', '2028-06-25', 'on-duty',  'VH-009', 129,  67400, 5.0, 0, '2023-02-14');

-- ─── TRIPS ───────────────────────────────────────────────────────────────────
INSERT INTO trips (id, vehicle_id, driver_id, origin, destination, start_time, end_time, distance, duration, status, cargo, weight, fuel_used) VALUES
('TRP-2841', 'VH-001', 'DRV-001', 'Pelabuhan Klang, Selangor',        'Butterworth, Pulau Pinang',           '2026-03-05T04:30:00Z', NULL,                    368, NULL, 'in-progress', 'Peralatan Industri',     '18,400 kg', NULL),
('TRP-2840', 'VH-009', 'DRV-008', 'Johor Bahru, Johor',               'Kuala Lumpur, Wilayah Persekutuan',   '2026-03-05T05:00:00Z', NULL,                    362, NULL, 'in-progress', 'Alat Ganti Automotif',   '12,800 kg', NULL),
('TRP-2839', 'VH-002', 'DRV-002', 'Seremban, Negeri Sembilan',         'Kuala Lumpur, Wilayah Persekutuan',   '2026-03-05T06:15:00Z', NULL,                     67, NULL, 'in-progress', 'Barangan Runcit',        '9,600 kg',  NULL),
('TRP-2838', 'VH-006', 'DRV-005', 'Petaling Jaya, Selangor',          'Shah Alam, Selangor',                 '2026-03-05T07:00:00Z', NULL,                     18, NULL, 'in-progress', 'Makanan Sejuk Beku',     '3,200 kg',  NULL),
('TRP-2837', 'VH-010', 'DRV-001', 'Pelabuhan Klang, Selangor',        'Pasir Gudang, Johor',                 '2026-03-05T05:45:00Z', NULL,                    318, NULL, 'in-progress', 'Gegelung Besi Keluli',   '42,000 kg', NULL),
('TRP-2836', 'VH-004', 'DRV-004', 'Subang Jaya, Selangor',            'Kuala Lumpur, Wilayah Persekutuan',   '2026-03-05T07:30:00Z', NULL,                     24, NULL, 'in-progress', 'Komponen Elektronik',    '1,800 kg',  NULL),
('TRP-2835', 'VH-003', 'DRV-003', 'Pelabuhan Klang, Selangor',        'Melaka, Melaka',                      '2026-03-04T18:00:00Z', '2026-03-04T20:15:00Z',  148,  135, 'completed',   'Alat Ganti Mesin',       '6,200 kg',  22),
('TRP-2834', 'VH-008', 'DRV-007', 'Petaling Jaya, Selangor',          'Rawang, Selangor',                    '2026-03-04T14:00:00Z', '2026-03-04T15:45:00Z',   38,  105, 'completed',   'Bekalan Pejabat',        '900 kg',    8),
('TRP-2833', 'VH-001', 'DRV-001', 'Butterworth, Pulau Pinang',        'Kuala Lumpur, Wilayah Persekutuan',   '2026-03-04T08:00:00Z', '2026-03-04T11:20:00Z',  368,  200, 'completed',   'Barangan Pengguna',      '16,000 kg', 68),
('TRP-2832', 'VH-006', 'DRV-005', 'Shah Alam, Selangor',              'Seremban, Negeri Sembilan',           '2026-03-04T09:30:00Z', '2026-03-04T11:15:00Z',   74,  105, 'completed',   'Makanan Dalam Tin',      '5,400 kg',  16),
('TRP-2831', 'VH-007', 'DRV-006', 'Ipoh, Perak',                      'Kuala Lumpur, Wilayah Persekutuan',   '2026-03-04T06:00:00Z', NULL,                    206, NULL, 'cancelled',   'Kayu Balak',             '28,000 kg', NULL),
('TRP-2830', 'VH-002', 'DRV-002', 'Kuala Lumpur, Wilayah Persekutuan','Johor Bahru, Johor',                  '2026-03-03T10:00:00Z', '2026-03-03T14:30:00Z',  362,  270, 'completed',   'Produk Tenusu',          '8,800 kg',  41),
('TRP-2829', 'VH-009', 'DRV-008', 'Kuantan, Pahang',                  'Kuala Lumpur, Wilayah Persekutuan',   '2026-03-03T07:00:00Z', '2026-03-03T10:20:00Z',  258,  200, 'completed',   'Bahan Binaan',           '35,000 kg', 89),
('TRP-2828', 'VH-005', 'DRV-003', 'Shah Alam, Selangor',              'Pelabuhan Klang, Selangor',           '2026-03-03T13:00:00Z', '2026-03-03T14:00:00Z',   32,   60, 'completed',   'Bekalan Perubatan',      '2,200 kg',  31),
('TRP-2827', 'VH-004', 'DRV-004', 'Kuala Lumpur, Wilayah Persekutuan','Kajang, Selangor',                    '2026-03-02T08:00:00Z', '2026-03-02T09:10:00Z',   26,   70, 'completed',   'Komponen Kenderaan',     '4,100 kg',  12);

-- ─── MAINTENANCE RECORDS ─────────────────────────────────────────────────────
INSERT INTO maintenance_records (id, vehicle_id, type, description, status, priority, scheduled_date, completed_date, cost, technician_name, shop, parts_required) VALUES
('MNT-001', 'VH-005', 'Baik Pulih Enjin',
  'Pemeriksaan dan baik pulih enjin penuh akibat kebocoran minyak dan letupan semula.',
  'in-progress', 'critical', '2026-03-05', NULL, 18500, 'Azrul bin Hashim',
  'Pusat Servis Isuzu Shah Alam',
  ARRAY['Set Gasket', 'Pam Minyak', 'Gelang Piston']),

('MNT-002', 'VH-003', 'Servis Sistem Brek',
  'Pad brek hadapan pada 15% - penggantian diperlukan sebelum penghantaran seterusnya.',
  'scheduled', 'high', '2026-03-08', NULL, 3200, 'David Lim Chee Seng',
  'Klang Valley Fleet Services',
  ARRAY['Pad Brek (Hadapan)', 'Set Rotor', 'Minyak Brek']),

('MNT-003', 'VH-009', 'Tukar Minyak & Penapis',
  'Tukar minyak rutin pada selang jarak 197,660 km.',
  'scheduled', 'medium', '2026-03-15', NULL, 850, 'David Lim Chee Seng',
  'Pusat Servis MAN Ipoh',
  ARRAY['Minyak Sintetik 5W-40', 'Penapis Minyak']),

('MNT-004', 'VH-001', 'Putar Tayar & Penjajaran',
  'Putaran tayar berjadual dan semakan penjajaran roda.',
  'scheduled', 'low', '2026-03-20', NULL, 650, 'Azrul bin Hashim',
  'Hino Service Centre Klang',
  ARRAY[]::TEXT[]),

('MNT-005', 'VH-007', 'Penggantian Modul GPS / Telematik',
  'Isyarat hilang pada VH-007. Unit telematik tidak bertindak balas - penggantian diperlukan.',
  'pending', 'critical', '2026-03-06', NULL, 2400, 'Kumaran a/l Rajan',
  'Penghantaran Jauh',
  ARRAY['Modul Telematik Gen-4', 'Kit Antena']),

('MNT-006', 'VH-002', 'Penggantian Penapis Udara',
  'Penapis udara tersumbat - mengurangkan kecekapan bahan api sebanyak ~8%.',
  'scheduled', 'medium', '2026-04-10', NULL, 380, 'David Lim Chee Seng',
  'Scania Service Centre Johor Bahru',
  ARRAY['Penapis Udara Heavy Duty']),

('MNT-007', 'VH-010', 'Pemeriksaan Keselamatan Tahunan',
  'Pemeriksaan keselamatan tahunan dan pensijilan PUSPAKOM.',
  'scheduled', 'high', '2026-04-28', NULL, 1200, 'Kumaran a/l Rajan',
  'PUSPAKOM Shah Alam',
  ARRAY[]::TEXT[]),

('MNT-008', 'VH-004', 'Pengisian Semula Sistem Penyaman Udara',
  'Pengisian semula refrigeran dan pemeriksaan tali sawat pemampat.',
  'scheduled', 'low', '2026-05-01', NULL, 550, 'Azrul bin Hashim',
  'Toyota Service Centre Petaling Jaya',
  ARRAY['Refrigeran R-134a', 'Tali Sawat Pemampat']),

('MNT-009', 'VH-001', 'Tukar Minyak & Penapis',
  'Tukar minyak rutin selesai pada 140,000 km.',
  'completed', 'medium', '2026-02-10', '2026-02-10', 820, 'David Lim Chee Seng',
  'Hino Service Centre Klang',
  ARRAY['Minyak Sintetik 5W-40', 'Penapis Minyak']),

('MNT-010', 'VH-003', 'Tukar Minyak Gear Transmisi',
  'Tukar minyak gear transmisi penuh pada 220,000 km.',
  'completed', 'medium', '2026-01-22', '2026-01-22', 1450, 'Kumaran a/l Rajan',
  'Klang Valley Fleet Services',
  ARRAY['Minyak Transmisi ATF+4', 'Kit Penapis']),

('MNT-011', 'VH-006', 'Basuh Sistem Penyejuk',
  'Basuh penyejuk untuk mencegah kepanasan berlebihan pada laluan harian.',
  'completed', 'medium', '2026-02-28', '2026-03-01', 680, 'Azrul bin Hashim',
  'Mercedes-Benz Authorised Workshop PJ',
  ARRAY['Penyejuk OAT', 'Termostat']),

('MNT-012', 'VH-008', 'Penggantian Pad Brek',
  'Pad brek belakang digantikan pada 21,000 km.',
  'completed', 'high', '2026-02-15', '2026-02-15', 1950, 'David Lim Chee Seng',
  'Ford Authorised Service Centre Subang',
  ARRAY['Pad Brek (Belakang)', 'Set Rotor (Belakang)']);

-- ─── ALERTS ──────────────────────────────────────────────────────────────────
INSERT INTO alerts (id, vehicle_id, type, message, severity, time) VALUES
('ALT-001', 'VH-007', 'offline',      'Isyarat hilang selama 5j 26m',                           'critical', '2026-03-05T03:18:00Z'),
('ALT-002', 'VH-005', 'maintenance',  'Baik pulih enjin sedang berjalan - kenderaan tidak beroperasi', 'high', '2026-03-05T08:00:00Z'),
('ALT-003', 'VH-003', 'maintenance',  'Servis brek perlu dilakukan dalam 3 hari',                'medium',   '2026-03-05T08:00:00Z'),
('ALT-004', 'VH-007', 'fuel',         'Tahap bahan api kritikal rendah - 12%',                   'critical', '2026-03-05T03:15:00Z'),
('ALT-005', 'VH-002', 'fuel',         'Tahap bahan api pada 45% - jadualkan pengisian',          'low',      '2026-03-05T08:30:00Z'),
('ALT-006', 'VH-003', 'license',      'GDL-B DRV-003 tamat tempoh Dis 2025 - LUPUT',             'critical', '2026-03-05T00:00:00Z');
