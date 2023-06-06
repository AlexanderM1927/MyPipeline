<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientsTable extends Migration
{
    private $default = 'N.A';
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('usuario_id');
            $table->string('sector')->default($this->default);
            $table->string('ciudad')->default($this->default);
            $table->string('name')->default($this->default);
            $table->string('direccion')->default($this->default);
            $table->string('contacto')->default($this->default);
            $table->string('cargo')->default($this->default);
            $table->string('celular')->default($this->default);
            $table->string('correo')->default($this->default);
            $table->double('numeroventas')->default(0.0);
            $table->timestamps();
            $table->foreign('usuario_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clients');
    }
}
