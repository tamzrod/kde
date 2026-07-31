# Task Manager User Guide

**Version**: 1.2  
**Last Updated**: 2026-07-19  
**Author**: Documentation Team

---

## Overview

Task Manager is a productivity application for organizing and tracking tasks.

### Features

- Create new tasks
- Mark tasks complete
- Track creation dates
- Filter by status

## Installation

```bash
npm install task-manager
```

## Quick Start

```javascript
const tm = new TaskManager();
tm.create('task-1', 'Complete report');
tm.read('task-1');
```

## Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| storage | string | "memory" | Storage backend |
| autosave | boolean | true | Auto-save on change |
| timezone | string | "UTC" | Time zone for dates |

## API Reference

### `TaskManager.create(id, title)`

Creates a new task with the specified identifier and title.

**Parameters:**
- `id` (string): Unique task identifier
- `title` (string): Task description

**Returns:** Task object

### `TaskManager.read(id)`

Retrieves a task by its identifier.

**Parameters:**
- `id` (string): Task identifier

**Returns:** Task object or null

---

## Troubleshooting

1. **Task not found**: Verify the task ID is correct
2. **Duplicate ID**: Each task requires a unique identifier

## License

MIT License - See LICENSE file
