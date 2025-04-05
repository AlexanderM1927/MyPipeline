pipeline {
    agent any
    options {
        disableConcurrentBuilds()
    }
    stages {
        stage('Prepare logs and permissions') {
            steps {
                sh 'sudo chown -R jenkins:www-data /var/lib/jenkins/workspace/mypipeline/back/storage'
            }
        }
        stage('Frontend prepare') {
            tools {
                nodejs 'node-21.11.1'
            }
            steps {
                dir('./front') {
                    sh 'icongenie generate -m pwa -i ./public/logo.png'
                }
            }
        }
        stage('Frontend build') {
            tools {
                nodejs 'node-14.16.1'
            }
            steps {
                withCredentials([file(credentialsId: 'envmypipeline-front', variable: 'ENV_FILE')]) {
                    sh 'rm -f ./front/.env'
                    sh 'cp "\$ENV_FILE" ./front/.env'
                }
                dir('./front') {
                    sh 'npm install'
                    sh 'quasar build -m pwa'
                    sh 'chown -R jenkins:jenkins ./dist/pwa'
                    sh 'rsync -a ./dist/pwa/. /var/lib/jenkins/workspace/mypipeline/back/public'
                }
            }
        }
        stage('Backend installed dependencies and run migrations') {
            steps {
                withCredentials([file(credentialsId: 'envmypipeline', variable: 'ENV_FILE')]) {
                    sh 'rm -f ./back/.env'
                    sh 'cp "\$ENV_FILE" ./back/.env'
                }
                dir('./back') {
                    sh 'sudo chown -R www-data:jenkins /var/lib/jenkins/workspace/myguardmoney/back/storage/'
                    sh 'composer install'
                    sh 'composer dump-autoload'
                    sh 'php artisan migrate --force'
                }
            }
        }
    }
}
