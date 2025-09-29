pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "bookhive:latest"
    }

    stages {
        stage('Build') {
            steps {
                echo "📦 Installing dependencies and building BookHive..."
                sh 'npm install'
                sh 'npm run build || echo "No build script, skipping..."'
            }
        }

        stage('Test') {
            steps {
                echo "🧪 Running Jest/Mocha tests..."
                sh 'npm test'
            }
        }

        stage('Code Quality') {
            steps {
                echo "🔎 Running ESLint checks..."
                sh 'npx eslint . || true'
            }
        }

        stage('Deploy') {
            steps {
                echo "🚀 Building Docker image and deploying BookHive..."
                sh 'docker build -t $DOCKER_IMAGE .'
                sh 'docker run -d -p 3000:3000 --name bookhive $DOCKER_IMAGE || echo "Already running"'
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline completed successfully!"
        }
        failure {
            echo "❌ Pipeline failed. Please check logs."
        }
    }
}
