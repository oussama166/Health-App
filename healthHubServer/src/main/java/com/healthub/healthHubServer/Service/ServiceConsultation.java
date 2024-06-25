package com.healthub.healthHubServer.Service;

import com.healthub.healthHubServer.DOA.Model.Consultation;
import com.healthub.healthHubServer.DOA.Model.Enum.ConsultationStatus;
import com.healthub.healthHubServer.DOA.Model.Medecin;
import com.healthub.healthHubServer.DOA.Model.Patient;
import com.healthub.healthHubServer.DOA.Repository.ConsultationRepository;
import com.healthub.healthHubServer.Service.Manager.ManagerConsultation;
import com.healthub.healthHubServer.Web.ControllerPatient;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.*;


@Slf4j
@Service
public class ServiceConsultation implements ManagerConsultation {

    // Injection de consultation repository
    private final ConsultationRepository consultationRepository;

    public ServiceConsultation(ConsultationRepository consultationRepository) {
        this.consultationRepository = consultationRepository;
    }

    //  Logger
    private static final Logger logger = LoggerFactory.getLogger(ServiceConsultation.class);


    @Override
    public Optional<Consultation> setConsultation(Consultation consultation) {
        try {
            Optional<Consultation> consultationOptional = consultationRepository.findByIdAndDate(consultation.getId(), consultation.getDate());
            if (consultationOptional.isPresent()) {
                throw new Exception("Consultation impossible !!!");
            }
            consultationRepository.save(consultation);
            return Optional.of(consultation);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return Optional.empty();
        }
    }

    @Override
    public Optional<List<Consultation>> getAllConsultationsByDoc(Medecin medecin) {
        try {
            Optional<List<Consultation>> consultations = consultationRepository.findByMedecin(medecin);
            if (consultations.isPresent()) {
                return consultations;
            }
            throw new Exception("Can not get the list of consultation this doc!!!");
        } catch (Exception e) {
            logger.warn(e.getMessage());
            return Optional.empty();
        }
    }

    @Override
    public Optional<Patient> getPatientByConsultaionAndDoctor(
            int idDoc,
            int idCons
    ) {
        try {
            Optional<Patient> patient = consultationRepository.findByIdAndMedecin_Id(idDoc, idCons);
            if (patient.isPresent()) {
                return patient;
            }
            throw new Exception("Can not get the list of consultation this doc!!!");
        } catch (Exception e) {
            logger.warn(e.getMessage());
            return Optional.empty();
        }
    }

    // ================== Select by state consultation =======================
    @Override
    public Optional<List<Consultation>> getConsultationPending(Medecin medecin, Date dateConsultations) {
        try {
            Optional<List<Consultation>> consultations = consultationRepository.findByMedecinAndStatus(medecin, ConsultationStatus.PENDING, dateConsultations);
            if (consultations.isPresent()) {
                return consultations;
            }
            throw new Exception("Error occur getting consultation!!!");
        } catch (Exception e) {
            logger.warn(e.getMessage());
            return Optional.empty();
        }
    }

    @Override
    public Optional<List<Consultation>> getConsultationDone(Medecin medecin, Date dateConsultations) {
        try {
            Optional<List<Consultation>> consultations = consultationRepository.findByMedecinAndStatus(medecin, ConsultationStatus.DONE, dateConsultations);
            if (consultations.isPresent()) {
                return consultations;
            }
            throw new Exception("Error occur getting consultation!!!");
        } catch (Exception e) {
            logger.warn(e.getMessage());
            return Optional.empty();
        }
    }


    @Override
    public Optional<List<Consultation>> getConsultationRejected(Medecin medecin, Date dateConsultations) {
        try {
            Optional<List<Consultation>> consultations = consultationRepository.findByMedecinAndStatus(medecin, ConsultationStatus.REJECTED, dateConsultations);
            if (consultations.isPresent()) {
                return consultations;
            }
            throw new Exception("Error occur getting consultation!!!");
        } catch (Exception e) {
            logger.warn(e.getMessage());
            return Optional.empty();
        }
    }


    @Override
    public Optional<List<Consultation>> getConsultationToday(Date date, Medecin medecin) {
        try {

            Optional<List<Consultation>> consultationsTody = consultationRepository.findByDateAndMedecin(date, medecin, ConsultationStatus.REJECTED);
            if (consultationsTody.isPresent()) {
                return Optional.of(consultationsTody.get());
            }
            throw new Exception("We can not find any Consulation for today!!!");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return Optional.empty();
        }
    }


    @Override
    public Optional<Consultation> getConsultation(Medecin medecin, Patient patientId, Date ConsultationDate) {
        try {
            Optional<Set<Consultation>> consultations = consultationRepository.findByMedecinAndDateAndPatientConsulatation(
                    medecin,
                    ConsultationDate,
                    patientId
            );
            if (consultations.isPresent()) {
                return consultations.get().stream().findFirst();
            } else {
                throw new Exception("Consultation impossible !!!");
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return Optional.empty();
        }
    }

    @Override
    public Optional<Consultation> modifiedStatus(
            Consultation consultation
    ) {
        try {
            Optional<Consultation> optionalConsultation = consultationRepository.findById(consultation.getId());
            if (optionalConsultation.isPresent()) {
                Consultation existingConsultation = optionalConsultation.get();

                // Log the current and new status
                logger.info("Current status: {}", existingConsultation.getStatus());
                logger.info("New status: {}", consultation.getStatus());

                // Update the status
                existingConsultation.setStatus(consultation.getStatus());

                // Save the updated consultation
                Consultation updatedConsultation = consultationRepository.save(existingConsultation);
                return Optional.of(updatedConsultation);
            } else {
                logger.error("Consultation not found for id: {}", consultation.getId());
                throw new Exception("Consultation not found");
            }
        } catch (Exception e) {
            logger.error("Error occurred while modifying status", e);
            return Optional.empty();
        }
    }

    @Override
    public Optional<Consultation> removeConsultaionById(Medecin medecin, int consultationId) {
        try {
            Optional<Consultation> consultation = consultationRepository.findByIdAndMedecin(consultationId, medecin);
            if (consultation.isPresent()) {
                consultationRepository.delete(consultation.get());
                return consultation;
            }
            throw new Exception("Consultation can not be deleted");
        } catch (Exception e) {
            logger.warn(e.getMessage());
            return Optional.empty();
        }
    }

}
