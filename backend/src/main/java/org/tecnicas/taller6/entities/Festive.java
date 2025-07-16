package org.tecnicas.taller6.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import org.antlr.v4.runtime.misc.NotNull;

@Data
@Entity
@Table(name = "Festivo")
public class Festive {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idFestivo;
    @NotNull
    @Column(name = "Nombre")
    private String name;
    @NotNull
    @Column(name = "Dia")
    private int day;
    @NotNull
    @Column(name = "Mes")
    private int month;
    @NotNull
    @Column(name = "DiasPascua")
    private int easterDays;

    @JoinColumn(name = "idType", nullable = false)
    @ManyToOne
    @JsonBackReference
    private Type type = Type.builder().build();



}
