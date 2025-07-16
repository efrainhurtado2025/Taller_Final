package org.tecnicas.taller6.service;

import org.springframework.stereotype.Service;

import org.tecnicas.taller6.dto.DateDto;
import org.tecnicas.taller6.entities.Festive;
import org.tecnicas.taller6.repository.DateRepository;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;

@Service
public class DateService  {

    private final DateRepository dateRepository;

    public DateService(DateRepository dateRepository) {
        this.dateRepository = dateRepository;
    }

    public boolean isFestiveDate(int day, int month, int year) {
        return isFestive(day, month, year);
    }

    private boolean isFestive(int day, int month, int year) {
        return isType1(day, month) ||
                isType2(day, month, year) ||
                isType3(day, month, year) ||
                isType4(day, month, year);
    }

    private List<Festive> getFestives() {
        return (List<Festive>) dateRepository.findAll();
    }

    private boolean isType1(int day, int month) {
        return getFestives().stream()
                .anyMatch(f -> f.getType().getIdType() == 1 &&
                        f.getDay() == day && f.getMonth() == month);
    }

    private boolean isType2(int day, int month, int year) {
        return getFestives().stream()
                .filter(f -> f.getType().getIdType() == 2)
                .map(f -> moveToNextMonday(LocalDate.of(year, f.getMonth(), f.getDay())))
                .anyMatch(date -> date.getDayOfMonth() == day && date.getMonthValue() == month);
    }

    private boolean isType3(int day, int month, int year) {
        LocalDate easterSunday = getEasterSunday(year);
        return getFestives().stream()
                .filter(f -> f.getType().getIdType() == 3)
                .map(f -> easterSunday.plusDays(f.getEasterDays()))
                .anyMatch(date -> date.getDayOfMonth() == day && date.getMonthValue() == month);
    }

    private boolean isType4(int day, int month, int year) {
        LocalDate easterSunday = getEasterSunday(year);
        return getFestives().stream()
                .filter(f -> f.getType().getIdType() == 4)
                .map(f -> moveToNextMonday(easterSunday.plusDays(f.getEasterDays())))
                .anyMatch(date -> date.getDayOfMonth() == day && date.getMonthValue() == month);
    }

    private LocalDate moveToNextMonday(LocalDate date) {
        if (date.getDayOfWeek() == DayOfWeek.MONDAY) return date;
        int daysToAdd = (8 - date.getDayOfWeek().getValue()) % 7;
        return date.plusDays(daysToAdd == 0 ? 7 : daysToAdd);
    }

    private int calculateEasterDays(int year) {
        int a = year % 19;
        int b = year % 4;
        int c = year % 7;
        int d = (19 * a + 24) % 30;
        return d + (2 * b + 4 * c + 6 * d + 5) % 7;
    }

    private LocalDate getEasterSunday(int year) {
        return LocalDate.of(year, 3, 15).plusDays(calculateEasterDays(year)+7);
    }

    public List<DateDto> getFestiveList(int year) {
        LocalDate easterSunday = getEasterSunday(year);

        return getFestives().stream()
                .map(f -> {
                    LocalDate date = switch ((int) f.getType().getIdType()) {
                        case 1 -> LocalDate.of(year, f.getMonth(), f.getDay());
                        case 2 -> moveToNextMonday(LocalDate.of(year, f.getMonth(), f.getDay()));
                        case 3 -> easterSunday.plusDays(f.getEasterDays());
                        case 4 -> moveToNextMonday(easterSunday.plusDays(f.getEasterDays()));
                        default -> null;
                    };

                    if (date != null) {
                        return DateDto.builder()
                                .festivo(f.getName()) // asegúrate de tener getName() en la entidad Festive
                                .fecha(date)
                                .build();
                    } else {
                        return null;
                    }
                })
                .filter(Objects::nonNull)
                .sorted(Comparator.comparing(DateDto::getFecha))
                .toList();
    }


}
