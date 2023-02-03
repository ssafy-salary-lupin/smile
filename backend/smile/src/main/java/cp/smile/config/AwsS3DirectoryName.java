package cp.smile.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/*AWS S3 디렉토리 명*/
public class AwsS3DirectoryName {

    public final static String DEFAULT_PROFILE = "https://smile-project-bucket.s3.ap-northeast-2.amazonaws.com/default-img/profile.jpg"; //프로필 디폴트 이미지 기본경로
    public final static String DEFAULT_STUDY = "https://smile-project-bucket.s3.ap-northeast-2.amazonaws.com/default-img/study.jpg"; //스터디 디폴트 이미지 기본경로.

    public final static String STUDY_IMG = "study-img/"; //스터디 이미지 관련
    public final static String STUDY_FILE = "study-file/"; //스터디 관련 파일 기본경로.
}
