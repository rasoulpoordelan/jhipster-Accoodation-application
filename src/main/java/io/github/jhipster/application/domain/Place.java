package io.github.jhipster.application.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Place.
 */
@Entity
@Table(name = "place")
public class Place implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "jhi_key")
    private String key;

    @Column(name = "place_owner_id")
    private String placeOwnerId;

    @Column(name = "class_co")
    private Integer classCo;

    @Column(name = "class_extra")
    private String classExtra;

    @Column(name = "meta_keywords")
    private String metaKeywords;

    @Column(name = "meta_description")
    private String metaDescription;

    @Column(name = "page_title")
    private String pageTitle;

    @Column(name = "city_id")
    private String cityId;

    @Column(name = "place_area_id")
    private Integer placeAreaId;

    @Column(name = "address_line_1")
    private String addressLine1;

    @Column(name = "address_line_2")
    private String addressLine2;

    @Column(name = "location")
    private String location;

    @Column(name = "phone_1")
    private String phone1;

    @Column(name = "phone_2")
    private String phone2;

    @Column(name = "fax")
    private String fax;

    @Column(name = "is_visible")
    private Boolean isVisible;

    @Column(name = "default_image_id")
    private Integer defaultImageId;

    @Column(name = "description")
    private String description;

    @Column(name = "rules_and_regulations")
    private String rulesAndRegulations;

    @Column(name = "select_reason")
    private String selectReason;

    @Column(name = "review")
    private String review;

    @Column(name = "checkin_hour")
    private Integer checkinHour;

    @Column(name = "checkout_hour")
    private Integer checkoutHour;

    @Column(name = "priority")
    private Integer priority;

    @Column(name = "total_score")
    private Integer totalScore;

    @Column(name = "extra_person_price")
    private Double extraPersonPrice;

    @Column(name = "half_charge_check_in")
    private Double halfChargeCheckIn;

    @Column(name = "half_charge_check_out")
    private Double halfChargeCheckOut;

    @Column(name = "default_video_url")
    private String defaultVideoUrl;

    @Column(name = "virtual_tour_url")
    private String virtualTourUrl;

    @Column(name = "postal_code")
    private String postalCode;

    @Column(name = "cancellation_policy")
    private String cancellationPolicy;

    @Column(name = "bedroom")
    private Integer bedroom;

    @Column(name = "bath_room")
    private Integer bathRoom;

    @Column(name = "lavatory")
    private Integer lavatory;

    @Column(name = "w_c")
    private Integer wC;

    @Column(name = "infrastructure_area")
    private Integer infrastructureArea;

    @Column(name = "total_area")
    private Integer totalArea;

    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "max_capacity")
    private Integer maxCapacity;

    @Column(name = "registration_source")
    private String registrationSource;

    @Column(name = "booking_policy")
    private Integer bookingPolicy;

    @Column(name = "review_status")
    private Integer reviewStatus;

    @Column(name = "status")
    private Integer status;

    @Column(name = "base_price")
    private Double basePrice;

    @Column(name = "commission")
    private Double commission;

    @OneToMany(mappedBy = "place")
    private Set<PlaceType> places = new HashSet<>();

    @OneToMany(mappedBy = "place")
    private Set<PlaceTag> places = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "place_place",
               joinColumns = @JoinColumn(name = "place_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "place_id", referencedColumnName = "id"))
    private Set<Attribute> places = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "place_place",
               joinColumns = @JoinColumn(name = "place_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "place_id", referencedColumnName = "id"))
    private Set<PlaceTag> places = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Place name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getKey() {
        return key;
    }

    public Place key(String key) {
        this.key = key;
        return this;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getPlaceOwnerId() {
        return placeOwnerId;
    }

    public Place placeOwnerId(String placeOwnerId) {
        this.placeOwnerId = placeOwnerId;
        return this;
    }

    public void setPlaceOwnerId(String placeOwnerId) {
        this.placeOwnerId = placeOwnerId;
    }

    public Integer getClassCo() {
        return classCo;
    }

    public Place classCo(Integer classCo) {
        this.classCo = classCo;
        return this;
    }

    public void setClassCo(Integer classCo) {
        this.classCo = classCo;
    }

    public String getClassExtra() {
        return classExtra;
    }

    public Place classExtra(String classExtra) {
        this.classExtra = classExtra;
        return this;
    }

    public void setClassExtra(String classExtra) {
        this.classExtra = classExtra;
    }

    public String getMetaKeywords() {
        return metaKeywords;
    }

    public Place metaKeywords(String metaKeywords) {
        this.metaKeywords = metaKeywords;
        return this;
    }

    public void setMetaKeywords(String metaKeywords) {
        this.metaKeywords = metaKeywords;
    }

    public String getMetaDescription() {
        return metaDescription;
    }

    public Place metaDescription(String metaDescription) {
        this.metaDescription = metaDescription;
        return this;
    }

    public void setMetaDescription(String metaDescription) {
        this.metaDescription = metaDescription;
    }

    public String getPageTitle() {
        return pageTitle;
    }

    public Place pageTitle(String pageTitle) {
        this.pageTitle = pageTitle;
        return this;
    }

    public void setPageTitle(String pageTitle) {
        this.pageTitle = pageTitle;
    }

    public String getCityId() {
        return cityId;
    }

    public Place cityId(String cityId) {
        this.cityId = cityId;
        return this;
    }

    public void setCityId(String cityId) {
        this.cityId = cityId;
    }

    public Integer getPlaceAreaId() {
        return placeAreaId;
    }

    public Place placeAreaId(Integer placeAreaId) {
        this.placeAreaId = placeAreaId;
        return this;
    }

    public void setPlaceAreaId(Integer placeAreaId) {
        this.placeAreaId = placeAreaId;
    }

    public String getAddressLine1() {
        return addressLine1;
    }

    public Place addressLine1(String addressLine1) {
        this.addressLine1 = addressLine1;
        return this;
    }

    public void setAddressLine1(String addressLine1) {
        this.addressLine1 = addressLine1;
    }

    public String getAddressLine2() {
        return addressLine2;
    }

    public Place addressLine2(String addressLine2) {
        this.addressLine2 = addressLine2;
        return this;
    }

    public void setAddressLine2(String addressLine2) {
        this.addressLine2 = addressLine2;
    }

    public String getLocation() {
        return location;
    }

    public Place location(String location) {
        this.location = location;
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getPhone1() {
        return phone1;
    }

    public Place phone1(String phone1) {
        this.phone1 = phone1;
        return this;
    }

    public void setPhone1(String phone1) {
        this.phone1 = phone1;
    }

    public String getPhone2() {
        return phone2;
    }

    public Place phone2(String phone2) {
        this.phone2 = phone2;
        return this;
    }

    public void setPhone2(String phone2) {
        this.phone2 = phone2;
    }

    public String getFax() {
        return fax;
    }

    public Place fax(String fax) {
        this.fax = fax;
        return this;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public Boolean isIsVisible() {
        return isVisible;
    }

    public Place isVisible(Boolean isVisible) {
        this.isVisible = isVisible;
        return this;
    }

    public void setIsVisible(Boolean isVisible) {
        this.isVisible = isVisible;
    }

    public Integer getDefaultImageId() {
        return defaultImageId;
    }

    public Place defaultImageId(Integer defaultImageId) {
        this.defaultImageId = defaultImageId;
        return this;
    }

    public void setDefaultImageId(Integer defaultImageId) {
        this.defaultImageId = defaultImageId;
    }

    public String getDescription() {
        return description;
    }

    public Place description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRulesAndRegulations() {
        return rulesAndRegulations;
    }

    public Place rulesAndRegulations(String rulesAndRegulations) {
        this.rulesAndRegulations = rulesAndRegulations;
        return this;
    }

    public void setRulesAndRegulations(String rulesAndRegulations) {
        this.rulesAndRegulations = rulesAndRegulations;
    }

    public String getSelectReason() {
        return selectReason;
    }

    public Place selectReason(String selectReason) {
        this.selectReason = selectReason;
        return this;
    }

    public void setSelectReason(String selectReason) {
        this.selectReason = selectReason;
    }

    public String getReview() {
        return review;
    }

    public Place review(String review) {
        this.review = review;
        return this;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public Integer getCheckinHour() {
        return checkinHour;
    }

    public Place checkinHour(Integer checkinHour) {
        this.checkinHour = checkinHour;
        return this;
    }

    public void setCheckinHour(Integer checkinHour) {
        this.checkinHour = checkinHour;
    }

    public Integer getCheckoutHour() {
        return checkoutHour;
    }

    public Place checkoutHour(Integer checkoutHour) {
        this.checkoutHour = checkoutHour;
        return this;
    }

    public void setCheckoutHour(Integer checkoutHour) {
        this.checkoutHour = checkoutHour;
    }

    public Integer getPriority() {
        return priority;
    }

    public Place priority(Integer priority) {
        this.priority = priority;
        return this;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public Integer getTotalScore() {
        return totalScore;
    }

    public Place totalScore(Integer totalScore) {
        this.totalScore = totalScore;
        return this;
    }

    public void setTotalScore(Integer totalScore) {
        this.totalScore = totalScore;
    }

    public Double getExtraPersonPrice() {
        return extraPersonPrice;
    }

    public Place extraPersonPrice(Double extraPersonPrice) {
        this.extraPersonPrice = extraPersonPrice;
        return this;
    }

    public void setExtraPersonPrice(Double extraPersonPrice) {
        this.extraPersonPrice = extraPersonPrice;
    }

    public Double getHalfChargeCheckIn() {
        return halfChargeCheckIn;
    }

    public Place halfChargeCheckIn(Double halfChargeCheckIn) {
        this.halfChargeCheckIn = halfChargeCheckIn;
        return this;
    }

    public void setHalfChargeCheckIn(Double halfChargeCheckIn) {
        this.halfChargeCheckIn = halfChargeCheckIn;
    }

    public Double getHalfChargeCheckOut() {
        return halfChargeCheckOut;
    }

    public Place halfChargeCheckOut(Double halfChargeCheckOut) {
        this.halfChargeCheckOut = halfChargeCheckOut;
        return this;
    }

    public void setHalfChargeCheckOut(Double halfChargeCheckOut) {
        this.halfChargeCheckOut = halfChargeCheckOut;
    }

    public String getDefaultVideoUrl() {
        return defaultVideoUrl;
    }

    public Place defaultVideoUrl(String defaultVideoUrl) {
        this.defaultVideoUrl = defaultVideoUrl;
        return this;
    }

    public void setDefaultVideoUrl(String defaultVideoUrl) {
        this.defaultVideoUrl = defaultVideoUrl;
    }

    public String getVirtualTourUrl() {
        return virtualTourUrl;
    }

    public Place virtualTourUrl(String virtualTourUrl) {
        this.virtualTourUrl = virtualTourUrl;
        return this;
    }

    public void setVirtualTourUrl(String virtualTourUrl) {
        this.virtualTourUrl = virtualTourUrl;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public Place postalCode(String postalCode) {
        this.postalCode = postalCode;
        return this;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCancellationPolicy() {
        return cancellationPolicy;
    }

    public Place cancellationPolicy(String cancellationPolicy) {
        this.cancellationPolicy = cancellationPolicy;
        return this;
    }

    public void setCancellationPolicy(String cancellationPolicy) {
        this.cancellationPolicy = cancellationPolicy;
    }

    public Integer getBedroom() {
        return bedroom;
    }

    public Place bedroom(Integer bedroom) {
        this.bedroom = bedroom;
        return this;
    }

    public void setBedroom(Integer bedroom) {
        this.bedroom = bedroom;
    }

    public Integer getBathRoom() {
        return bathRoom;
    }

    public Place bathRoom(Integer bathRoom) {
        this.bathRoom = bathRoom;
        return this;
    }

    public void setBathRoom(Integer bathRoom) {
        this.bathRoom = bathRoom;
    }

    public Integer getLavatory() {
        return lavatory;
    }

    public Place lavatory(Integer lavatory) {
        this.lavatory = lavatory;
        return this;
    }

    public void setLavatory(Integer lavatory) {
        this.lavatory = lavatory;
    }

    public Integer getwC() {
        return wC;
    }

    public Place wC(Integer wC) {
        this.wC = wC;
        return this;
    }

    public void setwC(Integer wC) {
        this.wC = wC;
    }

    public Integer getInfrastructureArea() {
        return infrastructureArea;
    }

    public Place infrastructureArea(Integer infrastructureArea) {
        this.infrastructureArea = infrastructureArea;
        return this;
    }

    public void setInfrastructureArea(Integer infrastructureArea) {
        this.infrastructureArea = infrastructureArea;
    }

    public Integer getTotalArea() {
        return totalArea;
    }

    public Place totalArea(Integer totalArea) {
        this.totalArea = totalArea;
        return this;
    }

    public void setTotalArea(Integer totalArea) {
        this.totalArea = totalArea;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public Place capacity(Integer capacity) {
        this.capacity = capacity;
        return this;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Integer getMaxCapacity() {
        return maxCapacity;
    }

    public Place maxCapacity(Integer maxCapacity) {
        this.maxCapacity = maxCapacity;
        return this;
    }

    public void setMaxCapacity(Integer maxCapacity) {
        this.maxCapacity = maxCapacity;
    }

    public String getRegistrationSource() {
        return registrationSource;
    }

    public Place registrationSource(String registrationSource) {
        this.registrationSource = registrationSource;
        return this;
    }

    public void setRegistrationSource(String registrationSource) {
        this.registrationSource = registrationSource;
    }

    public Integer getBookingPolicy() {
        return bookingPolicy;
    }

    public Place bookingPolicy(Integer bookingPolicy) {
        this.bookingPolicy = bookingPolicy;
        return this;
    }

    public void setBookingPolicy(Integer bookingPolicy) {
        this.bookingPolicy = bookingPolicy;
    }

    public Integer getReviewStatus() {
        return reviewStatus;
    }

    public Place reviewStatus(Integer reviewStatus) {
        this.reviewStatus = reviewStatus;
        return this;
    }

    public void setReviewStatus(Integer reviewStatus) {
        this.reviewStatus = reviewStatus;
    }

    public Integer getStatus() {
        return status;
    }

    public Place status(Integer status) {
        this.status = status;
        return this;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Double getBasePrice() {
        return basePrice;
    }

    public Place basePrice(Double basePrice) {
        this.basePrice = basePrice;
        return this;
    }

    public void setBasePrice(Double basePrice) {
        this.basePrice = basePrice;
    }

    public Double getCommission() {
        return commission;
    }

    public Place commission(Double commission) {
        this.commission = commission;
        return this;
    }

    public void setCommission(Double commission) {
        this.commission = commission;
    }

    public Set<PlaceType> getPlaces() {
        return places;
    }

    public Place places(Set<PlaceType> placeTypes) {
        this.places = placeTypes;
        return this;
    }

    public Place addPlace(PlaceType placeType) {
        this.places.add(placeType);
        placeType.setPlace(this);
        return this;
    }

    public Place removePlace(PlaceType placeType) {
        this.places.remove(placeType);
        placeType.setPlace(null);
        return this;
    }

    public void setPlaces(Set<PlaceType> placeTypes) {
        this.places = placeTypes;
    }

    public Set<PlaceTag> getPlaces() {
        return places;
    }

    public Place places(Set<PlaceTag> placeTags) {
        this.places = placeTags;
        return this;
    }

    public Place addPlace(PlaceTag placeTag) {
        this.places.add(placeTag);
        placeTag.setPlace(this);
        return this;
    }

    public Place removePlace(PlaceTag placeTag) {
        this.places.remove(placeTag);
        placeTag.setPlace(null);
        return this;
    }

    public void setPlaces(Set<PlaceTag> placeTags) {
        this.places = placeTags;
    }

    public Set<Attribute> getPlaces() {
        return places;
    }

    public Place places(Set<Attribute> attributes) {
        this.places = attributes;
        return this;
    }

    public Place addPlace(Attribute attribute) {
        this.places.add(attribute);
        attribute.getAttributes().add(this);
        return this;
    }

    public Place removePlace(Attribute attribute) {
        this.places.remove(attribute);
        attribute.getAttributes().remove(this);
        return this;
    }

    public void setPlaces(Set<Attribute> attributes) {
        this.places = attributes;
    }

    public Set<PlaceTag> getPlaces() {
        return places;
    }

    public Place places(Set<PlaceTag> placeTags) {
        this.places = placeTags;
        return this;
    }

    public Place addPlace(PlaceTag placeTag) {
        this.places.add(placeTag);
        placeTag.getPlaceTags().add(this);
        return this;
    }

    public Place removePlace(PlaceTag placeTag) {
        this.places.remove(placeTag);
        placeTag.getPlaceTags().remove(this);
        return this;
    }

    public void setPlaces(Set<PlaceTag> placeTags) {
        this.places = placeTags;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Place)) {
            return false;
        }
        return id != null && id.equals(((Place) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Place{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", key='" + getKey() + "'" +
            ", placeOwnerId='" + getPlaceOwnerId() + "'" +
            ", classCo=" + getClassCo() +
            ", classExtra='" + getClassExtra() + "'" +
            ", metaKeywords='" + getMetaKeywords() + "'" +
            ", metaDescription='" + getMetaDescription() + "'" +
            ", pageTitle='" + getPageTitle() + "'" +
            ", cityId='" + getCityId() + "'" +
            ", placeAreaId=" + getPlaceAreaId() +
            ", addressLine1='" + getAddressLine1() + "'" +
            ", addressLine2='" + getAddressLine2() + "'" +
            ", location='" + getLocation() + "'" +
            ", phone1='" + getPhone1() + "'" +
            ", phone2='" + getPhone2() + "'" +
            ", fax='" + getFax() + "'" +
            ", isVisible='" + isIsVisible() + "'" +
            ", defaultImageId=" + getDefaultImageId() +
            ", description='" + getDescription() + "'" +
            ", rulesAndRegulations='" + getRulesAndRegulations() + "'" +
            ", selectReason='" + getSelectReason() + "'" +
            ", review='" + getReview() + "'" +
            ", checkinHour=" + getCheckinHour() +
            ", checkoutHour=" + getCheckoutHour() +
            ", priority=" + getPriority() +
            ", totalScore=" + getTotalScore() +
            ", extraPersonPrice=" + getExtraPersonPrice() +
            ", halfChargeCheckIn=" + getHalfChargeCheckIn() +
            ", halfChargeCheckOut=" + getHalfChargeCheckOut() +
            ", defaultVideoUrl='" + getDefaultVideoUrl() + "'" +
            ", virtualTourUrl='" + getVirtualTourUrl() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", cancellationPolicy='" + getCancellationPolicy() + "'" +
            ", bedroom=" + getBedroom() +
            ", bathRoom=" + getBathRoom() +
            ", lavatory=" + getLavatory() +
            ", wC=" + getwC() +
            ", infrastructureArea=" + getInfrastructureArea() +
            ", totalArea=" + getTotalArea() +
            ", capacity=" + getCapacity() +
            ", maxCapacity=" + getMaxCapacity() +
            ", registrationSource='" + getRegistrationSource() + "'" +
            ", bookingPolicy=" + getBookingPolicy() +
            ", reviewStatus=" + getReviewStatus() +
            ", status=" + getStatus() +
            ", basePrice=" + getBasePrice() +
            ", commission=" + getCommission() +
            "}";
    }
}
