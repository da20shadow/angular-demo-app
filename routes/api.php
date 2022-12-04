<?php

use App\Http\Controllers\GoalController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/** --------------Public routes-------------- */
Route::post('register',[UserController::class,'register']);
Route::post('login',[UserController::class,'login']);
Route::get('user/{id}',[UserController::class,'show']);

/** --------------Protected routes-------------- */
Route::group(['middleware' => ['auth:sanctum']],function () {
    /** -----User routes----- */
    Route::get('profile', [UserController::class, 'index']);
    Route::patch('profile/update', [UserController::class, 'update']);
    Route::delete('profile/delete', [UserController::class, 'destroy']);
    Route::post('logout', [UserController::class, 'logout']);

    /** -----GOALS routes----- */
    Route::get('goals', [GoalController::class, 'index']);
    Route::get('goals/{id}', [GoalController::class, 'show']);
    Route::post('goals/add', [GoalController::class, 'store']);
    Route::patch('goals/update/{id}', [GoalController::class, 'update']);
    Route::delete('goals/delete/{id}', [GoalController::class, 'destroy']);

    /** -----TASKS routes----- */
    //TODO: add tasks routes
});
