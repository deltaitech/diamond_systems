<?php

use Illuminate\Support\Facades\Route;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;


//Route::group(['prefix' => LaravelLocalization::setLocale(),
//    'middleware' => ['localeSessionRedirect', 'localizationRedirect', 'localeViewPath']], function () {
    Route::prefix('admin')->group(function () {

        //admin login
        Route::get('login', 'Auth\AuthController@login')->name('dashboard.login')->middleware('guest:admin');
        Route::post('authenticate', 'Auth\AuthController@authenticate')->name('authenticate');

        Route::middleware(['auth:admin'])->group(function () {
            Route::get('/', 'Auth\AuthController@home')->name('admin.home');
            Route::get('logout', 'Auth\AuthController@logout')->name('admin.logout');


            //role routes
            Route::resource('roles', 'RoleController');

            //admin users routes
            Route::resource('admin-users', 'AdminUserController');
            Route::get('my-profile', 'AdminUserController@profile')->name('admin.profile');
            Route::put('my-profile/{id}/update', 'AdminUserController@updateProfile')->name('admin.profile.update');

            //slider routes
            Route::resource('sliders', 'SliderController');

            //features routes
            Route::resource('features', 'FeatureController');

            //Counters routes
            Route::resource('counters', 'CounterController');

            //services routes
            Route::resource('services', 'ServiceController');

            //clients routes
            Route::resource('clients', 'ClientController');

            //pages routes
            Route::resource('pages', 'PageController');

            //contact routes
            Route::resource('contacts', 'SettingContactController');

            //setting routes
            Route::resource('settings', 'SettingController');

            //contact_requests routes
            Route::resource('contact_requests', 'ContactRequestController');
            Route::get('contact_requests/{contact_request}/reply', 'ContactRequestController@reply')->name('contact_requests.reply');
            Route::post('contact_requests/{contact_request}/send_mail', 'ContactRequestController@send_mail')->name('contact_requests.send_mail');

        });
    });
//});
