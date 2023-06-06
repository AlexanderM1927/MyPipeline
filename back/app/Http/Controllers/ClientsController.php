<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\User;
use App\Client;
use App\Http\Controllers\UserController;
use Log;

class ClientsController extends Controller
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
        $usuario_id = $request->input('usuario_id');
        $name = $request->input('name', 'N.A');
        $sector = $request->input('sector', 'N.A');
        $ciudad = $request->input('ciudad', 'N.A');
        $direccion = $request->input('direccion', 'N.A');
        $contacto = $request->input('contacto', 'N.A');
        $cargo = $request->input('cargo', 'N.A');
        $celular = $request->input('celular', 'N.A');
        $correo = $request->input('correo', 'N.A');
        $numeroventas = $request->input('numeroventas', 0.0);
        $client = Client::create([
            'usuario_id' => $usuario_id,
            'name' => $name,
            'ciudad' => $ciudad,
            'sector' => $sector,
            'contacto' => $contacto,
            'cargo' => $cargo,
            'celular' => $celular,
            'correo' => $correo,
            'direccion' => $direccion,
            'numeroventas' => $numeroventas
        ]);
        $r = true;
        return response()->json(['client' => $client,'insert' => $r]);
    }

    public function update (Request $request) {
        $id = $request->input('id');
        $usuario_id = $request->input('usuario_id');
        $name = $request->input('name', 'N.A');
        $sector = $request->input('sector', 'N.A');
        $ciudad = $request->input('ciudad', 'N.A');
        $direccion = $request->input('direccion', 'N.A');
        $contacto = $request->input('contacto', 'N.A');
        $cargo = $request->input('cargo', 'N.A');
        $celular = $request->input('celular', 'N.A');
        $correo = $request->input('correo', 'N.A');
        $numeroventas = $request->input('numeroventas', 0.0);
        // if ((new UserController)->hasPermiss('proyect',$id)) {
            $client = DB::table('clients')->where('id', $id)->update([
                'usuario_id' => $usuario_id,
                'name' => $name,
                'ciudad' => $ciudad,
                'sector' => $sector,
                'contacto' => $contacto,
                'cargo' => $cargo,
                'celular' => $celular,
                'correo' => $correo,
                'direccion' => $direccion,
                'numeroventas' => $numeroventas
            ]);
            $r = true;
            return response()->json(['client' => $client,'update' => $r]);
        // }
    }

    public function get ($usuario_id) {
        $clients = DB::table('clients')->where('usuario_id','=',$usuario_id)->orderByDesc('updated_at')->get();
        return response()->json($clients);
    }

    public function getById ($id = 0) {
        // if ((new UserController)->hasPermiss('proyect',$id)) {
            $clients = DB::table('clients')->where('id', '=', $id)->get()->first();
            return response()->json($clients);
        // }
    }

    public function deleteClientById ($id) {
        $project = DB::table('clients')->where('id', '=', $id)->delete();
        return response()->json(['clients' => $project]);
    }
}
