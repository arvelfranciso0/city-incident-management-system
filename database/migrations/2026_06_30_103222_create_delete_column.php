<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Application tables that support soft deletes.
     * Laravel system tables (failed_jobs, personal_access_tokens, password_reset_tokens) are excluded.
     */
    private array $tables = [
        'users',
        'organizations',
        'departments',
        'staff',
        'department_staff',
        'categories',
        'priorities',
        'incidents',
        'incident_timeline_events',
        'incident_attachments',
        'incident_feedback',
        'notifications',
        'audit_logs',
        'activity_logs',
        'settings',
        'faqs',
    ];

    public function up(): void
    {
        if (Schema::hasTable('delete_column')) {
            Schema::drop('delete_column');
        }

        foreach ($this->tables as $tableName) {
            if (! Schema::hasTable($tableName) || Schema::hasColumn($tableName, 'deleted_at')) {
                continue;
            }

            Schema::table($tableName, function (Blueprint $table) {
                $table->softDeletes();
            });
        }
    }

    public function down(): void
    {
        foreach ($this->tables as $tableName) {
            if (! Schema::hasTable($tableName) || ! Schema::hasColumn($tableName, 'deleted_at')) {
                continue;
            }

            Schema::table($tableName, function (Blueprint $table) {
                $table->dropSoftDeletes();
            });
        }
    }
};
