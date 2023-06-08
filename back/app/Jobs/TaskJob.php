<?php

namespace App\Jobs;

use App\Mail\MessageSend;
use Illuminate\Support\Facades\Mail;

class TaskJob extends Job
{
    private $user;
    private $body;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($user, $body)
    {
        $this->user = $user;
        $this->body = $body;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Mail::to($user->email)->send(new MessageSend('Tienes una tarea: '.$user->task_name,$body,$user->email));
    }
}
