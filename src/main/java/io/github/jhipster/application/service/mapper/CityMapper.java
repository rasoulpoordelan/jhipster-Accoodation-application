package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.CityDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link City} and its DTO {@link CityDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CityMapper extends EntityMapper<CityDTO, City> {



    default City fromId(Long id) {
        if (id == null) {
            return null;
        }
        City city = new City();
        city.setId(id);
        return city;
    }
}
