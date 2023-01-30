package cp.smile.config;

import lombok.Getter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter
public class BaseEntity {

    @CreatedDate
    @Column(name = "create_time", updatable = false) //임의로 수정할 수 없도록 false 로 설정
    private LocalDateTime createTime;

    @LastModifiedDate
    @Column(name = "update_time", updatable = false)
    private LocalDateTime updateTime;

    @CreatedBy
    @Column(name = "create_id", updatable = false)
    private int createId;

    @LastModifiedBy
    @Column(name = "update_id", updatable = false)
    private int updateId;
}
