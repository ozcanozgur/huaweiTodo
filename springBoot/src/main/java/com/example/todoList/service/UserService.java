package com.example.todoList.service;

import java.util.List;

import com.example.todoList.entity.User;


public interface UserService {
    public List<User> retrieveUsers();

    public User getUser(Long userId);

    public User getUserByUsername(String username);

    public void saveUser(User user);

}
