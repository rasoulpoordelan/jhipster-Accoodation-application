package io.github.jhipster.application.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A PlaceTag.
 */
@Entity
@Table(name = "place_tag")
public class PlaceTag implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JsonIgnoreProperties("placeTags")
    private Tag tag;

    @ManyToMany(mappedBy = "places")
    @JsonIgnore
    private Set<Place> placeTags = new HashSet<>();

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

    public PlaceTag name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Tag getTag() {
        return tag;
    }

    public PlaceTag tag(Tag tag) {
        this.tag = tag;
        return this;
    }

    public void setTag(Tag tag) {
        this.tag = tag;
    }

    public Set<Place> getPlaceTags() {
        return placeTags;
    }

    public PlaceTag placeTags(Set<Place> places) {
        this.placeTags = places;
        return this;
    }

    public PlaceTag addPlaceTag(Place place) {
        this.placeTags.add(place);
        place.getPlaces().add(this);
        return this;
    }

    public PlaceTag removePlaceTag(Place place) {
        this.placeTags.remove(place);
        place.getPlaces().remove(this);
        return this;
    }

    public void setPlaceTags(Set<Place> places) {
        this.placeTags = places;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PlaceTag)) {
            return false;
        }
        return id != null && id.equals(((PlaceTag) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "PlaceTag{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
