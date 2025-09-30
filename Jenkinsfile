pipeline {
    agent any

    environment {
        IMAGE_NAME = "bookhive-app"
        IMAGE_TAG = "latest"
    }

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
                sh 'npx eslint .'
            }
        }

        stage('Stop Services') {
            steps {
                echo "🛑 Stopping services..."
                sh 'docker compose -f docker-compose.test.yml down -v || true'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "📦 Building application Docker image..."
                sh 'docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .'
                sh 'docker images ${IMAGE_NAME}:${IMAGE_TAG}'
            }
        }

        stage('Deploy') {
            steps {
                echo "🚀 Deploy stage (placeholder - push to registry or deploy to server)"
                // Example if pushing to DockerHub:
                // sh 'echo $DOCKERHUB_PASS | docker login -u $DOCKERHUB_USER --password-stdin'
                // sh 'docker push ${IMAGE_NAME}:${IMAGE_TAG}'
            }
        }
    }

    post {
        always {
            echo '✅ Pipeline finished!'
        }
    }
}
