<?php

namespace Database\Seeders;

use App\Models\Feature;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FeatureSeeder extends Seeder
{

    public function run()
    {
        //features
        $title_ar = [
            'أفضل مواد خام ',
            'أخشاب معالجة',
            'جميع الأحجام',
            'خدمة ما بعد البيع',
            'حلول المنتجات حسب الطلب',
        ];

        $title_en = [
            'Best raw materials',
            'Treated wood',
            'All sizes',
            'After sales service',
            'Customized product solutions',
        ];

        $description_ar = [
            '<p>مواد خام عالية الجودة مستوردة من موردين معتمدين</p>',
            '<p>نستخدم اخشاب معالجة حراريًا (Standard ISPM-15)</p>',
            '<p>تنفيذ جميع الأحجام والأشكال</p>',
            '<p>لدينا خدمة ما بعد البيع لدينا استثنائية</p>',
            '<p>حلول مخصصة لأي أثاث من الخشب مصممة لاحتياجاتك</p>',

        ];

        $description_en = [
            '<p>High quality raw materials imported from certified suppliers</p>',
            '<p>We use heat-treated wood (Standard ISPM-15)</p>',
            '<p>Implement all sizes and shapes</p>',
            '<p>Our after-sales service is exceptional</p>',
            '<p>Custom solutions for any wood furniture tailored to your needs</p>',

        ];

        $icon = [
            'fas fa-luggage-cart',
            'fab fa-firstdraft',
            'fas fa-expand-arrows-alt',
            'fas fa-headset',
            'fas fa-chair',
        ];


        for ($i = 0; $i < count($title_en); $i++) {
            $feature = Feature::create([
                'ar' => [
                    'title' => $title_ar[$i],
                    'description' => $description_ar[$i],


                ],

                'en' => [
                    'title' => $title_en[$i],
                    'description' => $description_en[$i],

                ],
                'status' => 1,
                'icon' => $icon[$i],

            ]);
        }
    }
}
