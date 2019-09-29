package com.example.todoList.service;


import java.util.List;
import java.util.Optional;

import com.example.todoList.entity.User;
import com.example.todoList.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.todoList.service.UserService;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> retrieveUsers() {
        List<User> users = userRepository.findAll();
        return users;
    }

    public User getUser(Long userId) {
        Optional<User> optEmp = userRepository.findById(userId);
        return optEmp.get();
    }

    public User getUserByUsername(String username) {
        List<User> users = userRepository.findAll();

        for(User user : users) {
            if(user.getUsername().equals(username) || user.getEmail().equals(username))
                return user;
        }
        return null;
    }

    public void saveUser(User user){
        userRepository.save(user);
    }
}
