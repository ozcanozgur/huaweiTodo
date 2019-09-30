package com.example.todoList.service;

import com.example.todoList.entity.TodoItem;
import com.example.todoList.entity.TodoList;

import java.util.List;

public interface TodoListService {

        public List<TodoList> retrieveTodoLists();

        public TodoList getTodoList(Long todoListId);

        public void updateTodoListItem(Long todoListId,Long todoListItemId);

        public void saveTodoList(TodoList todo,Long userId);

        public void saveTodoListItem(TodoItem todoItem,Long TodoListId);
}
