package com.military.asset_management.controller;

import com.military.asset_management.entity.Transfer;
import com.military.asset_management.repository.TransferRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transfers")
@CrossOrigin(origins = "http://localhost:5173")
public class TransferController {

    private final TransferRepository transferRepository;

    public TransferController(TransferRepository transferRepository) {
        this.transferRepository = transferRepository;
    }

    @PostMapping
    public Transfer createTransfer(@RequestBody Transfer transfer) {
        return transferRepository.save(transfer);
    }

    @GetMapping
    public List<Transfer> getAllTransfers() {
        return transferRepository.findAll();
    }
}