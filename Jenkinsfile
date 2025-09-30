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
                echo '🟢 Starting MongoDB + BookHive (test mode)...'
                sh 'docker-compose -f docker-compose.test.yml up -d --build'
            }
        }

        stage('Run Tests') {
            steps {
                echo '🧪 Running Jest tests inside BookHive container...'
                sh 'docker-compose -f docker-compose.test.yml run --rm bookhive'
            }
        }

        stage('Stop Services') {
            steps {
                echo '🛑 Cleaning up services...'
                sh 'docker-compose -f docker-compose.test.yml down -v'
            }
        }

        stage('Deploy') {
            steps {
                echo '🚀 Deploy stage (placeholder for real deployment)'
            }
        }
    }

    post {
        always {
            echo '✅ Pipeline finished!'
        }
    }
}
