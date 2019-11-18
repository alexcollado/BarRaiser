package com.aquamarine.barraiser.dto.model;

import com.aquamarine.barraiser.model.Auditable;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.Accessors;

import java.util.Date;

@Getter
@Setter
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
@ToString
@JsonInclude(value = JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class DrinkDTO extends Auditable<String> {
    private int id;

    private String name;

    private String image_path;

    private int added_by;

    private boolean isPublic;

}
