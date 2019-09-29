package com.example.todoList.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.todoList.entity.User;


@Repository
public interface UserRepository extends JpaRepository<User,Long>{}

