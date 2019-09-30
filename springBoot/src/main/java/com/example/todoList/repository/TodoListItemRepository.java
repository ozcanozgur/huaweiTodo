package com.example.todoList.repository;

import com.example.todoList.entity.TodoItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoListItemRepository extends JpaRepository<TodoItem,Long> {
}


