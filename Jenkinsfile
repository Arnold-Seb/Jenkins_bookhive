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
                echo '🚀 Starting MongoDB + BookHive (test mode)...'
                sh 'docker compose -f docker-compose.test.yml up -d --build'

                // Wait for MongoDB to be ready
                script {
                    echo '⏳ Waiting for MongoDB...'
                    sh '''
                        for i in {1..30}; do
                          mongo_container=$(docker ps -qf "ancestor=mongo:7")
                          if [ -n "$mongo_container" ] && docker exec "$mongo_container" \
                              mongosh --eval "db.adminCommand('ping')" >/dev/null 2>&1; then
                            echo "✅ MongoDB is ready!"
                            exit 0
                          fi
                          echo "Waiting for MongoDB... ($i/30)"
                          sleep 5
                        done
                        echo "❌ MongoDB did not become ready in time"
                        exit 1
                    '''
                }

                // Wait for BookHive app to be ready
                script {
                    echo '⏳ Waiting for BookHive service...'
                    sh '''
                        for i in {1..30}; do
                          if curl -s http://localhost:3000 >/dev/null 2>&1; then
                            echo "✅ BookHive service is ready!"
                            exit 0
                          fi
                          echo "Waiting for BookHive... ($i/30)"
                          sleep 5
                        done
                        echo "❌ BookHive service did not become ready in time"
                        exit 1
                    '''
                }
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
            echo 'Pipeline finished!'
        }
    }
}
