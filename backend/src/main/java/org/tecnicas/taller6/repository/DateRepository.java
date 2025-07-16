package org.tecnicas.taller6.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.tecnicas.taller6.entities.Festive;
@Repository
public interface DateRepository extends CrudRepository<Festive, Long> {


}
