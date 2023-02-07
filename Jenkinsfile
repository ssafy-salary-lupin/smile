pipeline {
    agent any
    tools {nodejs "16.19.0"}

    stages {
        stage("Set Variable") {
            steps {
                script {
                    IMAGE_NAME = "sh80165/smile-react"
                    IMAGE_STORAGE = "https://registry.hub.docker.com"
                    IMAGE_STORAGE_CREDENTIAL = "docker-hub"
                    SSH_CONNECTION = "ubuntu@i8b205.p.ssafy.io"
                    SSH_CONNECTION_CREDENTIAL = "Deploy-Server-SSH-Credential"
                    REACT_BUILD_PATH = "./build"
                    APPLICATION_YML_PATH = "/var/jenkins_home/workspace"
                    CONTAINER_NAME = "smile-fronted"
                    PROJECT_DIR = "frontend"
                }
            }
        }

        stage("Clean Build Test") {
            steps {
                dir("${PROJECT_DIR}"){
                    sh "pwd"
                    sh "npm i"
                    sh "npm run build"
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

        stage("Server Run") {
            steps {
                sshagent([SSH_CONNECTION_CREDENTIAL]) {
                    // 테스트
                    //기존 파일 삭제
                    //sh "ssh -o StrictHostKeyChecking=no ${SSH_CONNECTION} 'rm -rf ./frontend/build'"
                    // 최신 컨테이너 삭제
                    //sh "ssh -o StrictHostKeyChecking=no ${SSH_CONNECTION} 'docker rm -f ${CONTAINER_NAME}'"
                    // 최신 이미지 삭제
                    // sh "ssh -o StrictHostKeyChecking=no ${SSH_CONNECTION} 'docker rmi -f ${IMAGE_NAME}:latest'"
                    // 최신 이미지 PULL
                    // sh "ssh -o StrictHostKeyChecking=no ${SSH_CONNECTION} 'docker pull ${IMAGE_NAME}:latest'"
                    // 이미지 확인
                    // sh "ssh -o StrictHostKeyChecking=no ${SSH_CONNECTION} 'docker images'"
                    // 최신 이미지 RUN
                    // sh "ssh -o StrictHostKeyChecking=no ${SSH_CONNECTION} 'docker run -d -v /home/ubuntu/frontend:/usr/app --name ${CONTAINER_NAME} ${IMAGE_NAME}:latest'"
                    // 컨테이너 확인
                    // sh "ssh -o StrictHostKeyChecking=no ${SSH_CONNECTION} 'docker ps -a'"
                    //기존 파일 삭제
                    sh "ssh -o StrictHostKeyChecking=no ${SSH_CONNECTION} 'rm -rf ./frontend/build'"
                    //파일 이동
                    sh "scp -o StrictHostKeyChecking=no -r ${PROJECT_DIR}/build ${SSH_CONNECTION}:/home/ubuntu/frontend/build"
                }   
            }
        }
    }
}