package com.healthub.healthHubServer.Web;

import com.healthub.healthHubServer.DOA.Model.Consultation;
import com.healthub.healthHubServer.DOA.Model.Medecin;
import com.healthub.healthHubServer.DOA.Model.Patient;
import com.healthub.healthHubServer.Service.Manager.ManagerConsultation;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Slf4j
@Controller
@RequestMapping("/api/v1")
@CrossOrigin(
        value = "http://localhost:5173/"
)
public class ControllerConsultation {

    // Inject manger Consultation
    private final ManagerConsultation consultationManager;

    public ControllerConsultation(ManagerConsultation consultationManager) {
        this.consultationManager = consultationManager;
    }


    @Data
    @Builder
    public static class MedcinTime {
        private Medecin medecin;
        private Date date;

    }

    // Logger
    private static final Logger logger = LoggerFactory.getLogger(ControllerConsultation.class);

    // =========== CREATE =========== //
    @PostMapping(
            path = "/setConsultation",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> SetConsultation(
            @RequestBody Consultation consultation
    ) {
        try {
            Optional<Consultation> consultationOptional = consultationManager.setConsultation(consultation);
            if (consultationOptional.isPresent()) {
                return ResponseEntity.status(200).body(consultation);
            }
            throw new Exception("we can not create this consultation");
        } catch (Exception e) {
            logger.warn(e.getMessage());
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    // =========== SELECT =========== //

    @GetMapping(
            value = "/getAllConsultation",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> getAllConsultationByDoc(
            @RequestBody Medecin medecin
    ) {
        try {
            Optional<List<Consultation>> list = consultationManager.getAllConsultationsByDoc(medecin);
            if (list.isPresent()) {
                return ResponseEntity.status(200).body(list.get());
            }
            throw new Exception("This Doc null consultation !!!");
        } catch (Exception e) {
            logger.warn(e.getMessage());
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping(
            path = "/getConsultationPending",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> getConsultationPending(
            @RequestBody Medecin medecin,
            @Valid @RequestParam("consultationDate") Date dateConsulataionDate

    ) {
        try {
            Optional<List<Consultation>> list = consultationManager.getConsultationPending(medecin, dateConsulataionDate);
            if (list.isPresent()) {
                return ResponseEntity.status(200).body(list.get());
            }
            throw new Exception("This Doc hasn't any pending consultation !!!");
        } catch (Exception e) {
            logger.warn(e.getMessage());
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping(
            path = "getConsultationDone",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> getConsultationDone(
            @RequestBody Medecin medecin,
            @Valid @RequestParam("consultationDate") Date dateConsulataionDate

    ) {
        try {
            Optional<List<Consultation>> list = consultationManager.getConsultationDone(medecin, dateConsulataionDate);
            if (list.isPresent()) {
                return ResponseEntity.status(200).body(list.get());
            }
            throw new Exception("This Doc hasn't any Done consultation !!!");
        } catch (Exception e) {
            logger.warn(e.getMessage());
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping(
            path = "getConsultationRejected",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> getConsultationRejected(
            @RequestBody Medecin medecin,
            @Valid @RequestParam("consultationDate") Date dateConsulataionDate

    ) {
        try {
            Optional<List<Consultation>> list = consultationManager.getConsultationRejected(medecin, dateConsulataionDate);
            if (list.isPresent()) {
                return ResponseEntity.status(200).body(list.get());
            }
            throw new Exception("This Doc hasn't any Rejected consultation !!!");
        } catch (Exception e) {
            logger.warn(e.getMessage());
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @PostMapping(
            path = "/getConsultationToday",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> getConsulatuonTody(@RequestBody MedcinTime medecin) {
        try {
            Optional<List<Consultation>> list = consultationManager.getConsultationToday(medecin.getDate(), medecin.getMedecin());
            if (list.isPresent()) {
                return ResponseEntity.status(200).body(list.get());
            }
            throw new Exception("This Doc hasn't any consultation for today !!!");
        } catch (Exception e) {
            logger.warn(e.getMessage());
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @PostMapping(path = "/getPatientByIdAndIdDoc")
    public ResponseEntity<?> getPatientByIdAndIdDoc(
            @RequestParam(name = "id") String id,
            @RequestParam(name = "idDoc") String idDoc
    ) {
        try {
            int idCons = Integer.parseInt(id);
            int idDoctor = Integer.parseInt(idDoc);
            Optional<Patient> patieCons = consultationManager.getPatientByConsultaionAndDoctor(idCons, idDoctor);
            return ResponseEntity.status(200).body(patieCons.get());
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @PutMapping(
            path = "/modifiedConsultation",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> modifiedConsultationStatus(
            @RequestBody Consultation consultation
    ) {
        try {
            Optional<Consultation> consultationOptional = consultationManager.modifiedStatus(consultation);
            if (consultationOptional.isPresent()) {
                return ResponseEntity.status(200).body(consultationOptional.get());
            }
            throw new Exception("Error!!!");
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    // =========== Modification =========== //


    @GetMapping(
            path = "/removeConsultation",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> removeConsultation(
            @RequestBody Medecin medecin,
            @RequestBody int consultationId
    ) {
        try {
            Optional<Consultation> consultationOptional = consultationManager.removeConsultaionById(medecin, consultationId);
            if (consultationOptional.isPresent()) {
                logger.info(consultationOptional.get().toString());
                return ResponseEntity.status(200).body(consultationOptional.get());
            }
            throw new Exception("This Consultation has some issue !!!");
        } catch (Exception e) {
            logger.warn(e.getMessage());
            return ResponseEntity.status(400).body(e.getMessage());
        }

    }


}
