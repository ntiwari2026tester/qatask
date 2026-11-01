pipeline {
    agent any
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/ntiwari2026tester/qatask.git'
            }
        }
        stage('Run Tests') {
            steps {
                bat 'mvn clean test'
            }
        }
    }
    post {
        always {
            junit 'target/surefire-reports/*.xml'
        }
    }
}
