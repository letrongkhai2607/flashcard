<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    use HasFactory;

    protected $fillable = ['english', 'chinese', 'vietnamese', 'category_id'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
