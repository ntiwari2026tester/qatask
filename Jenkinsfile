
pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/ntiwari2026tester/qatask.git'
            }
        }

        stage('Run Billing Deposit Test') {
            steps {
                bat 'mvn clean test'
            }
        }
    }

    post {
        always {
            junit testResults: 'target/surefire-reports/*.xml',
                  allowEmptyResults: true
        }
    }
}
