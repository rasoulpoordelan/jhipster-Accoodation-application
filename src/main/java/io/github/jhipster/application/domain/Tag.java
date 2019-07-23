package io.github.jhipster.application.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Tag.
 */
@Entity
@Table(name = "tag")
public class Tag implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "tag")
    private Set<PlaceTag> placeTags = new HashSet<>();

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

    public Tag name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<PlaceTag> getPlaceTags() {
        return placeTags;
    }

    public Tag placeTags(Set<PlaceTag> placeTags) {
        this.placeTags = placeTags;
        return this;
    }

    public Tag addPlaceTag(PlaceTag placeTag) {
        this.placeTags.add(placeTag);
        placeTag.setTag(this);
        return this;
    }

    public Tag removePlaceTag(PlaceTag placeTag) {
        this.placeTags.remove(placeTag);
        placeTag.setTag(null);
        return this;
    }

    public void setPlaceTags(Set<PlaceTag> placeTags) {
        this.placeTags = placeTags;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Tag)) {
            return false;
        }
        return id != null && id.equals(((Tag) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Tag{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
