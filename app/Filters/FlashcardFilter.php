<?php

namespace App\Filters;

class FlashcardFilter extends QueryFilter
{
    protected $filterable = [
        'name',
    ];

    public function filterName($name)
    {
        return $this->builder->where('name', 'like', '%' . $name . '%');
    }
}
