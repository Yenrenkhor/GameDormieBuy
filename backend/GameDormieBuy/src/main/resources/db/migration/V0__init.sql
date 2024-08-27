

CREATE TABLE IF NOT EXISTS course (
    course_id UUID PRIMARY KEY,
    course_name VARCHAR(255) NOT NULL,
    par INTEGER[],
    index INTEGER[],
    game_mode VARCHAR(255) NOT NULL
)