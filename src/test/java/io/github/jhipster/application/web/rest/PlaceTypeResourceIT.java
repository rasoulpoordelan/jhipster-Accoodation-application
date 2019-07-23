package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterAccApplicationApp;
import io.github.jhipster.application.domain.PlaceType;
import io.github.jhipster.application.repository.PlaceTypeRepository;
import io.github.jhipster.application.service.PlaceTypeService;
import io.github.jhipster.application.service.dto.PlaceTypeDTO;
import io.github.jhipster.application.service.mapper.PlaceTypeMapper;
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
 * Integration tests for the {@Link PlaceTypeResource} REST controller.
 */
@SpringBootTest(classes = JhipsterAccApplicationApp.class)
public class PlaceTypeResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private PlaceTypeRepository placeTypeRepository;

    @Autowired
    private PlaceTypeMapper placeTypeMapper;

    @Autowired
    private PlaceTypeService placeTypeService;

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

    private MockMvc restPlaceTypeMockMvc;

    private PlaceType placeType;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PlaceTypeResource placeTypeResource = new PlaceTypeResource(placeTypeService);
        this.restPlaceTypeMockMvc = MockMvcBuilders.standaloneSetup(placeTypeResource)
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
    public static PlaceType createEntity(EntityManager em) {
        PlaceType placeType = new PlaceType()
            .name(DEFAULT_NAME);
        return placeType;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlaceType createUpdatedEntity(EntityManager em) {
        PlaceType placeType = new PlaceType()
            .name(UPDATED_NAME);
        return placeType;
    }

    @BeforeEach
    public void initTest() {
        placeType = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlaceType() throws Exception {
        int databaseSizeBeforeCreate = placeTypeRepository.findAll().size();

        // Create the PlaceType
        PlaceTypeDTO placeTypeDTO = placeTypeMapper.toDto(placeType);
        restPlaceTypeMockMvc.perform(post("/api/place-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(placeTypeDTO)))
            .andExpect(status().isCreated());

        // Validate the PlaceType in the database
        List<PlaceType> placeTypeList = placeTypeRepository.findAll();
        assertThat(placeTypeList).hasSize(databaseSizeBeforeCreate + 1);
        PlaceType testPlaceType = placeTypeList.get(placeTypeList.size() - 1);
        assertThat(testPlaceType.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createPlaceTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = placeTypeRepository.findAll().size();

        // Create the PlaceType with an existing ID
        placeType.setId(1L);
        PlaceTypeDTO placeTypeDTO = placeTypeMapper.toDto(placeType);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlaceTypeMockMvc.perform(post("/api/place-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(placeTypeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PlaceType in the database
        List<PlaceType> placeTypeList = placeTypeRepository.findAll();
        assertThat(placeTypeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPlaceTypes() throws Exception {
        // Initialize the database
        placeTypeRepository.saveAndFlush(placeType);

        // Get all the placeTypeList
        restPlaceTypeMockMvc.perform(get("/api/place-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(placeType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getPlaceType() throws Exception {
        // Initialize the database
        placeTypeRepository.saveAndFlush(placeType);

        // Get the placeType
        restPlaceTypeMockMvc.perform(get("/api/place-types/{id}", placeType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(placeType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPlaceType() throws Exception {
        // Get the placeType
        restPlaceTypeMockMvc.perform(get("/api/place-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlaceType() throws Exception {
        // Initialize the database
        placeTypeRepository.saveAndFlush(placeType);

        int databaseSizeBeforeUpdate = placeTypeRepository.findAll().size();

        // Update the placeType
        PlaceType updatedPlaceType = placeTypeRepository.findById(placeType.getId()).get();
        // Disconnect from session so that the updates on updatedPlaceType are not directly saved in db
        em.detach(updatedPlaceType);
        updatedPlaceType
            .name(UPDATED_NAME);
        PlaceTypeDTO placeTypeDTO = placeTypeMapper.toDto(updatedPlaceType);

        restPlaceTypeMockMvc.perform(put("/api/place-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(placeTypeDTO)))
            .andExpect(status().isOk());

        // Validate the PlaceType in the database
        List<PlaceType> placeTypeList = placeTypeRepository.findAll();
        assertThat(placeTypeList).hasSize(databaseSizeBeforeUpdate);
        PlaceType testPlaceType = placeTypeList.get(placeTypeList.size() - 1);
        assertThat(testPlaceType.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingPlaceType() throws Exception {
        int databaseSizeBeforeUpdate = placeTypeRepository.findAll().size();

        // Create the PlaceType
        PlaceTypeDTO placeTypeDTO = placeTypeMapper.toDto(placeType);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlaceTypeMockMvc.perform(put("/api/place-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(placeTypeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PlaceType in the database
        List<PlaceType> placeTypeList = placeTypeRepository.findAll();
        assertThat(placeTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlaceType() throws Exception {
        // Initialize the database
        placeTypeRepository.saveAndFlush(placeType);

        int databaseSizeBeforeDelete = placeTypeRepository.findAll().size();

        // Delete the placeType
        restPlaceTypeMockMvc.perform(delete("/api/place-types/{id}", placeType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PlaceType> placeTypeList = placeTypeRepository.findAll();
        assertThat(placeTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlaceType.class);
        PlaceType placeType1 = new PlaceType();
        placeType1.setId(1L);
        PlaceType placeType2 = new PlaceType();
        placeType2.setId(placeType1.getId());
        assertThat(placeType1).isEqualTo(placeType2);
        placeType2.setId(2L);
        assertThat(placeType1).isNotEqualTo(placeType2);
        placeType1.setId(null);
        assertThat(placeType1).isNotEqualTo(placeType2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlaceTypeDTO.class);
        PlaceTypeDTO placeTypeDTO1 = new PlaceTypeDTO();
        placeTypeDTO1.setId(1L);
        PlaceTypeDTO placeTypeDTO2 = new PlaceTypeDTO();
        assertThat(placeTypeDTO1).isNotEqualTo(placeTypeDTO2);
        placeTypeDTO2.setId(placeTypeDTO1.getId());
        assertThat(placeTypeDTO1).isEqualTo(placeTypeDTO2);
        placeTypeDTO2.setId(2L);
        assertThat(placeTypeDTO1).isNotEqualTo(placeTypeDTO2);
        placeTypeDTO1.setId(null);
        assertThat(placeTypeDTO1).isNotEqualTo(placeTypeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(placeTypeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(placeTypeMapper.fromId(null)).isNull();
    }
}
