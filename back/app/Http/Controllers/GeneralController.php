<?php

namespace App\Http\Controllers;

use App\Task;
use App\User;
use App\Mail\MessageSend;
use Lcobucci\JWT\Signer\Key\LocalFileReference;
use Lcobucci\JWT\Signer\Key\InMemory;
use Lcobucci\JWT\Signer\Rsa\Sha256;
use Lcobucci\JWT\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Log;
use GuzzleHttp\Client;

class GeneralController extends Controller
{

    private $accessToken;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // Ruta al archivo JSON con la clave de servicio de FCM
        $keyFilePath = '../../clave-fcm.json';

        // Carga la clave privada desde el archivo JSON
        $keyContents = file_get_contents($keyFilePath);

        $keyData = json_decode($keyContents, true);

        $privateKey = InMemory::plainText($keyData['private_key']);

        // Crea un generador de tokens JWT
        $builder = new Builder();
        $signer = new Sha256();


        // Configura el token JWT
        $token = $builder
            ->issuedBy($keyData['client_email'])
            ->permittedFor('https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit')
            ->issuedAt(new \DateTimeImmutable()) // Fecha de emisión actual
            ->expiresAt((new \DateTimeImmutable())->modify('+1 hour')) // Fecha de expiración en 1 hora
            ->getToken($signer, $privateKey);

        // Obtiene el token de acceso
        $accessToken = (string) $token;

        // Genera el token de acceso utilizando la clave privada
        $this->accessToken = $accessToken;
    }


    public function sendNotify () {

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

            Log::info('$this->accessToken: '.$this->accessToken);

            $client = new Client();
            $response = $client->post('https://fcm.googleapis.com/v1/projects/' . env('FCM_PROJECT_ID') . '/messages:send', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $this->accessToken,
                    'Content-Type' => 'application/json',
                ],
                'json' => $message,
            ]);


            echo $response->getBody();
        }
    }

    //
}
