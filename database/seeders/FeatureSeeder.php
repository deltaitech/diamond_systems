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
        $title = [
            'أحدث التقنيات',
            'ضمان على الأجهزة',
            'الثقة والأمان',
        ];

        $description = [
            '<p>تعمل شركة الأنظمة الماسية بأحدث التقنيات لتوفير متطلباتك</p>',
            '<pتوفر الشركة ضمان شامل على الأجهزة والتقنيات المستخدة</p>',
            '<p>من خلال شركتنا سنوفر لك الثقة والأمان لراحتك</p>',
        ];

        $icon = [
            'fas fa-laptop',
            'fas fa-certificate',
            'fas fa-user-shield',
        ];

        for ($i = 0; $i < count($title); $i++) {
            $feature = Feature::create([
                'ar' => [
                    'title' => $title[$i],
                    'description' => $description[$i],
                ],
                'status' => 1,
                'icon' => $icon[$i],

            ]);
        }
    }
}
