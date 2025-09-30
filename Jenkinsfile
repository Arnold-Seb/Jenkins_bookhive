pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Arnold-Seb/Jenkins_bookhive.git'
            }
        }

        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Start Services') {
            steps {
                echo "🚀 Starting MongoDB and app test container with docker compose..."
                sh 'docker compose -f docker-compose.test.yml up -d --build'
                // Wait a few seconds for Mongo to be ready
                sh 'sleep 10'
            }
        }

        stage('Test') {
            steps {
                echo "🧪 Running Jest tests against test DB..."
                sh 'docker compose -f docker-compose.test.yml exec -T bookhive npm test'
            }
        }

        stage('Stop Services') {
            steps {
                echo "🛑 Stopping test containers..."
                sh 'docker compose -f docker-compose.test.yml down || true'
            }
        }

        stage('Deploy') {
            steps {
                echo '🚀 Deploy stage (placeholder)'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished!'
        }
    }
}
