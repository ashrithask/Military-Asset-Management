package com.military.asset_management.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "expenditures")
public class Expenditure {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String equipmentName;
    private Integer quantity;
    private LocalDate expendedDate;

    public Expenditure() {
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

    public LocalDate getExpendedDate() {
        return expendedDate;
    }

    public void setExpendedDate(LocalDate expendedDate) {
        this.expendedDate = expendedDate;
    }
}