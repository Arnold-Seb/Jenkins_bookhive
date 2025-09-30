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
                echo "🧪 Running tests inside docker-compose..."
                sh 'docker compose -f docker-compose.test.yml run --rm test-runner'
            }
        }


        stage('Code Quality') {
            steps {
                echo "🔍 Running ESLint..."
                sh 'node ./node_modules/eslint/bin/eslint.js src || true'
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
