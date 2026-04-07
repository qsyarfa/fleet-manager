-- FleetOps PostgreSQL Schema
-- Run: psql -U postgres -d fleetops -f server/db/schema.sql

-- Drop in reverse dependency order
DROP TABLE IF EXISTS alerts;
DROP TABLE IF EXISTS maintenance_records;
DROP TABLE IF EXISTS trips;
DROP TABLE IF EXISTS drivers;
DROP TABLE IF EXISTS vehicles;

-- ─── VEHICLES ────────────────────────────────────────────────────────────────
-- driver_id is stored but NOT FK-constrained (circular ref with drivers)
CREATE TABLE vehicles (
  id            VARCHAR(10)  PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  type          VARCHAR(50)  NOT NULL,
  plate         VARCHAR(20)  NOT NULL,
  year          INTEGER      NOT NULL,
  status        VARCHAR(20)  NOT NULL CHECK (status IN ('active','enroute','idle','maintenance','offline')),
  driver_id     VARCHAR(10),
  fuel_level    INTEGER      NOT NULL,
  fuel_capacity INTEGER      NOT NULL,
  odometer      INTEGER      NOT NULL,
  location      TEXT         NOT NULL,
  last_ping     TIMESTAMPTZ  NOT NULL,
  speed         INTEGER      NOT NULL DEFAULT 0,
  engine_temp   INTEGER      NOT NULL DEFAULT 0,
  next_service  DATE         NOT NULL,
  color         VARCHAR(10)  NOT NULL
);

-- ─── DRIVERS ─────────────────────────────────────────────────────────────────
-- vehicle_id is stored but NOT FK-constrained (circular ref with vehicles)
CREATE TABLE drivers (
  id              VARCHAR(10)   PRIMARY KEY,
  name            VARCHAR(100)  NOT NULL,
  avatar          VARCHAR(5)    NOT NULL,
  phone           VARCHAR(30)   NOT NULL,
  email           VARCHAR(100)  NOT NULL,
  license         VARCHAR(20)   NOT NULL,
  license_expiry  DATE          NOT NULL,
  status          VARCHAR(20)   NOT NULL CHECK (status IN ('on-duty','off-duty','standby')),
  vehicle_id      VARCHAR(10),
  total_trips     INTEGER       NOT NULL DEFAULT 0,
  total_miles     INTEGER       NOT NULL DEFAULT 0,
  rating          NUMERIC(3,1)  NOT NULL,
  violations      INTEGER       NOT NULL DEFAULT 0,
  hire_date       DATE          NOT NULL
);

-- ─── TRIPS ───────────────────────────────────────────────────────────────────
CREATE TABLE trips (
  id          VARCHAR(10)  PRIMARY KEY,
  vehicle_id  VARCHAR(10)  NOT NULL REFERENCES vehicles(id),
  driver_id   VARCHAR(10)  NOT NULL REFERENCES drivers(id),
  origin      TEXT         NOT NULL,
  destination TEXT         NOT NULL,
  start_time  TIMESTAMPTZ  NOT NULL,
  end_time    TIMESTAMPTZ,
  distance    INTEGER      NOT NULL,
  duration    INTEGER,
  status      VARCHAR(20)  NOT NULL CHECK (status IN ('in-progress','completed','cancelled')),
  cargo       VARCHAR(150) NOT NULL,
  weight      VARCHAR(30)  NOT NULL,
  fuel_used   INTEGER
);

-- ─── MAINTENANCE RECORDS ─────────────────────────────────────────────────────
CREATE TABLE maintenance_records (
  id               VARCHAR(10)   PRIMARY KEY,
  vehicle_id       VARCHAR(10)   NOT NULL REFERENCES vehicles(id),
  type             VARCHAR(150)  NOT NULL,
  description      TEXT          NOT NULL,
  status           VARCHAR(20)   NOT NULL CHECK (status IN ('pending','in-progress','scheduled','completed')),
  priority         VARCHAR(20)   NOT NULL CHECK (priority IN ('critical','high','medium','low')),
  scheduled_date   DATE          NOT NULL,
  completed_date   DATE,
  cost             INTEGER       NOT NULL DEFAULT 0,
  technician_name  VARCHAR(100)  NOT NULL,
  shop             VARCHAR(150)  NOT NULL,
  parts_required   TEXT[]        NOT NULL DEFAULT '{}'
);

-- ─── ALERTS ──────────────────────────────────────────────────────────────────
CREATE TABLE alerts (
  id          VARCHAR(10)  PRIMARY KEY,
  vehicle_id  VARCHAR(10)  NOT NULL REFERENCES vehicles(id),
  type        VARCHAR(30)  NOT NULL,
  message     TEXT         NOT NULL,
  severity    VARCHAR(20)  NOT NULL CHECK (severity IN ('critical','high','medium','low')),
  time        TIMESTAMPTZ  NOT NULL
);
