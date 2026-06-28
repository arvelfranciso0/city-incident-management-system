<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropUnique(['email']);
        });

        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('organization_id')->nullable()->after('id')->constrained()->nullOnDelete();
            $table->foreignId('department_id')->nullable()->after('organization_id')->constrained()->nullOnDelete();
            $table->string('username')->nullable()->after('email');
            $table->string('role', 32)->default('citizen')->after('password');
            $table->string('status', 16)->default('active')->after('role');
            $table->string('phone', 32)->nullable()->after('status');
            $table->string('job_title')->nullable()->after('phone');
            $table->text('address')->nullable()->after('job_title');
            $table->text('bio')->nullable()->after('address');
            $table->string('avatar_path')->nullable()->after('bio');
            $table->timestamp('last_login_at')->nullable()->after('avatar_path');
            $table->timestamp('joined_at')->nullable()->after('last_login_at');

            $table->unique(['organization_id', 'email']);
            $table->index('department_id');
            $table->index('role');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropUnique(['organization_id', 'email']);
            $table->dropForeign(['organization_id']);
            $table->dropForeign(['department_id']);
            $table->dropColumn([
                'organization_id',
                'department_id',
                'username',
                'role',
                'status',
                'phone',
                'job_title',
                'address',
                'bio',
                'avatar_path',
                'last_login_at',
                'joined_at',
            ]);
        });

        Schema::table('users', function (Blueprint $table) {
            $table->unique('email');
        });
    }
};
