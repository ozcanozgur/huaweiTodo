package com.example.todoList.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="TodoListItem")
public class TodoItem extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "list_id", nullable = false)
    @JsonBackReference
    private TodoList list;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "deadline")
    private Long deadline;

    @Column(name = "status")
    private Boolean status;

    public TodoList getList() {
        return list;
    }

    public void setList(TodoList list) {
        this.list = list;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getDeadline() {
        return deadline;
    }

    public void setDeadline(Long deadline) {
        this.deadline = deadline;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
}
