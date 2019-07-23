package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.AttributeService;
import io.github.jhipster.application.domain.Attribute;
import io.github.jhipster.application.repository.AttributeRepository;
import io.github.jhipster.application.service.dto.AttributeDTO;
import io.github.jhipster.application.service.mapper.AttributeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Attribute}.
 */
@Service
@Transactional
public class AttributeServiceImpl implements AttributeService {

    private final Logger log = LoggerFactory.getLogger(AttributeServiceImpl.class);

    private final AttributeRepository attributeRepository;

    private final AttributeMapper attributeMapper;

    public AttributeServiceImpl(AttributeRepository attributeRepository, AttributeMapper attributeMapper) {
        this.attributeRepository = attributeRepository;
        this.attributeMapper = attributeMapper;
    }

    /**
     * Save a attribute.
     *
     * @param attributeDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public AttributeDTO save(AttributeDTO attributeDTO) {
        log.debug("Request to save Attribute : {}", attributeDTO);
        Attribute attribute = attributeMapper.toEntity(attributeDTO);
        attribute = attributeRepository.save(attribute);
        return attributeMapper.toDto(attribute);
    }

    /**
     * Get all the attributes.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<AttributeDTO> findAll() {
        log.debug("Request to get all Attributes");
        return attributeRepository.findAll().stream()
            .map(attributeMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one attribute by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<AttributeDTO> findOne(Long id) {
        log.debug("Request to get Attribute : {}", id);
        return attributeRepository.findById(id)
            .map(attributeMapper::toDto);
    }

    /**
     * Delete the attribute by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Attribute : {}", id);
        attributeRepository.deleteById(id);
    }
}
