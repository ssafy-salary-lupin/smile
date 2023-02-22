pipeline {
    agent any
<<<<<<< HEAD

    stages {

        stage("Set Variable") {
            steps {
                script {
                    IMAGE_NAME = "sh80165/smile-springboot"
=======
    tools {nodejs "16.19.0"}

    stages {
        stage("Set Variable") {
            steps {
                script {
                    IMAGE_NAME = "sh80165/smile-react"
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
                    IMAGE_STORAGE = "https://registry.hub.docker.com"
                    IMAGE_STORAGE_CREDENTIAL = "docker-hub"
                    SSH_CONNECTION = "ubuntu@i8b205.p.ssafy.io"
                    SSH_CONNECTION_CREDENTIAL = "Deploy-Server-SSH-Credential"
<<<<<<< HEAD
                    SPRING_BUILD_PATH = "./backend/smile"
                    APPLICATION_YML_PATH = "/var/jenkins_home/workspace"
                    CONTAINER_NAME = "smile-api"
                    PROJECT_DIR = "smile-gitlab-backend/"
=======
                    REACT_BUILD_PATH = "./build"
                    APPLICATION_YML_PATH = "/var/jenkins_home/workspace"
                    CONTAINER_NAME = "smile-fronted"
                    PROJECT_DIR = "frontend"
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
                }
            }
        }

        stage("Clean Build Test") {
            steps {
<<<<<<< HEAD
                dir("${SPRING_BUILD_PATH}"){
                    sh "pwd"
                    sh "chmod +x gradlew"
                    sh "./gradlew clean build -x test"
                    sh "ls -al ./build"
                }   
            }
        }
        stage("Copy Application.yml"){
            steps{
                dir("${APPLICATION_YML_PATH}"){
                    sh "cp -r -f resources ${PROJECT_DIR}"
                }
            }
        }

        stage("Build Container Image") {
            steps {


                script {
                    image = docker.build("${IMAGE_NAME}")
                }
            }
        }

        stage("Push Container Image") {
            steps {
                script {
                    docker.withRegistry("${IMAGE_STORAGE}", "docker-hub") {
                        image.push("${env.BUILD_NUMBER}")
                        image.push("latest")
                        image
                    }
                }
            }
        }
=======
                dir("${PROJECT_DIR}"){
                    sh "pwd"
                    sh "npm i"
                    sh "npm run build"
                }
                

            }
        }

        // stage("Build Container Image") {
        //     steps {
        //         script {
        //             image = docker.build("${IMAGE_NAME}")
        //         }
        //     }
        // }

        // stage("Push Container Image") {
        //     steps {
        //         script {
        //             docker.withRegistry("${IMAGE_STORAGE}", "docker-hub") {
        //                 image.push("${env.BUILD_NUMBER}")
        //                 image.push("latest")
        //                 image
        //             }
        //         }
        //     }
        // }
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3

        stage("Server Run") {
            steps {
                sshagent([SSH_CONNECTION_CREDENTIAL]) {
<<<<<<< HEAD
                    // 최신 컨테이너 삭제
                    sh "ssh -o StrictHostKeyChecking=no ${SSH_CONNECTION} 'docker rm -f ${CONTAINER_NAME}'"
                    // 최신 이미지 삭제
                    sh "ssh -o StrictHostKeyChecking=no ${SSH_CONNECTION} 'docker rmi -f ${IMAGE_NAME}:latest'"
                    // 최신 이미지 PULL
                    sh "ssh -o StrictHostKeyChecking=no ${SSH_CONNECTION} 'docker pull ${IMAGE_NAME}:latest'"
                    // 이미지 확인
                    sh "ssh -o StrictHostKeyChecking=no ${SSH_CONNECTION} 'docker images'"
                    // 최신 이미지 RUN
                    sh "ssh -o StrictHostKeyChecking=no ${SSH_CONNECTION} 'docker run -d --name ${CONTAINER_NAME} -p 8080:8080 ${IMAGE_NAME}:latest'"
                    // 컨테이너 확인
                    sh "ssh -o StrictHostKeyChecking=no ${SSH_CONNECTION} 'docker ps -a'"
=======
                    // 기존 파일 삭제
                    sh "ssh -o StrictHostKeyChecking=no ${SSH_CONNECTION} 'rm -rf ./frontend/build'"
                    //파일 이동
                    sh "scp -o StrictHostKeyChecking=no -r ${PROJECT_DIR}/build ${SSH_CONNECTION}:/home/ubuntu/frontend/build"
>>>>>>> c0dc003313907ffeb78ac00e745a4ddc5dd570c3
                }   
            }
        }
    }
}