<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/** --------------Public routes-------------- */
Route::post('register',[UserController::class,'register']);
Route::post('login',[UserController::class,'login']);
Route::post('user/{id}',[UserController::class,'show']);

/** --------------Protected routes-------------- */

    /** -----User routes----- */
    Route::get('profile',[UserController::class,'index']);
    Route::patch('profile/update',[UserController::class,'update']);
    Route::delete('profile/delete',[UserController::class,'destroy']);
    Route::post('logout',[UserController::class,'logout']);

    /** -----GOALS routes----- */
    //TODO: add goals routes
    /** -----TASKS routes----- */
    //TODO: add tasks routes
