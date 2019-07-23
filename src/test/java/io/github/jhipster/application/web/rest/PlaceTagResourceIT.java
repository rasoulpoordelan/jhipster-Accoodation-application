package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterAccApplicationApp;
import io.github.jhipster.application.domain.PlaceTag;
import io.github.jhipster.application.repository.PlaceTagRepository;
import io.github.jhipster.application.service.PlaceTagService;
import io.github.jhipster.application.service.dto.PlaceTagDTO;
import io.github.jhipster.application.service.mapper.PlaceTagMapper;
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
 * Integration tests for the {@Link PlaceTagResource} REST controller.
 */
@SpringBootTest(classes = JhipsterAccApplicationApp.class)
public class PlaceTagResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private PlaceTagRepository placeTagRepository;

    @Autowired
    private PlaceTagMapper placeTagMapper;

    @Autowired
    private PlaceTagService placeTagService;

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

    private MockMvc restPlaceTagMockMvc;

    private PlaceTag placeTag;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PlaceTagResource placeTagResource = new PlaceTagResource(placeTagService);
        this.restPlaceTagMockMvc = MockMvcBuilders.standaloneSetup(placeTagResource)
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
    public static PlaceTag createEntity(EntityManager em) {
        PlaceTag placeTag = new PlaceTag()
            .name(DEFAULT_NAME);
        return placeTag;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlaceTag createUpdatedEntity(EntityManager em) {
        PlaceTag placeTag = new PlaceTag()
            .name(UPDATED_NAME);
        return placeTag;
    }

    @BeforeEach
    public void initTest() {
        placeTag = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlaceTag() throws Exception {
        int databaseSizeBeforeCreate = placeTagRepository.findAll().size();

        // Create the PlaceTag
        PlaceTagDTO placeTagDTO = placeTagMapper.toDto(placeTag);
        restPlaceTagMockMvc.perform(post("/api/place-tags")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(placeTagDTO)))
            .andExpect(status().isCreated());

        // Validate the PlaceTag in the database
        List<PlaceTag> placeTagList = placeTagRepository.findAll();
        assertThat(placeTagList).hasSize(databaseSizeBeforeCreate + 1);
        PlaceTag testPlaceTag = placeTagList.get(placeTagList.size() - 1);
        assertThat(testPlaceTag.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createPlaceTagWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = placeTagRepository.findAll().size();

        // Create the PlaceTag with an existing ID
        placeTag.setId(1L);
        PlaceTagDTO placeTagDTO = placeTagMapper.toDto(placeTag);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlaceTagMockMvc.perform(post("/api/place-tags")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(placeTagDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PlaceTag in the database
        List<PlaceTag> placeTagList = placeTagRepository.findAll();
        assertThat(placeTagList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPlaceTags() throws Exception {
        // Initialize the database
        placeTagRepository.saveAndFlush(placeTag);

        // Get all the placeTagList
        restPlaceTagMockMvc.perform(get("/api/place-tags?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(placeTag.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getPlaceTag() throws Exception {
        // Initialize the database
        placeTagRepository.saveAndFlush(placeTag);

        // Get the placeTag
        restPlaceTagMockMvc.perform(get("/api/place-tags/{id}", placeTag.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(placeTag.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPlaceTag() throws Exception {
        // Get the placeTag
        restPlaceTagMockMvc.perform(get("/api/place-tags/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlaceTag() throws Exception {
        // Initialize the database
        placeTagRepository.saveAndFlush(placeTag);

        int databaseSizeBeforeUpdate = placeTagRepository.findAll().size();

        // Update the placeTag
        PlaceTag updatedPlaceTag = placeTagRepository.findById(placeTag.getId()).get();
        // Disconnect from session so that the updates on updatedPlaceTag are not directly saved in db
        em.detach(updatedPlaceTag);
        updatedPlaceTag
            .name(UPDATED_NAME);
        PlaceTagDTO placeTagDTO = placeTagMapper.toDto(updatedPlaceTag);

        restPlaceTagMockMvc.perform(put("/api/place-tags")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(placeTagDTO)))
            .andExpect(status().isOk());

        // Validate the PlaceTag in the database
        List<PlaceTag> placeTagList = placeTagRepository.findAll();
        assertThat(placeTagList).hasSize(databaseSizeBeforeUpdate);
        PlaceTag testPlaceTag = placeTagList.get(placeTagList.size() - 1);
        assertThat(testPlaceTag.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingPlaceTag() throws Exception {
        int databaseSizeBeforeUpdate = placeTagRepository.findAll().size();

        // Create the PlaceTag
        PlaceTagDTO placeTagDTO = placeTagMapper.toDto(placeTag);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlaceTagMockMvc.perform(put("/api/place-tags")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(placeTagDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PlaceTag in the database
        List<PlaceTag> placeTagList = placeTagRepository.findAll();
        assertThat(placeTagList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlaceTag() throws Exception {
        // Initialize the database
        placeTagRepository.saveAndFlush(placeTag);

        int databaseSizeBeforeDelete = placeTagRepository.findAll().size();

        // Delete the placeTag
        restPlaceTagMockMvc.perform(delete("/api/place-tags/{id}", placeTag.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PlaceTag> placeTagList = placeTagRepository.findAll();
        assertThat(placeTagList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlaceTag.class);
        PlaceTag placeTag1 = new PlaceTag();
        placeTag1.setId(1L);
        PlaceTag placeTag2 = new PlaceTag();
        placeTag2.setId(placeTag1.getId());
        assertThat(placeTag1).isEqualTo(placeTag2);
        placeTag2.setId(2L);
        assertThat(placeTag1).isNotEqualTo(placeTag2);
        placeTag1.setId(null);
        assertThat(placeTag1).isNotEqualTo(placeTag2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlaceTagDTO.class);
        PlaceTagDTO placeTagDTO1 = new PlaceTagDTO();
        placeTagDTO1.setId(1L);
        PlaceTagDTO placeTagDTO2 = new PlaceTagDTO();
        assertThat(placeTagDTO1).isNotEqualTo(placeTagDTO2);
        placeTagDTO2.setId(placeTagDTO1.getId());
        assertThat(placeTagDTO1).isEqualTo(placeTagDTO2);
        placeTagDTO2.setId(2L);
        assertThat(placeTagDTO1).isNotEqualTo(placeTagDTO2);
        placeTagDTO1.setId(null);
        assertThat(placeTagDTO1).isNotEqualTo(placeTagDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(placeTagMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(placeTagMapper.fromId(null)).isNull();
    }
}
