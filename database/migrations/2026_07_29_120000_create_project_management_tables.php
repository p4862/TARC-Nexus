<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->text('description');
            $table->string('icon')->nullable();
            $table->timestamps();
        });

        Schema::create('sdgs', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('title');
            $table->text('description');
        });

        Schema::create('technologies', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->timestamps();
        });

        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->foreignId('category_id');
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->string('team_name')->nullable();
            $table->string('slug')->unique();
            $table->text('abstract');
            $table->text('problem_statement');
            $table->text('proposed_solution');
            $table->text('objectives');
            $table->text('target_users');
            $table->text('expected_impact');
            $table->text('methodology');
            $table->text('system_architecture');
            $table->string('github_url')->nullable();
            $table->string('demo_url')->nullable();
            $table->string('figma_url')->nullable();
            $table->string('video_url')->nullable();
            $table->enum('status', [
                'Draft',
                'Submitted',
                'Under Review',
                'Approved',
                'Published',
            ])->default('Draft');
            $table->text('review_notes')->nullable();
            $table->foreignId('reviewed_by')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->boolean('featured')->default(false);
            $table->unsignedInteger('views_count')->default(0);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();

        });

        Schema::create('project_members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id');
            $table->string('student_name');
            $table->string('matric_number');
            $table->string('programme');
            $table->string('supervisor');
            $table->timestamps();

        });

        Schema::create('project_sdgs', function (Blueprint $table) {
            $table->foreignId('project_id');
            $table->foreignId('sdg_id');
            $table->text('contribution_description');

            $table->primary(['project_id', 'sdg_id']);
        });

        Schema::create('project_technologies', function (Blueprint $table) {
            $table->foreignId('project_id');
            $table->foreignId('technology_id');

            $table->primary(['project_id', 'technology_id']);
        });

        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id');
            $table->enum('type', ['image', 'poster', 'video', 'document']);
            $table->string('filename');
            $table->string('path');
            $table->string('thumbnail')->nullable();
            $table->timestamp('uploaded_at')->useCurrent();
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media');
        Schema::dropIfExists('project_technologies');
        Schema::dropIfExists('project_sdgs');
        Schema::dropIfExists('project_members');
        Schema::dropIfExists('projects');
        Schema::dropIfExists('technologies');
        Schema::dropIfExists('sdgs');
        Schema::dropIfExists('categories');
    }
};
