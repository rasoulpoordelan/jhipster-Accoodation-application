package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterAccApplicationApp;
import io.github.jhipster.application.domain.Service;
import io.github.jhipster.application.repository.ServiceRepository;
import io.github.jhipster.application.service.ServiceService;
import io.github.jhipster.application.service.dto.ServiceDTO;
import io.github.jhipster.application.service.mapper.ServiceMapper;
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
 * Integration tests for the {@Link ServiceResource} REST controller.
 */
@SpringBootTest(classes = JhipsterAccApplicationApp.class)
public class ServiceResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private ServiceMapper serviceMapper;

    @Autowired
    private ServiceService serviceService;

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

    private MockMvc restServiceMockMvc;

    private Service service;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ServiceResource serviceResource = new ServiceResource(serviceService);
        this.restServiceMockMvc = MockMvcBuilders.standaloneSetup(serviceResource)
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
    public static Service createEntity(EntityManager em) {
        Service service = new Service()
            .name(DEFAULT_NAME);
        return service;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Service createUpdatedEntity(EntityManager em) {
        Service service = new Service()
            .name(UPDATED_NAME);
        return service;
    }

    @BeforeEach
    public void initTest() {
        service = createEntity(em);
    }

    @Test
    @Transactional
    public void createService() throws Exception {
        int databaseSizeBeforeCreate = serviceRepository.findAll().size();

        // Create the Service
        ServiceDTO serviceDTO = serviceMapper.toDto(service);
        restServiceMockMvc.perform(post("/api/services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceDTO)))
            .andExpect(status().isCreated());

        // Validate the Service in the database
        List<Service> serviceList = serviceRepository.findAll();
        assertThat(serviceList).hasSize(databaseSizeBeforeCreate + 1);
        Service testService = serviceList.get(serviceList.size() - 1);
        assertThat(testService.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createServiceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = serviceRepository.findAll().size();

        // Create the Service with an existing ID
        service.setId(1L);
        ServiceDTO serviceDTO = serviceMapper.toDto(service);

        // An entity with an existing ID cannot be created, so this API call must fail
        restServiceMockMvc.perform(post("/api/services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Service in the database
        List<Service> serviceList = serviceRepository.findAll();
        assertThat(serviceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllServices() throws Exception {
        // Initialize the database
        serviceRepository.saveAndFlush(service);

        // Get all the serviceList
        restServiceMockMvc.perform(get("/api/services?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(service.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getService() throws Exception {
        // Initialize the database
        serviceRepository.saveAndFlush(service);

        // Get the service
        restServiceMockMvc.perform(get("/api/services/{id}", service.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(service.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingService() throws Exception {
        // Get the service
        restServiceMockMvc.perform(get("/api/services/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateService() throws Exception {
        // Initialize the database
        serviceRepository.saveAndFlush(service);

        int databaseSizeBeforeUpdate = serviceRepository.findAll().size();

        // Update the service
        Service updatedService = serviceRepository.findById(service.getId()).get();
        // Disconnect from session so that the updates on updatedService are not directly saved in db
        em.detach(updatedService);
        updatedService
            .name(UPDATED_NAME);
        ServiceDTO serviceDTO = serviceMapper.toDto(updatedService);

        restServiceMockMvc.perform(put("/api/services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceDTO)))
            .andExpect(status().isOk());

        // Validate the Service in the database
        List<Service> serviceList = serviceRepository.findAll();
        assertThat(serviceList).hasSize(databaseSizeBeforeUpdate);
        Service testService = serviceList.get(serviceList.size() - 1);
        assertThat(testService.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingService() throws Exception {
        int databaseSizeBeforeUpdate = serviceRepository.findAll().size();

        // Create the Service
        ServiceDTO serviceDTO = serviceMapper.toDto(service);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restServiceMockMvc.perform(put("/api/services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Service in the database
        List<Service> serviceList = serviceRepository.findAll();
        assertThat(serviceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteService() throws Exception {
        // Initialize the database
        serviceRepository.saveAndFlush(service);

        int databaseSizeBeforeDelete = serviceRepository.findAll().size();

        // Delete the service
        restServiceMockMvc.perform(delete("/api/services/{id}", service.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Service> serviceList = serviceRepository.findAll();
        assertThat(serviceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Service.class);
        Service service1 = new Service();
        service1.setId(1L);
        Service service2 = new Service();
        service2.setId(service1.getId());
        assertThat(service1).isEqualTo(service2);
        service2.setId(2L);
        assertThat(service1).isNotEqualTo(service2);
        service1.setId(null);
        assertThat(service1).isNotEqualTo(service2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ServiceDTO.class);
        ServiceDTO serviceDTO1 = new ServiceDTO();
        serviceDTO1.setId(1L);
        ServiceDTO serviceDTO2 = new ServiceDTO();
        assertThat(serviceDTO1).isNotEqualTo(serviceDTO2);
        serviceDTO2.setId(serviceDTO1.getId());
        assertThat(serviceDTO1).isEqualTo(serviceDTO2);
        serviceDTO2.setId(2L);
        assertThat(serviceDTO1).isNotEqualTo(serviceDTO2);
        serviceDTO1.setId(null);
        assertThat(serviceDTO1).isNotEqualTo(serviceDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(serviceMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(serviceMapper.fromId(null)).isNull();
    }
}
