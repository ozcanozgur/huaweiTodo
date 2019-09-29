package com.example.todoList.controller;

import com.example.todoList.entity.Todo;
import com.example.todoList.entity.User;
import com.example.todoList.repository.UserRepository;
import com.example.todoList.service.TodoService;
import com.example.todoList.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TodoRestController {

    @Autowired
    private TodoService todoService;

    private UserRepository userRepository;

    public void setTodoService(TodoService todoService) {
        this.todoService = todoService;
    }



    @GetMapping("/api/todos")
    public List<Todo> getTodoLists() {
        List<Todo> todos = todoService.retrieveTodos();
        return todos;
    }

    @GetMapping("/api/todos/{todoId}")
    public Todo getTodo(@PathVariable(name="todoId")Long todoId) {
        return todoService.getTodo(todoId);
    }


    @PostMapping("/api/{userId}/todos")
    public void saveTodo(@PathVariable(name="userId")Long userId,Todo todo){
        todoService.saveTodo(todo,userId);
        //System.out.println(user.getUsername());
    }
}
