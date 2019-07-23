package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.PlaceAreaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link PlaceArea} and its DTO {@link PlaceAreaDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PlaceAreaMapper extends EntityMapper<PlaceAreaDTO, PlaceArea> {



    default PlaceArea fromId(Long id) {
        if (id == null) {
            return null;
        }
        PlaceArea placeArea = new PlaceArea();
        placeArea.setId(id);
        return placeArea;
    }
}
