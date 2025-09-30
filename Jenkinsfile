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

        stage('Start MongoDB') {
            steps {
                script {
                    // Run MongoDB as a background container for tests
                    sh 'docker run -d --name mongo-test -p 27017:27017 mongo:7'
                    // Give it a moment to accept connections
                    sh 'sleep 10'
                }
            }
        }

        stage('Test') {
            steps {
                sh 'MONGODB_URI_TEST=mongodb://localhost:27017/bookhive_test npm test'
            }
        }

        stage('Stop MongoDB') {
            steps {
                script {
                    // Clean up the container so it doesn’t keep running
                    sh 'docker rm -f mongo-test || true'
                }
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
