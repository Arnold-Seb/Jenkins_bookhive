pipeline {
    agent any

    environment {
        DOCKER_COMPOSE = 'docker-compose -f docker-compose.test.yml'
    }

    stages {
        stage('Checkout') {
            steps {
                echo "📥 Checking out source code..."
                checkout scm
            }
        }

        stage('Install') {
            steps {
                echo "📦 Installing dependencies..."
                sh 'npm install'
            }
        }

        stage('Lint') {
            steps {
                echo "🔍 Running ESLint..."
                sh 'npx eslint . || true'  // don’t fail pipeline on lint warnings
            }
        }

        stage('Test') {
            steps {
                echo "🧪 Running tests in Docker..."
                sh """
                  ${DOCKER_COMPOSE} down -v || true
                  ${DOCKER_COMPOSE} up --build --abort-on-container-exit
                """
            }
            post {
                always {
                    echo "🧹 Cleaning up Docker containers..."
                    sh "${DOCKER_COMPOSE} down -v || true"
                }
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo "🚀 Deployment stage (to be configured)..."
            }
        }
    }

    post {
        failure {
            echo "❌ Pipeline failed. Check logs above."
        }
        success {
            echo "✅ Pipeline completed successfully!"
        }
    }
}
