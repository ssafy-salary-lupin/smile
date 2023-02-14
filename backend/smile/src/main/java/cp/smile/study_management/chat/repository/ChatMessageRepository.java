package cp.smile.study_management.chat.repository;

import cp.smile.entity.study_management.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ChatMessageRepository extends JpaRepository<ChatMessage,Long> {

    @Query(value = "select cm from ChatMessage cm " +
            "left join fetch cm.user " +
            "where cm.studyInformation.id = :studyId ")
    Optional<List<ChatMessage>> findAllByChatMessages(@Param("studyId") int studyId);



}
