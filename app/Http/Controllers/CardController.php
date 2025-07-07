<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cards = Card::with('category')->get();

        return Inertia::render('cards/index', [
            'cards' => $cards
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $categories = Category::all();
        $categoryId = $request->query('category_id');

        return Inertia::render('cards/create', [
            'categories' => $categories,
            'categoryId' => $categoryId
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'english' => 'required|string|max:255',
            'chinese' => 'required|string|max:255',
            'vietnamese' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
        ]);

        $card = Card::create($validated);

        return redirect()->route('categories.detail', $card->category_id)
            ->with('success', 'Card created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Card $card)
    {
        $card->load('category');

        return Inertia::render('cards/show', [
            'card' => $card
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Card $card)
    {
        $categories = Category::all();

        return Inertia::render('cards/edit', [
            'card' => $card,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Card $card)
    {
        $validated = $request->validate([
            'english' => 'required|string|max:255',
            'chinese' => 'required|string|max:255',
            'vietnamese' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
        ]);

        $card->update($validated);

        return redirect()->route('categories.detail', $card->category_id)
            ->with('success', 'Card updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Card $card)
    {
        $categoryId = $card->category_id;
        $card->delete();

        return redirect()->route('categories.detail', $categoryId)
            ->with('success', 'Card deleted successfully.');
    }
}
