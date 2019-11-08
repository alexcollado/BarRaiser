package com.aquamarine.barraiser.model;

import lombok.*;
import lombok.experimental.Accessors;

import javax.persistence.*;

@Getter
@Setter
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Drink {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    @Column(unique = true, nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String image_path;

    @OneToOne
    @JoinColumn(name = "added_by", referencedColumnName = "id")
    private User added_by;

    @OneToOne
    @JoinColumn(name = "edited_by", referencedColumnName = "id")
    private User edited_by;
}