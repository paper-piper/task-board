CREATE TABLE boards(
    board_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    budget NUMERIC NOT NULL,
    value NUMERIC NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
/* 
TODO: boards aren't linked to users, they are template where each user 
selects whatever board he wants. then, the board builds dynamically based
on the user logs.
*/