-- Tenant
INSERT INTO tenants (id, name)
VALUES ('11111111-1111-1111-1111-111111111111', 'Demo Tenant');

-- Users
INSERT INTO users (id, tenant_id, email, password, role)
VALUES
('22222222-2222-2222-2222-222222222222',
 '11111111-1111-1111-1111-111111111111',
 'admin@saas.com',
 '$2b$10$osxkZG.XSsy8qq4V0dsMweOFvM0lXAfBzO2Ofh5mg6QyqLD7cdoWS',
 'super_admin'),

('33333333-3333-3333-3333-333333333333',
 '11111111-1111-1111-1111-111111111111',
 'tenant@saas.com',
 '$2b$10$osxkZG.XSsy8qq4V0dsMweOFvM0lXAfBzO2Ofh5mg6QyqLD7cdoWS',
 'tenant_admin'),

('44444444-4444-4444-4444-444444444444',
 '11111111-1111-1111-1111-111111111111',
 'user@saas.com',
 '$2b$10$osxkZG.XSsy8qq4V0dsMweOFvM0lXAfBzO2Ofh5mg6QyqLD7cdoWS',
 'user');

-- Project
INSERT INTO projects (id, tenant_id, name)
VALUES (
 '55555555-5555-5555-5555-555555555555',
 '11111111-1111-1111-1111-111111111111',
 'Demo Project'
);

-- Task
INSERT INTO tasks (id, tenant_id, project_id, title, status)
VALUES (
 '66666666-6666-6666-6666-666666666666',
 '11111111-1111-1111-1111-111111111111',
 '55555555-5555-5555-5555-555555555555',
 'Initial Task',
 'pending'
);
