pipeline {
  agent any

  environment {
    NODE_ENV = 'development'
  }

  stages {
    stage('Checkout') {
      steps {
        echo '🔄 Haciendo checkout del código...'
        git branch: 'main', url: 'https://github.com/SamirCortes/jenkins.git'
      }
    }

    stage('Instalar dependencias') {
      steps {
        echo '📦 Instalando dependencias...'
        sh 'npm install'
      }
    }

    stage('Ejecutar pruebas') {
      steps {
        echo '🧪 Ejecutando pruebas...'
        sh 'npm run test'
      }
    }

    stage('Build del proyecto') {
      steps {
        echo '🏗️ Generando build...'
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
      echo '📋 Pipeline finalizado.'
    }
  }
}