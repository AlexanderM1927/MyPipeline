<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\UserController;

class AuthController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */

    public function login(Request $request) {
        $this->validate($request, [
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        $credentials = $request->only(['email', 'password']);

        if (! $token = Auth::attempt($credentials)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        } else {
            $user = Auth::user();
            return $this->respondWithToken($user,$token);
        }
    }

    public function register(Request $request) {
        $this->validate($request, [
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'name' => 'required'
        ]);
 
        $hasher = app()->make('hash');
        $email = $request->input('email');
        $name = $request->input('name');
        $password = $hasher->make($request->input('password'));
        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => $password
        ]);
        $r = true;
        return response()->json(['register' => $r]);
    }

    public function pushToken(Request $request) {
        // Log::debug($request->all());
        $user = DB::table('users')->where('id', $request->input('id'))->update([
            'token_notifications' => $request->input('token')
        ]);
        return response()->json(['ready' => true]);
    }

    //
}
