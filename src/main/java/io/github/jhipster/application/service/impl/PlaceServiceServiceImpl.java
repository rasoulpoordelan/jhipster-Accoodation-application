package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.PlaceServiceService;
import io.github.jhipster.application.domain.PlaceService;
import io.github.jhipster.application.repository.PlaceServiceRepository;
import io.github.jhipster.application.service.dto.PlaceServiceDTO;
import io.github.jhipster.application.service.mapper.PlaceServiceMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link PlaceService}.
 */
@Service
@Transactional
public class PlaceServiceServiceImpl implements PlaceServiceService {

    private final Logger log = LoggerFactory.getLogger(PlaceServiceServiceImpl.class);

    private final PlaceServiceRepository placeServiceRepository;

    private final PlaceServiceMapper placeServiceMapper;

    public PlaceServiceServiceImpl(PlaceServiceRepository placeServiceRepository, PlaceServiceMapper placeServiceMapper) {
        this.placeServiceRepository = placeServiceRepository;
        this.placeServiceMapper = placeServiceMapper;
    }

    /**
     * Save a placeService.
     *
     * @param placeServiceDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public PlaceServiceDTO save(PlaceServiceDTO placeServiceDTO) {
        log.debug("Request to save PlaceService : {}", placeServiceDTO);
        PlaceService placeService = placeServiceMapper.toEntity(placeServiceDTO);
        placeService = placeServiceRepository.save(placeService);
        return placeServiceMapper.toDto(placeService);
    }

    /**
     * Get all the placeServices.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<PlaceServiceDTO> findAll() {
        log.debug("Request to get all PlaceServices");
        return placeServiceRepository.findAll().stream()
            .map(placeServiceMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one placeService by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PlaceServiceDTO> findOne(Long id) {
        log.debug("Request to get PlaceService : {}", id);
        return placeServiceRepository.findById(id)
            .map(placeServiceMapper::toDto);
    }

    /**
     * Delete the placeService by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PlaceService : {}", id);
        placeServiceRepository.deleteById(id);
    }
}
