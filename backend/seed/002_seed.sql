INSERT INTO tenants (id, name) VALUES 
('11111111-1111-1111-1111-111111111111', 'Default Tenant');

-- Password = Admin@123 (bcrypt hashed)
INSERT INTO users (id, tenant_id, name, email, password, role) VALUES
('22222222-2222-2222-2222-222222222222',
 '11111111-1111-1111-1111-111111111111',
 'Super Admin',
 'admin@saas.com',
 '$2b$10$eIMv7zv2lBfktHdVS7WHPu6U9srBczNx1mq1O9d2M2fOJ4cAGqSru',
 'super_admin');
