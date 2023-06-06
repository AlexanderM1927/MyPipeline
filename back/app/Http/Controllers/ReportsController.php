<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\User;
use App\Proyect;
use App\Http\Controllers\UserController;
use App\Exports\ProyectStatusExport;
use Log;
use Maatwebsite\Excel\Facades\Excel;

class ReportsController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    public function ProyectStatus($usuario_id) 
    {
        return Excel::download(new ProyectStatusExport($usuario_id), 'projectstatus.xlsx');
    }
}
