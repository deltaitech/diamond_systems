<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run()
    {
        $setting = Setting::create([
            'ar' => [
                'website_title' => 'الأنظمة الماسية',
                'footer_description' => '<p>نعتبر الرواد فى تقديم الخدمات ذات جودة أعلى في مجال الأنظمة الأمنية والمراقبة والسلامة وتجاوز إختياجات عملائنا المحددة والمخصصة من خلال تقديم أعلى مستويات الخدمات الأمنية الخاصة والمبنية على الثقة</p>',
                'address' => 'ص.ب 337 جدة 21471 - المملكة العربية السعودية',
                'copyrights' => 'حقوق النشر © 2023 - الأنظمة الماسية.',
                'meta_keywords' => 'الأنظمة الماسية',
                'meta_title' => 'الأنظمة الماسية',
                'meta_description' => 'الأنظمة الماسية أنظمة المراقبة الأمن والسلامة',
            ],
//            'en' => [
//                'website_title' => 'Dashboard',
//                'footer_description' => '<p>Dashboard was established in Saudi Arabia to meet the ever-growing demand in construction and development in the Kingdom of Saudi Arabia.</p>',
//                'address' => 'P.O. Box No. 14765 Riyadh 11434, Makkah Road, Riyadh, Kingdom of Saudi Arabia',
//                'copyrights' => 'Copyright © 2023 - ADVACON LTD.',
//                'meta_keywords' => 'Dashboard',
//                'meta_title' => 'Dashboard',
//                'meta_description' => 'Dashboard Construction',
//            ],
            'contact_email' => 'mohamed@app.com',
            'map' => '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d475325.6629700639!2d38.58728038742286!3d21.449606391714617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d01fb1137e59%3A0xe059579737b118db!2sJeddah%20Saudi%20Arabia!5e0!3m2!1sen!2seg!4v1702993666953!5m2!1sen!2seg" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
        ]);
        $setting->file()->create([
            'path' => 'seeders/settings/logo.png',
            'type' => 'logo'
        ]);

        $setting->file()->create([
            'path' => 'seeders/settings/white-logo.png',
            'type' => 'white_logo'
        ]);

        $setting->file()->create([
            'path' => 'seeders/settings/favicon.png',
            'type' => 'favicon'
        ]);

        $setting->file()->create([
            'path' => 'seeders/settings/footer.jpg',
            'type' => 'footer_img'
        ]);

        $setting->file()->create([
            'path' => 'seeders/settings/breadcrumb.jpg',
            'type' => 'breadcrumb'
        ]);
    }
}
