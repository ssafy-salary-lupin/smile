FROM openjdk:11-jdk

ENV APP_HOME=/usr/app

WORKDIR $APP_HOME

COPY ./S08P12B205/backend/smile/build/libs/*.jar ./application.jar

COPY ./resources ./resources

EXPOSE 8080


ENTRYPOINT ["java","-jar","-Dspring.config.location=resources/application.yml,resources/application-deploy.yml", "-Dspring.activate.on-profile=deploy", "application.jar"]