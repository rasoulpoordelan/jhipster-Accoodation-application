package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.PlaceAreaService;
import io.github.jhipster.application.domain.PlaceArea;
import io.github.jhipster.application.repository.PlaceAreaRepository;
import io.github.jhipster.application.service.dto.PlaceAreaDTO;
import io.github.jhipster.application.service.mapper.PlaceAreaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link PlaceArea}.
 */
@Service
@Transactional
public class PlaceAreaServiceImpl implements PlaceAreaService {

    private final Logger log = LoggerFactory.getLogger(PlaceAreaServiceImpl.class);

    private final PlaceAreaRepository placeAreaRepository;

    private final PlaceAreaMapper placeAreaMapper;

    public PlaceAreaServiceImpl(PlaceAreaRepository placeAreaRepository, PlaceAreaMapper placeAreaMapper) {
        this.placeAreaRepository = placeAreaRepository;
        this.placeAreaMapper = placeAreaMapper;
    }

    /**
     * Save a placeArea.
     *
     * @param placeAreaDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public PlaceAreaDTO save(PlaceAreaDTO placeAreaDTO) {
        log.debug("Request to save PlaceArea : {}", placeAreaDTO);
        PlaceArea placeArea = placeAreaMapper.toEntity(placeAreaDTO);
        placeArea = placeAreaRepository.save(placeArea);
        return placeAreaMapper.toDto(placeArea);
    }

    /**
     * Get all the placeAreas.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<PlaceAreaDTO> findAll() {
        log.debug("Request to get all PlaceAreas");
        return placeAreaRepository.findAll().stream()
            .map(placeAreaMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one placeArea by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PlaceAreaDTO> findOne(Long id) {
        log.debug("Request to get PlaceArea : {}", id);
        return placeAreaRepository.findById(id)
            .map(placeAreaMapper::toDto);
    }

    /**
     * Delete the placeArea by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PlaceArea : {}", id);
        placeAreaRepository.deleteById(id);
    }
}
