<?php

namespace App\Http\Controllers;

use App\Task;
use App\User;
use App\Mail\MessageSend;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Log;
use GuzzleHttp\Client;

class GeneralController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }


    public function sendNotify () {

        // Ruta al archivo JSON con la clave de servicio de FCM
        $keyFilePath = '../../clave-fcm.json';

        // Lee el contenido del archivo JSON
        $keyFileContent = file_get_contents($keyFilePath);

        // Decodifica el contenido JSON y obtiene la clave privada
        $keyData = json_decode($keyFileContent, true);
        $privateKey = $keyData['private_key'];

        $tokenData = [
            'iss' => $keyData['client_email'],
            'sub' => $keyData['client_email'],
            'aud' => 'https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit',
            'iat' => time(),
            'exp' => time() + 3600, // El token expirará en 1 hora
        ];

        // Genera el token de acceso utilizando la clave privada
        $accessToken = JWT::encode($tokenData, $privateKey, 'RS256');

        $users = DB::table('users')
        ->join('clients', 'users.id', '=', 'clients.usuario_id')
        ->join('proyects', 'clients.id', '=', 'proyects.cliente_id')
        ->join('phases', 'proyects.id', '=', 'phases.proyecto_id')
        ->join('tasks', 'phases.id', '=', 'tasks.fase_id')
        ->whereDate('tasks.date', '=', date('Y-m-d'))
        ->select('users.token_notifications as token_notifications','users.email','tasks.name as task_name','tasks.commentary as task_commentary','phases.name as fase_name','proyects.name as proyecto_name', 'clients.name as cliente_name')
        ->get();
        foreach($users as $user) {
            // Log::debug($user->task_name);
            $body = '<b>Comentario:</b><br>'.$user->task_commentary.'<br><br><br>';
            $body .= '<b>Fase:</b> '.$user->fase_name.'<br>';
            $body .= '<b>Proyecto:</b> '.$user->proyecto_name.'<br><br>';
            $body .= '<b>Cliente:</b> '.$user->cliente_name.'<br><br>';
            $body .= '<a href="'. env('APP_URL') .'">Ir a MyPipeline</a>';
            Mail::to($user->email)->send(new MessageSend('Tienes una tarea: '.$user->task_name,$body,$user->email));
            $reg_id = $user->token_notifications;

            $message = [
                'message' => [
                    'notification' => [
                        'title' => 'Tarea de hoy',
                        'body' => 'Tienes una tarea: '.$user->task_name

                    ],
                    'token' => $reg_id
                ],
            ];

            $client = new Client();
            $response = $client->post('https://fcm.googleapis.com/v1/projects/' . env('FCM_PROJECT_ID') . '/messages:send', [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => 'Barer '.$accessToken,
                ],
                'json' => $message
            ]);

            echo $response->getBody();
        }
    }

    //
}
