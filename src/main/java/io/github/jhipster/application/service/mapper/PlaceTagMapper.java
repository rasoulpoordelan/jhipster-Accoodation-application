package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.PlaceTagDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link PlaceTag} and its DTO {@link PlaceTagDTO}.
 */
@Mapper(componentModel = "spring", uses = {TagMapper.class})
public interface PlaceTagMapper extends EntityMapper<PlaceTagDTO, PlaceTag> {

    @Mapping(source = "tag.id", target = "tagId")
    PlaceTagDTO toDto(PlaceTag placeTag);

    @Mapping(source = "tagId", target = "tag")
    @Mapping(target = "placeTags", ignore = true)
    @Mapping(target = "removePlaceTag", ignore = true)
    PlaceTag toEntity(PlaceTagDTO placeTagDTO);

    default PlaceTag fromId(Long id) {
        if (id == null) {
            return null;
        }
        PlaceTag placeTag = new PlaceTag();
        placeTag.setId(id);
        return placeTag;
    }
}
