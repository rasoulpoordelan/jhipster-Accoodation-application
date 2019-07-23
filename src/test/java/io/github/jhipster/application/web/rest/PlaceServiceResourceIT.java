package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterAccApplicationApp;
import io.github.jhipster.application.domain.PlaceService;
import io.github.jhipster.application.repository.PlaceServiceRepository;
import io.github.jhipster.application.service.PlaceServiceService;
import io.github.jhipster.application.service.dto.PlaceServiceDTO;
import io.github.jhipster.application.service.mapper.PlaceServiceMapper;
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
 * Integration tests for the {@Link PlaceServiceResource} REST controller.
 */
@SpringBootTest(classes = JhipsterAccApplicationApp.class)
public class PlaceServiceResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Double DEFAULT_PRICE = 1D;
    private static final Double UPDATED_PRICE = 2D;

    @Autowired
    private PlaceServiceRepository placeServiceRepository;

    @Autowired
    private PlaceServiceMapper placeServiceMapper;

    @Autowired
    private PlaceServiceService placeServiceService;

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

    private MockMvc restPlaceServiceMockMvc;

    private PlaceService placeService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PlaceServiceResource placeServiceResource = new PlaceServiceResource(placeServiceService);
        this.restPlaceServiceMockMvc = MockMvcBuilders.standaloneSetup(placeServiceResource)
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
    public static PlaceService createEntity(EntityManager em) {
        PlaceService placeService = new PlaceService()
            .name(DEFAULT_NAME)
            .price(DEFAULT_PRICE);
        return placeService;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlaceService createUpdatedEntity(EntityManager em) {
        PlaceService placeService = new PlaceService()
            .name(UPDATED_NAME)
            .price(UPDATED_PRICE);
        return placeService;
    }

    @BeforeEach
    public void initTest() {
        placeService = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlaceService() throws Exception {
        int databaseSizeBeforeCreate = placeServiceRepository.findAll().size();

        // Create the PlaceService
        PlaceServiceDTO placeServiceDTO = placeServiceMapper.toDto(placeService);
        restPlaceServiceMockMvc.perform(post("/api/place-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(placeServiceDTO)))
            .andExpect(status().isCreated());

        // Validate the PlaceService in the database
        List<PlaceService> placeServiceList = placeServiceRepository.findAll();
        assertThat(placeServiceList).hasSize(databaseSizeBeforeCreate + 1);
        PlaceService testPlaceService = placeServiceList.get(placeServiceList.size() - 1);
        assertThat(testPlaceService.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPlaceService.getPrice()).isEqualTo(DEFAULT_PRICE);
    }

    @Test
    @Transactional
    public void createPlaceServiceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = placeServiceRepository.findAll().size();

        // Create the PlaceService with an existing ID
        placeService.setId(1L);
        PlaceServiceDTO placeServiceDTO = placeServiceMapper.toDto(placeService);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlaceServiceMockMvc.perform(post("/api/place-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(placeServiceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PlaceService in the database
        List<PlaceService> placeServiceList = placeServiceRepository.findAll();
        assertThat(placeServiceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPlaceServices() throws Exception {
        // Initialize the database
        placeServiceRepository.saveAndFlush(placeService);

        // Get all the placeServiceList
        restPlaceServiceMockMvc.perform(get("/api/place-services?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(placeService.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getPlaceService() throws Exception {
        // Initialize the database
        placeServiceRepository.saveAndFlush(placeService);

        // Get the placeService
        restPlaceServiceMockMvc.perform(get("/api/place-services/{id}", placeService.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(placeService.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPlaceService() throws Exception {
        // Get the placeService
        restPlaceServiceMockMvc.perform(get("/api/place-services/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlaceService() throws Exception {
        // Initialize the database
        placeServiceRepository.saveAndFlush(placeService);

        int databaseSizeBeforeUpdate = placeServiceRepository.findAll().size();

        // Update the placeService
        PlaceService updatedPlaceService = placeServiceRepository.findById(placeService.getId()).get();
        // Disconnect from session so that the updates on updatedPlaceService are not directly saved in db
        em.detach(updatedPlaceService);
        updatedPlaceService
            .name(UPDATED_NAME)
            .price(UPDATED_PRICE);
        PlaceServiceDTO placeServiceDTO = placeServiceMapper.toDto(updatedPlaceService);

        restPlaceServiceMockMvc.perform(put("/api/place-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(placeServiceDTO)))
            .andExpect(status().isOk());

        // Validate the PlaceService in the database
        List<PlaceService> placeServiceList = placeServiceRepository.findAll();
        assertThat(placeServiceList).hasSize(databaseSizeBeforeUpdate);
        PlaceService testPlaceService = placeServiceList.get(placeServiceList.size() - 1);
        assertThat(testPlaceService.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPlaceService.getPrice()).isEqualTo(UPDATED_PRICE);
    }

    @Test
    @Transactional
    public void updateNonExistingPlaceService() throws Exception {
        int databaseSizeBeforeUpdate = placeServiceRepository.findAll().size();

        // Create the PlaceService
        PlaceServiceDTO placeServiceDTO = placeServiceMapper.toDto(placeService);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlaceServiceMockMvc.perform(put("/api/place-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(placeServiceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PlaceService in the database
        List<PlaceService> placeServiceList = placeServiceRepository.findAll();
        assertThat(placeServiceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlaceService() throws Exception {
        // Initialize the database
        placeServiceRepository.saveAndFlush(placeService);

        int databaseSizeBeforeDelete = placeServiceRepository.findAll().size();

        // Delete the placeService
        restPlaceServiceMockMvc.perform(delete("/api/place-services/{id}", placeService.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PlaceService> placeServiceList = placeServiceRepository.findAll();
        assertThat(placeServiceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlaceService.class);
        PlaceService placeService1 = new PlaceService();
        placeService1.setId(1L);
        PlaceService placeService2 = new PlaceService();
        placeService2.setId(placeService1.getId());
        assertThat(placeService1).isEqualTo(placeService2);
        placeService2.setId(2L);
        assertThat(placeService1).isNotEqualTo(placeService2);
        placeService1.setId(null);
        assertThat(placeService1).isNotEqualTo(placeService2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlaceServiceDTO.class);
        PlaceServiceDTO placeServiceDTO1 = new PlaceServiceDTO();
        placeServiceDTO1.setId(1L);
        PlaceServiceDTO placeServiceDTO2 = new PlaceServiceDTO();
        assertThat(placeServiceDTO1).isNotEqualTo(placeServiceDTO2);
        placeServiceDTO2.setId(placeServiceDTO1.getId());
        assertThat(placeServiceDTO1).isEqualTo(placeServiceDTO2);
        placeServiceDTO2.setId(2L);
        assertThat(placeServiceDTO1).isNotEqualTo(placeServiceDTO2);
        placeServiceDTO1.setId(null);
        assertThat(placeServiceDTO1).isNotEqualTo(placeServiceDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(placeServiceMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(placeServiceMapper.fromId(null)).isNull();
    }
}
