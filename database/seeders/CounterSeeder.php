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
        $title = ['مشاريع كاميرات المراقبة', 'نظام إنذار', 'الوصول من الباب', 'عملاء سعداء'];
        $number = ['1240', '362', '1240', '1300'];
        $icons = ['fas fa-camera', 'far fa-clock', 'far fa-address-card', 'fas fa-child'];

        for ($i = 0; $i < count($title); $i++) {
            $counter = Counter::create([
                'ar' => [
                    'title' => $title[$i],
                ],
                'icon' => $icons[$i],
                'number' => $number[$i],
                'status' => 1,
            ]);
        }
    }
}
