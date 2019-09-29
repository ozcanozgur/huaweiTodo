package com.example.todoList.controller;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.todoList.entity.User;
import com.example.todoList.service.UserService;

@RestController
public class UserRestController {

    @Autowired
    private UserService userService;

    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/api/users")
    public List<User> getUser() {
        List<User> users = userService.retrieveUsers();
        return users;
    }

    @GetMapping("/api/userss/{userId}")
    public User getUser(@PathVariable(name="userId")Long userId) {
        return userService.getUser(userId);
    }

    @GetMapping("/api/users/{username}")
    public User getUserByUsername(@PathVariable(name="username")String username) {
        return userService.getUserByUsername(username);
    }

    @PostMapping("/api/users")
    public void saveUser(User user){
        userService.saveUser(user);
        System.out.println("User Saved Successfully");
    }
}
