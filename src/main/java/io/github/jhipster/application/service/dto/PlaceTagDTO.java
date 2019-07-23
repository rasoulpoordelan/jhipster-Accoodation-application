package io.github.jhipster.application.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link io.github.jhipster.application.domain.PlaceTag} entity.
 */
public class PlaceTagDTO implements Serializable {

    private Long id;

    private String name;


    private Long placeId;

    private Long tagId;

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

    public Long getPlaceId() {
        return placeId;
    }

    public void setPlaceId(Long placeId) {
        this.placeId = placeId;
    }

    public Long getTagId() {
        return tagId;
    }

    public void setTagId(Long tagId) {
        this.tagId = tagId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PlaceTagDTO placeTagDTO = (PlaceTagDTO) o;
        if (placeTagDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), placeTagDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PlaceTagDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", place=" + getPlaceId() +
            ", tag=" + getTagId() +
            "}";
    }
}
