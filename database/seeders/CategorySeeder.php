<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Materials',
            'Office Communication',
            'Uncategorized',
            'Packaging Logistics',
            'Procurement Development',
            'Production',
            'Quality Control',
            'Retail Ecommerce',
        ];

        foreach ($categories as $name) {
            Category::create(['name' => $name]);
        }
    }
}
