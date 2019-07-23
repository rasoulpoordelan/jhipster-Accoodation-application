package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.service.AttributeService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.service.dto.AttributeDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link io.github.jhipster.application.domain.Attribute}.
 */
@RestController
@RequestMapping("/api")
public class AttributeResource {

    private final Logger log = LoggerFactory.getLogger(AttributeResource.class);

    private static final String ENTITY_NAME = "attribute";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AttributeService attributeService;

    public AttributeResource(AttributeService attributeService) {
        this.attributeService = attributeService;
    }

    /**
     * {@code POST  /attributes} : Create a new attribute.
     *
     * @param attributeDTO the attributeDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new attributeDTO, or with status {@code 400 (Bad Request)} if the attribute has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/attributes")
    public ResponseEntity<AttributeDTO> createAttribute(@RequestBody AttributeDTO attributeDTO) throws URISyntaxException {
        log.debug("REST request to save Attribute : {}", attributeDTO);
        if (attributeDTO.getId() != null) {
            throw new BadRequestAlertException("A new attribute cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AttributeDTO result = attributeService.save(attributeDTO);
        return ResponseEntity.created(new URI("/api/attributes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /attributes} : Updates an existing attribute.
     *
     * @param attributeDTO the attributeDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated attributeDTO,
     * or with status {@code 400 (Bad Request)} if the attributeDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the attributeDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/attributes")
    public ResponseEntity<AttributeDTO> updateAttribute(@RequestBody AttributeDTO attributeDTO) throws URISyntaxException {
        log.debug("REST request to update Attribute : {}", attributeDTO);
        if (attributeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AttributeDTO result = attributeService.save(attributeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, attributeDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /attributes} : get all the attributes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of attributes in body.
     */
    @GetMapping("/attributes")
    public List<AttributeDTO> getAllAttributes() {
        log.debug("REST request to get all Attributes");
        return attributeService.findAll();
    }

    /**
     * {@code GET  /attributes/:id} : get the "id" attribute.
     *
     * @param id the id of the attributeDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the attributeDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/attributes/{id}")
    public ResponseEntity<AttributeDTO> getAttribute(@PathVariable Long id) {
        log.debug("REST request to get Attribute : {}", id);
        Optional<AttributeDTO> attributeDTO = attributeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(attributeDTO);
    }

    /**
     * {@code DELETE  /attributes/:id} : delete the "id" attribute.
     *
     * @param id the id of the attributeDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/attributes/{id}")
    public ResponseEntity<Void> deleteAttribute(@PathVariable Long id) {
        log.debug("REST request to delete Attribute : {}", id);
        attributeService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
