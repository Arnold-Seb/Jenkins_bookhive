pipeline {
    agent any

    environment {
        IMAGE_NAME = "bookhive-app"
        IMAGE_TAG = "latest"
        DOCKERHUB_REPO = "arnoldseb/bookhive-app"
    }

    stages {
        stage('Build') {
            steps {
                echo "⚙️ Building Docker image..."
                sh 'docker build -t $DOCKERHUB_REPO:$IMAGE_TAG .'
            }
        }

        stage('Test') {
            steps {
                echo "🧪 Running Jest tests..."
                sh '''
                docker compose -f docker-compose.test.yml up -d mongo
                sleep 10
                MONGODB_URI_TEST=mongodb://127.0.0.1:27017/bookhive_test npm test
                docker compose -f docker-compose.test.yml down -v
                '''
            }
        }

        stage('Code Quality') {
            steps {
                echo "🔍 Running ESLint..."
                sh 'npx eslint src || true'
            }
        }

        stage('Deploy') {
            steps {
                echo "🚀 Deploying application with Docker Compose..."
                sh 'docker compose -f docker-compose.test.yml up -d --build'
            }
        }
    }

    post {
        always {
            echo "✅ Pipeline finished!"
        }
    }
}
