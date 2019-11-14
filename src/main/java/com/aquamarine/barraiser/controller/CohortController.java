package com.aquamarine.barraiser.controller;


import com.aquamarine.barraiser.ApiController;
import com.aquamarine.barraiser.dto.mapper.CohortDTOMapper;
import com.aquamarine.barraiser.dto.mapper.UserDTOMapper;
import com.aquamarine.barraiser.dto.model.CohortDTO;
import com.aquamarine.barraiser.dto.model.UserDTO;
import com.aquamarine.barraiser.model.Cohort;
import com.aquamarine.barraiser.model.User;
import com.aquamarine.barraiser.security.CurrentUser;
import com.aquamarine.barraiser.security.UserPrincipal;
import com.aquamarine.barraiser.service.cohort.interfaces.CohortService;
import com.aquamarine.barraiser.service.user.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping(path="/api/cohort")
public class CohortController {

    @Autowired
    private CohortService cohortService;

    @Autowired
    private UserService userService;

    @RequestMapping(path="/addCohort", method= RequestMethod.GET)
    @PreAuthorize("hasAuthority('BARTENDER')")
    public ResponseEntity addCohort(@RequestBody CohortDTO cohortDTO) {
        cohortService.createCohort(cohortDTO);
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(path="/addTrainee", method= RequestMethod.POST)
    @PreAuthorize("hasAuthority('BARTENDER')")
    public ResponseEntity addTraineeToCohort(@RequestBody CohortDTO cohortDTO, @RequestBody UserDTO userDTO) {
        cohortService.addUserToCohort(cohortDTO, userDTO);
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(path="/deleteTrainee", method= RequestMethod.POST)
    @PreAuthorize("hasAuthority('BARTENDER')")
    public ResponseEntity deleteTraineeToCohort(@RequestBody CohortDTO cohortDTO, @RequestBody UserDTO userDTO) {
        cohortService.deleteStudentFromCohort(cohortDTO, userDTO);
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(path="/viewTrainees", method= RequestMethod.GET)
    @PreAuthorize("hasAuthority('BARTENDER')")
    public Set<UserDTO> viewTrainees(@RequestBody CohortDTO cohortDTO) {
        return cohortService.getCohortUsers(cohortDTO);
    }

    @RequestMapping(path="/viewCohorts", method= RequestMethod.GET)
    @PreAuthorize("hasAnyAuthority('BARTENDER', 'TRAINEE')")
    public Set<CohortDTO> viewCohorts(@RequestBody UserDTO userDTO) {
        return cohortService.getUserCohorts(userDTO);
    }

}
