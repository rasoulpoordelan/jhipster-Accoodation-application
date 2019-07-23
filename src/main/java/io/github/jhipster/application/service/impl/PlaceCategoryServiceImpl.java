package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.PlaceCategoryService;
import io.github.jhipster.application.domain.PlaceCategory;
import io.github.jhipster.application.repository.PlaceCategoryRepository;
import io.github.jhipster.application.service.dto.PlaceCategoryDTO;
import io.github.jhipster.application.service.mapper.PlaceCategoryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link PlaceCategory}.
 */
@Service
@Transactional
public class PlaceCategoryServiceImpl implements PlaceCategoryService {

    private final Logger log = LoggerFactory.getLogger(PlaceCategoryServiceImpl.class);

    private final PlaceCategoryRepository placeCategoryRepository;

    private final PlaceCategoryMapper placeCategoryMapper;

    public PlaceCategoryServiceImpl(PlaceCategoryRepository placeCategoryRepository, PlaceCategoryMapper placeCategoryMapper) {
        this.placeCategoryRepository = placeCategoryRepository;
        this.placeCategoryMapper = placeCategoryMapper;
    }

    /**
     * Save a placeCategory.
     *
     * @param placeCategoryDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public PlaceCategoryDTO save(PlaceCategoryDTO placeCategoryDTO) {
        log.debug("Request to save PlaceCategory : {}", placeCategoryDTO);
        PlaceCategory placeCategory = placeCategoryMapper.toEntity(placeCategoryDTO);
        placeCategory = placeCategoryRepository.save(placeCategory);
        return placeCategoryMapper.toDto(placeCategory);
    }

    /**
     * Get all the placeCategories.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<PlaceCategoryDTO> findAll() {
        log.debug("Request to get all PlaceCategories");
        return placeCategoryRepository.findAll().stream()
            .map(placeCategoryMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one placeCategory by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PlaceCategoryDTO> findOne(Long id) {
        log.debug("Request to get PlaceCategory : {}", id);
        return placeCategoryRepository.findById(id)
            .map(placeCategoryMapper::toDto);
    }

    /**
     * Delete the placeCategory by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PlaceCategory : {}", id);
        placeCategoryRepository.deleteById(id);
    }
}
