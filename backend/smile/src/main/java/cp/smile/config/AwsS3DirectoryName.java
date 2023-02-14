package cp.smile.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

/*AWS S3 디렉토리 명*/
@Component
public class AwsS3DirectoryName {


    public static String DEFAULT_PROFILE; //프로필 디폴트 이미지 기본경로

    public static String DEFAULT_STUDY; //스터디 디폴트 이미지 기본경로.

    public static String STUDY_IMG; //스터디 이미지 관련

    public static String STUDY_FILE; //스터디 관련 파일 기본경로.

    public static String PROFILE_IMG; //유저 프로필 이미지 관련

    @Value("${cloud.aws.s3.directory.default.profile}")
    public void setDefaultProfile(String defaultProfile) {
        DEFAULT_PROFILE = defaultProfile;
    }

    @Value("${cloud.aws.s3.directory.default.study}")
    public void setDefaultStudy(String defaultStudy) {
        DEFAULT_STUDY = defaultStudy;
    }

    @Value("${cloud.aws.s3.directory.study.image}")
    public void setStudyImg(String studyImg) {
        STUDY_IMG = studyImg;
    }

    @Value("${cloud.aws.s3.directory.study.file}")
    public void setStudyFile(String studyFile) {
        STUDY_FILE = studyFile;
    }

    @Value("${cloud.aws.s3.directory.profile.image}")
    public void setProfileImg(String profileImg) {
        PROFILE_IMG = profileImg;
    }
}
