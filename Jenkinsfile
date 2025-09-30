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

        stage('Check Docker') {
            steps {
                echo '🔍 Checking Docker & Compose versions...'
                sh 'docker --version'
                sh 'docker compose version'
            }
        }

        stage('Start Services') {
            steps {
                echo '🚀 Starting MongoDB + BookHive (test mode)...'
                sh 'docker compose -f docker-compose.test.yml up -d --build'
                // Give MongoDB a little time to be ready
                sh 'sleep 10'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'MONGODB_URI_TEST=mongodb://localhost:27017/bookhive_test npm test'
            }
        }

        stage('Stop Services') {
            steps {
                echo '🛑 Stopping test services...'
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
            echo '✅ Pipeline finished!'
        }
    }
}
