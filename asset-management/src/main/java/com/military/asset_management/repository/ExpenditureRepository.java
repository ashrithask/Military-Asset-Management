package com.military.asset_management.repository;

import com.military.asset_management.entity.Expenditure;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenditureRepository extends JpaRepository<Expenditure, Long> {
}