package com.aquamarine.barraiser.service.drink.interfaces;

import com.aquamarine.barraiser.controller.DrinkController;
import com.aquamarine.barraiser.dto.model.DrinkDTO;
import org.springframework.stereotype.Service;

import java.util.List;

public interface DrinkService {

    void addDrink(DrinkDTO drinkDTO);

    boolean deleteDrink(int id);

    List<DrinkDTO> viewAllDrinks();

    List<DrinkDTO> viewDrinksByUser(int id);

    void editDrink(DrinkDTO drink);
}
