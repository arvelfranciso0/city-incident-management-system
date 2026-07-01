<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (! Schema::hasTable('department_staff')) {
            Schema::create('department_staff', function (Blueprint $table) {
                $table->id();
                $table->foreignId('department_id')->constrained()->cascadeOnDelete();
                $table->foreignId('staff_id')->constrained()->cascadeOnDelete();
                $table->timestamps();

                $table->unique(['department_id', 'staff_id']);
            });
        }

        if (Schema::hasColumn('staff', 'department_id')) {
            $foreignKey = DB::table('information_schema.KEY_COLUMN_USAGE')
                ->where('TABLE_SCHEMA', Schema::getConnection()->getDatabaseName())
                ->where('TABLE_NAME', 'staff')
                ->where('COLUMN_NAME', 'department_id')
                ->whereNotNull('REFERENCED_TABLE_NAME')
                ->value('CONSTRAINT_NAME');

            Schema::table('staff', function (Blueprint $table) use ($foreignKey) {
                if ($foreignKey) {
                    $table->dropForeign($foreignKey);
                }

                $table->dropColumn('department_id');
            });
        }
    }

    public function down(): void
    {
        Schema::table('staff', function (Blueprint $table) {
            $table->foreignId('department_id')->after('user_id')->constrained()->cascadeOnDelete();
        });

        Schema::dropIfExists('department_staff');
    }
};
