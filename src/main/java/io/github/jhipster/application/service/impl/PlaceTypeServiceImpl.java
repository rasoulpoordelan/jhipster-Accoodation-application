package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.PlaceTypeService;
import io.github.jhipster.application.domain.PlaceType;
import io.github.jhipster.application.repository.PlaceTypeRepository;
import io.github.jhipster.application.service.dto.PlaceTypeDTO;
import io.github.jhipster.application.service.mapper.PlaceTypeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link PlaceType}.
 */
@Service
@Transactional
public class PlaceTypeServiceImpl implements PlaceTypeService {

    private final Logger log = LoggerFactory.getLogger(PlaceTypeServiceImpl.class);

    private final PlaceTypeRepository placeTypeRepository;

    private final PlaceTypeMapper placeTypeMapper;

    public PlaceTypeServiceImpl(PlaceTypeRepository placeTypeRepository, PlaceTypeMapper placeTypeMapper) {
        this.placeTypeRepository = placeTypeRepository;
        this.placeTypeMapper = placeTypeMapper;
    }

    /**
     * Save a placeType.
     *
     * @param placeTypeDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public PlaceTypeDTO save(PlaceTypeDTO placeTypeDTO) {
        log.debug("Request to save PlaceType : {}", placeTypeDTO);
        PlaceType placeType = placeTypeMapper.toEntity(placeTypeDTO);
        placeType = placeTypeRepository.save(placeType);
        return placeTypeMapper.toDto(placeType);
    }

    /**
     * Get all the placeTypes.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<PlaceTypeDTO> findAll() {
        log.debug("Request to get all PlaceTypes");
        return placeTypeRepository.findAll().stream()
            .map(placeTypeMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one placeType by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PlaceTypeDTO> findOne(Long id) {
        log.debug("Request to get PlaceType : {}", id);
        return placeTypeRepository.findById(id)
            .map(placeTypeMapper::toDto);
    }

    /**
     * Delete the placeType by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PlaceType : {}", id);
        placeTypeRepository.deleteById(id);
    }
}
