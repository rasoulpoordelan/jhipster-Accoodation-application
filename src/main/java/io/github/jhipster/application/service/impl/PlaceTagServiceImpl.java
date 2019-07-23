package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.PlaceTagService;
import io.github.jhipster.application.domain.PlaceTag;
import io.github.jhipster.application.repository.PlaceTagRepository;
import io.github.jhipster.application.service.dto.PlaceTagDTO;
import io.github.jhipster.application.service.mapper.PlaceTagMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link PlaceTag}.
 */
@Service
@Transactional
public class PlaceTagServiceImpl implements PlaceTagService {

    private final Logger log = LoggerFactory.getLogger(PlaceTagServiceImpl.class);

    private final PlaceTagRepository placeTagRepository;

    private final PlaceTagMapper placeTagMapper;

    public PlaceTagServiceImpl(PlaceTagRepository placeTagRepository, PlaceTagMapper placeTagMapper) {
        this.placeTagRepository = placeTagRepository;
        this.placeTagMapper = placeTagMapper;
    }

    /**
     * Save a placeTag.
     *
     * @param placeTagDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public PlaceTagDTO save(PlaceTagDTO placeTagDTO) {
        log.debug("Request to save PlaceTag : {}", placeTagDTO);
        PlaceTag placeTag = placeTagMapper.toEntity(placeTagDTO);
        placeTag = placeTagRepository.save(placeTag);
        return placeTagMapper.toDto(placeTag);
    }

    /**
     * Get all the placeTags.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PlaceTagDTO> findAll(Pageable pageable) {
        log.debug("Request to get all PlaceTags");
        return placeTagRepository.findAll(pageable)
            .map(placeTagMapper::toDto);
    }


    /**
     * Get one placeTag by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PlaceTagDTO> findOne(Long id) {
        log.debug("Request to get PlaceTag : {}", id);
        return placeTagRepository.findById(id)
            .map(placeTagMapper::toDto);
    }

    /**
     * Delete the placeTag by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PlaceTag : {}", id);
        placeTagRepository.deleteById(id);
    }
}
