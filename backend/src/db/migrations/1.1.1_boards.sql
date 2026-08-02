CREATE TABLE board_templates(
    board_template_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    budget NUMERIC NOT NULL,
    value NUMERIC NOT NULL
);
CREATE TABLE board_states(
    board_state_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    board_template_id UUID NOT NULL REFERENCES board_templates(board_template_id) ON DELETE RESTRICT,
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    budget NUMERIC NOT NULL,
    value NUMERIC NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);