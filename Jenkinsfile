pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Arnold-Seb/Jenkins_bookhive.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Start Services') {
            steps {
                echo '🟢 Starting MongoDB + BookHive (test mode)...'
                sh 'docker-compose -f docker-compose.test.yml up -d'
                // give Mongo time to initialize
                sh 'sleep 20'
            }
        }

        stage('Run Tests') {
            steps {
                echo '🧪 Running Jest tests inside Docker Compose...'
                sh 'docker-compose -f docker-compose.test.yml run --rm bookhive'
            }
        }

        stage('Stop Services') {
            steps {
                echo '🛑 Stopping services and cleaning up...'
                sh 'docker-compose -f docker-compose.test.yml down -v'
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
            echo '✅ Pipeline finished (cleanup done)'
        }
    }
}
