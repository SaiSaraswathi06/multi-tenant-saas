-- Insert default tenant
INSERT INTO tenants (name) VALUES ('Default Tenant');

-- Insert default admin user
INSERT INTO users (tenant_id, name, email, password, role) VALUES 
(
    (SELECT id FROM tenants LIMIT 1),
    'Admin User',
    'tenant@saas.com',
    '$2a$10$0vv5i3tMRuYgB2t1Y1kT8OPxWvqCq1Y9T0kN1tZYCt81oUpjOQxFw', -- Admin@123 hashed
    'admin'
);
