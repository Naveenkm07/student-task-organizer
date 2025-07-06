package com.taskflow.controller;

import com.taskflow.model.Task;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    
    private final ConcurrentHashMap<Long, Task> tasks = new ConcurrentHashMap<>();
    private final AtomicLong idCounter = new AtomicLong();

    @GetMapping
    public List<Task> getAllTasks() {
        return new ArrayList<>(tasks.values());
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        task.setId(idCounter.incrementAndGet());
        task.setCreatedAt(LocalDateTime.now());
        task.setUpdatedAt(LocalDateTime.now());
        tasks.put(task.getId(), task);
        return task;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTask(@PathVariable Long id) {
        Task task = tasks.get(id);
        if (task == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(task);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        Task task = tasks.get(id);
        if (task == null) {
            return ResponseEntity.notFound().build();
        }
        
        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        task.setStatus(taskDetails.getStatus());
        task.setUpdatedAt(LocalDateTime.now());
        
        tasks.put(id, task);
        return ResponseEntity.ok(task);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        if (tasks.remove(id) == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }
} 