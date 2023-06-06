<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;
use Log;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
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
    
    public function getUser () {
        return response()->json(['user' => Auth::user()], 200);
    }

    public function hasPermiss ($type,$id) {
        $res = false;
        $usuario_id = Auth::user()->id;
        switch ($type) {
            case "proyect":
                $has = DB::table('proyects')
                ->join('clients', 'clients.id', '=', 'proyects.cliente_id')
                ->where('clients.usuario_id', '=', $usuario_id)
                ->where('proyects.id', '=', $id)
                ->count();
                if ($has > 0) {
                    $res = true;
                }
            break; 
            case "phase":
                $has = DB::table('phases')
                ->join('proyects', 'proyects.id', '=', 'phases.proyecto_id')
                ->join('clients', 'clients.id', '=', 'proyects.cliente_id')
                ->where('clients.usuario_id', '=', $usuario_id)
                ->where('phases.id', '=', $id)
                ->count();
                //Log::debug($has);
                if ($has > 0) {
                    $res = true;
                }
            break;
            case "task":
                $res = false;
            break;
        }
        return $res;
    }

    public function hasPermissFront ($type,$id) {
        $res = false;
        $usuario_id = Auth::user()->id;
        switch ($type) {
            case "proyect":
                $has = DB::table('proyects')
                ->join('clients', 'clients.id', '=', 'proyects.cliente_id')
                ->where('clients.usuario_id', '=', $usuario_id)
                ->where('proyects.id', '=', $id)
                ->count();
                if ($has > 0) {
                    $res = true;
                }
            break; 
            case "phase":
                $has = DB::table('phases')
                ->join('proyects', 'proyects.id', '=', 'phases.proyecto_id')
                ->join('clients', 'clients.id', '=', 'proyects.cliente_id')
                ->where('clients.usuario_id', '=', $usuario_id)
                ->where('phases.id', '=', $id)
                ->count();
                //Log::debug($has);
                if ($has > 0) {
                    $res = true;
                }
            break;
            case "task":
                $res = false;
            break;
        }
        return response()->json(["permiss" => $res]);
    }

    public function dropToken () {
        $user = DB::table('users')->where('id', Auth::user()->id)->update([
            'token_notifications' => ''
        ]);
        return response()->json(['ready' => true]);
    }

    public function logout() {
        Auth::logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    //
}
