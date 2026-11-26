package com.military.asset_management.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "transfers")
public class Transfer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String equipmentName;
    private Integer quantity;
    private String fromBase;
    private String toBase;
    private LocalDate transferDate;

    public Transfer() {
    }

    public Long getId() {
        return id;
    }

    public String getEquipmentName() {
        return equipmentName;
    }

    public void setEquipmentName(String equipmentName) {
        this.equipmentName = equipmentName;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getFromBase() {
        return fromBase;
    }

    public void setFromBase(String fromBase) {
        this.fromBase = fromBase;
    }

    public String getToBase() {
        return toBase;
    }

    public void setToBase(String toBase) {
        this.toBase = toBase;
    }

    public LocalDate getTransferDate() {
        return transferDate;
    }

    public void setTransferDate(LocalDate transferDate) {
        this.transferDate = transferDate;
    }
}