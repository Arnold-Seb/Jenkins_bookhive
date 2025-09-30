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
                echo "⚙️ Installing dependencies..."
                sh 'npm ci || npm install'
            }
        }

        stage('Test') {
            steps {
                echo "🧪 Running tests..."
                sh 'docker compose -f docker-compose.test.yml run --rm test-runner || true'
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
                echo "🚀 Deploying BookHive..."
                // Always tear down existing containers first
                sh 'docker compose -f docker-compose.test.yml down || true'
                // Rebuild and bring everything up fresh
                sh 'docker compose -f docker-compose.test.yml up -d --build'
                sh 'docker ps'
            }
        }
    }
}
