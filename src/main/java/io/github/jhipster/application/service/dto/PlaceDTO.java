package io.github.jhipster.application.service.dto;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the {@link io.github.jhipster.application.domain.Place} entity.
 */
public class PlaceDTO implements Serializable {

    private Long id;

    private String name;

    private String key;

    private String placeOwnerId;

    private Integer classCo;

    private String classExtra;

    private String metaKeywords;

    private String metaDescription;

    private String pageTitle;

    private String cityId;

    private Integer placeAreaId;

    private String addressLine1;

    private String addressLine2;

    private String location;

    private String phone1;

    private String phone2;

    private String fax;

    private Boolean isVisible;

    private Integer defaultImageId;

    private String description;

    private String rulesAndRegulations;

    private String selectReason;

    private String review;

    private Integer checkinHour;

    private Integer checkoutHour;

    private Integer priority;

    private Integer totalScore;

    private Double extraPersonPrice;

    private Double halfChargeCheckIn;

    private Double halfChargeCheckOut;

    private String defaultVideoUrl;

    private String virtualTourUrl;

    private String postalCode;

    private String cancellationPolicy;

    private Integer bedroom;

    private Integer bathRoom;

    private Integer lavatory;

    private Integer wC;

    private Integer infrastructureArea;

    private Integer totalArea;

    private Integer capacity;

    private Integer maxCapacity;

    private String registrationSource;

    private Integer bookingPolicy;

    private Integer reviewStatus;

    private Integer status;

    private Double basePrice;

    private Double commission;


    private Set<AttributeDTO> placeAtts = new HashSet<>();

    private Set<PlaceTagDTO> places = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getPlaceOwnerId() {
        return placeOwnerId;
    }

    public void setPlaceOwnerId(String placeOwnerId) {
        this.placeOwnerId = placeOwnerId;
    }

    public Integer getClassCo() {
        return classCo;
    }

    public void setClassCo(Integer classCo) {
        this.classCo = classCo;
    }

    public String getClassExtra() {
        return classExtra;
    }

    public void setClassExtra(String classExtra) {
        this.classExtra = classExtra;
    }

    public String getMetaKeywords() {
        return metaKeywords;
    }

    public void setMetaKeywords(String metaKeywords) {
        this.metaKeywords = metaKeywords;
    }

    public String getMetaDescription() {
        return metaDescription;
    }

    public void setMetaDescription(String metaDescription) {
        this.metaDescription = metaDescription;
    }

    public String getPageTitle() {
        return pageTitle;
    }

    public void setPageTitle(String pageTitle) {
        this.pageTitle = pageTitle;
    }

    public String getCityId() {
        return cityId;
    }

    public void setCityId(String cityId) {
        this.cityId = cityId;
    }

    public Integer getPlaceAreaId() {
        return placeAreaId;
    }

    public void setPlaceAreaId(Integer placeAreaId) {
        this.placeAreaId = placeAreaId;
    }

    public String getAddressLine1() {
        return addressLine1;
    }

    public void setAddressLine1(String addressLine1) {
        this.addressLine1 = addressLine1;
    }

    public String getAddressLine2() {
        return addressLine2;
    }

