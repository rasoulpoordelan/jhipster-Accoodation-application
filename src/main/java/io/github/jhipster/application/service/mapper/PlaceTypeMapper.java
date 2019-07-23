package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.PlaceTypeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link PlaceType} and its DTO {@link PlaceTypeDTO}.
 */
@Mapper(componentModel = "spring", uses = {PlaceMapper.class})
public interface PlaceTypeMapper extends EntityMapper<PlaceTypeDTO, PlaceType> {

    @Mapping(source = "place.id", target = "placeId")
    PlaceTypeDTO toDto(PlaceType placeType);

    @Mapping(source = "placeId", target = "place")
    PlaceType toEntity(PlaceTypeDTO placeTypeDTO);

    default PlaceType fromId(Long id) {
        if (id == null) {
            return null;
        }
        PlaceType placeType = new PlaceType();
        placeType.setId(id);
        return placeType;
    }
}
