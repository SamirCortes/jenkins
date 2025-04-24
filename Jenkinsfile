pipeline {
  agent any

  environment {
    NODE_ENV = 'development'
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/SamirCortes/jenkins.git'
      }
    }

    stage('Instalar dependencias') {
      steps {
        sh 'npm install'
      }
    }

    stage('Ejecutar pruebas') {
      steps {
        sh 'npm run test'
      }
    }

    stage('Build del proyecto') {
      steps {
        sh 'npm run build'
      }
    }
  }

  post {
    success {
      echo '✅ Build y pruebas exitosas.'
    }
    failure {
      echo '❌ Error durante el pipeline.'
    }
    always {
      echo 'Pipeline finalizado.'
    }
  }
}
