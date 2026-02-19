CREATE TABLE IF NOT EXISTS collections (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  hero_image TEXT
);

CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  type VARCHAR(255) NOT NULL,
  images TEXT[] NOT NULL,
  collection_id VARCHAR(255) REFERENCES collections(id),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
