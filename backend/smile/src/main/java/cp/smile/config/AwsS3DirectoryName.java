package cp.smile.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/*AWS S3 디렉토리 명*/
public class AwsS3DirectoryName {

    @Value("${cloud.aws.s3.bucket.directory.default.profile}")
    public String DEFAULT_PROFILE; //프로필 디폴트 이미지 기본경로
    @Value("${cloud.aws.s3.bucket.directory.default.study}")
    public String DEFAULT_STUDY; //스터디 디폴트 이미지 기본경로.
    @Value("${cloud.aws.s3.bucket.directory.study.image}")
    public String STUDY_IMG; //스터디 이미지 관련
    @Value("${cloud.aws.s3.bucket.directory.study.file}")
    public String STUDY_FILE; //스터디 관련 파일 기본경로.
    @Value("${cloud.aws.s3.bucket.directory.profile.image}")
    public String PROFILE_IMG; //유저 프로필 이미지 관련
}
