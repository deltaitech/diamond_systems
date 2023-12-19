<?php

namespace Database\Seeders;

use App\Models\Counter;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CounterSeeder extends Seeder
{
    public function run()
    {
        //features
        $title_ar = [
            'مشاريع مكتملة',
            'عملاء سعداء',
        ];

        $title_en = [
            'Projects Completed',
            'Happy Clients',
        ];

        $number = [
            '100',
            '150',
        ];


        for ($i = 0; $i < 2; $i++) {
            $counter = Counter::create([
                'ar' => [
                    'title' => $title_ar[$i],
                ],

                'en' => [
                    'title' => $title_en[$i],
                ],
                'status' => 1,
                'number' => $number[$i],

            ]);
        }
    }
}
