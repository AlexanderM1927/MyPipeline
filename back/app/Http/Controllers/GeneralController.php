<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\User;
use App\Task;
use Log;
use App\Mail\MessageSend;
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
            $access_token = 'AAAAufDIQ1c:APA91bF3mI7O2JWmDvBw6mWv6Ga-DUIyhXAlb6TxcxnH19XEvmBtuTZcIhB5YWfm3x9vd7wVT0n5pAhVYXkUzU8jX7RKNhOTPIUdKY09N421Uh91LAF9P4JdgM281zN4d9Y503B86CU0';

            $reg_id = $user->token_notifications;

            $message = [
                'message' => [
                    'notification' => [
                        'title' => 'Tarea de hoy',
                        'body' => 'Tienes una tarea: '.$user->task_name

                    ],
                ],
                'to' => $reg_id
            ];

            $client = new Client([
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => 'key='.$access_token,
                ]
            ]);
            $response = $client->post('https://fcm.googleapis.com/fcm/send',
                ['body' => json_encode($message)]
            );

            echo $response->getBody();
        }
    }

    //
}
