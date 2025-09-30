pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Arnold-Seb/Jenkins_bookhive.git'
            }
        }

        stage('Build') {
            steps {
                echo "⚙️ Installing dependencies..."
                sh 'npm ci || npm install'
            }
        }

        stage('Start Services') {
            steps {
                echo "🚀 Starting services with Docker Compose..."
                sh 'docker compose -f docker-compose.test.yml up -d --build'
            }
        }

        stage('Wait for MongoDB') {
            steps {
                echo "⏳ Waiting for MongoDB to be ready..."
                sh 'npx wait-on tcp:localhost:27017'
            }
        }

        stage('Test') {
            steps {
                echo "🧪 Running Jest tests..."
                sh 'MONGODB_URI_TEST=mongodb://localhost:27017/bookhive_test npm test'
            }
        }

        stage('Code Quality Check') {
            steps {
                echo "🔎 Running ESLint checks..."
                // Fail build if lint errors exist
                sh 'npx eslint .'
            }
        }

        stage('Stop Services') {
            steps {
                echo "🛑 Stopping services..."
                sh 'docker compose -f docker-compose.test.yml down -v || true'
            }
        }

        stage('Deploy') {
            steps {
                echo '🚀 Deploy stage (placeholder - add your deploy steps here)'
            }
        }
    }

    post {
        always {
            echo '✅ Pipeline finished!'
        }
    }
}
