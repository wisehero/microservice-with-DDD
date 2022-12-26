package com.my.bookcatalog.repository;

import com.my.bookcatalog.domain.BookCatalog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the BookCatalog entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BookCatalogRepository extends MongoRepository<BookCatalog, String> {}
