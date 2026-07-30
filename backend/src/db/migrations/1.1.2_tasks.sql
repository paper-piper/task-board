CREATE TABLE tasks(
    task_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    board_id UUID NOT NULL REFERENCES boards(board_id) ON DELETE CASCADE,
    position NUMERIC NOT NULL, /* TODO: implement position logic */
    code TEXT NOT NULL,
    title TEXT NOT NULL,
    cost NUMERIC NOT NULL,
    value NUMERIC NOT NULL,
    steps INTEGER NOT NULL,
    predecessors_ids TEXT[],
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);