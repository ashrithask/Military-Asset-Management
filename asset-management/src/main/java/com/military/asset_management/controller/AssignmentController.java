package com.military.asset_management.controller;

import com.military.asset_management.entity.Assignment;
import com.military.asset_management.repository.AssignmentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
@CrossOrigin(origins = "http://localhost:5173")
public class AssignmentController {

    private final AssignmentRepository assignmentRepository;

    public AssignmentController(AssignmentRepository assignmentRepository) {
        this.assignmentRepository = assignmentRepository;
    }

    @PostMapping
    public Assignment createAssignment(@RequestBody Assignment assignment) {
        return assignmentRepository.save(assignment);
    }

    @GetMapping
    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }
}