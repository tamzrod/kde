# Artifact A2: Python Source Code
# Source: Software Implementation
# Domain: Software Engineering

"""
Task Manager Module

This module manages task resources with CRUD operations.
Author: Development Team
Version: 1.0.0
"""

from typing import List, Optional, Dict
from datetime import datetime


class Task:
    """
    Represents a task entity with lifecycle management.
    
    Attributes:
        id: Unique identifier
        title: Task description
        completed: Completion status
        created_at: Creation timestamp
    """
    
    def __init__(self, id: str, title: str, completed: bool = False):
        """
        Initialize a new Task instance.
        
        Args:
            id: Unique task identifier
            title: Task description
            completed: Initial completion state
        """
        self.id = id
        self.title = title
        self.completed = completed
        self.created_at = datetime.now()
    
    def complete(self) -> None:
        """Mark task as completed."""
        self.completed = True
    
    def to_dict(self) -> Dict:
        """Serialize task to dictionary."""
        return {
            "id": self.id,
            "title": self.title,
            "completed": self.completed,
            "created_at": self.created_at.isoformat()
        }


class TaskManager:
    """
    Manages collection of tasks with CRUD operations.
    
    Manages:
        _tasks: Internal task storage
    """
    
    def __init__(self):
        """Initialize TaskManager with empty storage."""
        self._tasks: Dict[str, Task] = {}
    
    def create(self, id: str, title: str) -> Task:
        """
        Create a new task.
        
        Args:
            id: Task identifier
            title: Task title
            
        Returns:
            Created Task instance
        """
        task = Task(id, title)
        self._tasks[id] = task
        return task
    
    def read(self, id: str) -> Optional[Task]:
        """
        Retrieve task by ID.
        
        Args:
            id: Task identifier
            
        Returns:
            Task if found, None otherwise
        """
        return self._tasks.get(id)
    
    def list_all(self) -> List[Task]:
        """Return all tasks."""
        return list(self._tasks.values())
