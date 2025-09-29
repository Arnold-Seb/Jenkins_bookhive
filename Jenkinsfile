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
                echo '🧪 Running Jest tests with Docker Compose...'
                sh '''
                # Clean up any previous containers
                docker-compose -f docker-compose.test.yml down || true

                # Build and run the test stack
                docker-compose -f docker-compose.test.yml up --build --abort-on-container-exit

                # Get exit code from test container
                TEST_EXIT_CODE=$(docker wait $(docker ps -aqf "name=bookhive"))
                docker-compose -f docker-compose.test.yml down

                # Exit with the test container's status
                exit $TEST_EXIT_CODE
                '''
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
