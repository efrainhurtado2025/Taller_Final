package org.tecnicas.taller6.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.tecnicas.taller6.dto.DateDto;
import org.tecnicas.taller6.service.DateService;

import java.time.DateTimeException;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("festivos")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:45751", "http://localhost:*"})
public class DateController {
    @Autowired
    private final DateService dateService;

    public DateController(DateService dateService) {
        this.dateService = dateService;
    }


    @GetMapping("/verificar/{year}/{month}/{day}")
    public ResponseEntity<String> checkIfFestive(
            @PathVariable int year,
            @PathVariable int month,
            @PathVariable int day
    ) {
        try {
            // Validación de fecha
            LocalDate.of(year, month, day);

            boolean isFestive = dateService.isFestiveDate(day, month, year);

            if (isFestive) {
                return ResponseEntity.ok("Es festivo");
            } else {
                return ResponseEntity.ok("No es festivo");
            }

        } catch (DateTimeException e) {
            return ResponseEntity.badRequest().body("fecha invalida");
        }
    }



    @GetMapping("/obtener/{year}")
    public ResponseEntity<List<DateDto>> obtenerFestive(@PathVariable int year) {
        return ResponseEntity.ok(dateService.getFestiveList(year));
    }




}
