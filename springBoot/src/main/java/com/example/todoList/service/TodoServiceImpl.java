package com.example.todoList.service;

import com.example.todoList.entity.Todo;
import com.example.todoList.entity.User;
import com.example.todoList.repository.TodoRepository;
import com.example.todoList.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoServiceImpl implements TodoService{
    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private UserRepository userRepository;

    public void setTodoRepository(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> retrieveTodos() {
        List<Todo> todos = todoRepository.findAll();
        return todos;
    }

    public Todo getTodo(Long todoId) {
        Optional<Todo> optEmp = todoRepository.findById(todoId);
        return optEmp.get();
    }

    public void saveTodo(Todo todo,Long userId){
        System.out.println(todo.toString());
        Optional<User> user = userRepository.findById(userId);
        todo.setUser(user.get());
        todoRepository.save(todo);
    }
}
