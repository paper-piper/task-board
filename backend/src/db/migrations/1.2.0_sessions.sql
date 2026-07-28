CREATE TABLE sessions(
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session jsonb NOT NULL,
    expires_at TIMESTAMP NOT NULL DEFAULT NOW()
);