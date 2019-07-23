package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterAccApplicationApp;
import io.github.jhipster.application.domain.PlaceCategory;
import io.github.jhipster.application.repository.PlaceCategoryRepository;
import io.github.jhipster.application.service.PlaceCategoryService;
import io.github.jhipster.application.service.dto.PlaceCategoryDTO;
import io.github.jhipster.application.service.mapper.PlaceCategoryMapper;
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
 * Integration tests for the {@Link PlaceCategoryResource} REST controller.
 */
@SpringBootTest(classes = JhipsterAccApplicationApp.class)
public class PlaceCategoryResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private PlaceCategoryRepository placeCategoryRepository;

    @Autowired
    private PlaceCategoryMapper placeCategoryMapper;

    @Autowired
    private PlaceCategoryService placeCategoryService;

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

    private MockMvc restPlaceCategoryMockMvc;

    private PlaceCategory placeCategory;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PlaceCategoryResource placeCategoryResource = new PlaceCategoryResource(placeCategoryService);
        this.restPlaceCategoryMockMvc = MockMvcBuilders.standaloneSetup(placeCategoryResource)
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
    public static PlaceCategory createEntity(EntityManager em) {
        PlaceCategory placeCategory = new PlaceCategory()
            .name(DEFAULT_NAME);
        return placeCategory;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlaceCategory createUpdatedEntity(EntityManager em) {
        PlaceCategory placeCategory = new PlaceCategory()
            .name(UPDATED_NAME);
        return placeCategory;
    }

    @BeforeEach
    public void initTest() {
        placeCategory = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlaceCategory() throws Exception {
        int databaseSizeBeforeCreate = placeCategoryRepository.findAll().size();

        // Create the PlaceCategory
        PlaceCategoryDTO placeCategoryDTO = placeCategoryMapper.toDto(placeCategory);
        restPlaceCategoryMockMvc.perform(post("/api/place-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(placeCategoryDTO)))
            .andExpect(status().isCreated());

        // Validate the PlaceCategory in the database
        List<PlaceCategory> placeCategoryList = placeCategoryRepository.findAll();
        assertThat(placeCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        PlaceCategory testPlaceCategory = placeCategoryList.get(placeCategoryList.size() - 1);
        assertThat(testPlaceCategory.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createPlaceCategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = placeCategoryRepository.findAll().size();

        // Create the PlaceCategory with an existing ID
        placeCategory.setId(1L);
        PlaceCategoryDTO placeCategoryDTO = placeCategoryMapper.toDto(placeCategory);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlaceCategoryMockMvc.perform(post("/api/place-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(placeCategoryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PlaceCategory in the database
        List<PlaceCategory> placeCategoryList = placeCategoryRepository.findAll();
        assertThat(placeCategoryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPlaceCategories() throws Exception {
        // Initialize the database
        placeCategoryRepository.saveAndFlush(placeCategory);

        // Get all the placeCategoryList
        restPlaceCategoryMockMvc.perform(get("/api/place-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(placeCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getPlaceCategory() throws Exception {
        // Initialize the database
        placeCategoryRepository.saveAndFlush(placeCategory);

        // Get the placeCategory
        restPlaceCategoryMockMvc.perform(get("/api/place-categories/{id}", placeCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(placeCategory.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPlaceCategory() throws Exception {
        // Get the placeCategory
        restPlaceCategoryMockMvc.perform(get("/api/place-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlaceCategory() throws Exception {
        // Initialize the database
        placeCategoryRepository.saveAndFlush(placeCategory);

        int databaseSizeBeforeUpdate = placeCategoryRepository.findAll().size();

        // Update the placeCategory
        PlaceCategory updatedPlaceCategory = placeCategoryRepository.findById(placeCategory.getId()).get();
        // Disconnect from session so that the updates on updatedPlaceCategory are not directly saved in db
        em.detach(updatedPlaceCategory);
        updatedPlaceCategory
            .name(UPDATED_NAME);
        PlaceCategoryDTO placeCategoryDTO = placeCategoryMapper.toDto(updatedPlaceCategory);

        restPlaceCategoryMockMvc.perform(put("/api/place-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(placeCategoryDTO)))
            .andExpect(status().isOk());

        // Validate the PlaceCategory in the database
        List<PlaceCategory> placeCategoryList = placeCategoryRepository.findAll();
        assertThat(placeCategoryList).hasSize(databaseSizeBeforeUpdate);
        PlaceCategory testPlaceCategory = placeCategoryList.get(placeCategoryList.size() - 1);
        assertThat(testPlaceCategory.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingPlaceCategory() throws Exception {
        int databaseSizeBeforeUpdate = placeCategoryRepository.findAll().size();

        // Create the PlaceCategory
        PlaceCategoryDTO placeCategoryDTO = placeCategoryMapper.toDto(placeCategory);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlaceCategoryMockMvc.perform(put("/api/place-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(placeCategoryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PlaceCategory in the database
        List<PlaceCategory> placeCategoryList = placeCategoryRepository.findAll();
        assertThat(placeCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlaceCategory() throws Exception {
        // Initialize the database
        placeCategoryRepository.saveAndFlush(placeCategory);

        int databaseSizeBeforeDelete = placeCategoryRepository.findAll().size();

        // Delete the placeCategory
        restPlaceCategoryMockMvc.perform(delete("/api/place-categories/{id}", placeCategory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PlaceCategory> placeCategoryList = placeCategoryRepository.findAll();
        assertThat(placeCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlaceCategory.class);
        PlaceCategory placeCategory1 = new PlaceCategory();
        placeCategory1.setId(1L);
        PlaceCategory placeCategory2 = new PlaceCategory();
        placeCategory2.setId(placeCategory1.getId());
        assertThat(placeCategory1).isEqualTo(placeCategory2);
        placeCategory2.setId(2L);
        assertThat(placeCategory1).isNotEqualTo(placeCategory2);
        placeCategory1.setId(null);
        assertThat(placeCategory1).isNotEqualTo(placeCategory2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlaceCategoryDTO.class);
        PlaceCategoryDTO placeCategoryDTO1 = new PlaceCategoryDTO();
        placeCategoryDTO1.setId(1L);
        PlaceCategoryDTO placeCategoryDTO2 = new PlaceCategoryDTO();
        assertThat(placeCategoryDTO1).isNotEqualTo(placeCategoryDTO2);
        placeCategoryDTO2.setId(placeCategoryDTO1.getId());
        assertThat(placeCategoryDTO1).isEqualTo(placeCategoryDTO2);
        placeCategoryDTO2.setId(2L);
        assertThat(placeCategoryDTO1).isNotEqualTo(placeCategoryDTO2);
        placeCategoryDTO1.setId(null);
        assertThat(placeCategoryDTO1).isNotEqualTo(placeCategoryDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(placeCategoryMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(placeCategoryMapper.fromId(null)).isNull();
    }
}
