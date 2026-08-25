<?php

namespace Database\Seeders;

use App\Models\Sdg;
use Illuminate\Database\Seeder;

class SdgSeeder extends Seeder
{
    /**
     * Seed the SDGs supported by the exhibition.
     */
    public function run(): void
    {
        $sdgs = [
            [
                'code' => '8',
                'title' => 'Decent Work and Economic Growth',
                'description' => 'Promotes tourism businesses, local entrepreneurship, employment, digital marketplaces, and economic opportunity.',
            ],
            [
                'code' => '11',
                'title' => 'Sustainable Cities and Communities',
                'description' => 'Supports smart tourism, cultural preservation, heritage conservation, transportation, accessibility, and community engagement.',
            ],
            [
                'code' => '12',
                'title' => 'Responsible Consumption and Production',
                'description' => 'Encourages sustainable tourism practices, environmental awareness, waste reduction, green tourism, and responsible travel.',
            ],
        ];

        foreach ($sdgs as $sdg) {
            Sdg::query()->updateOrCreate(
                ['code' => $sdg['code']],
                $sdg,
            );
        }
    }
}
