package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.ServiceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Service} and its DTO {@link ServiceDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ServiceMapper extends EntityMapper<ServiceDTO, Service> {


    @Mapping(target = "services", ignore = true)
    @Mapping(target = "removeService", ignore = true)
    Service toEntity(ServiceDTO serviceDTO);

    default Service fromId(Long id) {
        if (id == null) {
            return null;
        }
        Service service = new Service();
        service.setId(id);
        return service;
    }
}
