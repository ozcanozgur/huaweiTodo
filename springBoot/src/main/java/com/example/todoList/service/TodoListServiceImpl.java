package com.example.todoList.service;

import com.example.todoList.entity.TodoItem;
import com.example.todoList.entity.TodoList;
import com.example.todoList.entity.User;
import com.example.todoList.repository.TodoListItemRepository;
import com.example.todoList.repository.TodoListRepository;
import com.example.todoList.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoListServiceImpl implements TodoListService {
    @Autowired
    private TodoListRepository todoListRepository;

    @Autowired
    private TodoListItemRepository todoListItemRepository;

    @Autowired
    private UserRepository userRepository;

    public void setTodoListRepository(TodoListRepository todoListRepository) {
        this.todoListRepository = todoListRepository;
    }

    public List<TodoList> retrieveTodoLists() {
        List<TodoList> todos = todoListRepository.findAll(Sort.by(Sort.Direction.ASC, "title"));
        return todos;
    }

    public TodoList getTodoList(Long todoListId) {
        Optional<TodoList> optList = todoListRepository.findById(todoListId);
        return optList.get();
    }

    public void updateTodoListItem(Long todoListId,Long todoListItemId) {
        Optional<TodoItem> optList = todoListItemRepository.findById(todoListItemId);
        optList.get().setStatus(!optList.get().getStatus());
        todoListItemRepository.save(optList.get());
    }

    public void saveTodoList(TodoList todoList,Long userId){
        System.out.println(todoList.toString());
        Optional<User> optUser = userRepository.findById(userId);
        todoList.setUser(optUser.get());
        todoListRepository.save(todoList);
    }

    public void saveTodoListItem(TodoItem todoItem, Long TodoListId){
        System.out.println("SaveTodoListItem");
        Optional<TodoList> optTodoList = todoListRepository.findById(TodoListId);
        todoItem.setList(optTodoList.get());
        todoListItemRepository.save(todoItem);
    }
}
