<?php

namespace Database\Seeders;

use App\Models\Card;
use App\Models\Category;

use Illuminate\Database\Seeder;

class RetailEcommerceCardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $category = Category::firstOrCreate(['name' => 'Retail Ecommerce']);

        $cards = [
            [
                'english' => 'Physical store',
                'chinese' => '实体店',
                'vietnamese' => 'Cửa hàng thực tế',
            ],
            [
                'english' => 'Shopping cart',
                'chinese' => '购物车',
                'vietnamese' => 'Giỏ hàng',
            ],
            [
                'english' => 'Customer review',
                'chinese' => '客户评价',
                'vietnamese' => 'Đánh giá khách hàng',
            ],
            [
                'english' => 'Product listing',
                'chinese' => '产品上架',
                'vietnamese' => 'Đăng bán sản phẩm',
            ],
            [
                'english' => 'Retail store',
                'chinese' => '零售店',
                'vietnamese' => 'Cửa hàng bán lẻ',
            ],
            [
                'english' => 'Flagship store',
                'chinese' => '品牌旗舰店',
                'vietnamese' => 'Cửa hàng đại diện thương hiệu',
            ],
            [
                'english' => 'Pop-up store',
                'chinese' => '快闪店',
                'vietnamese' => 'Cửa hàng tạm thời',
            ],
            [
                'english' => 'Concept store',
                'chinese' => '概念店',
                'vietnamese' => 'Cửa hàng trải nghiệm (trưng bày chủ đề)',
            ],
            [
                'english' => 'Customer service',
                'chinese' => '客户服务',
                'vietnamese' => 'Dịch vụ khách hàng',
            ],
            [
                'english' => 'Customer journey',
                'chinese' => '客户旅程',
                'vietnamese' => 'Hành trình khách hàng',
            ],
            [
                'english' => 'In-store pickup',
                'chinese' => '门店自取',
                'vietnamese' => 'Nhận hàng tại cửa hàng',
            ],
            [
                'english' => 'Go shopping',
                'chinese' => '购物',
                'vietnamese' => 'Đi mua sắm',
            ],
        ];

        foreach ($cards as $card) {
            Card::create([
                'english' => $card['english'],
                'chinese' => $card['chinese'],
                'vietnamese' => $card['vietnamese'],
                'category_id' => $category->id,
            ]);
        }
    }
}
