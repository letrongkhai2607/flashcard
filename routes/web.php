<?php

use App\Http\Controllers\CardController;
use App\Http\Controllers\CategoryController;
use App\Models\Card;
use App\Models\Category;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Category routes
Route::resource('categories', CategoryController::class)->only(['index', 'create', 'store', 'show', 'destroy']);

Route::get('/collections', function () {
    $categories = Category::withCount('cards')->get();

    return Inertia::render('categories/index', [
        'categories' => $categories
    ]);
})->name('categories.index');

Route::get('/categories/{category}', function (Category $category) {
    $cards = Card::where('category_id', $category->id)->get();
    return Inertia::render('categories/detail', [
        'category' => $category,
        'cards' => $cards
    ]);
})->name('categories.detail');

// Card routes
Route::resource('cards', CardController::class);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
