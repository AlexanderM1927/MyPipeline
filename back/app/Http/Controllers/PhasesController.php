<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\User;
use App\Phase;
use App\Http\Controllers\UserController;

class PhasesController extends Controller
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
    
    public function generate (Request $request) {
        $proyecto_id = $request->input('proyecto_id');
        $name = $request->input('name');
        $commentary = $request->input('commentary', 'N.A');
        $color = $request->input('color');
        if ((new UserController)->hasPermiss('proyect',$proyecto_id)) {
            $phase = Phase::create([
                'proyecto_id' => $proyecto_id,
                'name' => $name,
                'commentary' => $commentary,
                'color' => $color
            ]);
            return response()->json(['phase' => $phase]);
        }
    }

    public function get ($proyecto_id) {
        $phases = DB::table('phases')->where('proyecto_id', '=', $proyecto_id)->get();
        return response()->json($phases);
    }

    public function getById ($id = 0) {
        if ((new UserController)->hasPermiss('phase',$id)) {
            $phases = DB::table('phases')->where('id', '=', $id)->get()->first();
            return response()->json($phases);
        } else {
            return response()->json(["name" => "No tienes permiso"]);
        }
    }

    //
}
