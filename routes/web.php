<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

//Route::group(['prefix' => LaravelLocalization::setLocale(),
//    'middleware' => ['localeSessionRedirect', 'localizationRedirect', 'localeViewPath']], function () {
////    Auth::routes();
//
//    Route::get('/', function () {
//        return view('welcome');
//    })->name('home');
//});

Route::get('/', function () {
    return view('admin.auth.login');
})->name('home');
