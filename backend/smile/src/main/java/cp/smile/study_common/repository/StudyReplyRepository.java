package cp.smile.study_common.repository;

import cp.smile.entity.study_common.StudyReply;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface StudyReplyRepository extends JpaRepository<StudyReply,Integer> {

    Optional<StudyReply> findByIdAndIsDeletedFalse(int replyId);

    Optional<StudyReply> findByIdAndUserIdAndIsDeletedFalse(int reply,int userId);
}
