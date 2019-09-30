package com.example.todoList.controller;

import com.example.todoList.entity.TodoItem;
import com.example.todoList.entity.TodoList;
import com.example.todoList.repository.TodoListItemRepository;
import com.example.todoList.repository.UserRepository;
import com.example.todoList.service.TodoListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
public class TodoListRestController {

    @Autowired
    private TodoListService todoListService;

    @Autowired
    private TodoListItemRepository todoListItemRepository;

    @Autowired
    private UserRepository userRepository;

    public void setTodoListService(TodoListService todoListService) {
        this.todoListService = todoListService;
    }


    @GetMapping("/api/todoLists")
    public List<TodoList> getTodoLists() {
        List<TodoList> todoLists = todoListService.retrieveTodoLists();
        return todoLists;
    }

    @GetMapping("/api/todoList/{todoListId}")
    public TodoList getTodoList(@PathVariable(name = "todoListId") Long todoListId) {
        return todoListService.getTodoList(todoListId);
    }

    @PostMapping("/api/todoList/{todoListId}/{itemId}")
    public TodoList updateTodoListItem(@PathVariable("todoListId") Long listId,
                                   @PathVariable("itemId") Long itemId) {
        todoListService.updateTodoListItem(listId, itemId);
        return todoListService.getTodoList(listId);
    }

    @PostMapping("/api/{userId}/todoLists")
    public void saveTodoList(@PathVariable(name = "userId") Long userId, TodoList todoList) {
        todoListService.saveTodoList(todoList, userId);
        //System.out.println(user.getUsername());
    }


    @PostMapping("/api/todoList/{todoListId}")
    public void saveTodoListItem(
            @PathVariable(name = "todoListId") Long todoListId,
            TodoItem todoItem) {

        todoListService.saveTodoListItem(todoItem, todoListId);
    }
}
