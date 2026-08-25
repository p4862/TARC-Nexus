<?php

namespace Tests\Feature\Project;

use App\Enums\UserRole;
use App\Models\User;
use Database\Seeders\CategorySeeder;
use Database\Seeders\SdgSeeder;
use Database\Seeders\TechnologySeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaxonomyTest extends TestCase
{
    use RefreshDatabase;

    public function test_documented_categories_and_sdgs_are_seeded_idempotently(): void
    {
        $this->seed([
            CategorySeeder::class,
            SdgSeeder::class,
            TechnologySeeder::class,
        ]);
        $this->seed([
            CategorySeeder::class,
            SdgSeeder::class,
            TechnologySeeder::class,
        ]);

        $this->assertDatabaseCount('categories', 12);
        $this->assertDatabaseCount('sdgs', 3);
        $this->assertDatabaseCount('technologies', 10);
        $this->assertDatabaseHas('categories', ['name' => 'Web Application']);
        $this->assertDatabaseHas('categories', ['name' => 'Other']);
        $this->assertDatabaseHas('sdgs', [
            'code' => '12',
            'title' => 'Responsible Consumption and Production',
        ]);
        $this->assertDatabaseHas('technologies', ['name' => 'Laravel']);
    }

    public function test_exhibitor_can_retrieve_project_taxonomies(): void
    {
        $this->seed([
            CategorySeeder::class,
            SdgSeeder::class,
            TechnologySeeder::class,
        ]);
        $exhibitor = User::factory()->create([
            'role' => UserRole::Exhibitor,
        ]);

        $this->actingAs($exhibitor)
            ->getJson('/api/v1/exhibitor/taxonomies')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonCount(12, 'data.categories')
            ->assertJsonCount(3, 'data.sdgs')
            ->assertJsonCount(10, 'data.technologies');
    }
}
