pipeline {
  agent any

  environment {
    NODE_ENV = 'development'
  }

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/SamirCortes/jenkins.git'
      }
    }

    stage('Instalar dependencias') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build del proyecto') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Ejecutar pruebas') {
      steps {
        sh 'npm run test'
      }
    }
  }

  post {
    always {
      echo 'Proceso terminado.'
    }
    success {
      echo '✅ Build exitoso.'
    }
    failure {
      echo '❌ Hubo un fallo.'
    }
  }
}