package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.AttributeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Attribute} and its DTO {@link AttributeDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AttributeMapper extends EntityMapper<AttributeDTO, Attribute> {


    @Mapping(target = "attributes", ignore = true)
    @Mapping(target = "removeAttribute", ignore = true)
    Attribute toEntity(AttributeDTO attributeDTO);

    default Attribute fromId(Long id) {
        if (id == null) {
            return null;
        }
        Attribute attribute = new Attribute();
        attribute.setId(id);
        return attribute;
    }
}
