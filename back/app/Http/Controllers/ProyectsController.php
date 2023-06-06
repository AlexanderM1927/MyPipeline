<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\User;
use App\Proyect;
use App\Http\Controllers\UserController;
use Log;

class ProyectsController extends Controller
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
        $cliente_id = $request->input('cliente_id');
        $name = $request->input('name', 'N.A');
        $descripcion = $request->input('descripcion', 'N.A');
        $linea = $request->input('linea', 'N.A');
        $monto = $request->input('monto', 0.0);
        $proyect = Proyect::create([
            'cliente_id' => $cliente_id,
            'name' => $name,
            'descripcion' => $descripcion,
            'linea' => $linea,
            'monto' => $monto
        ]);
        $r = true;
        return response()->json(['proyect' => $proyect,'insert' => $r]);
    }

    public function update (Request $request) {
        $id = $request->input('id');
        $cliente_id = $request->input('cliente_id');
        $name = $request->input('name', 'N.A');
        $descripcion = $request->input('descripcion', 'N.A');
        $linea = $request->input('linea', 'N.A');
        $monto = $request->input('monto', 0.0);
        if ((new UserController)->hasPermiss('proyect',$id)) {
            $proyect = DB::table('proyects')->where('id', $id)->update([
                'name' => $name,
                'descripcion' => $descripcion,
                'linea' => $linea,
                'monto' => $monto
            ]);
            $r = true;
            return response()->json(['proyect' => $proyect,'update' => $r]);
        }
    }

    public function get ($cliente_id) {
        $proyects = DB::table('proyects')->where('cliente_id','=',$cliente_id)->orderByDesc('updated_at')->get();
        return response()->json($proyects);
    }

    public function getById ($id = 0) {
        if ((new UserController)->hasPermiss('proyect',$id)) {
            $proyects = DB::table('proyects')->where('id', '=', $id)->get()->first();
            return response()->json($proyects);
        }
    }

    public function getDaysProyect ($id = 0) {
        try {
            $info = DB::table('proyects')
            ->join('phases', 'phases.proyecto_id', '=', 'proyects.id')
            ->join('tasks', 'tasks.fase_id', '=', 'phases.id')
            ->where('proyects.id', '=', $id)
            ->orderBy('tasks.date', 'ASC') // primera tarea
            ->get()
            ->first();

            $info2 = DB::table('proyects')
            ->join('phases', 'phases.proyecto_id', '=', 'proyects.id')
            ->join('tasks', 'tasks.fase_id', '=', 'phases.id')
            ->where('proyects.id', '=', $id)
            ->orderBy('tasks.date', 'DESC') // última tarea
            ->select('phases.*')
            ->get()
            ->first();
            $res = [];
            if ($info != null && $info2 != null) {
            $obj = array(
                "date" => $info->date,
                "last_phase" => $info2
            );
            $res = (object) $obj;
            }
            return response()->json($res);
        } catch (Exception $e) {
            return response()->json(["error" => $e]);
        }
    }

    public function getLastTask ($id = 0) {
        try {
            $info = DB::table('proyects')
            ->join('phases', 'phases.proyecto_id', '=', 'proyects.id')
            ->join('tasks', 'tasks.fase_id', '=', 'phases.id')
            ->where('proyects.id', '=', $id)
            ->whereDate('tasks.date', '<=', date('Y-m-d')) // tareas con fechas inferiores o iguales a hoy
            ->orderBy('tasks.date', 'DESC') // última tarea
            ->select('phases.*', 'tasks.name as task_name', 'tasks.date as task_date')
            ->get()
            ->first();

            return response()->json($info);
        } catch (Exception $e) {
            return response()->json(["error" => $e]);
        }
    }

    public function getNextTask ($id = 0) {
        try {
            $info = DB::table('proyects')
            ->join('phases', 'phases.proyecto_id', '=', 'proyects.id')
            ->join('tasks', 'tasks.fase_id', '=', 'phases.id')
            ->where('proyects.id', '=', $id)
            ->whereDate('tasks.date', '>', date('Y-m-d')) // tareas con fechas superiores a hoy
            ->orderBy('tasks.date', 'ASC') // primera tarea
            ->select('phases.*', 'tasks.name as task_name', 'tasks.date as task_date')
            ->get()
            ->first();
            return response()->json($info);
        } catch (Exception $e) {
            return response()->json(["error" => $e]);
        }
    }

    public function deleteProyectById ($id) {
        $project = DB::table('proyects')->where('id', '=', $id)->delete();
        return response()->json(['proyects' => $project]);
    }
}
