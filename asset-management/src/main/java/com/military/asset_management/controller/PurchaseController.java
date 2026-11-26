package com.military.asset_management.controller;

import com.military.asset_management.entity.Purchase;
import com.military.asset_management.repository.PurchaseRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/purchases")
@CrossOrigin(origins = "http://localhost:5173")
public class PurchaseController {

    private final PurchaseRepository purchaseRepository;

    public PurchaseController(PurchaseRepository purchaseRepository) {
        this.purchaseRepository = purchaseRepository;
    }

    @PostMapping
    public Purchase createPurchase(@RequestBody Purchase purchase) {
        return purchaseRepository.save(purchase);
    }

    @GetMapping
    public List<Purchase> getAllPurchases() {
        return purchaseRepository.findAll();
    }
}