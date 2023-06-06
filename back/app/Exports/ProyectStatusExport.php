<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Log;

class ProyectStatusExport implements FromView
{
    /**
    * @return \Illuminate\Support\Collection
    */
    protected $usuario_id;

    public function __construct(Int $usuario_id) {

        $this->usuario_id = $usuario_id;
    }


    public function view(): View
    {
        $proyectos = DB::table('clients')
        ->join('proyects', 'clients.id', '=', 'proyects.cliente_id')
        ->join('phases', 'phases.proyecto_id', '=', 'proyects.id')
        ->where('clients.usuario_id', '=', $this->usuario_id)
        ->select('clients.name as cliente', 'phases.name as fase', 'phases.color as color', 'proyects.name as name', DB::raw("(SELECT tasks.date FROM tasks WHERE tasks.fase_id = phases.id ORDER BY tasks.date DESC LIMIT 1) as last_task"))
        ->get();
        Log::debug($proyectos);
        return view('proyectstatus')->with('proyectos', $proyectos);
    }
}
