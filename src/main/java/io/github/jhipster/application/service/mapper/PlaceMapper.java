package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.PlaceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Place} and its DTO {@link PlaceDTO}.
 */
@Mapper(componentModel = "spring", uses = {AttributeMapper.class, PlaceTagMapper.class})
public interface PlaceMapper extends EntityMapper<PlaceDTO, Place> {


    @Mapping(target = "placeTypes", ignore = true)
    @Mapping(target = "removePlaceType", ignore = true)
    @Mapping(target = "removePlaceAtt", ignore = true)
    @Mapping(target = "removePlace", ignore = true)
    Place toEntity(PlaceDTO placeDTO);

    default Place fromId(Long id) {
        if (id == null) {
            return null;
        }
        Place place = new Place();
        place.setId(id);
        return place;
    }
}
