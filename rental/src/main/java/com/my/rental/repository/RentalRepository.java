package com.my.rental.repository;

import com.my.rental.domain.Rental;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Rental entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RentalRepository extends JpaRepository<Rental, Long> {}
