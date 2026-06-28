<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('incidents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->constrained()->cascadeOnDelete();
            $table->string('reference');
            $table->string('tracking_number')->unique();
            $table->string('title');
            $table->text('description');
            $table->string('status', 32)->default('open');
            $table->string('location');
            $table->string('address_line')->nullable();
            $table->string('city')->nullable();
            $table->string('postal_code', 16)->nullable();
            $table->decimal('lat', 10, 7)->nullable();
            $table->decimal('lng', 10, 7)->nullable();
            $table->foreignId('department_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('category_id')->constrained()->restrictOnDelete();
            $table->foreignId('priority_id')->constrained()->restrictOnDelete();
            $table->foreignId('reporter_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('assigned_to_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('reporter_name')->nullable();
            $table->string('reporter_email')->nullable();
            $table->string('reporter_phone')->nullable();
            $table->boolean('is_guest_report')->default(false);
            $table->text('resolution_note')->nullable();
            $table->timestamp('resolved_at')->nullable();
            $table->timestamp('closed_at')->nullable();
            $table->timestamp('sla_due_at')->nullable();
            $table->timestamp('sla_breached_at')->nullable();
            $table->timestamp('reported_at');
            $table->timestamps();

            $table->unique(['organization_id', 'reference']);
            $table->index('status');
            $table->index('department_id');
            $table->index('assigned_to_user_id');
            $table->index('reporter_user_id');
            $table->index('reported_at');
            $table->index(['lat', 'lng']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('incidents');
    }
};
