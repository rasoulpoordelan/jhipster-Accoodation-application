package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterAccApplicationApp;
import io.github.jhipster.application.domain.PlaceArea;
import io.github.jhipster.application.repository.PlaceAreaRepository;
import io.github.jhipster.application.service.PlaceAreaService;
import io.github.jhipster.application.service.dto.PlaceAreaDTO;
import io.github.jhipster.application.service.mapper.PlaceAreaMapper;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link PlaceAreaResource} REST controller.
 */
@SpringBootTest(classes = JhipsterAccApplicationApp.class)
public class PlaceAreaResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private PlaceAreaRepository placeAreaRepository;

    @Autowired
    private PlaceAreaMapper placeAreaMapper;

    @Autowired
    private PlaceAreaService placeAreaService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restPlaceAreaMockMvc;

    private PlaceArea placeArea;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PlaceAreaResource placeAreaResource = new PlaceAreaResource(placeAreaService);
        this.restPlaceAreaMockMvc = MockMvcBuilders.standaloneSetup(placeAreaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlaceArea createEntity(EntityManager em) {
        PlaceArea placeArea = new PlaceArea()
            .name(DEFAULT_NAME);
        return placeArea;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlaceArea createUpdatedEntity(EntityManager em) {
        PlaceArea placeArea = new PlaceArea()
            .name(UPDATED_NAME);
        return placeArea;
    }

    @BeforeEach
    public void initTest() {
        placeArea = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlaceArea() throws Exception {
        int databaseSizeBeforeCreate = placeAreaRepository.findAll().size();

        // Create the PlaceArea
        PlaceAreaDTO placeAreaDTO = placeAreaMapper.toDto(placeArea);
        restPlaceAreaMockMvc.perform(post("/api/place-areas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(placeAreaDTO)))
            .andExpect(status().isCreated());

        // Validate the PlaceArea in the database
        List<PlaceArea> placeAreaList = placeAreaRepository.findAll();
        assertThat(placeAreaList).hasSize(databaseSizeBeforeCreate + 1);
        PlaceArea testPlaceArea = placeAreaList.get(placeAreaList.size() - 1);
        assertThat(testPlaceArea.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createPlaceAreaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = placeAreaRepository.findAll().size();

        // Create the PlaceArea with an existing ID
        placeArea.setId(1L);
        PlaceAreaDTO placeAreaDTO = placeAreaMapper.toDto(placeArea);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlaceAreaMockMvc.perform(post("/api/place-areas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(placeAreaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PlaceArea in the database
        List<PlaceArea> placeAreaList = placeAreaRepository.findAll();
        assertThat(placeAreaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPlaceAreas() throws Exception {
        // Initialize the database
        placeAreaRepository.saveAndFlush(placeArea);

        // Get all the placeAreaList
        restPlaceAreaMockMvc.perform(get("/api/place-areas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(placeArea.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getPlaceArea() throws Exception {
        // Initialize the database
        placeAreaRepository.saveAndFlush(placeArea);

        // Get the placeArea
        restPlaceAreaMockMvc.perform(get("/api/place-areas/{id}", placeArea.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(placeArea.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPlaceArea() throws Exception {
        // Get the placeArea
        restPlaceAreaMockMvc.perform(get("/api/place-areas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlaceArea() throws Exception {
        // Initialize the database
        placeAreaRepository.saveAndFlush(placeArea);

        int databaseSizeBeforeUpdate = placeAreaRepository.findAll().size();

        // Update the placeArea
        PlaceArea updatedPlaceArea = placeAreaRepository.findById(placeArea.getId()).get();
        // Disconnect from session so that the updates on updatedPlaceArea are not directly saved in db
        em.detach(updatedPlaceArea);
        updatedPlaceArea
            .name(UPDATED_NAME);
        PlaceAreaDTO placeAreaDTO = placeAreaMapper.toDto(updatedPlaceArea);

        restPlaceAreaMockMvc.perform(put("/api/place-areas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(placeAreaDTO)))
            .andExpect(status().isOk());

        // Validate the PlaceArea in the database
        List<PlaceArea> placeAreaList = placeAreaRepository.findAll();
        assertThat(placeAreaList).hasSize(databaseSizeBeforeUpdate);
        PlaceArea testPlaceArea = placeAreaList.get(placeAreaList.size() - 1);
        assertThat(testPlaceArea.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingPlaceArea() throws Exception {
        int databaseSizeBeforeUpdate = placeAreaRepository.findAll().size();

        // Create the PlaceArea
        PlaceAreaDTO placeAreaDTO = placeAreaMapper.toDto(placeArea);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlaceAreaMockMvc.perform(put("/api/place-areas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(placeAreaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PlaceArea in the database
        List<PlaceArea> placeAreaList = placeAreaRepository.findAll();
        assertThat(placeAreaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlaceArea() throws Exception {
        // Initialize the database
        placeAreaRepository.saveAndFlush(placeArea);

        int databaseSizeBeforeDelete = placeAreaRepository.findAll().size();

        // Delete the placeArea
        restPlaceAreaMockMvc.perform(delete("/api/place-areas/{id}", placeArea.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PlaceArea> placeAreaList = placeAreaRepository.findAll();
        assertThat(placeAreaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlaceArea.class);
        PlaceArea placeArea1 = new PlaceArea();
        placeArea1.setId(1L);
        PlaceArea placeArea2 = new PlaceArea();
        placeArea2.setId(placeArea1.getId());
        assertThat(placeArea1).isEqualTo(placeArea2);
        placeArea2.setId(2L);
        assertThat(placeArea1).isNotEqualTo(placeArea2);
        placeArea1.setId(null);
        assertThat(placeArea1).isNotEqualTo(placeArea2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlaceAreaDTO.class);
        PlaceAreaDTO placeAreaDTO1 = new PlaceAreaDTO();
        placeAreaDTO1.setId(1L);
        PlaceAreaDTO placeAreaDTO2 = new PlaceAreaDTO();
        assertThat(placeAreaDTO1).isNotEqualTo(placeAreaDTO2);
        placeAreaDTO2.setId(placeAreaDTO1.getId());
        assertThat(placeAreaDTO1).isEqualTo(placeAreaDTO2);
        placeAreaDTO2.setId(2L);
        assertThat(placeAreaDTO1).isNotEqualTo(placeAreaDTO2);
        placeAreaDTO1.setId(null);
        assertThat(placeAreaDTO1).isNotEqualTo(placeAreaDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(placeAreaMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(placeAreaMapper.fromId(null)).isNull();
    }
}
