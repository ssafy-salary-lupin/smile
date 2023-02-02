package cp.smile.study_common.repository;

import cp.smile.entity.study_common.StudyComment;
import cp.smile.entity.study_common.StudyInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.xml.stream.events.Comment;
import java.util.Optional;
import java.util.Set;

public interface StudyCommentRepository extends JpaRepository<StudyComment,Integer> {

    @Query(value = "select s from StudyComment s " +
            "left join fetch s.user " +
            "left join fetch s.studyRelies sr " +
            "left join fetch sr.user " +
            "where s.isDeleted = false and s.studyInformation = :studyId")
    Optional<Set<StudyComment>> findAllCommentAndReply(@Param(value = "studyId") StudyInformation studyInformation);
}
