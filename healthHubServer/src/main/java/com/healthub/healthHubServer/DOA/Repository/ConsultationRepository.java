package com.healthub.healthHubServer.DOA.Repository;

import com.healthub.healthHubServer.DOA.Model.Consultation;
import com.healthub.healthHubServer.DOA.Model.Enum.ConsultationStatus;
import com.healthub.healthHubServer.DOA.Model.Medecin;
import com.healthub.healthHubServer.DOA.Model.Patient;
import org.apache.tomcat.util.bcel.Const;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.*;

public interface ConsultationRepository extends JpaRepository<Consultation, Integer> {
    @Query(
            value = "SELECT ct FROM Consultation ct WHERE ct.id = ?1 AND ct.date = ?2"
    )
    Optional<Consultation> findByIdAndDate(int idConsultation, Date dateConsultation);

    Optional<List<Consultation>> findByMedecin(Medecin medecin);

    @Query(
            value = "SELECT ct FROM Consultation ct WHERE ct.medecin = ?1 AND ct.Status = ?2 AND ct.date = ?3"
    )
    Optional<List<Consultation>> findByMedecinAndStatus(Medecin medecin, ConsultationStatus Status, Date consulationDate);

    Optional<Consultation> findByIdAndMedecin(int id, Medecin medecin);

    @Query("select (count(c) > 0) from Consultation c where c.patientConsulatation.id = ?1 and c.medecin.id = ?2 and c.Status = ?3")
    boolean exitsConsultationPending(int idP, int idD, ConsultationStatus Status);

    Optional<Set<Consultation>> findByMedecinAndDateAndPatientConsulatation(Medecin medecin, Date date, Patient patientConsulatation);

    @Query(
            value = "SELECT c FROM Consultation c LEFT JOIN FETCH c.patientConsulatation WHERE c.date = ?1 AND c.medecin = ?2 AND c.Status != ?3"
    )
    Optional<List<Consultation>> findByDateAndMedecin(Date date, Medecin medecin, ConsultationStatus consultationStatus);

    @Query(
            value = "SELECT  ct.patientConsulatation FROM Consultation ct WHERE ct.id = ?1 AND ct.medecin.id = ?2"
    )
    Optional<Patient> findByIdAndMedecin_Id(int id, int idMedecin);

    @Query(
            value = "SELECT ct FROM Consultation ct WHERE ct.id = ?1"
    )
    Optional<Consultation> findById(int id);
}
