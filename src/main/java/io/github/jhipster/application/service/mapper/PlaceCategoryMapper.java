package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.PlaceCategoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link PlaceCategory} and its DTO {@link PlaceCategoryDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PlaceCategoryMapper extends EntityMapper<PlaceCategoryDTO, PlaceCategory> {



    default PlaceCategory fromId(Long id) {
        if (id == null) {
            return null;
        }
        PlaceCategory placeCategory = new PlaceCategory();
        placeCategory.setId(id);
        return placeCategory;
    }
}
