package com.example.todoList.service;

import com.example.todoList.entity.Todo;

import java.util.List;

public interface TodoService {

        public List<Todo> retrieveTodos();

        public Todo getTodo(Long todoId);

        public void saveTodo(Todo todo,Long userId);

}