    public void setAddressLine2(String addressLine2) {
        this.addressLine2 = addressLine2;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getPhone1() {
        return phone1;
    }

    public void setPhone1(String phone1) {
        this.phone1 = phone1;
    }

    public String getPhone2() {
        return phone2;
    }

    public void setPhone2(String phone2) {
        this.phone2 = phone2;
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public Boolean isIsVisible() {
        return isVisible;
    }

    public void setIsVisible(Boolean isVisible) {
        this.isVisible = isVisible;
    }

    public Integer getDefaultImageId() {
        return defaultImageId;
    }

    public void setDefaultImageId(Integer defaultImageId) {
        this.defaultImageId = defaultImageId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRulesAndRegulations() {
        return rulesAndRegulations;
    }

    public void setRulesAndRegulations(String rulesAndRegulations) {
        this.rulesAndRegulations = rulesAndRegulations;
    }

    public String getSelectReason() {
        return selectReason;
    }

    public void setSelectReason(String selectReason) {
        this.selectReason = selectReason;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public Integer getCheckinHour() {
        return checkinHour;
    }

    public void setCheckinHour(Integer checkinHour) {
        this.checkinHour = checkinHour;
    }

    public Integer getCheckoutHour() {
        return checkoutHour;
    }

    public void setCheckoutHour(Integer checkoutHour) {
        this.checkoutHour = checkoutHour;
    }

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public Integer getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(Integer totalScore) {
        this.totalScore = totalScore;
    }

    public Double getExtraPersonPrice() {
        return extraPersonPrice;
    }

    public void setExtraPersonPrice(Double extraPersonPrice) {
        this.extraPersonPrice = extraPersonPrice;
    }

    public Double getHalfChargeCheckIn() {
        return halfChargeCheckIn;
    }

    public void setHalfChargeCheckIn(Double halfChargeCheckIn) {
        this.halfChargeCheckIn = halfChargeCheckIn;
    }

    public Double getHalfChargeCheckOut() {
        return halfChargeCheckOut;
    }

    public void setHalfChargeCheckOut(Double halfChargeCheckOut) {
        this.halfChargeCheckOut = halfChargeCheckOut;
    }

    public String getDefaultVideoUrl() {
        return defaultVideoUrl;
    }

    public void setDefaultVideoUrl(String defaultVideoUrl) {
        this.defaultVideoUrl = defaultVideoUrl;
    }

    public String getVirtualTourUrl() {
        return virtualTourUrl;
    }

    public void setVirtualTourUrl(String virtualTourUrl) {
        this.virtualTourUrl = virtualTourUrl;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCancellationPolicy() {
        return cancellationPolicy;
    }

    public void setCancellationPolicy(String cancellationPolicy) {
        this.cancellationPolicy = cancellationPolicy;
    }

    public Integer getBedroom() {
        return bedroom;
    }

    public void setBedroom(Integer bedroom) {
        this.bedroom = bedroom;
    }

    public Integer getBathRoom() {
        return bathRoom;
    }

    public void setBathRoom(Integer bathRoom) {
        this.bathRoom = bathRoom;
    }

    public Integer getLavatory() {
        return lavatory;
    }

    public void setLavatory(Integer lavatory) {
        this.lavatory = lavatory;
    }

    public Integer getwC() {
        return wC;
    }

    public void setwC(Integer wC) {
        this.wC = wC;
    }

    public Integer getInfrastructureArea() {
        return infrastructureArea;
    }

    public void setInfrastructureArea(Integer infrastructureArea) {
        this.infrastructureArea = infrastructureArea;
    }

    public Integer getTotalArea() {
        return totalArea;
    }

    public void setTotalArea(Integer totalArea) {
        this.totalArea = totalArea;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Integer getMaxCapacity() {
        return maxCapacity;
    }

    public void setMaxCapacity(Integer maxCapacity) {
        this.maxCapacity = maxCapacity;
    }

    public String getRegistrationSource() {
        return registrationSource;
    }

    public void setRegistrationSource(String registrationSource) {
        this.registrationSource = registrationSource;
    }

    public Integer getBookingPolicy() {
        return bookingPolicy;
    }

    public void setBookingPolicy(Integer bookingPolicy) {
        this.bookingPolicy = bookingPolicy;
    }

    public Integer getReviewStatus() {
        return reviewStatus;
    }

    public void setReviewStatus(Integer reviewStatus) {
        this.reviewStatus = reviewStatus;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Double getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(Double basePrice) {
        this.basePrice = basePrice;
    }

    public Double getCommission() {
        return commission;
    }

    public void setCommission(Double commission) {
        this.commission = commission;
    }

    public Set<AttributeDTO> getPlaceAtts() {
        return placeAtts;
    }

    public void setPlaceAtts(Set<AttributeDTO> attributes) {
        this.placeAtts = attributes;
    }

    public Set<PlaceTagDTO> getPlaces() {
        return places;
    }

    public void setPlaces(Set<PlaceTagDTO> placeTags) {
        this.places = placeTags;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PlaceDTO placeDTO = (PlaceDTO) o;
        if (placeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), placeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PlaceDTO{" +
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
