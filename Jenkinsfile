pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.test.yml'
    }

    stages {
        stage('Checkout') {
            steps {
                echo "📥 Checking out code..."
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo "🐳 Building Docker images..."
                sh "docker-compose -f ${DOCKER_COMPOSE_FILE} build"
            }
        }

        stage('Test') {
            steps {
                echo "🧪 Running tests inside Docker..."
                sh "docker-compose -f docker-compose.test.yml up --abort-on-container-exit --exit-code-from bookhive"
            }
        }


        stage('Code Quality') {
            steps {
                echo "🔍 Running ESLint..."
                sh "docker run --rm bookhive npm run lint || echo 'Lint warnings found'"
            }
        }

        stage('Deploy') {
            steps {
                echo "🚀 Deploying BookHive (placeholder step)..."
                // Example: copy files, restart service, or push image
                // sh "docker-compose -f docker-compose.prod.yml up -d"
            }
        }
    }

    post {
        always {
            echo "🧹 Cleaning up containers..."
            sh "docker-compose -f ${DOCKER_COMPOSE_FILE} down -v || true"
        }
        success {
            echo "✅ Pipeline completed successfully!"
        }
        failure {
            echo "❌ Pipeline failed. Please check logs."
        }
    }
}
