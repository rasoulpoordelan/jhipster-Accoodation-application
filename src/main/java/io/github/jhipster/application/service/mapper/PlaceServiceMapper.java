package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.PlaceServiceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link PlaceService} and its DTO {@link PlaceServiceDTO}.
 */
@Mapper(componentModel = "spring", uses = {ServiceMapper.class})
public interface PlaceServiceMapper extends EntityMapper<PlaceServiceDTO, PlaceService> {

    @Mapping(source = "service.id", target = "serviceId")
    PlaceServiceDTO toDto(PlaceService placeService);

    @Mapping(source = "serviceId", target = "service")
    PlaceService toEntity(PlaceServiceDTO placeServiceDTO);

    default PlaceService fromId(Long id) {
        if (id == null) {
            return null;
        }
        PlaceService placeService = new PlaceService();
        placeService.setId(id);
        return placeService;
    }
}
