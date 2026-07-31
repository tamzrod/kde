-- Artifact A5: SQLite Database Schema
-- Source: Database Design
-- Domain: Data Engineering

-- Task Management Database Schema
-- Version: 1.0
-- Created: 2026-07-19

-- Tasks table: Core entity for task management
CREATE TABLE IF NOT EXISTS tasks (
    -- Primary key: unique task identifier
    id TEXT PRIMARY KEY,
    
    -- Task description (required, non-empty)
    title TEXT NOT NULL CHECK (length(title) > 0),
    
    -- Completion status (default: 0/false)
    completed INTEGER NOT NULL DEFAULT 0,
    
    -- Priority level (1=highest, 5=lowest)
    priority INTEGER DEFAULT 3 CHECK (priority BETWEEN 1 AND 5),
    
    -- Audit timestamps
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    
    -- Soft delete support
    deleted_at TEXT,
    
    -- Foreign key to parent task (for subtasks)
    parent_id TEXT REFERENCES tasks(id)
);

-- Indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_tasks_completed ON tasks(completed);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);
CREATE INDEX IF NOT EXISTS idx_tasks_created ON tasks(created_at);

-- Tags table: Many-to-many relationship
CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    color TEXT DEFAULT '#808080'
);

-- Task-Tag junction table
CREATE TABLE IF NOT EXISTS task_tags (
    task_id TEXT NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (task_id, tag_id)
);

-- Views for common queries
CREATE VIEW IF NOT EXISTS active_tasks AS
    SELECT * FROM tasks 
    WHERE deleted_at IS NULL 
    ORDER BY priority ASC, created_at DESC;

CREATE VIEW IF NOT EXISTS task_summary AS
    SELECT 
        t.id,
        t.title,
        t.completed,
        t.priority,
        t.created_at,
        COUNT(tt.tag_id) as tag_count
    FROM tasks t
    LEFT JOIN task_tags tt ON t.id = tt.task_id
    WHERE t.deleted_at IS NULL
    GROUP BY t.id;
