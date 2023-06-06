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
use App\Http\Controllers\UserController;

class TasksController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    public function save (Request $request) {
        $fase_id = $request->input('fase_id');
        $name = $request->input('name');
        $commentary = $request->input('commentary');
        $date = $request->input('date');
        if ((new UserController)->hasPermiss('phase',$fase_id)) {
        $task = Task::create([
            'fase_id' => $fase_id,
            'name' => $name,
            'commentary' => $commentary,
            'date' => $date
        ]);

        $r = true;
        return response()->json(['task' => $task]);
        }
    }

    public function update (Request $request) {
        $id = $request->input('id');
        $name = $request->input('name');
        $commentary = $request->input('commentary');
        $date = $request->input('date');
        $task = DB::table('tasks')->where('id', $id)->update([
            'name' => $name,
            'commentary' => $commentary,
            'date' => $date
        ]);

        $r = true;
        return response()->json(['task' => $task]);
    }

    public function get ($fase_id) {
        if ((new UserController)->hasPermiss('phase',$fase_id)) {
            $tasks = DB::table('tasks')->where('fase_id', '=', $fase_id)->get();
            return response()->json($tasks);
        }
    }

    public function getById ($id = 0) {
        $tasks = DB::table('tasks')->where('id', '=', $id)->get()->first();
        return response()->json($tasks);
    }

    public function getByUser ($usuario_id = 0) {
        $tasks = DB::table('users')
        ->join('clients', 'users.id', '=', 'clients.usuario_id')
        ->join('proyects', 'clients.id', '=', 'proyects.cliente_id')
        ->join('phases', 'proyects.id', '=', 'phases.proyecto_id')
        ->join('tasks', 'phases.id', '=', 'tasks.fase_id')
        ->where('users.id', $usuario_id)
        ->select('users.email','tasks.name as task_name', 'tasks.id as task_id', 'tasks.date','tasks.commentary as task_commentary','phases.name as fase_name','proyects.name as proyecto_name', 'clients.name as cliente_name')
        ->get();
        return response()->json($tasks);
    }

    //
}
