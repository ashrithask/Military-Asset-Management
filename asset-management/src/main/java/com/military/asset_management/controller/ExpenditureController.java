package com.military.asset_management.controller;

import com.military.asset_management.entity.Expenditure;
import com.military.asset_management.repository.ExpenditureRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenditures")
@CrossOrigin(origins = "http://localhost:5173")
public class ExpenditureController {

    private final ExpenditureRepository expenditureRepository;

    public ExpenditureController(ExpenditureRepository expenditureRepository) {
        this.expenditureRepository = expenditureRepository;
    }

    @PostMapping
    public Expenditure createExpenditure(
            @RequestBody Expenditure expenditure) {

        return expenditureRepository.save(expenditure);
    }

    @GetMapping
    public List<Expenditure> getAllExpenditures() {

        return expenditureRepository.findAll();
    }
}