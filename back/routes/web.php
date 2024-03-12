<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->post('login', 'AuthController@login');
$router->post('register', 'AuthController@register');
$router->get('sendnotify', 'GeneralController@sendNotify');
$router->post('user/push-token', 'AuthController@pushToken');

// Reports routes
$router->get('export/{usuario_id}', 'ReportsController@ProyectStatus');

$router->group(['middleware' => 'auth'], function () use ($router) {
    // Users routes
    $router->get('user', 'UserController@getUser');
    $router->post('user/drop-token', 'UserController@dropToken');
    $router->post('logout', 'UserController@logout');
    $router->get('permiss/{type}/{id}', 'UserController@hasPermissFront');

    // Clients routes
    $router->post('client', 'ClientsController@save');
    $router->post('modify_client', 'ClientsController@update');
    $router->post('delete_client/{id}', 'ClientsController@deleteClientById');
    $router->get('clients/{usuario_id}', 'ClientsController@get');
    $router->get('client/{id}', 'ClientsController@getById');

    // Projects routes
    $router->post('proyect', 'ProyectsController@save');
    $router->post('modify_proyect', 'ProyectsController@update');
    $router->post('delete_proyect/{id}', 'ProyectsController@deleteProyectById');
    $router->get('proyects/{cliente_id}', 'ProyectsController@get');
    $router->get('proyect/{id}', 'ProyectsController@getById');
    $router->get('days_proyect/{id}', 'ProyectsController@getDaysProyect');
    $router->get('last_task_proyect/{id}', 'ProyectsController@getLastTask');
    $router->get('next_task_proyect/{id}', 'ProyectsController@getNextTask');

    // Phases routes
    $router->post('phases', 'PhasesController@generate');
    $router->get('phases/{proyecto_id}', 'PhasesController@get');

    // Tasks routes
    $router->post('task', 'TasksController@save');
    $router->get('tasks/{fase_id}', 'TasksController@get');
    $router->get('tasks_user/{usuario_id}', 'TasksController@getByUser');
    $router->post('modify_task', 'TasksController@update');
});

