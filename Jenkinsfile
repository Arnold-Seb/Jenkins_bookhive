pipeline {
  agent any

  stages {
    stage('Start Services') {
      steps {
        sh 'docker compose -f docker-compose.test.yml up -d --build'
      }
    }

    stage('Run Tests') {
      steps {
        // Wait until MongoDB container is ready
        sh 'npx wait-on tcp:localhost:27017'

        // Dependencies
        sh 'npm ci || npm install'

        // Run Jest tests
        sh 'npm test'
      }
    }

    stage('Stop Services') {
      steps {
        sh 'docker compose -f docker-compose.test.yml down -v'
      }
    }
  }
}
