package com.aquamarine.barraiser.service.cohort.implementation;

import com.aquamarine.barraiser.dto.mapper.CohortDTOMapper;
import com.aquamarine.barraiser.dto.mapper.UserDTOMapper;
import com.aquamarine.barraiser.dto.model.CohortDTO;
import com.aquamarine.barraiser.dto.model.UserDTO;
import com.aquamarine.barraiser.model.Cohort;
import com.aquamarine.barraiser.model.Drink;
import com.aquamarine.barraiser.model.User;
import com.aquamarine.barraiser.repository.CohortRepository;
import com.aquamarine.barraiser.repository.DrinkRepository;
import com.aquamarine.barraiser.repository.UserRepository;
import com.aquamarine.barraiser.service.cohort.interfaces.CohortService;
import com.aquamarine.barraiser.service.drink.interfaces.DrinkService;
import com.aquamarine.barraiser.service.images.interfaces.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

@Service
public class CohortServiceImpl implements CohortService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CohortRepository cohortRepository;

    @Autowired
    private DrinkRepository drinkRepository;

    @Autowired
    private DrinkService drinkService;

    @Autowired
    private ImageService imageService;

    @Value("images/cohorts/")
    private String sub_folder;


    @Override
    public boolean createCohort(CohortDTO cohortdto, MultipartFile multipartFile) throws IOException {
        String fileName = cohortdto.getName();
        File file = imageService.convertMultiPartToFile(multipartFile, fileName);
        imageService.uploadFileToS3bucket(sub_folder+fileName, file);

        Cohort cohort = new Cohort()
                .setName(cohortdto.getName())
                .setDescription(cohortdto.getDescription())
                .setInstructor(userRepository.findById(cohortdto.getInstructor()).get())
                .setImage_path(sub_folder+fileName);


        return cohort == cohortRepository.save(cohort);

    }

    @Override
    public boolean deleteCohort(int cohort_id) {
        if (cohortRepository.findById(cohort_id).isPresent()) {
            Cohort cohort = cohortRepository.findById(cohort_id).get();
            imageService.deleteFileFromS3bucket(cohort.getImage_path());
            cohortRepository.delete(cohort);
            return true;
        }
        return false;
    }

    @Override
    public boolean editCohort(CohortDTO cohortDTO, MultipartFile multipartFile) throws IOException {
        int cohort_id = cohortDTO.getId();
        System.out.println("Here" + cohort_id);
        if (cohortRepository.findById(cohort_id).isPresent()) {
            Cohort cohort = cohortRepository.findById(cohort_id).get();
            cohort.setName(cohortDTO.getName());
            cohort.setDescription(cohortDTO.getDescription());
            cohort.setInstructor(userRepository.findById(cohortDTO.getInstructor()).get());


            String filePath = cohort.getImage_path();
            File file = imageService.convertMultiPartToFile(multipartFile, cohort.getName());
            imageService.deleteFileFromS3bucket(filePath);
            cohort.setImage_path(sub_folder+cohort.getName());
            filePath = cohort.getImage_path();
            imageService.uploadFileToS3bucket(filePath, file);

            return cohort == cohortRepository.save(cohort);
        }
        return false;
    }

    @Override
    public boolean addUserToCohort(int cohort_id, String traineeEmail) {
        if (cohortRepository.findById(cohort_id).isPresent()) {
            Cohort cohort = cohortRepository.findById(cohort_id).get();

            Set<User> users = cohort.getUser();
            users.add(userRepository.findByEmail(traineeEmail).get());

            cohort.setUser(users);
            return cohort == cohortRepository.save(cohort);
        }
        return false;
    }

    @Override
    public Map<String, Object> findById(int id) throws IOException {
        HashMap<String, Object> ret = new HashMap<>();
        CohortDTO cohortDTO = CohortDTOMapper.toCohortDTO(cohortRepository.findById(id).get());
        ret.put("cohort", cohortDTO);
        InputStream in = imageService.downloadFileFromS3bucket(cohortDTO.getImage_path()).getObjectContent();
        BufferedImage imageFromAWS = ImageIO.read(in);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(imageFromAWS, "png", baos );
        byte[] imageBytes = baos.toByteArray();
        in.close();
        ret.put("file", imageBytes);
        return ret;
    }

    @Override
    public boolean deleteStudentFromCohort(int cohort_id, int user_id) {
        if (cohortRepository.findById(cohort_id).isPresent()) {
            Cohort cohort = cohortRepository.findById(cohort_id).get();

            Set<User> users = cohort.getUser();
            User user = userRepository.findById(user_id).get();

            users.remove(user);

            cohort.setUser(users);
            return cohort == cohortRepository.save(cohort);
        }
        return false;
    }

    @Override
    public boolean addDrinkToCohort(int cohort_id, int drink_id) {
        if (cohortRepository.findById(cohort_id).isPresent()) {
            if (drinkRepository.findById(drink_id).isPresent()) {
                Cohort cohort = cohortRepository.findById(cohort_id).get();
                Set<Drink> drinks = cohort.getDrinks();
                drinks.add(drinkRepository.findById(drink_id).get());

                cohort.setDrinks(drinks);
                return cohort == cohortRepository.save(cohort);
            }
        }
        return false;
    }

    @Override
    public boolean deleteDrinkFromCohort(int cohort_id, int drink_id) {
        if (cohortRepository.findById(cohort_id).isPresent()) {
            if (drinkRepository.findById(drink_id).isPresent()) {
                Cohort cohort = cohortRepository.findById(cohort_id).get();
                Set<Drink> drinks = cohort.getDrinks();
                drinks.remove(drinkRepository.findById(drink_id).get());
                cohort.setDrinks(drinks);
                return cohort == cohortRepository.save(cohort);
            }
        }
        return false;
    }

    @Override
    public Set<Map<String, Object>> getDrinksFromCohort(int cohort_id) throws IOException {
        if (cohortRepository.findById(cohort_id).isPresent()) {
            Cohort cohort = cohortRepository.findById(cohort_id).get();
            Set<Drink> drinks = cohort.getDrinks();

            Set<Map<String, Object>> res = new HashSet<>();

            for (Drink d: drinks) {
                res.add(drinkService.findDrinkById(d.getId()));
            }
            return res;
        }
        return null;
    }

    @Override
    public Set<UserDTO> getCohortUsers(int cohort_id) {
        Set<User> users = cohortRepository.findById(cohort_id).get().getUser();
        Set<UserDTO> res = new HashSet<>();

        for (User user : users) {
            res.add(UserDTOMapper.toUserDTO(user));
        }

        return res;
    }

    @Override
    public Set<Map<String, Object>> getUserCohorts(int user_id) throws IOException {
        User user = userRepository.findById(user_id).get();
        String status = user.getStatus();
        Set<Map<String, Object>> res = new HashSet<>();

        if (status.equals("BARTENDER")) {
            Set<Cohort> cohorts = cohortRepository.findAllByInstructor(userRepository.findById(user_id).get());
            for (Cohort c : cohorts) {
                res.add(findById(c.getId()));
            }
        }
        else if (status.equals("TRAINEE")) {
            Set<Cohort> cohorts = userRepository.findById(user_id).get().getCohort();

            for (Cohort c : cohorts) {
                res.add(findById(c.getId()));
            }
        }

        return res;

    }
}
