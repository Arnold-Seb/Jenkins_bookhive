pipeline {
    agent any

    environment {
        IMAGE_NAME = "bookhive-app"
        IMAGE_TAG = "latest"
        DOCKERHUB_REPO = "arnoldseb/bookhive-app"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Arnold-Seb/Jenkins_bookhive.git'
            }
        }

        stage('Build') {
            steps {
                echo "⚙️ Installing dependencies..."
                sh 'npm ci || npm install'
            }
        }

        stage('Start Services') {
            steps {
                echo "🚀 Starting services with Docker Compose..."
                sh 'docker compose -f $WORKSPACE/docker-compose.test.yml up -d --build'
            }
        }

        stage('Wait for MongoDB') {
            steps {
                echo "⏳ Waiting for MongoDB to be ready..."
                sh 'npx wait-on tcp:localhost:27017'
            }
        }

        stage('Test') {
            steps {
                echo "🧪 Running Jest tests..."
                sh 'MONGODB_URI_TEST=mongodb://localhost:27017/bookhive_test npm test'
            }
        }

        stage('Code Quality Check') {
            steps {
                echo "🔎 Running ESLint checks..."
                sh 'npx eslint .'
            }
        }

        stage('Stop Services') {
            steps {
                echo "🛑 Stopping services..."
                sh 'docker compose -f $WORKSPACE/docker-compose.test.yml down -v || true'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "📦 Building application Docker image..."
                sh 'docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .'
            }
        }

        stage('Deploy') {
            steps {
                echo "🚀 Pushing Docker image to DockerHub..."
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    
                    // Tag and push :latest
                    sh 'docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${DOCKERHUB_REPO}:${IMAGE_TAG}'
                    sh 'docker push ${DOCKERHUB_REPO}:${IMAGE_TAG}'

                    // Tag and push with Git commit SHA
                    script {
                        COMMIT_SHA = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                        sh "docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${DOCKERHUB_REPO}:${COMMIT_SHA}"
                        sh "docker push ${DOCKERHUB_REPO}:${COMMIT_SHA}"
                    }
                }
            }
        }
    }

    post {
        always {
            echo '✅ Pipeline finished!'
        }
    }
}
