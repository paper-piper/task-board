CREATE TABLE task_templates(
    task_template_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    board_template_id UUID NOT NULL REFERENCES board_templates(board_template_id) ON DELETE CASCADE,
    position NUMERIC NOT NULL,
    code TEXT NOT NULL,
    title TEXT NOT NULL,
    cost NUMERIC NOT NULL,
    value NUMERIC NOT NULL,
    steps INTEGER NOT NULL,
    predecessors_ids TEXT[],
    completed BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE task_states(
    task_state_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_template_id UUID NOT NULL REFERENCES task_templates(task_template_id) ON DELETE RESTRICT,
    board_state_id UUID NOT NULL REFERENCES board_states(board_state_id) ON DELETE CASCADE,
    position NUMERIC NOT NULL,
    code TEXT NOT NULL,
    title TEXT NOT NULL,
    cost NUMERIC NOT NULL,
    value NUMERIC NOT NULL,
    steps INTEGER NOT NULL,
    predecessors_ids TEXT[],
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);