package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterAccApplicationApp;
import io.github.jhipster.application.domain.Place;
import io.github.jhipster.application.repository.PlaceRepository;
import io.github.jhipster.application.service.PlaceService;
import io.github.jhipster.application.service.dto.PlaceDTO;
import io.github.jhipster.application.service.mapper.PlaceMapper;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link PlaceResource} REST controller.
 */
@SpringBootTest(classes = JhipsterAccApplicationApp.class)
public class PlaceResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_KEY = "AAAAAAAAAA";
    private static final String UPDATED_KEY = "BBBBBBBBBB";

    private static final String DEFAULT_PLACE_OWNER_ID = "AAAAAAAAAA";
    private static final String UPDATED_PLACE_OWNER_ID = "BBBBBBBBBB";

    private static final Integer DEFAULT_CLASS_CO = 1;
    private static final Integer UPDATED_CLASS_CO = 2;

    private static final String DEFAULT_CLASS_EXTRA = "AAAAAAAAAA";
    private static final String UPDATED_CLASS_EXTRA = "BBBBBBBBBB";

    private static final String DEFAULT_META_KEYWORDS = "AAAAAAAAAA";
    private static final String UPDATED_META_KEYWORDS = "BBBBBBBBBB";

    private static final String DEFAULT_META_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_META_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_PAGE_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_PAGE_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_CITY_ID = "AAAAAAAAAA";
    private static final String UPDATED_CITY_ID = "BBBBBBBBBB";

    private static final Integer DEFAULT_PLACE_AREA_ID = 1;
    private static final Integer UPDATED_PLACE_AREA_ID = 2;

    private static final String DEFAULT_ADDRESS_LINE_1 = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_LINE_1 = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS_LINE_2 = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_LINE_2 = "BBBBBBBBBB";

    private static final String DEFAULT_LOCATION = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE_1 = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_1 = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE_2 = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_2 = "BBBBBBBBBB";

    private static final String DEFAULT_FAX = "AAAAAAAAAA";
    private static final String UPDATED_FAX = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_VISIBLE = false;
    private static final Boolean UPDATED_IS_VISIBLE = true;

    private static final Integer DEFAULT_DEFAULT_IMAGE_ID = 1;
    private static final Integer UPDATED_DEFAULT_IMAGE_ID = 2;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_RULES_AND_REGULATIONS = "AAAAAAAAAA";
    private static final String UPDATED_RULES_AND_REGULATIONS = "BBBBBBBBBB";

    private static final String DEFAULT_SELECT_REASON = "AAAAAAAAAA";
    private static final String UPDATED_SELECT_REASON = "BBBBBBBBBB";

    private static final String DEFAULT_REVIEW = "AAAAAAAAAA";
    private static final String UPDATED_REVIEW = "BBBBBBBBBB";

    private static final Integer DEFAULT_CHECKIN_HOUR = 1;
    private static final Integer UPDATED_CHECKIN_HOUR = 2;

    private static final Integer DEFAULT_CHECKOUT_HOUR = 1;
    private static final Integer UPDATED_CHECKOUT_HOUR = 2;

    private static final Integer DEFAULT_PRIORITY = 1;
    private static final Integer UPDATED_PRIORITY = 2;

    private static final Integer DEFAULT_TOTAL_SCORE = 1;
    private static final Integer UPDATED_TOTAL_SCORE = 2;

    private static final Double DEFAULT_EXTRA_PERSON_PRICE = 1D;
    private static final Double UPDATED_EXTRA_PERSON_PRICE = 2D;

    private static final Double DEFAULT_HALF_CHARGE_CHECK_IN = 1D;
    private static final Double UPDATED_HALF_CHARGE_CHECK_IN = 2D;

    private static final Double DEFAULT_HALF_CHARGE_CHECK_OUT = 1D;
    private static final Double UPDATED_HALF_CHARGE_CHECK_OUT = 2D;

    private static final String DEFAULT_DEFAULT_VIDEO_URL = "AAAAAAAAAA";
    private static final String UPDATED_DEFAULT_VIDEO_URL = "BBBBBBBBBB";

    private static final String DEFAULT_VIRTUAL_TOUR_URL = "AAAAAAAAAA";
    private static final String UPDATED_VIRTUAL_TOUR_URL = "BBBBBBBBBB";

    private static final String DEFAULT_POSTAL_CODE = "AAAAAAAAAA";
    private static final String UPDATED_POSTAL_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_CANCELLATION_POLICY = "AAAAAAAAAA";
    private static final String UPDATED_CANCELLATION_POLICY = "BBBBBBBBBB";

    private static final Integer DEFAULT_BEDROOM = 1;
    private static final Integer UPDATED_BEDROOM = 2;

    private static final Integer DEFAULT_BATH_ROOM = 1;
    private static final Integer UPDATED_BATH_ROOM = 2;

    private static final Integer DEFAULT_LAVATORY = 1;
    private static final Integer UPDATED_LAVATORY = 2;

    private static final Integer DEFAULT_W_C = 1;
    private static final Integer UPDATED_W_C = 2;

    private static final Integer DEFAULT_INFRASTRUCTURE_AREA = 1;
    private static final Integer UPDATED_INFRASTRUCTURE_AREA = 2;

    private static final Integer DEFAULT_TOTAL_AREA = 1;
    private static final Integer UPDATED_TOTAL_AREA = 2;

    private static final Integer DEFAULT_CAPACITY = 1;
    private static final Integer UPDATED_CAPACITY = 2;

    private static final Integer DEFAULT_MAX_CAPACITY = 1;
    private static final Integer UPDATED_MAX_CAPACITY = 2;

    private static final String DEFAULT_REGISTRATION_SOURCE = "AAAAAAAAAA";
    private static final String UPDATED_REGISTRATION_SOURCE = "BBBBBBBBBB";

    private static final Integer DEFAULT_BOOKING_POLICY = 1;
    private static final Integer UPDATED_BOOKING_POLICY = 2;

    private static final Integer DEFAULT_REVIEW_STATUS = 1;
    private static final Integer UPDATED_REVIEW_STATUS = 2;

    private static final Integer DEFAULT_STATUS = 1;
    private static final Integer UPDATED_STATUS = 2;

    private static final Double DEFAULT_BASE_PRICE = 1D;
    private static final Double UPDATED_BASE_PRICE = 2D;

    private static final Double DEFAULT_COMMISSION = 1D;
    private static final Double UPDATED_COMMISSION = 2D;

    @Autowired
    private PlaceRepository placeRepository;

    @Mock
    private PlaceRepository placeRepositoryMock;

    @Autowired
    private PlaceMapper placeMapper;

    @Mock
    private PlaceService placeServiceMock;

    @Autowired
    private PlaceService placeService;

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

    private MockMvc restPlaceMockMvc;

    private Place place;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PlaceResource placeResource = new PlaceResource(placeService);
        this.restPlaceMockMvc = MockMvcBuilders.standaloneSetup(placeResource)
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
    public static Place createEntity(EntityManager em) {
        Place place = new Place()
            .name(DEFAULT_NAME)
            .key(DEFAULT_KEY)
            .placeOwnerId(DEFAULT_PLACE_OWNER_ID)
            .classCo(DEFAULT_CLASS_CO)
            .classExtra(DEFAULT_CLASS_EXTRA)
            .metaKeywords(DEFAULT_META_KEYWORDS)
            .metaDescription(DEFAULT_META_DESCRIPTION)
            .pageTitle(DEFAULT_PAGE_TITLE)
            .cityId(DEFAULT_CITY_ID)
            .placeAreaId(DEFAULT_PLACE_AREA_ID)
            .addressLine1(DEFAULT_ADDRESS_LINE_1)
            .addressLine2(DEFAULT_ADDRESS_LINE_2)
            .location(DEFAULT_LOCATION)
            .phone1(DEFAULT_PHONE_1)
            .phone2(DEFAULT_PHONE_2)
            .fax(DEFAULT_FAX)
            .isVisible(DEFAULT_IS_VISIBLE)
            .defaultImageId(DEFAULT_DEFAULT_IMAGE_ID)
            .description(DEFAULT_DESCRIPTION)
            .rulesAndRegulations(DEFAULT_RULES_AND_REGULATIONS)
            .selectReason(DEFAULT_SELECT_REASON)
            .review(DEFAULT_REVIEW)
            .checkinHour(DEFAULT_CHECKIN_HOUR)
            .checkoutHour(DEFAULT_CHECKOUT_HOUR)
            .priority(DEFAULT_PRIORITY)
            .totalScore(DEFAULT_TOTAL_SCORE)
            .extraPersonPrice(DEFAULT_EXTRA_PERSON_PRICE)
            .halfChargeCheckIn(DEFAULT_HALF_CHARGE_CHECK_IN)
            .halfChargeCheckOut(DEFAULT_HALF_CHARGE_CHECK_OUT)
            .defaultVideoUrl(DEFAULT_DEFAULT_VIDEO_URL)
            .virtualTourUrl(DEFAULT_VIRTUAL_TOUR_URL)
            .postalCode(DEFAULT_POSTAL_CODE)
            .cancellationPolicy(DEFAULT_CANCELLATION_POLICY)
            .bedroom(DEFAULT_BEDROOM)
            .bathRoom(DEFAULT_BATH_ROOM)
            .lavatory(DEFAULT_LAVATORY)
            .wC(DEFAULT_W_C)
            .infrastructureArea(DEFAULT_INFRASTRUCTURE_AREA)
            .totalArea(DEFAULT_TOTAL_AREA)
            .capacity(DEFAULT_CAPACITY)
            .maxCapacity(DEFAULT_MAX_CAPACITY)
            .registrationSource(DEFAULT_REGISTRATION_SOURCE)
            .bookingPolicy(DEFAULT_BOOKING_POLICY)
            .reviewStatus(DEFAULT_REVIEW_STATUS)
            .status(DEFAULT_STATUS)
            .basePrice(DEFAULT_BASE_PRICE)
            .commission(DEFAULT_COMMISSION);
        return place;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Place createUpdatedEntity(EntityManager em) {
        Place place = new Place()
            .name(UPDATED_NAME)
            .key(UPDATED_KEY)
            .placeOwnerId(UPDATED_PLACE_OWNER_ID)
            .classCo(UPDATED_CLASS_CO)
            .classExtra(UPDATED_CLASS_EXTRA)
            .metaKeywords(UPDATED_META_KEYWORDS)
            .metaDescription(UPDATED_META_DESCRIPTION)
            .pageTitle(UPDATED_PAGE_TITLE)
            .cityId(UPDATED_CITY_ID)
            .placeAreaId(UPDATED_PLACE_AREA_ID)
            .addressLine1(UPDATED_ADDRESS_LINE_1)
            .addressLine2(UPDATED_ADDRESS_LINE_2)
            .location(UPDATED_LOCATION)
            .phone1(UPDATED_PHONE_1)
            .phone2(UPDATED_PHONE_2)
            .fax(UPDATED_FAX)
            .isVisible(UPDATED_IS_VISIBLE)
            .defaultImageId(UPDATED_DEFAULT_IMAGE_ID)
            .description(UPDATED_DESCRIPTION)
            .rulesAndRegulations(UPDATED_RULES_AND_REGULATIONS)
            .selectReason(UPDATED_SELECT_REASON)
            .review(UPDATED_REVIEW)
            .checkinHour(UPDATED_CHECKIN_HOUR)
            .checkoutHour(UPDATED_CHECKOUT_HOUR)
            .priority(UPDATED_PRIORITY)
            .totalScore(UPDATED_TOTAL_SCORE)
            .extraPersonPrice(UPDATED_EXTRA_PERSON_PRICE)
            .halfChargeCheckIn(UPDATED_HALF_CHARGE_CHECK_IN)
            .halfChargeCheckOut(UPDATED_HALF_CHARGE_CHECK_OUT)
            .defaultVideoUrl(UPDATED_DEFAULT_VIDEO_URL)
            .virtualTourUrl(UPDATED_VIRTUAL_TOUR_URL)
            .postalCode(UPDATED_POSTAL_CODE)
            .cancellationPolicy(UPDATED_CANCELLATION_POLICY)
            .bedroom(UPDATED_BEDROOM)
            .bathRoom(UPDATED_BATH_ROOM)
            .lavatory(UPDATED_LAVATORY)
            .wC(UPDATED_W_C)
            .infrastructureArea(UPDATED_INFRASTRUCTURE_AREA)
            .totalArea(UPDATED_TOTAL_AREA)
            .capacity(UPDATED_CAPACITY)
            .maxCapacity(UPDATED_MAX_CAPACITY)
            .registrationSource(UPDATED_REGISTRATION_SOURCE)
            .bookingPolicy(UPDATED_BOOKING_POLICY)
            .reviewStatus(UPDATED_REVIEW_STATUS)
            .status(UPDATED_STATUS)
            .basePrice(UPDATED_BASE_PRICE)
            .commission(UPDATED_COMMISSION);
        return place;
    }

    @BeforeEach
    public void initTest() {
        place = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlace() throws Exception {
        int databaseSizeBeforeCreate = placeRepository.findAll().size();

        // Create the Place
        PlaceDTO placeDTO = placeMapper.toDto(place);
        restPlaceMockMvc.perform(post("/api/places")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(placeDTO)))
            .andExpect(status().isCreated());

        // Validate the Place in the database
        List<Place> placeList = placeRepository.findAll();
        assertThat(placeList).hasSize(databaseSizeBeforeCreate + 1);
        Place testPlace = placeList.get(placeList.size() - 1);
        assertThat(testPlace.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPlace.getKey()).isEqualTo(DEFAULT_KEY);
        assertThat(testPlace.getPlaceOwnerId()).isEqualTo(DEFAULT_PLACE_OWNER_ID);
        assertThat(testPlace.getClassCo()).isEqualTo(DEFAULT_CLASS_CO);
        assertThat(testPlace.getClassExtra()).isEqualTo(DEFAULT_CLASS_EXTRA);
        assertThat(testPlace.getMetaKeywords()).isEqualTo(DEFAULT_META_KEYWORDS);
        assertThat(testPlace.getMetaDescription()).isEqualTo(DEFAULT_META_DESCRIPTION);
        assertThat(testPlace.getPageTitle()).isEqualTo(DEFAULT_PAGE_TITLE);
        assertThat(testPlace.getCityId()).isEqualTo(DEFAULT_CITY_ID);
        assertThat(testPlace.getPlaceAreaId()).isEqualTo(DEFAULT_PLACE_AREA_ID);
        assertThat(testPlace.getAddressLine1()).isEqualTo(DEFAULT_ADDRESS_LINE_1);
        assertThat(testPlace.getAddressLine2()).isEqualTo(DEFAULT_ADDRESS_LINE_2);
        assertThat(testPlace.getLocation()).isEqualTo(DEFAULT_LOCATION);
        assertThat(testPlace.getPhone1()).isEqualTo(DEFAULT_PHONE_1);
        assertThat(testPlace.getPhone2()).isEqualTo(DEFAULT_PHONE_2);
        assertThat(testPlace.getFax()).isEqualTo(DEFAULT_FAX);
        assertThat(testPlace.isIsVisible()).isEqualTo(DEFAULT_IS_VISIBLE);
        assertThat(testPlace.getDefaultImageId()).isEqualTo(DEFAULT_DEFAULT_IMAGE_ID);
        assertThat(testPlace.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testPlace.getRulesAndRegulations()).isEqualTo(DEFAULT_RULES_AND_REGULATIONS);
        assertThat(testPlace.getSelectReason()).isEqualTo(DEFAULT_SELECT_REASON);
        assertThat(testPlace.getReview()).isEqualTo(DEFAULT_REVIEW);
        assertThat(testPlace.getCheckinHour()).isEqualTo(DEFAULT_CHECKIN_HOUR);
        assertThat(testPlace.getCheckoutHour()).isEqualTo(DEFAULT_CHECKOUT_HOUR);
        assertThat(testPlace.getPriority()).isEqualTo(DEFAULT_PRIORITY);
        assertThat(testPlace.getTotalScore()).isEqualTo(DEFAULT_TOTAL_SCORE);
        assertThat(testPlace.getExtraPersonPrice()).isEqualTo(DEFAULT_EXTRA_PERSON_PRICE);
        assertThat(testPlace.getHalfChargeCheckIn()).isEqualTo(DEFAULT_HALF_CHARGE_CHECK_IN);
        assertThat(testPlace.getHalfChargeCheckOut()).isEqualTo(DEFAULT_HALF_CHARGE_CHECK_OUT);
        assertThat(testPlace.getDefaultVideoUrl()).isEqualTo(DEFAULT_DEFAULT_VIDEO_URL);
        assertThat(testPlace.getVirtualTourUrl()).isEqualTo(DEFAULT_VIRTUAL_TOUR_URL);
        assertThat(testPlace.getPostalCode()).isEqualTo(DEFAULT_POSTAL_CODE);
        assertThat(testPlace.getCancellationPolicy()).isEqualTo(DEFAULT_CANCELLATION_POLICY);
        assertThat(testPlace.getBedroom()).isEqualTo(DEFAULT_BEDROOM);
        assertThat(testPlace.getBathRoom()).isEqualTo(DEFAULT_BATH_ROOM);
        assertThat(testPlace.getLavatory()).isEqualTo(DEFAULT_LAVATORY);
        assertThat(testPlace.getwC()).isEqualTo(DEFAULT_W_C);
        assertThat(testPlace.getInfrastructureArea()).isEqualTo(DEFAULT_INFRASTRUCTURE_AREA);
        assertThat(testPlace.getTotalArea()).isEqualTo(DEFAULT_TOTAL_AREA);
        assertThat(testPlace.getCapacity()).isEqualTo(DEFAULT_CAPACITY);
        assertThat(testPlace.getMaxCapacity()).isEqualTo(DEFAULT_MAX_CAPACITY);
        assertThat(testPlace.getRegistrationSource()).isEqualTo(DEFAULT_REGISTRATION_SOURCE);
        assertThat(testPlace.getBookingPolicy()).isEqualTo(DEFAULT_BOOKING_POLICY);
        assertThat(testPlace.getReviewStatus()).isEqualTo(DEFAULT_REVIEW_STATUS);
        assertThat(testPlace.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testPlace.getBasePrice()).isEqualTo(DEFAULT_BASE_PRICE);
        assertThat(testPlace.getCommission()).isEqualTo(DEFAULT_COMMISSION);
    }

    @Test
    @Transactional
    public void createPlaceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = placeRepository.findAll().size();

        // Create the Place with an existing ID
        place.setId(1L);
        PlaceDTO placeDTO = placeMapper.toDto(place);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlaceMockMvc.perform(post("/api/places")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(placeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Place in the database
        List<Place> placeList = placeRepository.findAll();
        assertThat(placeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPlaces() throws Exception {
        // Initialize the database
        placeRepository.saveAndFlush(place);

        // Get all the placeList
        restPlaceMockMvc.perform(get("/api/places?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(place.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].key").value(hasItem(DEFAULT_KEY.toString())))
            .andExpect(jsonPath("$.[*].placeOwnerId").value(hasItem(DEFAULT_PLACE_OWNER_ID.toString())))
            .andExpect(jsonPath("$.[*].classCo").value(hasItem(DEFAULT_CLASS_CO)))
            .andExpect(jsonPath("$.[*].classExtra").value(hasItem(DEFAULT_CLASS_EXTRA.toString())))
            .andExpect(jsonPath("$.[*].metaKeywords").value(hasItem(DEFAULT_META_KEYWORDS.toString())))
            .andExpect(jsonPath("$.[*].metaDescription").value(hasItem(DEFAULT_META_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].pageTitle").value(hasItem(DEFAULT_PAGE_TITLE.toString())))
            .andExpect(jsonPath("$.[*].cityId").value(hasItem(DEFAULT_CITY_ID.toString())))
            .andExpect(jsonPath("$.[*].placeAreaId").value(hasItem(DEFAULT_PLACE_AREA_ID)))
            .andExpect(jsonPath("$.[*].addressLine1").value(hasItem(DEFAULT_ADDRESS_LINE_1.toString())))
            .andExpect(jsonPath("$.[*].addressLine2").value(hasItem(DEFAULT_ADDRESS_LINE_2.toString())))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION.toString())))
            .andExpect(jsonPath("$.[*].phone1").value(hasItem(DEFAULT_PHONE_1.toString())))
            .andExpect(jsonPath("$.[*].phone2").value(hasItem(DEFAULT_PHONE_2.toString())))
            .andExpect(jsonPath("$.[*].fax").value(hasItem(DEFAULT_FAX.toString())))
            .andExpect(jsonPath("$.[*].isVisible").value(hasItem(DEFAULT_IS_VISIBLE.booleanValue())))
            .andExpect(jsonPath("$.[*].defaultImageId").value(hasItem(DEFAULT_DEFAULT_IMAGE_ID)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].rulesAndRegulations").value(hasItem(DEFAULT_RULES_AND_REGULATIONS.toString())))
            .andExpect(jsonPath("$.[*].selectReason").value(hasItem(DEFAULT_SELECT_REASON.toString())))
            .andExpect(jsonPath("$.[*].review").value(hasItem(DEFAULT_REVIEW.toString())))
            .andExpect(jsonPath("$.[*].checkinHour").value(hasItem(DEFAULT_CHECKIN_HOUR)))
            .andExpect(jsonPath("$.[*].checkoutHour").value(hasItem(DEFAULT_CHECKOUT_HOUR)))
            .andExpect(jsonPath("$.[*].priority").value(hasItem(DEFAULT_PRIORITY)))
            .andExpect(jsonPath("$.[*].totalScore").value(hasItem(DEFAULT_TOTAL_SCORE)))
            .andExpect(jsonPath("$.[*].extraPersonPrice").value(hasItem(DEFAULT_EXTRA_PERSON_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].halfChargeCheckIn").value(hasItem(DEFAULT_HALF_CHARGE_CHECK_IN.doubleValue())))
            .andExpect(jsonPath("$.[*].halfChargeCheckOut").value(hasItem(DEFAULT_HALF_CHARGE_CHECK_OUT.doubleValue())))
            .andExpect(jsonPath("$.[*].defaultVideoUrl").value(hasItem(DEFAULT_DEFAULT_VIDEO_URL.toString())))
            .andExpect(jsonPath("$.[*].virtualTourUrl").value(hasItem(DEFAULT_VIRTUAL_TOUR_URL.toString())))
            .andExpect(jsonPath("$.[*].postalCode").value(hasItem(DEFAULT_POSTAL_CODE.toString())))
            .andExpect(jsonPath("$.[*].cancellationPolicy").value(hasItem(DEFAULT_CANCELLATION_POLICY.toString())))
            .andExpect(jsonPath("$.[*].bedroom").value(hasItem(DEFAULT_BEDROOM)))
            .andExpect(jsonPath("$.[*].bathRoom").value(hasItem(DEFAULT_BATH_ROOM)))
            .andExpect(jsonPath("$.[*].lavatory").value(hasItem(DEFAULT_LAVATORY)))
            .andExpect(jsonPath("$.[*].wC").value(hasItem(DEFAULT_W_C)))
            .andExpect(jsonPath("$.[*].infrastructureArea").value(hasItem(DEFAULT_INFRASTRUCTURE_AREA)))
            .andExpect(jsonPath("$.[*].totalArea").value(hasItem(DEFAULT_TOTAL_AREA)))
            .andExpect(jsonPath("$.[*].capacity").value(hasItem(DEFAULT_CAPACITY)))
            .andExpect(jsonPath("$.[*].maxCapacity").value(hasItem(DEFAULT_MAX_CAPACITY)))
            .andExpect(jsonPath("$.[*].registrationSource").value(hasItem(DEFAULT_REGISTRATION_SOURCE.toString())))
            .andExpect(jsonPath("$.[*].bookingPolicy").value(hasItem(DEFAULT_BOOKING_POLICY)))
            .andExpect(jsonPath("$.[*].reviewStatus").value(hasItem(DEFAULT_REVIEW_STATUS)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)))
            .andExpect(jsonPath("$.[*].basePrice").value(hasItem(DEFAULT_BASE_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].commission").value(hasItem(DEFAULT_COMMISSION.doubleValue())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllPlacesWithEagerRelationshipsIsEnabled() throws Exception {
        PlaceResource placeResource = new PlaceResource(placeServiceMock);
        when(placeServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restPlaceMockMvc = MockMvcBuilders.standaloneSetup(placeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restPlaceMockMvc.perform(get("/api/places?eagerload=true"))
        .andExpect(status().isOk());

        verify(placeServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllPlacesWithEagerRelationshipsIsNotEnabled() throws Exception {
        PlaceResource placeResource = new PlaceResource(placeServiceMock);
            when(placeServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restPlaceMockMvc = MockMvcBuilders.standaloneSetup(placeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restPlaceMockMvc.perform(get("/api/places?eagerload=true"))
        .andExpect(status().isOk());

            verify(placeServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getPlace() throws Exception {
        // Initialize the database
        placeRepository.saveAndFlush(place);

        // Get the place
        restPlaceMockMvc.perform(get("/api/places/{id}", place.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(place.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.key").value(DEFAULT_KEY.toString()))
            .andExpect(jsonPath("$.placeOwnerId").value(DEFAULT_PLACE_OWNER_ID.toString()))
            .andExpect(jsonPath("$.classCo").value(DEFAULT_CLASS_CO))
            .andExpect(jsonPath("$.classExtra").value(DEFAULT_CLASS_EXTRA.toString()))
            .andExpect(jsonPath("$.metaKeywords").value(DEFAULT_META_KEYWORDS.toString()))
            .andExpect(jsonPath("$.metaDescription").value(DEFAULT_META_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.pageTitle").value(DEFAULT_PAGE_TITLE.toString()))
            .andExpect(jsonPath("$.cityId").value(DEFAULT_CITY_ID.toString()))
            .andExpect(jsonPath("$.placeAreaId").value(DEFAULT_PLACE_AREA_ID))
            .andExpect(jsonPath("$.addressLine1").value(DEFAULT_ADDRESS_LINE_1.toString()))
            .andExpect(jsonPath("$.addressLine2").value(DEFAULT_ADDRESS_LINE_2.toString()))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION.toString()))
            .andExpect(jsonPath("$.phone1").value(DEFAULT_PHONE_1.toString()))
            .andExpect(jsonPath("$.phone2").value(DEFAULT_PHONE_2.toString()))
            .andExpect(jsonPath("$.fax").value(DEFAULT_FAX.toString()))
            .andExpect(jsonPath("$.isVisible").value(DEFAULT_IS_VISIBLE.booleanValue()))
            .andExpect(jsonPath("$.defaultImageId").value(DEFAULT_DEFAULT_IMAGE_ID))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.rulesAndRegulations").value(DEFAULT_RULES_AND_REGULATIONS.toString()))
            .andExpect(jsonPath("$.selectReason").value(DEFAULT_SELECT_REASON.toString()))
            .andExpect(jsonPath("$.review").value(DEFAULT_REVIEW.toString()))
            .andExpect(jsonPath("$.checkinHour").value(DEFAULT_CHECKIN_HOUR))
            .andExpect(jsonPath("$.checkoutHour").value(DEFAULT_CHECKOUT_HOUR))
            .andExpect(jsonPath("$.priority").value(DEFAULT_PRIORITY))
            .andExpect(jsonPath("$.totalScore").value(DEFAULT_TOTAL_SCORE))
            .andExpect(jsonPath("$.extraPersonPrice").value(DEFAULT_EXTRA_PERSON_PRICE.doubleValue()))
            .andExpect(jsonPath("$.halfChargeCheckIn").value(DEFAULT_HALF_CHARGE_CHECK_IN.doubleValue()))
            .andExpect(jsonPath("$.halfChargeCheckOut").value(DEFAULT_HALF_CHARGE_CHECK_OUT.doubleValue()))
            .andExpect(jsonPath("$.defaultVideoUrl").value(DEFAULT_DEFAULT_VIDEO_URL.toString()))
            .andExpect(jsonPath("$.virtualTourUrl").value(DEFAULT_VIRTUAL_TOUR_URL.toString()))
            .andExpect(jsonPath("$.postalCode").value(DEFAULT_POSTAL_CODE.toString()))
            .andExpect(jsonPath("$.cancellationPolicy").value(DEFAULT_CANCELLATION_POLICY.toString()))
            .andExpect(jsonPath("$.bedroom").value(DEFAULT_BEDROOM))
            .andExpect(jsonPath("$.bathRoom").value(DEFAULT_BATH_ROOM))
            .andExpect(jsonPath("$.lavatory").value(DEFAULT_LAVATORY))
            .andExpect(jsonPath("$.wC").value(DEFAULT_W_C))
            .andExpect(jsonPath("$.infrastructureArea").value(DEFAULT_INFRASTRUCTURE_AREA))
            .andExpect(jsonPath("$.totalArea").value(DEFAULT_TOTAL_AREA))
            .andExpect(jsonPath("$.capacity").value(DEFAULT_CAPACITY))
            .andExpect(jsonPath("$.maxCapacity").value(DEFAULT_MAX_CAPACITY))
            .andExpect(jsonPath("$.registrationSource").value(DEFAULT_REGISTRATION_SOURCE.toString()))
            .andExpect(jsonPath("$.bookingPolicy").value(DEFAULT_BOOKING_POLICY))
            .andExpect(jsonPath("$.reviewStatus").value(DEFAULT_REVIEW_STATUS))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS))
            .andExpect(jsonPath("$.basePrice").value(DEFAULT_BASE_PRICE.doubleValue()))
            .andExpect(jsonPath("$.commission").value(DEFAULT_COMMISSION.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPlace() throws Exception {
        // Get the place
        restPlaceMockMvc.perform(get("/api/places/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlace() throws Exception {
        // Initialize the database
        placeRepository.saveAndFlush(place);

        int databaseSizeBeforeUpdate = placeRepository.findAll().size();

        // Update the place
        Place updatedPlace = placeRepository.findById(place.getId()).get();
        // Disconnect from session so that the updates on updatedPlace are not directly saved in db
        em.detach(updatedPlace);
        updatedPlace
            .name(UPDATED_NAME)
            .key(UPDATED_KEY)
            .placeOwnerId(UPDATED_PLACE_OWNER_ID)
            .classCo(UPDATED_CLASS_CO)
            .classExtra(UPDATED_CLASS_EXTRA)
            .metaKeywords(UPDATED_META_KEYWORDS)
            .metaDescription(UPDATED_META_DESCRIPTION)
            .pageTitle(UPDATED_PAGE_TITLE)
            .cityId(UPDATED_CITY_ID)
            .placeAreaId(UPDATED_PLACE_AREA_ID)
            .addressLine1(UPDATED_ADDRESS_LINE_1)
            .addressLine2(UPDATED_ADDRESS_LINE_2)
            .location(UPDATED_LOCATION)
            .phone1(UPDATED_PHONE_1)
            .phone2(UPDATED_PHONE_2)
            .fax(UPDATED_FAX)
            .isVisible(UPDATED_IS_VISIBLE)
            .defaultImageId(UPDATED_DEFAULT_IMAGE_ID)
            .description(UPDATED_DESCRIPTION)
            .rulesAndRegulations(UPDATED_RULES_AND_REGULATIONS)
            .selectReason(UPDATED_SELECT_REASON)
            .review(UPDATED_REVIEW)
            .checkinHour(UPDATED_CHECKIN_HOUR)
            .checkoutHour(UPDATED_CHECKOUT_HOUR)
            .priority(UPDATED_PRIORITY)
            .totalScore(UPDATED_TOTAL_SCORE)
            .extraPersonPrice(UPDATED_EXTRA_PERSON_PRICE)
            .halfChargeCheckIn(UPDATED_HALF_CHARGE_CHECK_IN)
            .halfChargeCheckOut(UPDATED_HALF_CHARGE_CHECK_OUT)
            .defaultVideoUrl(UPDATED_DEFAULT_VIDEO_URL)
            .virtualTourUrl(UPDATED_VIRTUAL_TOUR_URL)
            .postalCode(UPDATED_POSTAL_CODE)
            .cancellationPolicy(UPDATED_CANCELLATION_POLICY)
            .bedroom(UPDATED_BEDROOM)
            .bathRoom(UPDATED_BATH_ROOM)
            .lavatory(UPDATED_LAVATORY)
            .wC(UPDATED_W_C)
            .infrastructureArea(UPDATED_INFRASTRUCTURE_AREA)
            .totalArea(UPDATED_TOTAL_AREA)
            .capacity(UPDATED_CAPACITY)
            .maxCapacity(UPDATED_MAX_CAPACITY)
            .registrationSource(UPDATED_REGISTRATION_SOURCE)
            .bookingPolicy(UPDATED_BOOKING_POLICY)
            .reviewStatus(UPDATED_REVIEW_STATUS)
            .status(UPDATED_STATUS)
            .basePrice(UPDATED_BASE_PRICE)
            .commission(UPDATED_COMMISSION);
        PlaceDTO placeDTO = placeMapper.toDto(updatedPlace);

        restPlaceMockMvc.perform(put("/api/places")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(placeDTO)))
            .andExpect(status().isOk());

        // Validate the Place in the database
        List<Place> placeList = placeRepository.findAll();
        assertThat(placeList).hasSize(databaseSizeBeforeUpdate);
        Place testPlace = placeList.get(placeList.size() - 1);
        assertThat(testPlace.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPlace.getKey()).isEqualTo(UPDATED_KEY);
        assertThat(testPlace.getPlaceOwnerId()).isEqualTo(UPDATED_PLACE_OWNER_ID);
        assertThat(testPlace.getClassCo()).isEqualTo(UPDATED_CLASS_CO);
        assertThat(testPlace.getClassExtra()).isEqualTo(UPDATED_CLASS_EXTRA);
        assertThat(testPlace.getMetaKeywords()).isEqualTo(UPDATED_META_KEYWORDS);
        assertThat(testPlace.getMetaDescription()).isEqualTo(UPDATED_META_DESCRIPTION);
        assertThat(testPlace.getPageTitle()).isEqualTo(UPDATED_PAGE_TITLE);
        assertThat(testPlace.getCityId()).isEqualTo(UPDATED_CITY_ID);
        assertThat(testPlace.getPlaceAreaId()).isEqualTo(UPDATED_PLACE_AREA_ID);
        assertThat(testPlace.getAddressLine1()).isEqualTo(UPDATED_ADDRESS_LINE_1);
        assertThat(testPlace.getAddressLine2()).isEqualTo(UPDATED_ADDRESS_LINE_2);
        assertThat(testPlace.getLocation()).isEqualTo(UPDATED_LOCATION);
        assertThat(testPlace.getPhone1()).isEqualTo(UPDATED_PHONE_1);
        assertThat(testPlace.getPhone2()).isEqualTo(UPDATED_PHONE_2);
        assertThat(testPlace.getFax()).isEqualTo(UPDATED_FAX);
        assertThat(testPlace.isIsVisible()).isEqualTo(UPDATED_IS_VISIBLE);
        assertThat(testPlace.getDefaultImageId()).isEqualTo(UPDATED_DEFAULT_IMAGE_ID);
        assertThat(testPlace.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testPlace.getRulesAndRegulations()).isEqualTo(UPDATED_RULES_AND_REGULATIONS);
        assertThat(testPlace.getSelectReason()).isEqualTo(UPDATED_SELECT_REASON);
        assertThat(testPlace.getReview()).isEqualTo(UPDATED_REVIEW);
        assertThat(testPlace.getCheckinHour()).isEqualTo(UPDATED_CHECKIN_HOUR);
        assertThat(testPlace.getCheckoutHour()).isEqualTo(UPDATED_CHECKOUT_HOUR);
        assertThat(testPlace.getPriority()).isEqualTo(UPDATED_PRIORITY);
        assertThat(testPlace.getTotalScore()).isEqualTo(UPDATED_TOTAL_SCORE);
        assertThat(testPlace.getExtraPersonPrice()).isEqualTo(UPDATED_EXTRA_PERSON_PRICE);
        assertThat(testPlace.getHalfChargeCheckIn()).isEqualTo(UPDATED_HALF_CHARGE_CHECK_IN);
        assertThat(testPlace.getHalfChargeCheckOut()).isEqualTo(UPDATED_HALF_CHARGE_CHECK_OUT);
        assertThat(testPlace.getDefaultVideoUrl()).isEqualTo(UPDATED_DEFAULT_VIDEO_URL);
        assertThat(testPlace.getVirtualTourUrl()).isEqualTo(UPDATED_VIRTUAL_TOUR_URL);
        assertThat(testPlace.getPostalCode()).isEqualTo(UPDATED_POSTAL_CODE);
        assertThat(testPlace.getCancellationPolicy()).isEqualTo(UPDATED_CANCELLATION_POLICY);
        assertThat(testPlace.getBedroom()).isEqualTo(UPDATED_BEDROOM);
        assertThat(testPlace.getBathRoom()).isEqualTo(UPDATED_BATH_ROOM);
        assertThat(testPlace.getLavatory()).isEqualTo(UPDATED_LAVATORY);
        assertThat(testPlace.getwC()).isEqualTo(UPDATED_W_C);
        assertThat(testPlace.getInfrastructureArea()).isEqualTo(UPDATED_INFRASTRUCTURE_AREA);
        assertThat(testPlace.getTotalArea()).isEqualTo(UPDATED_TOTAL_AREA);
        assertThat(testPlace.getCapacity()).isEqualTo(UPDATED_CAPACITY);
        assertThat(testPlace.getMaxCapacity()).isEqualTo(UPDATED_MAX_CAPACITY);
        assertThat(testPlace.getRegistrationSource()).isEqualTo(UPDATED_REGISTRATION_SOURCE);
        assertThat(testPlace.getBookingPolicy()).isEqualTo(UPDATED_BOOKING_POLICY);
        assertThat(testPlace.getReviewStatus()).isEqualTo(UPDATED_REVIEW_STATUS);
        assertThat(testPlace.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testPlace.getBasePrice()).isEqualTo(UPDATED_BASE_PRICE);
        assertThat(testPlace.getCommission()).isEqualTo(UPDATED_COMMISSION);
    }

    @Test
    @Transactional
    public void updateNonExistingPlace() throws Exception {
        int databaseSizeBeforeUpdate = placeRepository.findAll().size();

        // Create the Place
        PlaceDTO placeDTO = placeMapper.toDto(place);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlaceMockMvc.perform(put("/api/places")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(placeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Place in the database
        List<Place> placeList = placeRepository.findAll();
        assertThat(placeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlace() throws Exception {
        // Initialize the database
        placeRepository.saveAndFlush(place);

        int databaseSizeBeforeDelete = placeRepository.findAll().size();

        // Delete the place
        restPlaceMockMvc.perform(delete("/api/places/{id}", place.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Place> placeList = placeRepository.findAll();
        assertThat(placeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Place.class);
        Place place1 = new Place();
        place1.setId(1L);
        Place place2 = new Place();
        place2.setId(place1.getId());
        assertThat(place1).isEqualTo(place2);
        place2.setId(2L);
        assertThat(place1).isNotEqualTo(place2);
        place1.setId(null);
        assertThat(place1).isNotEqualTo(place2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlaceDTO.class);
        PlaceDTO placeDTO1 = new PlaceDTO();
        placeDTO1.setId(1L);
        PlaceDTO placeDTO2 = new PlaceDTO();
        assertThat(placeDTO1).isNotEqualTo(placeDTO2);
        placeDTO2.setId(placeDTO1.getId());
        assertThat(placeDTO1).isEqualTo(placeDTO2);
        placeDTO2.setId(2L);
        assertThat(placeDTO1).isNotEqualTo(placeDTO2);
        placeDTO1.setId(null);
        assertThat(placeDTO1).isNotEqualTo(placeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(placeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(placeMapper.fromId(null)).isNull();
    }
}
